# DeepShield 🛡️

DeepShield is an AI-powered deepfake image detection system built on fine-tuned ResNet-50. It analyzes pixel-level artifacts, facial inconsistencies, and visual anomalies. Using residual learning, it accurately classifies images as REAL or FAKE. It is designed for robust, scalable, and high-precision digital media verification.

## 🚀 Project Overview

DeepShield empowers users to upload facial images and instantly receive authenticity predictions backed by visual explanations and AI-generated reports. The platform leverages a custom-trained ResNet-50 model for classification, MTCNN for facial detection and alignment, SHAP for explainability, and Groq-powered Llama models for generating human-readable analysis.

Designed with transparency and trust in mind, DeepShield transforms deepfake detection from a black-box prediction into an interpretable and user-friendly experience.

## 🎯 Objectives

- **Media Authenticity**: Detect manipulated and AI-generated facial images with high accuracy.
- **Explainability (XAI)**: Visualize model reasoning through SHAP attribution heatmaps.
- **Transparency**: Generate understandable explanations describing facial artifacts and inconsistencies.
- **Performance**: Deliver fast inference through an optimized full-stack architecture.
- **Trustworthy AI**: Help users make informed decisions about digital media authenticity.

## ✨ Features

### For Users

- **Image Upload Interface**: Drag-and-drop image uploads with responsive loading animations for a seamless user experience.
- **Automatic Face Detection**: Utilizes MTCNN to accurately detect, crop, and align facial regions before analysis.
- **Deepfake Classification**: Classifies uploaded facial media as **REAL** or **FAKE** using a custom-trained ResNet-50 deep learning model.
- **Explainability Heatmaps**: Generates SHAP-based attribution visualizations that highlight the facial regions influencing predictions.
- **AI-Powered Reports**: Produces detailed natural-language explanations using Groq-hosted Llama models to describe detected artifacts and anomalies.
- **Confidence Analytics**: Displays prediction probabilities and confidence scores to improve result transparency.

### Platform-wide

- **Modern Glassmorphic Interface**: Features a futuristic glassmorphic design built with Tailwind CSS and smooth animations.
- **Interactive Visual Experience**: Includes dynamic particle backgrounds and engaging user interactions for a premium feel.
- **Real-Time Processing**: Delivers rapid image analysis through optimized backend inference pipelines.
- **Dockerized Deployment**: Packages the entire application into a streamlined Docker container for easy deployment and portability.

## 🛠️ Tech Stack

| Tier | Technologies |
| :--- | :--- |
| **Frontend** | React, Tailwind CSS |
| **Backend** | FastAPI, Uvicorn, Python 3.10 |
| **Deep Learning** | PyTorch, Torchvision, ResNet-50 |
| **Computer Vision** | OpenCV, Pillow |
| **Explainable AI** | SHAP, Matplotlib |
| **Generative AI** | Groq API |
| **Containerization** | Docker |
| **CI/CD** | GitHub Actions |

## 🧠 Model Architecture

<img width="870" height="204" alt="image" src="https://github.com/user-attachments/assets/add7def2-7b84-48f5-8f17-96183cee2d41" />

DeepShield utilizes a transfer learning-based deepfake detection architecture built upon ResNet-50. The system first employs MTCNN for facial detection and alignment, isolating the most relevant facial regions while removing background noise. The extracted face is resized to 224×224 pixels and normalized before being passed through the neural network. The pre-trained ResNet-50 backbone serves as the primary feature extractor, learning high-level facial textures, edges, and subtle visual inconsistencies commonly introduced during deepfake generation.

To adapt the network for binary classification, the original classification head is replaced with a custom architecture consisting of Global Average Pooling, a Dropout layer (0.5) to reduce overfitting, and a Fully Connected layer with Softmax activation that outputs probabilities for the **REAL** and **FAKE** classes. The model is trained using the Adam optimizer and Cross-Entropy Loss, enabling efficient convergence and robust performance.

For explainability, SHAP (SHapley Additive Explanations) is integrated into the inference pipeline to generate attribution heatmaps that highlight the facial regions influencing model predictions. These visual explanations are further complemented by Groq-powered Llama models, which generate natural-language reports describing detected artifacts, inconsistencies, and confidence insights, making the system both accurate and interpretable. The proposed architecture achieved an accuracy of **87.59%**, demonstrating strong effectiveness in distinguishing authentic and manipulated facial media.

## 🔄 Workflow / How It Works

1. **Image Upload**
   - Users upload an image through the React frontend.

2. **Face Detection**
   - MTCNN detects and crops the primary face while preserving contextual facial regions.

3. **Deepfake Inference**
   - The cropped face is processed by a custom ResNet-50 model trained for deepfake detection.

4. **Explainability Generation**
   - SHAP GradientExplainer computes attribution scores to identify influential facial features.

5. **AI Analysis**
   - Prediction outputs are sent to Groq-hosted Llama models to generate human-readable explanations.

6. **Results Display**
   - The frontend displays predictions, confidence scores, SHAP visualizations, face crops, and AI-generated reports.

## 🧪 Testing

- **Development**
  - Environment variables managed using `.env` files for frontend and backend.

- **Backend Testing**
  - Automated testing with `pytest`.
  - Code quality checks using `flake8`.

- **Frontend Testing**
  - Component testing and build validation using Vite.

- **Model Validation**
  - Performance evaluated on real and deepfake image datasets.

- **Container Testing**
  - Dockerized environment verified for local and production deployments.

## 🚀 How to Run and Access

To run DeepShield on any machine with Docker installed:

### Pull and Run the Container

```bash
docker run -d -p 8000:8000 -p 5173:5173 --name deepshield amansumesh/deepshield:latest
```

### Access the Application

#### 1). Frontend (React + Vite)

```text
http://localhost:5173
```

#### 2). Backend API (FastAPI)

```text
http://localhost:8000/docs
```

### Verify Running Container

```bash
docker ps
```

Expected output:

```text
CONTAINER ID   IMAGE                         STATUS
xxxxxxxxxxxx   amansumesh/deepshield:latest Up
```

## 🔄 CI/CD Pipeline (GitHub Actions)

- Automated testing on every push and pull request.
- Backend validation using Pytest and Flake8.
- Frontend build verification using Vite.
- Automated Docker image creation and publishing.
- Docker Hub deployment through GitHub Actions workflows.
- Semantic version tagging support for production releases.
- Continuous integration ensures stable and reliable deployments.

---
👨‍💻 **DeepShield** is developed and maintained by [@amansumesh](https://github.com/amansumesh).
