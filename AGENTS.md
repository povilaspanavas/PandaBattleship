# PandaBattleship Agent Guide

This file is the short-term memory for AI agents working in this repo. Use it first to orient yourself before rereading the whole project.

## Project Purpose

PandaBattleship is a learning project for building a Battleship game while exploring .NET 10, .NET Aspire, React/Vite, SignalR, Docker, Terraform, and Azure deployment pieces. The goal is not to over-engineer the game; prefer clear, teachable code and small, well-tested changes.

## Repository Map

| Area | Path | Notes |
| --- | --- | --- |
| Solution | `PandaBattleship.sln` | Includes API, frontend esproj, Aspire AppHost, ServiceDefaults, API unit tests, and API integration tests. |
| Aspire orchestrator | `PandaBattleship.AppHost/` | Runs API and Vite frontend through .NET Aspire. PostgreSQL config is present but currently commented out. |
| API | `PandaBattleship.API/` | ASP.NET Core minimal API on `net10.0`; contains game domain, services, SignalR hub, Dockerfile, and OpenAPI setup. |
| Shared service defaults | `PandaBattleship.ServiceDefaults/` | Aspire-style OpenTelemetry, service discovery, resilience, and health defaults. |
| Frontend | `PandaBattleship.FE/` | React 19 + TypeScript + Vite + Tailwind CSS frontend, plus Docker/nginx files and Vitest tests. |
| API unit tests | `PandaBattleship.API.Tests/` | xUnit tests for domain/service behavior, endpoints, and OpenAPI. |
| API integration tests | `PandaBattleship.API.IntegrationTests/` | xUnit startup/integration checks using `WebApplicationFactory<Program>`. |
| Infrastructure as code | `iac/` | Terraform for Azure resource group, Static Web App, Container Registry, Container Apps (API + FE) with managed identity and Log Analytics, outputs, and AzureRM backend setup. |
| CI | `.github/workflows/build-api.yml` | Pull request workflow for API restore/build when `PandaBattleship.API/**` changes. Calls the shared `reusable-build-api.yml` workflow. |
| CD | `.github/workflows/deploy-api.yml` | Push-to-`main` workflow that builds/pushes the API image to ACR and deploys it to the Container App. Not triggered on pull requests. `build-and-push` job `needs` the shared `reusable-build-api.yml` workflow. Deploy job is gated behind the `dev` GitHub Environment (manual approval, configured in repo settings). |
| CI/CD shared base | `.github/workflows/reusable-build-api.yml` | `workflow_call` reusable workflow with the API restore/build steps, called by both `build-api.yml` and `deploy-api.yml` so the build logic lives in one place. |
| Rules/reference | `README.md`, `LITHUANIAN_RULES.md` | Project intent and game rules. |

## Current Stack

- Backend: .NET 10, ASP.NET Core minimal APIs, SignalR, xUnit, `WebApplicationFactory`, OpenAPI.
- Frontend: React 19.2, TypeScript, React Router 7, Vite 7, Tailwind CSS 4, SignalR client, Vitest.
- Local orchestration: .NET Aspire AppHost.
- Containers: `PandaBattleship.API/Dockerfile` and `PandaBattleship.FE/Dockerfile`.
- Infrastructure: Terraform with AzureRM provider, Azure Static Web App, Azure Container Registry, Azure Container Apps (API + FE) with managed identity and Log Analytics, Azure Resource Group.

## Key Runtime Files

### Aspire AppHost

- `PandaBattleship.AppHost/AppHost.cs`
  - Adds API project as `PandaBattleshipApi`.
  - API uses HTTPS endpoint on port `5001`.
  - Adds HTTP health check path `health`.
  - Adds Vite frontend as `PandaBattleshipFe`.
  - Frontend uses port `10109` through `PORT`.
  - API and database wiring exists as comments; PostgreSQL is not currently active in AppHost.

- `PandaBattleship.AppHost/CustomExtensions.cs`
  - Uses C# extension member syntax.
  - `ConfigureApiCustomUrls()` adds Aspire dashboard links for API home and health.
  - `ConfigureFeCustomUrls()` adds Aspire dashboard links for frontend home, `/ai`, and `/pvp`.

### API

- `PandaBattleship.API/Program.cs`
  - Registers `AddServiceDefaults()`, OpenAPI, CORS, SignalR, and singleton `GameService`.
  - CORS policy `AllowReactDev` allows `http://localhost:10109` with credentials for SignalR.
  - Maps `/health` with `UIResponseWriter.WriteHealthCheckUIResponse`.
  - Maps OpenAPI only in Development.
  - Skips HTTPS redirection when `DOTNET_RUNNING_IN_CONTAINER=true`.
  - Maps:
    - `POST /games`
    - `POST /games/{gameId}/attacks`
    - SignalR hub `/gamehub`
  - PostgreSQL datasource and `/db-check` endpoint are currently commented out.

- `PandaBattleship.API/Services/GameService.cs`
  - In-memory game/session store.
  - Creates 8-character game IDs.
  - Supports two-player PvP sessions, reconnects, and randomized ship layouts.
  - Loads layouts from `PandaBattleship.API/Constants/ShipLayouts.json`, copied to output.

- `PandaBattleship.API/Hubs/GameHub.cs`
  - SignalR hub for PvP.
  - Requires `gameId` and `playerId` query parameters.
  - Sends `GameStateUpdated` events.
  - Supports `GetPlayerView`, `Attack`, and a simple debug chat method.

- `PandaBattleship.API/Domain/`
  - Core game model: `Game`, `Board`, `Ship`, `ShipLayout`.

### Frontend

- `PandaBattleship.FE/src/main.tsx`
  - Routes:
    - `/` and `/ai` -> `AppOriginal`
    - `/pvp` -> `PvpLobbyPage`
    - `/pvp/:gameId` -> `GameBoard`

- `PandaBattleship.FE/src/components/PvpLobbyPage.tsx`
  - Creates games through `POST /games`.
  - Accepts raw game codes or `/pvp/{gameId}` invite URLs.

- `PandaBattleship.FE/src/components/GamePage.tsx`
  - PvP game board screen.
  - Uses `useGameHub`, invite link copy, turn status, win confetti, and loss animation.

- `PandaBattleship.FE/src/hooks/useGameHub.ts`
  - Builds SignalR connection to `/gamehub?gameId=...&playerId=...`.
  - Handles automatic reconnect and `GameStateUpdated`.

- `PandaBattleship.FE/src/components/GameOriginal.tsx`
  - Original local/single-player style game component.
  - "Build Fleet" button opens `FleetBuilder`; `startNewGame` accepts an optional custom player layout.

- `PandaBattleship.FE/src/components/FleetBuilder.tsx`
  - Fleet builder for the AI game: drag ships with pointer events, rotate, and cycle shapes.
  - Pure logic (shape catalogue, rotation, no-touching validation) lives in `PandaBattleship.FE/src/utils/fleetBuilder.ts`.

- `PandaBattleship.FE/src/constants/shipLayouts.ts`
  - Frontend copy of ship layouts for local/AI behavior.

- `PandaBattleship.FE/vite.config.js`
  - Resolves Aspire service discovery env vars for `PandaBattleshipApi`.
  - Falls back to `https://localhost:5001`.
  - Proxies `/games` and `/gamehub` to API; websocket proxy enabled for `/gamehub`.

## Terraform / Infrastructure

Terraform lives in `iac/`.

| File | Purpose |
| --- | --- |
| `iac/setup.tf` | AzureRM provider `4.70.0`, remote AzureRM backend, subscription binding. |
| `iac/vars.tf` | Variables: `env_id`, `location`, `static_web_app_location`, sensitive `subscription_id`, `src_key`. |
| `iac/resource-group.tf` | Locals (common tags, region slugs) and Azure resource group. |
| `iac/frontend.tf` | Azure Static Web App on Free tier. |
| `iac/acr.tf` | Azure Container Registry on Basic SKU. |
| `iac/container-app-identity.tf` | User-assigned managed identity for Container Apps, with `AcrPull` role on the ACR. |
| `iac/github-actions-deploy.tf` | User-assigned identity + federated (OIDC) credential for the `deploy-api.yml` GitHub Actions workflow. Credential subject is scoped to the `dev` GitHub Environment. Grants `AcrPush` on the ACR and `Container Apps Contributor` on the API container app. |
| `iac/container-apps-environment.tf` | Container Apps environment, wired to the Log Analytics workspace. |
| `iac/container-apps.tf` | Container Apps for API (`ca-pandabattleship-api-*`) and frontend (`ca-pandabattleship-fe-*`); frontend gets `API_UPSTREAM` pointed at the API's ingress FQDN. Both ignore image-tag drift via `lifecycle.ignore_changes` (images are pushed out-of-band). |
| `iac/log-analytics-workspace.tf` | Log Analytics workspace used by the Container Apps environment. |
| `iac/outputs.tf` | Static Web App hostname/URL and Container App API/FE URL outputs. |
| `iac/terraform.tfvars` | Local variable values. Treat as sensitive if subscription IDs or secrets are present. |

Current backend state settings in `iac/setup.tf`:

- Resource group: `rg-pandabattleship-tfstate-uksouth`
- Storage account: `stpandabattlterra`
- Container: `terraform`
- Key: `pandabattleship.dev.tfstate`

## Docker / Deployment Files

- `PandaBattleship.API/Dockerfile`
  - Multi-stage .NET 10 API image.
  - Restores/builds/publishes `PandaBattleship.API`.
  - Exposes `8080` and `8081`.

- `PandaBattleship.FE/Dockerfile`
  - Builds frontend with `node:24-alpine`.
  - Serves with `nginx:1.29-alpine`.
  - Uses `PandaBattleship.FE/nginx.conf.template`.
  - Default `API_UPSTREAM=http://host.docker.internal:5000`.

- `.dockerignore`
  - Root ignore file linked into API project content.

- `PandaBattleship.FE/netlify.toml`
  - SPA fallback redirect to `/index.html`.

## Commands

Run from repo root unless noted.

```powershell
dotnet restore
dotnet build
dotnet test
dotnet run --project PandaBattleship.AppHost
dotnet run --project PandaBattleship.API --urls https://localhost:5001
```

Frontend commands from `PandaBattleship.FE/`:

```powershell
npm install
npm run dev
npm run build
npm run lint
npm run test
```

Terraform commands from `iac/`:

```powershell
terraform init
terraform plan
terraform apply
```

## Tests

- `PandaBattleship.API.Tests/`
  - `BoardTests.cs`
  - `GameServiceTests.cs`
  - `GameEndpointTests.cs`
  - `GameTurnTests.cs`
  - `OpenApiEndpointTests.cs`

- `PandaBattleship.API.IntegrationTests/`
  - `ApiStartupTests.cs`

- `PandaBattleship.FE/tests/shipLayouts.test.ts`
  - Vitest tests for ship layouts, AI shot behavior, and rendered hit cells.

- `PandaBattleship.FE/tests/fleetBuilder.test.ts`
  - Vitest tests for fleet builder shapes, rotation, and placement validation.

Before finishing changes, run the smallest meaningful verification:

- API/domain changes: `dotnet test`
- Frontend changes: `npm run build` and/or `npm run test` in `PandaBattleship.FE`
- Terraform changes: `terraform fmt` and `terraform validate` in `iac`

## Common Change Locations

- Add or change API endpoints: `PandaBattleship.API/Program.cs`.
- Change PvP realtime behavior: `PandaBattleship.API/Hubs/GameHub.cs`, `PandaBattleship.FE/src/hooks/useGameHub.ts`, and `PandaBattleship.FE/src/components/GamePage.tsx`.
- Change game rules: `PandaBattleship.API/Domain/`, `PandaBattleship.API/Services/GameService.cs`, and matching tests.
- Change fleet building (AI game): `PandaBattleship.FE/src/components/FleetBuilder.tsx`, `PandaBattleship.FE/src/utils/fleetBuilder.ts`, and `PandaBattleship.FE/tests/fleetBuilder.test.ts`.
- Change ship layouts:
  - Backend: `PandaBattleship.API/Constants/ShipLayouts.json`
  - Frontend: `PandaBattleship.FE/src/constants/shipLayouts.ts`
  - Tests: `PandaBattleship.FE/tests/shipLayouts.test.ts`
- Change local Aspire wiring: `PandaBattleship.AppHost/AppHost.cs` and `CustomExtensions.cs`.
- Change service defaults, health, telemetry, or resilience: `PandaBattleship.ServiceDefaults/Extensions.cs`.
- Change Azure infrastructure: files under `iac/`.
- Change container builds: API/frontend Dockerfiles and frontend nginx template.
- Change CI: `.github/workflows/build-api.yml`.
- Change CD/deploy: `.github/workflows/deploy-api.yml` and `iac/github-actions-deploy.tf`.

## Conventions And Gotchas

- This is a learning project. Favor clear names, simple control flow, and comments where they explain a concept or non-obvious decision.
- Keep API style minimal; do not introduce controllers unless there is a strong reason.
- `Program` is partial for testability.
- `GameService` is currently in-memory. Do not assume games survive API restarts.
- PostgreSQL/Aspire database code is present but commented out in current runtime files.
- The API CORS origin is currently tied to `http://localhost:10109`.
- The frontend relies on Vite proxying `/games` and `/gamehub` during local development.
- SignalR uses credentials; keep API CORS and frontend hub options aligned.
- C# extension member syntax is used in AppHost custom extensions. Follow the existing style in `CustomExtensions.cs`.
- Update this file when adding/removing projects, changing ports, introducing new infrastructure, or changing main dev commands.

## Agent Editing Preference

- Use `rg`/`rg --files` first for search.
- Use `apply_patch` for manual edits so changes appear as structured diffs.
- Avoid full-file overwrite commands such as `Set-Content` unless explicitly requested.
- Do not revert unrelated user changes in the working tree.
