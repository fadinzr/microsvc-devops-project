
terraform {
  backend "s3" {
    bucket         = "crops-dashboard-tfstate-2026"
    key            = "dev/ecr/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-lock-table-533267327324"
    encrypt        = true
  }
}

provider "aws" {
  region = "us-east-1" 
}

# Define the list of services
variable "services" {
  type    = list(string)
  default = [
    "api-gateway-java",
    "data-service-go",
    "frontend-react",
    "trend-service-python",
    "writer-service-node"
  ]
}

# Create a repository for each service
resource "aws_ecr_repository" "app_repos" {
  for_each             = toset(var.services)
  name                 = each.key
  image_tag_mutability = "IMMUTABLE"
  force_delete         = true

  image_scanning_configuration {
    scan_on_push = true
  }
}

# Apply a cleanup policy to all repositories
resource "aws_ecr_lifecycle_policy" "cleanup_policy" {
  for_each   = aws_ecr_repository.app_repos
  repository = each.value.name

  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Keep only the last 10 images to save costs"
      selection = {
        tagStatus     = "any"
        countType     = "imageCountMoreThan"
        countNumber   = 10
      }
      action = {
        type = "expire"
      }
    }]
  })
}

# Output the URLs for your push scripts
output "ecr_repository_urls" {
  value = { for k, v in aws_ecr_repository.app_repos : k => v.repository_url }
}
