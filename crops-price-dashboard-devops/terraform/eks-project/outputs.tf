output "vpc_id" {
  description = "The ID of the VPC (network)"
  value       = module.vpc.vpc_id
}

output "node_group_names" {
  description = "Names of the Managed Node Groups (worker nodes)"

  value       = keys(module.eks_cluster.eks_managed_node_groups) 
}

output "connect_command" {
  description = "Run this command in your terminal to connect kubectl to your new EKS cluster"


  value       = "aws eks update-kubeconfig --name ${module.eks_cluster.cluster_name} --region ${data.aws_region.current.name}"
}


data "aws_region" "current" {}
