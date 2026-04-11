FROM node:20-bullseye


RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-venv \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*


WORKDIR /app

COPY backend ./backend
COPY frontend ./frontend


WORKDIR /app/backend

RUN python3 -m venv venv

RUN ./venv/bin/pip install --upgrade pip setuptools wheel && \
    ./venv/bin/pip install -r requirements.txt


WORKDIR /app/frontend
RUN npm install

# 8000 for FastAPI Backend
# 5173 for Vite Frontend
EXPOSE 8000 5173


WORKDIR /app

CMD bash -c "\
cd backend && ./venv/bin/python -m uvicorn main:app --host 0.0.0.0 --port 8000 & \
cd frontend && npm run dev -- --host & \
wait"
