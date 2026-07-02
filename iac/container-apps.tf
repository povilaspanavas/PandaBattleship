// backend - .NET API
resource "azurerm_container_app" "pandabattleship_app_api" {
  container_app_environment_id = azurerm_container_app_environment.app-env.id
  name                         = "ca-pandabattleship-api-${var.env_id}"
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

// frontend - React
resource "azurerm_container_app" "pandabattleship_app_fe" {
  name                         = "ca-pandabattleship-fe-${var.env_id}"
  container_app_environment_id = azurerm_container_app_environment.app-env.id
  resource_group_name          = azurerm_resource_group.rg.name
  revision_mode                = "Single"
  tags                         = local.common_tags

  depends_on = [
    azurerm_role_assignment.container_apps_acr_pull,
    azurerm_container_app.pandabattleship_app_api
  ]

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
    target_port      = 80
    transport        = "auto"

    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }

  template {
    min_replicas = 0
    max_replicas = 1

    container {
      name   = "fe-${var.env_id}"
      image  = "${azurerm_container_registry.acr.login_server}/pandabattleship-fe:latest"
      cpu    = 0.25
      memory = "0.5Gi"

      env {
        name  = "API_UPSTREAM"
        value = "https://${azurerm_container_app.pandabattleship_app_api.ingress[0].fqdn}"
      }
    }
  }

  lifecycle {
    ignore_changes = [
      template[0].container[0].image,
    ]
  }
}