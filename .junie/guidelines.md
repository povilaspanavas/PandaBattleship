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
  - The AppHost runs Postgres (container), the API, and the FE together, wiring endpoints/URL discovery.
  - Secrets/parameters required by AppHost (see `PandaBattleship.AppHost\AppHost.cs`):
    - Parameters: `DbUserName`, `DbPassword` (marked as `secret: true`).
  - First‑time setup (user‑secrets stored on your machine):
    - `dotnet user-secrets init --project .\PandaBattleship.AppHost`
    - `dotnet user-secrets set "Parameters:DbUserName" "postgres" --project .\PandaBattleship.AppHost`
    - `dotnet user-secrets set "Parameters:DbPassword" "postgres" --project .\PandaBattleship.AppHost`
  - Start the whole app:
    - `dotnet run --project .\PandaBattleship.AppHost`
  - Postgres details (from `AppHost.cs`):
    - Host: `localhost`
    - Port: `58123`
    - Database: `pandaDb`
    - These are published externally by the Aspire containerized Postgres resource.

- Running the API standalone (without AppHost)
  - The API (`PandaBattleship.API`) uses `builder.AddNpgsqlDataSource("db")` which reads `ConnectionStrings:db`.
  - Provide a connection string via env var when launching locally:
    - PowerShell example:
      - `$env:ConnectionStrings__db = "Host=localhost;Port=58123;Database=pandaDb;Username=postgres;Password=postgres"`
      - `dotnet run --project .\PandaBattleship.API`
  - HTTPS is enabled; Kestrel dev certs may be needed (`dotnet dev-certs https --trust`).

- Running the FE standalone
  - From `PandaBattleship.FE`:
    - `npm ci`
    - `npm run dev`
  - Current FE does not call the backend yet; no API base URL configuration is required at this time. AppHost can also start the FE as an NPM app with external HTTP endpoints published.

---

#### Runtime endpoints relevant to development

- API (see `PandaBattleship.API\Program.cs`):
  - `/openapi/v1.json` — OpenAPI document (exposed only in Development)
  - `/health` — Health check UI payload (uses `HealthChecks.UI.Client`)
  - `/db-check` — Simple DB connectivity probe that creates a table/row and returns `{ message, rowCount }` (requires the Postgres instance to be running and reachable)

Notes:
- When running tests or the API without the Aspire Postgres container, avoid calling `/db-check` as it will fail without a DB.

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
    - `dotnet test .\PandaBattleship.API.Tests\PandaBattleship.API.Tests.csproj --filter FullyQualifiedName~PandaBattleship.API.Tests.TestEndpointTests.GetOpenApiDocument_ReturnsSuccess`

- What currently passes (smoke)
  - `PandaBattleship.API.Tests\TestEndpointTests.cs` issues an HTTP GET to `/openapi/v1.json` using `WebApplicationFactory<Program>` and asserts HTTP 200 and JSON content type. This runs green without a database.

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
  - Database access currently uses `NpgsqlDataSource` DI (via `builder.AddNpgsqlDataSource("db")`). For new features, inject `NpgsqlDataSource` rather than creating raw `NpgsqlConnection` manually.

- AppHost (Aspire)
  - Postgres resource is persistent (`WithLifetime(ContainerLifetime.Persistent)`) and listens on port `58123`; database logical name is `pandaDb`.
  - Parameters are provided via user‑secrets under the `Parameters:` prefix. Avoid hardcoding credentials; rely on secrets/parameters in local dev.

- FE
  - React + Vite; Tailwind is present in devDependencies. Scripts: `dev`, `build`, `preview`.
  - The FE is currently UI‑only (board logic demo) and does not call the API. Introduce backend calls behind a small API client module and make the base URL configurable via Vite env (`import.meta.env.VITE_API_BASE_URL`). When integrating, wire the FE NPM app in AppHost to the API reference (already present) to benefit from Aspire endpoint discovery.

- Testing guidance
  - Keep fast, hermetic tests as default. Avoid hitting Postgres in unit/integration tests unless necessary. Prefer using `/openapi/v1.json` or pure in‑memory tests for smoke checks.
  - If you add DB‑dependent tests, gate them with a trait/category and run them only when AppHost/DB is available.

---

#### Verified commands (as of last edit)

- `dotnet build .\PandaBattleship.sln -v minimal` — builds solution
- `dotnet test .\PandaBattleship.sln -v minimal` — test suite green (includes OpenAPI smoke test)
- `dotnet run --project .\PandaBattleship.AppHost` — starts Aspire (requires `Parameters:DbUserName`/`Parameters:DbPassword` secrets)
- `npm ci && npm run dev` from `PandaBattleship.FE` — starts FE dev server