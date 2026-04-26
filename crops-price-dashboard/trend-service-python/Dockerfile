# Stage 1: Build

FROM python:3.9-slim AS builder
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Stage 2: Runtime

FROM python:3.9-slim
WORKDIR /app

# Copy installed dependencies and source code

COPY --from=builder /usr/local/lib/python3.9 /usr/local/lib/python3.9
COPY --from=builder /app .

EXPOSE 5000
CMD ["python", "app.py"]

