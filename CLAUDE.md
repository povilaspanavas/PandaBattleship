# CLAUDE.md

## Orientation

`AGENTS.md` in the repo root is the detailed, maintained reference (repository map, per-file notes, Terraform/infra layout, common change locations). Read it when you need depth. This file covers the essentials and the things worth knowing before you touch code.

PandaBattleship is a **learning project** for exploring .NET 10, .NET Aspire, React 19/Vite, SignalR, and Azure deployment. Prefer clear, teachable code and small, well-tested changes over cleverness or premature abstraction.

## Commands

Run from repo root unless noted (PowerShell).

```powershell
# Full solution
dotnet build .\PandaBattleship.sln -v minimal
dotnet test .\PandaBattleship.sln -v minimal

# Run the whole app via Aspire (API + Vite FE, wires endpoint/URL discovery)
dotnet run --project .\PandaBattleship.AppHost

# Run the API standalone
dotnet run --project .\PandaBattleship.API --urls https://localhost:5001

# Single test project / single test
dotnet test .\PandaBattleship.API.Tests\PandaBattleship.API.Tests.csproj -v minimal
dotnet test .\PandaBattleship.API.Tests\PandaBattleship.API.Tests.csproj --filter FullyQualifiedName~PandaBattleship.API.Tests.GameServiceTests
```

Frontend, from `PandaBattleship.FE/`:

```powershell
npm ci            # or npm install
npm run dev       # Vite dev server on port 10109
npm run build     # tsc --noEmit then vite build
npm run lint      # eslint
npm run test      # vitest (single-run: npx vitest run)
```

Terraform lives in `iac/`; validate changes with `terraform fmt` and `terraform validate`.

### Before finishing a change, run the smallest meaningful verification

- API/domain changes: `dotnet test`
- Frontend changes: `npm run build` and/or `npm run test` in `PandaBattleship.FE`
- Terraform changes: `terraform fmt` + `terraform validate` in `iac`

## Architecture

Three runtime pieces, orchestrated locally by Aspire:

- **`PandaBattleship.AppHost/`** — Aspire orchestrator. `AppHost.cs` registers the API (`PandaBattleshipApi`) and the Vite FE (`PandaBattleshipFe`, port `10109`). `CustomExtensions.cs` adds Aspire dashboard quick-links using **C# extension member syntax** (not classic extension methods — follow the existing style; they don't chain the traditional way).
- **`PandaBattleship.API/`** — ASP.NET Core **minimal API** on `net10.0`. `Program.cs` is the single entry point; keep it minimal-API style (`app.MapGet`/`MapPost`/`MapGroup`), do not introduce MVC controllers without a strong reason. `Program` is `partial` at the bottom so `WebApplicationFactory<Program>` can drive it in tests. Domain model lives in `Domain/` (`Game`, `Board`, `Ship`, `ShipLayout`); game logic in `Services/GameService.cs`; realtime PvP in `Hubs/GameHub.cs`.
- **`PandaBattleship.FE/`** — React 19 + TypeScript + Vite + Tailwind CSS 4. Route-level screens live in `src/pages/` and are wired in `src/main.tsx` (React Router 7). Shared/reusable pieces live in `src/components/`; pure logic in `src/utils/`; realtime in `src/hooks/useGameHub.ts`.
- **`PandaBattleship.ServiceDefaults/`** — shared Aspire defaults (OpenTelemetry, service discovery, resilience, health). Applied via `AddServiceDefaults()` / `MapDefaultEndpoints()`.

### Two game modes

- **Single-player vs AI** (`/ai`): entirely client-side. `SinglePlayerGame.tsx`, `SinglePlayerBoard.tsx`, AI in `utils/aiPlayer.ts`, fleet building in `FleetBuilder.tsx` + `utils/fleetBuilder.ts`.
- **PvP** (`/pvp`, `/pvp/:gameId`): real. FE calls `POST /games` to create a game, then connects to the SignalR hub `/gamehub?gameId=...&playerId=...` via `useGameHub.ts`. Server pushes `GameStateUpdated` events; `GameHub` supports `GetPlayerView`, `Attack`. `GameService` is an **in-memory singleton** — games do not survive an API restart.

### Ship layouts are duplicated by design

Backend reads `PandaBattleship.API/Constants/ShipLayouts.json` (copied to output); frontend has its own copy at `PandaBattleship.FE/src/constants/shipLayouts.ts`. Change both (and `tests/shipLayouts.test.ts`) when editing layouts.

## Gotchas

- **PostgreSQL is currently commented out** in both `Program.cs` (`AddNpgsqlDataSource`, `/db-check`) and `AppHost.cs` (the `AddPostgres` block). All state is in-memory. `.junie/guidelines.md` describes an earlier DB-active setup and is stale on this point; trust the code and `AGENTS.md`.
- **CORS is pinned to `http://localhost:10109`** with `AllowCredentials()` (required for SignalR). Keep API CORS and the FE hub options aligned if you change ports.
- **Local FE→API traffic goes through Vite's proxy** (`vite.config.js` proxies `/games` and `/gamehub`, with websocket support for the hub) and falls back to `https://localhost:5001`.
- HTTPS redirection is **skipped when `DOTNET_RUNNING_IN_CONTAINER=true`**; OpenAPI (`/openapi/v1.json`) is mapped **only in Development**.
- Deploy is gated: `.github/workflows/build-api.yml` builds API PRs; `deploy-api.yml` pushes the image to ACR and deploys on push to `main`, behind the `dev` GitHub Environment (manual approval). Both share `reusable-build-api.yml`.

## Conventions

- Favor clear names, simple control flow, and comments that explain a concept or non-obvious decision.
- Use `rg` for search; prefer structured/patch-style edits over full-file overwrites; do not revert unrelated working-tree changes.
- Keep the tests fast and hermetic — don't add DB-dependent tests while Postgres is disabled.
- Keep `AGENTS.md` updated when you add/remove projects, change ports, or change main dev commands.
