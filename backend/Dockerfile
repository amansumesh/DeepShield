FROM python:3.10-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libgl1 \
    libjpeg-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

# Install Python dependencies
RUN pip install --upgrade pip setuptools wheel
RUN pip install torch==2.1.2 torchvision==0.16.2 --index-url https://download.pytorch.org/whl/cpu
RUN pip install -r requirements.txt

# Copy rest of code
COPY . .

# Expose port
EXPOSE 10000

# Start app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000"]