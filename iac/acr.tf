resource "azurerm_container_registry" "acr" {
  name                = "acrpandabattleship${var.env_id}"
  resource_group_name = azurerm_resource_group.main.name
  location            = var.location
  sku                 = "Basic"
  public_network_access_enabled = true
  admin_enabled       = true
  tags                = local.common_tags
}