resource "azurerm_log_analytics_workspace" "log_analytics_workspace" {
  name                = "loganalyticsworkspace${var.env_id}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = var.location
  retention_in_days   = 30
  sku                 = "PerGB2018"
  daily_quota_gb      = 0.15
  tags                = local.common_tags
}