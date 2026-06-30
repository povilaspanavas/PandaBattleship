locals {
  region_slug                = replace(lower(var.location), " ", "")
  static_web_app_region_slug = replace(lower(var.static_web_app_location), " ", "")

  common_tags = {
    environment = var.env_id
    source      = var.src_key
    project     = "pandabattleship"
  }
}

resource "azurerm_resource_group" "main" {
  name     = "rg-pandabattleship-${var.env_id}-${local.region_slug}"
  location = var.location
  tags     = local.common_tags
}

resource "azurerm_static_web_app" "frontend" {
  name                = "swa-pandabattleship-${var.env_id}-${local.static_web_app_region_slug}"
  resource_group_name = azurerm_resource_group.main.name
  location            = var.static_web_app_location
  sku_tier            = "Free"
  sku_size            = "Free"
  tags                = local.common_tags
}
