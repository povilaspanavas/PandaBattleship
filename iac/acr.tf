resource "azurerm_container_registry" "acr" {
  name                          = "acrpandabattleship${var.env_id}"
  resource_group_name           = azurerm_resource_group.rg.name
  location                      = var.location
  sku                           = "Standard"
  public_network_access_enabled = true
  admin_enabled                 = false
  tags                          = local.common_tags
}