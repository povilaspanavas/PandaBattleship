output "static_web_app_default_host_name" {
  description = "The default host name of the Static Web App"
  value       = azurerm_static_web_app.frontend.default_host_name
}

output "static_web_app_url" {
  description = "The default HTTPS URL of the Static Web App"
  value       = "https://${azurerm_static_web_app.frontend.default_host_name}"
}

output "container_app_api_url" {
  value = "https://${azurerm_container_app.pandabattleship_app_api.ingress[0].fqdn}"
}

output "container_app_fe_url" {
  value = "https://${azurerm_container_app.pandabattleship_app_fe.ingress[0].fqdn}"
}