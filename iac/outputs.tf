output "static_web_app_default_host_name" {
  description = "The default host name of the Static Web App"
  value       = azurerm_static_web_app.frontend.default_host_name
}

output "static_web_app_url" {
  description = "The default HTTPS URL of the Static Web App"
  value       = "https://${azurerm_static_web_app.frontend.default_host_name}"
}
