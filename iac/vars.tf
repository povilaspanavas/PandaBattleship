
variable "env_id" {
  type = string
  description = "The environment id"
  default = "dev"
}

variable "subscription_id" {
  type = string
  description = "The Azure subscription id"
  sensitive = true
}

variable "src_key" {
  type = string
  description = "The infrastructure source"
  default = "terraform"
}