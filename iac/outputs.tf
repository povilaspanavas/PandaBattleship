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

output "github_actions_deploy_client_id" {
  description = "Client ID for the GitHub Actions OIDC deploy identity (set as the AZURE_CLIENT_ID_DEV repo secret)"
  value       = azurerm_user_assigned_identity.github_actions_deploy.client_id
}

output "azure_tenant_id" {
  description = "Azure AD tenant ID (set as the AZURE_TENANT_ID_DEV repo secret)"
  value       = data.azurerm_client_config.current.tenant_id
}