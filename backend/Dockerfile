FROM python:3.11-slim

# Install system dependencies — ffmpeg + piper requirements
RUN apt-get update && apt-get install -y \
    ffmpeg \
    wget \
    libgomp1 \
    chromium \
    chromium-driver \
    && rm -rf /var/lib/apt/lists/*

# Install piper TTS binary
RUN wget -q https://github.com/rhasspy/piper/releases/download/2023.11.14-2/piper_linux_x86_64.tar.gz \
    && tar -xzf piper_linux_x86_64.tar.gz \
    && mv piper/piper /usr/local/bin/piper \
    && chmod +x /usr/local/bin/piper \
    && rm -rf piper piper_linux_x86_64.tar.gz

WORKDIR /app

# Copy requirements and install
COPY requirement.txt .
RUN pip install --no-cache-dir -r requirement.txt

# Copy backend files
COPY . .

# Hugging Face Spaces uses port 7860
EXPOSE 7860

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
