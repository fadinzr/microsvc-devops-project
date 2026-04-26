# Crop Price Dashboard - DevOps Infrastructure

This repository contains all **DevOps and Infrastructure-as-Code** setup for deploying the **Crop Price Dashboard** project on AWS EKS with monitoring and GitOps.

Here is the github repo link that contains full source code along with mutli-stage Dockerfile and docker-compose.yaml: https://github.com/sayeed21141073/crops-price-dashboard
---

## **DevOps Overview**

We implement a **full cloud deployment and GitOps pipeline**:

1. **Docker & ECR**
   - Multi-stage Docker images for all microservices.
   - Images pushed to **AWS Elastic Container Registry (ECR)**.

   ## HowTo Push images ti ECR

      - Authenticate Docker to ECR
         aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<region>.amazonaws.com
      - Build Your Image
         docker build -t api-gateway-java .
      - Tag Your Image for ECR
         docker tag api-gateway-java:latest <aws_account_id>.dkr.ecr.<region>.amazonaws.com/api-gateway-java:latest
      - Push to ECR
         docker push <aws_account_id>.dkr.ecr.<region>.amazonaws.com/api-gateway-java:latest

2. **Kubernetes (EKS)**
   - Deploy microservices using **Deployments, Services, ConfigMaps, and Ingress**.
   - Cluster networking includes:
     - **VPC**
     - **Public & Private Subnets**
     - **Internet Gateway (IGW)**
     - **Route Tables**
     - **Security Groups**
     - **IAM Roles**
     - **EKS Worker Nodes**

3. **Terraform**
   - Automates creation of:
     - ECR Repositories
     - EKS Cluster
     - Networking (VPC, subnets, IGW, route tables)
     - IAM Roles & Policies
     - Security Groups
     - All cloud resources required for the project

4. **Write Kubernetes manifests** – Define Deployments, Services, ConfigMaps, Ingress and namespaces in yaml for each microservice to run on EKS.


5. **Monitoring**
   - **Prometheus** to collect metrics from Kubernetes and microservices.
   - **Grafana** to visualize metrics via dashboards.

6. **GitOps Deployment**
   - **ArgoCD** watches the Git repository for K8s manifests and automatically applies changes to the cluster.

---
