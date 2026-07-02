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
