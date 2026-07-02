resource "azurerm_user_assigned_identity" "container_apps_identity" {
  name                = "id-pandabattleship-${var.env_id}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = var.location
  tags                = local.common_tags
}

resource "azurerm_role_assignment" "container_apps_acr_pull" {
  scope                = azurerm_container_registry.acr.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_user_assigned_identity.container_apps_identity.principal_id
}