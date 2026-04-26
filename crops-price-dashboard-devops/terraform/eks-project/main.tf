terraform {
  backend "s3" {
    bucket         = "crops-dashboard-tfstate-2026"
    key            = "dev/eks/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-lock-table-533267327324"
    encrypt        = true
  }
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "eks-cluster-vpc-final"
  cidr = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.10.0/24", "10.0.11.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true

  public_subnet_tags = {
    "kubernetes.io/role/elb" = 1
  }
  private_subnet_tags = {
    "kubernetes.io/role/internal-elb" = 1
  }
}

module "eks_cluster" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = "final-error-free-eks"
  cluster_version = "1.33"

  vpc_id                   = module.vpc.vpc_id
  subnet_ids               = module.vpc.private_subnets
  control_plane_subnet_ids = module.vpc.public_subnets
  
  cluster_endpoint_public_access = true

  eks_managed_node_groups = {
    default = {
      min_size     = 1
      max_size     = 3
      desired_size = 2

      capacity_type  = "SPOT"
      instance_types = ["t3.medium", "t3.small"]
    }
  }
}

resource "aws_eks_access_entry" "admin_user" {
  cluster_name  = module.eks_cluster.cluster_name
  principal_arn = "arn:aws:iam::969914074526:user/falsheik"
  type          = "STANDARD"
}

# This gives your user 'falsheik' Cluster Admin rights inside K8s
resource "aws_eks_access_policy_association" "admin" {
  cluster_name  = module.eks_cluster.cluster_name
  policy_arn    = "arn:aws:eks::aws:cluster-access-policy/AmazonEKSClusterAdminPolicy"
  principal_arn = "arn:aws:iam::969914074526:user/falsheik"

  access_scope {
    type = "cluster"
  }
}

output "cluster_name" {
  value = module.eks_cluster.cluster_name
}