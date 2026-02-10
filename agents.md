# PandaBattleship Project Documentation
## Project Overview
**PandaBattleship** is a learning project implementing the classic Battleship game using modern web technologies and cloud-native practices. The project serves as a sandbox for exploring new concepts including .NET Aspire, containerization, health monitoring, and modern frontend frameworks.
**Current State**: Early development - basic game UI implemented, infrastructure setup complete  
**Date**: February 10, 2026
---
## Architecture
### High-Level Structure
The project follows a microservices architecture orchestrated by .NET Aspire:
```
┌─────────────────────────────────────────────────────────┐
│              PandaBattleship.AppHost                    │
│           (.NET Aspire Orchestrator)                    │
└────────┬──────────────────┬──────────────────┬─────────┘
         │                  │                  │
    ┌────▼────┐      ┌─────▼──────┐    ┌─────▼──────┐
    │PostgreSQL│      │ Backend    │    │ Frontend   │
    │Container │◄─────┤    API     │◄───┤  (React)   │
    │(Port:    │      │  (.NET 10) │    │  (Vite)    │
    │ 58123)   │      └────────────┘    └────────────┘
    └──────────┘
```
### Technology Stack
**Backend (.NET 10)**
- ASP.NET Core Minimal APIs
- Npgsql (PostgreSQL driver)
- OpenTelemetry (observability)
- Health Checks with UI
- xUnit (testing)
**Frontend**
- React 19.2.0
- Vite 7.2.4
- Tailwind CSS 4.1.18
- ESLint
**Infrastructure**
- .NET Aspire 13.1.0
- PostgreSQL (containerized)
- Docker
- Service Discovery
- User Secrets for configuration
---
## Project Structure
### Core Projects
#### 1. **PandaBattleship.AppHost** 
The Aspire orchestrator that manages all services and their dependencies.
**Key File**: `AppHost.cs`
- Configures PostgreSQL with persistent lifetime and custom port (58123)
- Sets up user secrets for DB credentials (`DbPassword`, `DbUserName`)
- Defines the API project with database reference and health checks
- Configures the npm-based frontend with proper endpoint references
- Uses custom URL configuration extensions
**Custom Extensions**: `CustomExtensions.cs`
- Uses C# 13 extension members (implicit extension pattern)
- `ConfigureCustomUrls()` method adds custom dashboard URLs:
  - "Home" (HTTPS endpoint) - order 90
  - "Health" (HTTPS + /health) - order 85
  - "Check Db" (HTTPS + /db-check) - order 80
  - Removes HTTP endpoint to force HTTPS only
**Important Pattern**: The `ConfigureCustomUrls()` cannot be chained fluently after `.WithHttpsEndpoint()` directly due to how the extension member syntax works. It must be called as `.ConfigureCustomUrls()` at the end of the chain.
#### 2. **PandaBattleship.API**
Minimal API backend with database connectivity and health monitoring.
**Key File**: `Program.cs`
- Uses service defaults from shared project
- Registers Npgsql with connection name "db"
- Configures OpenAPI (dev only)
- Maps custom health endpoint at `/health` with UI response writer
- Maps `/db-check` endpoint for database connectivity testing
  - Creates test table if not exists
  - Inserts timestamped test record
  - Returns count of records
**Health Checks Configuration**:
- Uses `AspNetCore.HealthChecks.UI.Client` (v9.0.0)
- Custom `/health` endpoint with `UIResponseWriter.WriteHealthCheckUIResponse`
- Shows detailed JSON response listing all health check components
- **Safe for Production**: The detailed UI response is mapped in Program.cs and runs in all environments, but the default endpoints from ServiceDefaults only run in Development
**Dependencies**:
- `Aspire.Npgsql` (13.1.0)
- `AspNetCore.HealthChecks.UI.Client` (9.0.0)
- `Microsoft.AspNetCore.OpenApi` (10.0.2)
#### 3. **PandaBattleship.ServiceDefaults**
Shared infrastructure configuration for all services.
**Key File**: `Extensions.cs`
- `AddServiceDefaults<TBuilder>()`: Configures OpenTelemetry, health checks, service discovery, and HTTP resilience
- `ConfigureOpenTelemetry<TBuilder>()`: Sets up metrics, tracing, and logging
- `AddDefaultHealthChecks<TBuilder>()`: Adds "self" health check with "live" tag
- `MapDefaultEndpoints()`: Maps `/health` and `/alive` endpoints (dev only)
  - **Note**: The default `/health` endpoint is commented out to avoid conflict with the custom health check in Program.cs
**Observability**:
- Excludes health check paths from tracing to reduce noise
- OTLP exporter support (configured via environment variables)
- Runtime, ASP.NET Core, and HTTP client instrumentation
#### 4. **PandaBattleship.FE**
React frontend for the game interface.
**Key Files**:
- `App.jsx`: Main component with panda logo and centered layout
- `components/Game.jsx`: Game logic and grid rendering
  - 10x10 grid for both player and enemy
  - Player grid shows ship placement (4x1-sized ships, 3x2-sized, 2x3-sized, 1x4-sized)
  - Enemy grid handles click interactions (hit/miss logic - currently demo mode)
  - Uses Tailwind classes for styling
  - Responsive design (w-8 h-8 on mobile, w-10 h-10 on sm+)
**Styling**: 
- Tailwind CSS 4.1.18 with PostCSS
- Dark theme with colored grids and hover effects
- Flexbox layout with gap spacing
**Scripts**:
- `npm start` / `npm run dev`: Start Vite dev server
- `npm run build`: Production build
- `npm run lint`: ESLint check
#### 5. **PandaBattleship.API.Tests**
xUnit tests for the API.
**Current Tests**:
- `OpenApiEndpointTests`: Validates `/openapi/v1.json` endpoint returns proper JSON
- Uses `WebApplicationFactory<Program>` for integration testing
---
## Configuration & Secrets
### User Secrets
The AppHost uses User Secrets (ID: `e172cd92-9f5a-43db-9014-8072b46ef975`) for:
- `DbPassword`: PostgreSQL password
- `DbUserName`: PostgreSQL username
### Database Configuration
- **Connection Name**: "db"
- **Database Name**: "pandaDb"
- **Port**: 58123 (custom, non-standard)
- **Lifetime**: Persistent (container persists between runs)
### Endpoints
When running via Aspire:
- **AppHost Dashboard**: Auto-assigned port (check Aspire dashboard)
- **API HTTPS**: Auto-assigned (visible in dashboard)
- **Frontend**: Auto-assigned HTTP port (via PORT env variable)
---
## Development Workflow
### Running the Project
1. Ensure Docker is running (for PostgreSQL container)
2. Set user secrets for database credentials
3. Run the AppHost project - it will orchestrate all services
4. Access the Aspire dashboard to see service status and URLs
5. Navigate to the Frontend URL to play the game
### Key Aspire Features in Use
- **WaitFor**: API waits for database to be ready
- **WithReference**: Frontend references API, API references database
- **Service Discovery**: Automatic endpoint resolution between services
- **Health Checks**: HTTP health check on API at `/health` endpoint
- **WithHttpHealthCheck**: Aspire monitors API health via the `/health` endpoint
### Building/Testing
- **Build**: Standard .NET build via `dotnet build` or IDE
- **Test**: Run xUnit tests in `PandaBattleship.API.Tests`
- **Frontend Dev**: `npm start` in FE directory (or let Aspire handle it)
---
## Current Features
### Implemented ✅
- Basic project structure with Aspire orchestration
- PostgreSQL integration with test endpoint
- Health monitoring with detailed UI response
- React game grid UI with ship placement
- Basic hit/miss interaction (demo mode)
- OpenAPI specification
- Integration tests for OpenAPI
- Custom Aspire dashboard URLs
- HTTPS enforcement
### Planned (from README) 🚧
- **Phase 1 (Current Stack)**:
  - Single player vs AI gameplay
  - GitHub Actions CI/CD
  - Full xUnit test coverage
- **Phase 2 (Later)**:
  - Multiplayer with SignalR
  - Kubernetes deployment
  - Playwright end-to-end testing
  - Ship skins/themes
  - JWT authentication
  - React OpenTelemetry
---
## Important Patterns & Conventions
### C# 13 Extension Members
The project uses the new implicit extension syntax:
```csharp
extension(IResourceBuilder<ProjectResource> resource)
{
    public IResourceBuilder<ProjectResource> MethodName() { }
}
```
This is why `ConfigureCustomUrls()` cannot be written as a traditional fluent builder pattern with `this` parameter.
### Health Check Strategy
- **Development**: Both default (`/alive`) and custom (`/health`) endpoints
- **Production**: Only custom `/health` endpoint with UI response
- The detailed UI response is considered safe for production as it helps with monitoring
- Health checks include PostgreSQL connectivity check
### Minimal API Pattern
- No controllers - using minimal API endpoints
- Partial `Program` class for testability
- Dependency injection via parameters
### Frontend State Management
- Using React hooks (`useState`)
- Grid state managed at Game component level
- No external state management library yet
---
## Common Tasks for AI Agents
### When Adding New Features
1. **API Endpoints**: Add to `Program.cs`, ensure proper dependency injection
2. **Frontend Components**: Add to `src/components/`, import in `App.jsx`
3. **Database Changes**: Update connection in API, consider migrations
4. **Tests**: Add to `PandaBattleship.API.Tests`
5. **Configuration**: Update `AppHost.cs` if new services needed
### When Debugging
1. Check Aspire dashboard for service health
2. Verify database is running (check Docker)
3. Check `/health` endpoint for detailed health status
4. Use `/db-check` to test database connectivity
5. Review OpenTelemetry traces in dashboard
### When Modifying Health Checks
- Add health checks in `Program.cs` after `builder.AddServiceDefaults()`
- Use `.AddNpgSql()` or similar for dependency checks
- Remember: Custom `/health` endpoint in Program.cs takes precedence over ServiceDefaults
### When Working with Aspire Configuration
- Database references require `WaitFor()` to ensure startup order
- Use `WithReference()` for service-to-service communication
- Custom URLs can be added via `WithUrlForEndpoint()` or `WithUrls()`
- Container lifetime options: `Persistent`, `Session`, or default
---
## File Locations Quick Reference
| Component | Path |
|-----------|------|
| Aspire Orchestrator | `PandaBattleship.AppHost/AppHost.cs` |
| Custom Extensions | `PandaBattleship.AppHost/CustomExtensions.cs` |
| API Entry Point | `PandaBattleship.API/Program.cs` |
| Service Defaults | `PandaBattleship.ServiceDefaults/Extensions.cs` |
| Frontend App | `PandaBattleship.FE/src/App.jsx` |
| Game Component | `PandaBattleship.FE/src/components/Game.jsx` |
| API Tests | `PandaBattleship.API.Tests/OpenApiEndpointTests.cs` |
| Package Config (FE) | `PandaBattleship.FE/package.json` |
| Tailwind Config | `PandaBattleship.FE/tailwind.config.js` |
---
## Notes for AI Agents
### Project Context
This is a **learning project**, so:
- It's okay to experiment with new patterns
- The owner is exploring .NET 10, Aspire, and modern frontend tech
- Code quality matters, but learning takes priority
- Comments and documentation are valued
### Common Questions Answered
1. **Why custom port 58123?**: To avoid conflicts with default PostgreSQL
2. **Why persistent container?**: To maintain database state across dev sessions
3. **Why both React 19 and .NET 10?**: Exploring latest stable versions
4. **Is the UI health response safe for prod?**: Yes, it's designed for monitoring tools
5. **Why can't ConfigureCustomUrls be chained?**: C# 13 extension member syntax limitation
### Best Practices for This Project
- Use Tailwind utilities for styling (already configured)
- Keep API minimal - avoid over-engineering
- Add tests for new endpoints
- Update this documentation when architecture changes
- Use semantic search to find relevant code before editing