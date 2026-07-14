### PandaBattleship — Project‑specific developer guidelines

This document captures only the project‑specific details needed to work efficiently on this repo (Aspire app host + .NET API + React/Vite FE).

---

#### Build and configuration

- Toolchain
  - .NET SDK: net10.0 is targeted across projects.
  - Node.js for FE: use an active LTS (Node 20+ recommended). Install dependencies with `npm ci`.

- Solution build
  - Build everything:
    - `dotnet build .\PandaBattleship.sln -v minimal`

- Running the distributed app (recommended): Aspire AppHost
  - The AppHost runs the API and the FE together, wiring endpoints/URL discovery.
  - Start the whole app:
    - `dotnet run --project .\PandaBattleship.AppHost`
  - No secrets/parameters are required to run. A PostgreSQL resource (Parameters `DbUserName`/`DbPassword`, port `58123`, database `pandaDb`) is present but **commented out** in `PandaBattleship.AppHost\AppHost.cs`. If you re-enable it, add the user‑secrets first:
    - `dotnet user-secrets init --project .\PandaBattleship.AppHost`
    - `dotnet user-secrets set "Parameters:DbUserName" "postgres" --project .\PandaBattleship.AppHost`
    - `dotnet user-secrets set "Parameters:DbPassword" "postgres" --project .\PandaBattleship.AppHost`

- Running the API standalone (without AppHost)
  - `dotnet run --project .\PandaBattleship.API --urls https://localhost:5001`
  - No database is required; the API keeps game state in memory (`GameService` singleton). The `builder.AddNpgsqlDataSource("db")` call is currently commented out in `Program.cs`.
  - HTTPS is enabled; Kestrel dev certs may be needed (`dotnet dev-certs https --trust`).

- Running the FE standalone
  - From `PandaBattleship.FE`:
    - `npm ci`
    - `npm run dev`  # Vite dev server on port 10109
  - PvP mode calls the API (`POST /games`) and the SignalR hub `/gamehub`. During local dev, Vite proxies `/games` and `/gamehub` to `https://localhost:5001` (see `vite.config.js`), so run the API (or AppHost) alongside the FE for PvP. Single‑player vs AI (`/ai`) is fully client‑side and needs no backend.

---

#### Runtime endpoints relevant to development

- API (see `PandaBattleship.API\Program.cs`):
  - `/openapi/v1.json` — OpenAPI document (exposed only in Development)
  - `/health` — Health check UI payload (uses `HealthChecks.UI.Client`)
  - `POST /games` — create a new PvP game
  - `POST /games/{gameId}/attacks` — make an attack
  - `/gamehub` — SignalR hub for realtime PvP (requires `gameId` and `playerId` query params)

Notes:
- A `/db-check` probe exists but is commented out in `Program.cs` alongside the Npgsql data source.

---

#### Testing

- Test stack
  - `xUnit` with `Microsoft.AspNetCore.Mvc.Testing` for lightweight integration tests.
  - Tests target `net10.0` and reference the API project. See `PandaBattleship.API.Tests.csproj`.

- Running tests
  - Full solution:
    - `dotnet test .\PandaBattleship.sln -v minimal`
  - Single project:
    - `dotnet test .\PandaBattleship.API.Tests\PandaBattleship.API.Tests.csproj -v minimal`
  - Example single test (by fully qualified name):
    - `dotnet test .\PandaBattleship.API.Tests\PandaBattleship.API.Tests.csproj --filter FullyQualifiedName~PandaBattleship.API.Tests.OpenApiEndpointTests.GetOpenApiDocument_ReturnsSuccess`

- What currently passes (smoke)
  - `PandaBattleship.API.Tests\OpenApiEndpointTests.cs` issues an HTTP GET to `/openapi/v1.json` using `WebApplicationFactory<Program>` and asserts HTTP 200 and JSON content type. This runs green without a database. Other suites (`BoardTests`, `GameServiceTests`, `GameEndpointTests`, `GameTurnTests`, `ShipLayoutFileTests`, and integration `ApiStartupTests`) are also in-memory and DB-free.

- Adding a new integration test
  - Pattern to follow (minimal):
    ```csharp
    using Microsoft.AspNetCore.Mvc.Testing;
    using System.Net;
    using Xunit;

    namespace PandaBattleship.API.Tests;

    public class OpenApiSmokeTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;
        public OpenApiSmokeTests(WebApplicationFactory<Program> factory) => _factory = factory;

        [Fact]
        public async Task GetOpenApi_Returns200()
        {
            var client = _factory.CreateClient();
            var resp = await client.GetAsync("/openapi/v1.json");
            resp.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, resp.StatusCode);
        }
    }
    ```
  - Place tests in `PandaBattleship.API.Tests` and keep them independent of the Postgres service unless your test suite explicitly starts AppHost/DB.
  - If you need DB‑backed tests, prefer spinning the AppHost and then running tests in a separate process/shell (documented below), or use Testcontainers for .NET (not currently referenced in this repo).

- Running tests against a live distributed environment (optional)
  - Start AppHost in one terminal: `dotnet run --project .\PandaBattleship.AppHost`
  - In another terminal, run tests. Favor endpoints that do not mutate state, or isolate per‑test data.

- Coverage
  - `coverlet.collector` is already referenced. To collect coverage in trx:
    - `dotnet test -v minimal /p:CollectCoverage=true /p:CoverletOutputFormat=cobertura`

---

#### Code style and project conventions

- API
  - Minimal API style, top‑level `Program.cs`, partial `Program` type declared at bottom for `WebApplicationFactory`.
  - Health checks are standardized via `AddServiceDefaults()` and `MapDefaultEndpoints()` (see `PandaBattleship.ServiceDefaults`). Prefer adding new endpoints via `app.MapGet(...)`/`MapGroup(...)` and keep environment‑specific features gated by `app.Environment.IsDevelopment()`.
  - Game state lives in the in‑memory `GameService` singleton — games do not survive an API restart. Database access (`NpgsqlDataSource` DI via `builder.AddNpgsqlDataSource("db")`) is present but commented out; if you re‑enable it, inject `NpgsqlDataSource` rather than creating raw `NpgsqlConnection` manually.

- AppHost (Aspire)
  - The Postgres resource (persistent lifetime, port `58123`, database `pandaDb`, Parameters `DbUserName`/`DbPassword`) is currently commented out. If you re‑enable it, provide the parameters via user‑secrets under the `Parameters:` prefix and avoid hardcoding credentials.

- FE
  - React 19 + Vite + Tailwind CSS 4 + TypeScript. Scripts: `dev`, `build`, `lint`, `preview`, `test`.
  - Route‑level screens live in `src/pages/` (wired in `src/main.tsx` via React Router 7); shared components in `src/components/`, pure logic in `src/utils/`, realtime in `src/hooks/useGameHub.ts`.
  - PvP mode calls the API and the SignalR hub. During local dev the API base URL is handled by Vite's proxy (`/games`, `/gamehub`) rather than a Vite env var.

- Testing guidance
  - Keep fast, hermetic tests as default. Avoid hitting Postgres in unit/integration tests unless necessary. Prefer using `/openapi/v1.json` or pure in‑memory tests for smoke checks.
  - If you add DB‑dependent tests, gate them with a trait/category and run them only when AppHost/DB is available.

---

#### Verified commands (as of last edit)

- `dotnet build .\PandaBattleship.sln -v minimal` — builds solution
- `dotnet test .\PandaBattleship.sln -v minimal` — runs the test suite (includes OpenAPI smoke test)
- `dotnet run --project .\PandaBattleship.AppHost` — starts Aspire (no secrets required; Postgres is disabled)
- `npm ci && npm run dev` from `PandaBattleship.FE` — starts FE dev server