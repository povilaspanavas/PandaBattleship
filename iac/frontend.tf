resource "azurerm_static_web_app" "frontend" {
  name                = "swa-pandabattleship-${var.env_id}-${local.static_web_app_region_slug}"
  resource_group_name = azurerm_resource_group.main.name
  location            = var.static_web_app_location
  sku_tier            = "Free"
  sku_size            = "Free"
  tags                = local.common_tags
}
