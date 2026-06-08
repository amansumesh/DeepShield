from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PIL import Image
import io
import os
from dotenv import load_dotenv

load_dotenv()

from models.predict import predict_image

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://deep-shield-chi.vercel.app"
]

# Allow additional origins from environment variables (automatically stripping trailing slashes)
allowed_origins_env = os.getenv("CORS_ALLOWED_ORIGINS")
if allowed_origins_env:
    origins.extend([o.strip().rstrip('/') for o in allowed_origins_env.split(",") if o.strip()])

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://deep-shield-.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Deepfake Detection API Running"}

#Just to test and fix browser error
@app.get("/predict")
def predict_get():
    return {
        "message": "Use POST /predict with an image file"
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        print(f"--- LOG: Processing file: {file.filename} ---")
        image = Image.open(io.BytesIO(contents)).convert("RGB")

        result = predict_image(image)

        return result

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )