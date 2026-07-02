resource "azurerm_container_app_environment" "app-env" {
  name                = "containerappsenv${var.env_id}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = var.location
  tags                = local.common_tags
  log_analytics_workspace_id = azurerm_log_analytics_workspace.log_analytics_workspace.id
}