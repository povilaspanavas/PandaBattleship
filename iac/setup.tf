terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.70.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "rg-pandabattleship-tfstate-uksouth"
    storage_account_name = "stpandabattlterra"
    container_name       = "terraform"
    key                  = "pandabattleship.dev.tfstate"
  }
}

provider "azurerm" {
  features {

  }
  subscription_id = var.subscription_id
}