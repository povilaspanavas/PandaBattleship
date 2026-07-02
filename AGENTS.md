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
| Infrastructure as code | `iac/` | Terraform for Azure resource group, Static Web App, Container Registry, outputs, and AzureRM backend setup. |
| CI | `.github/workflows/build-api.yml` | Pull request workflow for API restore/build when `PandaBattleship.API/**` changes. |
| Rules/reference | `README.md`, `LITHUANIAN_RULES.md` | Project intent and game rules. |

## Current Stack

- Backend: .NET 10, ASP.NET Core minimal APIs, SignalR, xUnit, `WebApplicationFactory`, OpenAPI.
- Frontend: React 19.2, TypeScript, React Router 7, Vite 7, Tailwind CSS 4, SignalR client, Vitest.
- Local orchestration: .NET Aspire AppHost.
- Containers: `PandaBattleship.API/Dockerfile` and `PandaBattleship.FE/Dockerfile`.
- Infrastructure: Terraform with AzureRM provider, Azure Static Web App, Azure Container Registry, Azure Resource Group.

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
| `iac/main.tf` | Locals, common tags, and Azure resource group. |
| `iac/frontend.tf` | Azure Static Web App on Free tier. |
| `iac/acr.tf` | Azure Container Registry on Basic SKU. |
| `iac/outputs.tf` | Static Web App hostname and URL outputs. |
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

Before finishing changes, run the smallest meaningful verification:

- API/domain changes: `dotnet test`
- Frontend changes: `npm run build` and/or `npm run test` in `PandaBattleship.FE`
- Terraform changes: `terraform fmt` and `terraform validate` in `iac`

## Common Change Locations

- Add or change API endpoints: `PandaBattleship.API/Program.cs`.
- Change PvP realtime behavior: `PandaBattleship.API/Hubs/GameHub.cs`, `PandaBattleship.FE/src/hooks/useGameHub.ts`, and `PandaBattleship.FE/src/components/GamePage.tsx`.
- Change game rules: `PandaBattleship.API/Domain/`, `PandaBattleship.API/Services/GameService.cs`, and matching tests.
- Change ship layouts:
  - Backend: `PandaBattleship.API/Constants/ShipLayouts.json`
  - Frontend: `PandaBattleship.FE/src/constants/shipLayouts.ts`
  - Tests: `PandaBattleship.FE/tests/shipLayouts.test.ts`
- Change local Aspire wiring: `PandaBattleship.AppHost/AppHost.cs` and `CustomExtensions.cs`.
- Change service defaults, health, telemetry, or resilience: `PandaBattleship.ServiceDefaults/Extensions.cs`.
- Change Azure infrastructure: files under `iac/`.
- Change container builds: API/frontend Dockerfiles and frontend nginx template.
- Change CI: `.github/workflows/build-api.yml`.

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
