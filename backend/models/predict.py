import torch
import torch.nn.functional as F
from PIL import Image
from torchvision import transforms
import io
import base64
import os
import time
from groq import Groq
from dotenv import load_dotenv
import numpy as np

load_dotenv()

groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

device = torch.device("cpu") 

# Lazy model loaders
_model = None
_mtcnn = None

def get_model():
    global _model
    if _model is None:
        print("--- LOG: Loading ResNet-50 prediction model (lazy load) ---")
        from models.model import load_model
        model_path = os.path.join(os.path.dirname(__file__), "best_model.pth")
        _model = load_model(model_path, device)
        # Disable inplace operations for SHAP compatibility
        for m in _model.modules():
            if hasattr(m, 'inplace'):
                m.inplace = False
    return _model

def get_mtcnn():
    global _mtcnn
    if _mtcnn is None:
        print("--- LOG: Loading MTCNN face detector (lazy load) ---")
        from facenet_pytorch import MTCNN
        _mtcnn = MTCNN(keep_all=False, device=device)
    return _mtcnn

class_names = ["FAKE", "REAL"]

transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485,0.456,0.406],
                         [0.229,0.224,0.225])
])

def generate_shap_plot(model, input_tensor):
    try:
        import matplotlib
        matplotlib.use('Agg')
        import matplotlib.pyplot as plt
        import shap
        
        background = torch.zeros((1, 3, 224, 224)).to(device)
        
        explainer = shap.GradientExplainer(model, background)
        
        # Compute SHAP values
        shap_values = explainer.shap_values(input_tensor)
        
        img_numpy = input_tensor.cpu().numpy().transpose(0, 2, 3, 1)
        
        shap_numpy = [s.transpose(0, 2, 3, 1) for s in shap_values]

        plt.figure(figsize=(10, 5))
        shap.image_plot(shap_numpy, -img_numpy, show=False)
        
        buf = io.BytesIO()
        plt.savefig(buf, format='png', bbox_inches='tight', transparent=True)
        buf.seek(0)
        img_str = base64.b64encode(buf.read()).decode()
        plt.close('all')
        
        return f"data:image/png;base64,{img_str}"
    except Exception as e:
        print(f"--- SHAP Error: {str(e)} ---")
        return None

def get_image_description(image: Image.Image, prediction: str, confidence: float):
    buffered = io.BytesIO()
    # image_copy = image.copy()
    # image_copy.thumbnail((800, 800))
    image.save(buffered, format="JPEG")
    img_b64 = base64.b64encode(buffered.getvalue()).decode()
    
    try:
        completion = groq_client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text", 
                            "text": f"This image was classified as {prediction} with {confidence}% confidence. Explain why you think this image is {prediction} with {confidence}% confidence by focusing solely on visual content, skin artifacts, lighting, or inconsistencies. No meta-talk, no conversational filler."
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{img_b64}"
                            }
                        }
                    ]
                }
            ],
            temperature=0.1,
            max_tokens=60
        )
        desc = completion.choices[0].message.content.strip()
        return desc
    except Exception as e:
        print(f"--- Groq API Error: {str(e)} ---")
        return "Visual context unavailable."

def predict_image(image):

    if isinstance(image, bytes):
        image = Image.open(io.BytesIO(image))

    if not isinstance(image, Image.Image):
        image = Image.fromarray(image)

    image_rgb = image.convert("RGB").copy()

    width, height = image_rgb.size
    total_area = width * height

    boxes, _ = get_mtcnn().detect(image_rgb)
    
    # Cropping Logic
    use_full_image = True
    face_crop_url = None
    
    if boxes is not None:
        box = boxes[0] 
        
        # Calculate box area
        face_area = (box[2] - box[0]) * (box[3] - box[1])
        face_ratio = face_area / total_area
        
        margin_x = (box[2] - box[0]) * 0.45
        margin_y = (box[3] - box[1]) * 0.40
        
        x1 = max(0, box[0] - margin_x)
        y1 = max(0, box[1] - margin_y)
        x2 = min(width, box[2] + margin_x)
        y2 = min(height, box[3] + margin_y)
        new_box = [x1, y1, x2, y2]
        
        if face_ratio < 0.65: 
            use_full_image = False
            face_img = image_rgb.crop(new_box)
            
            # Preview for the frontend
            buffered = io.BytesIO()
            face_img.save(buffered, format="JPEG")
            face_base64 = base64.b64encode(buffered.getvalue()).decode()
            face_crop_url = f"data:image/jpeg;base64,{face_base64}"
            
            input_tensor = transform(face_img).unsqueeze(0).to(device)
        else:
            print(f"--- INFO: Face ratio {face_ratio:.2f} is high, using original framing ---")

    if use_full_image:
        input_tensor = transform(image_rgb).unsqueeze(0).to(device)
        face_crop_url = None

    model_instance = get_model()
    with torch.no_grad():
        outputs = model_instance(input_tensor)
        probs = F.softmax(outputs, dim=1)
        confidence, predicted = torch.max(probs, 1)
        
        prediction_label = class_names[predicted.item()]
        conf_val = confidence.item()
        
        # Log distribution
        prob_dist = {class_names[i]: float(probs[0][i]) for i in range(len(class_names))}
        print(f"File Analysis Result: {prediction_label} | Confidence: {conf_val:.4f}")
        print(f"DETAILED PROBS: {prob_dist}")

    description = get_image_description(
        image_rgb,
        class_names[predicted.item()],
        round(float(confidence.item()) * 100, 2)
    )
    
    # Generate SHAP explanation
    shap_url = generate_shap_plot(model_instance, input_tensor)
    
    return {
        "prediction": class_names[predicted.item()],
        "confidence": round(float(confidence.item()) * 100, 2),
        "face_crop_url": face_crop_url,
        "description": description,
        "shap_url": shap_url
    }
