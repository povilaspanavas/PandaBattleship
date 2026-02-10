# GitHub Copilot Instructions

This workspace contains the PandaBattleship project - a learning project for exploring .NET Aspire, React, and modern cloud-native practices.

## Primary Documentation

For comprehensive project documentation, see **`agents.md`** in the root directory.

## Quick Context

- **Architecture**: .NET Aspire orchestration with .NET 10 API, React 19 frontend, PostgreSQL database
- **Key Pattern**: Uses C# 13 extension members (cannot be chained traditionally)
- **Health Checks**: Custom `/health` endpoint with UI response writer (safe for production)
- **Styling**: Tailwind CSS 4.1.18
- **Testing**: xUnit for API tests

## Key Files

- `PandaBattleship.AppHost/AppHost.cs` - Aspire orchestrator
- `PandaBattleship.API/Program.cs` - API entry point
- `PandaBattleship.FE/src/components/Game.jsx` - Main game component

For detailed architecture, patterns, and common tasks, refer to `agents.md`.