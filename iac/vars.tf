
variable "env_id" {
  type        = string
  description = "The environment id"
  default     = "dev"
}

variable "location" {
  type        = string
  description = "The default Azure region for application resources"
  default     = "UK South"
}

variable "static_web_app_location" {
  type        = string
  description = "The Azure region for the Static Web App resource"
  default     = "East US 2"
}

variable "subscription_id" {
  type        = string
  description = "The Azure subscription id"
  sensitive   = true
}

variable "src_key" {
  type        = string
  description = "The infrastructure source"
  default     = "terraform"
}