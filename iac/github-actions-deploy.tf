// Lets the "Deploy API" GitHub Actions workflow authenticate to Azure via OIDC
// (no stored client secret) and push images / update the API container app.
// Two federated credentials on the same identity, matching GitHub's two OIDC
// subject shapes:
//  - "build-and-push" runs with no environment set, so it needs the plain
//    branch-push subject and is never gated behind approval.
//  - "deploy" declares `environment: dev`, so its token subject changes to
//    the environment form; only that job is gated behind dev's required
//    reviewers.

data "azurerm_client_config" "current" {}

locals {
  github_repo = "povilaspanavas/PandaBattleship"
}

resource "azurerm_user_assigned_identity" "github_actions_deploy" {
  name                = "id-pandabattleship-gha-deploy-${var.env_id}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = var.location
  tags                = local.common_tags
}

// will push to docker
resource "azurerm_federated_identity_credential" "github_actions_build_and_push" {
  name                      = "gha-build-push-api-${var.env_id}"
  user_assigned_identity_id = azurerm_user_assigned_identity.github_actions_deploy.id
  audience                  = ["api://AzureADTokenExchange"]
  issuer                    = "https://token.actions.githubusercontent.com"
  subject                   = "repo:${local.github_repo}:ref:refs/heads/main"
}

resource "azurerm_federated_identity_credential" "github_actions_deploy" {
  name                      = "gha-deploy-api-${var.env_id}"
  user_assigned_identity_id = azurerm_user_assigned_identity.github_actions_deploy.id
  audience                  = ["api://AzureADTokenExchange"]
  issuer                    = "https://token.actions.githubusercontent.com"
  subject                   = "repo:${local.github_repo}:environment:dev"
}

resource "azurerm_role_assignment" "github_actions_acr_push" {
  scope                = azurerm_container_registry.acr.id
  role_definition_name = "AcrPush"
  principal_id         = azurerm_user_assigned_identity.github_actions_deploy.principal_id
}

resource "azurerm_role_assignment" "github_actions_container_app_deploy" {
  scope                = azurerm_container_app.pandabattleship_app_api.id
  role_definition_name = "Container Apps Contributor"
  principal_id         = azurerm_user_assigned_identity.github_actions_deploy.principal_id
}

resource "azurerm_role_assignment" "github_actions_container_app_fe_deploy" {
  scope                = azurerm_container_app.pandabattleship_app_fe.id
  role_definition_name = "Container Apps Contributor"
  principal_id         = azurerm_user_assigned_identity.github_actions_deploy.principal_id
}