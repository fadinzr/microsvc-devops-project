# Crop Price Dashboard - Source Code

This repository contains the full source code for the **Crop Price Dashboard** project, which visualizes historical and predicted crop prices for different regions in Bangladesh. The project is built using **React, Java (Spring Boot), Python, Node.js, and Go** microservices.

---

## **Project Overview**

- **Frontend:** React application displaying charts and controls.
- **API Gateway:** Java Spring Boot, routes requests to backend services.
- **Backend Microservices:**
  - **Trend Service (Python):** Provides predicted price trends.
  - **Writer Service (Node.js):** Handles logging or writing new data.
  - **Data Service (Go):** Provides historical price data.
  - **MySQL:** Stores demo/historical crop prices.

---

## **Docker Support**

### Multi-stage Dockerfile
Each microservice has a **multi-stage Dockerfile** to optimize image size and build time:
- **Stage 1:** Build the application (compile Java, install Node modules, etc.)
- **Stage 2:** Copy only necessary artifacts into a minimal base image for runtime.

### Docker Compose
You can start all services locally using Docker Compose:

```bash
docker-compose up --build
