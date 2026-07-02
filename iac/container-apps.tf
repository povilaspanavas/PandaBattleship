resource "azurerm_container_app" "pandabattleship-app-api" {
  container_app_environment_id = azurerm_container_app_environment.app-env.id
  name                         = "ca-pandabattleship-api${var.env_id}"
  resource_group_name          = azurerm_resource_group.rg.name
  revision_mode                = "Single"

  depends_on = [
    azurerm_role_assignment.container_apps_acr_pull
  ]

  template {
    min_replicas = 0
    max_replicas = 1

    container {
      cpu    = 0.25
      image  = "${azurerm_container_registry.acr.login_server}/pandabattleship-api:latest"
      memory = "0.5Gi"
      name   = "api-${var.env_id}"
    }
  }

  identity {
    type         = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.container_apps_identity.id]
  }

  registry {
    server   = azurerm_container_registry.acr.login_server
    identity = azurerm_user_assigned_identity.container_apps_identity.id
  }

  ingress {
    external_enabled = true
    target_port      = 8080
    transport        = "auto"

    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }

  lifecycle {
    ignore_changes = [
      template[0].container[0].image,
    ]
  }

  tags = local.common_tags
}