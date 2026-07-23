# TalentFlow AI

TalentFlow AI is a role-based recruitment management application developed as a six-member Software Engineering group project. It supports candidates, recruiters, hiring managers and administrators through one integrated platform.

## Main Features

### Candidate

- View recommended jobs
- Search and filter vacancies
- Apply for jobs
- Maintain a candidate profile
- Track applications and interviews
- Accessible and responsive candidate workspace

### Recruiter

- View recruitment activity
- Manage jobs and applications
- Review AI-ranked candidates
- Shortlist candidates
- Update recruitment stages

### Hiring Manager

- Review shortlisted candidates
- Schedule interviews
- Submit structured evaluations
- Move candidates to offer stage
- Confirm hiring decisions

### Administrator

- View platform statistics
- Manage user accounts
- Activate or deactivate accounts
- Monitor role-based access
- Access protected administration endpoints

## Technology Stack

- Frontend: React 19, Vite and React Router
- Backend: ASP.NET Core Web API and .NET 8
- Database: Microsoft SQL Server 2022
- Data access: Entity Framework Core
- Authentication: JWT bearer authentication
- Password security: BCrypt
- API documentation: Swagger/OpenAPI
- Testing: xUnit
- Deployment support: Docker Compose
- Continuous integration: GitHub Actions

## Architecture

```text
React frontend
      |
      | REST/JSON
      v
ASP.NET Core Web API
      |
      | Entity Framework Core
      v
Microsoft SQL Server
```

The application uses JWT authentication and role-based authorization to protect API operations.

## Project Structure

```text
TalentFlowAI-Team/
├── backend/
│   ├── TalentFlow.Api/
│   ├── TalentFlow.Tests/
│   └── TalentFlowAI.sln
├── frontend/
├── docs/
├── database/
├── postman/
├── compose.yaml
└── .github/workflows/ci.yml
```

## Prerequisites

Install the following software:

- .NET SDK 8
- Node.js 22 or later
- npm
- Docker Desktop
- Git

## Local Configuration

Sensitive values must not be committed to GitHub.

Create the local Docker environment file:

```bash
cp .env.example .env
```

Open `.env` and replace the example SQL Server password with a strong local password.

Configure the backend secrets:

```bash
dotnet user-secrets set "Jwt:SigningKey" "$(openssl rand -base64 48)" --project backend/TalentFlow.Api
```

```bash
dotnet user-secrets set "DemoUsers:Password" "YOUR_STRONG_DEMO_PASSWORD" --project backend/TalentFlow.Api
```

```bash
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=localhost,1433;Database=TalentFlowDB;User Id=sa;Password=YOUR_LOCAL_SQL_PASSWORD;TrustServerCertificate=True;" --project backend/TalentFlow.Api
```

Use the same SQL password in `.env` and the connection string.

## Start SQL Server

```bash
docker compose -f compose.yaml up -d
```

Check its status:

```bash
docker compose -f compose.yaml ps
```

## Apply the Database Migration

If the Entity Framework tool is not installed:

```bash
dotnet tool install --global dotnet-ef --version 8.*
```

Apply the migration:

```bash
dotnet ef database update --project backend/TalentFlow.Api
```

## Run the Backend

```bash
dotnet run --project backend/TalentFlow.Api
```

Open the Swagger URL displayed in the Terminal.

## Run the Frontend

Open another Terminal in the project folder:

```bash
npm ci --prefix frontend
```

```bash
npm run dev --prefix frontend
```

Open the Vite URL displayed in the Terminal.

## Demo Accounts

The following demo accounts are created by the backend:

| Role | Email |
|---|---|
| Candidate | `candidate@talentflow.demo` |
| Recruiter | `recruiter@talentflow.demo` |
| Hiring Manager | `manager@talentflow.demo` |
| Administrator | `admin@talentflow.demo` |

All accounts use the password configured through the `DemoUsers:Password` user secret.

## Testing and Verification

Run backend tests:

```bash
dotnet test backend/TalentFlowAI.sln
```

Run frontend linting:

```bash
npm run lint --prefix frontend
```

Run the frontend production build:

```bash
npm run build --prefix frontend
```

The GitHub Actions workflow also validates backend builds, backend tests and frontend production builds for pushes and pull requests targeting `main`.

## Team Contributions

| Member | Responsibility |
|---|---|
| `imsanilka` | Team leadership, architecture, shared integration shell, API contracts, CI and final integration |
| `dsrathnayake2003-dev` | Candidate frontend workflow, accessibility and responsive improvements |
| `AMMSNimsara` | Recruiter, hiring-manager and administrator frontend workflows |
| `AUMSSewwandi` | Authentication, JWT security, password hashing and administration API |
| `Pathum712` | Recruitment, candidate, application, interview and evaluation API endpoints |
| `Mlbmliyanage` | SQL Server database, Entity Framework models, migrations, testing and Docker configuration |

## Git Workflow

Development followed a feature-branch and pull-request workflow:

1. Each task was recorded as a GitHub issue.
2. Each member worked on an assigned branch.
3. Members committed and pushed using their own GitHub identity.
4. Changes were submitted through pull requests.
5. Pull requests were reviewed and merged into the protected `main` branch.
6. The complete integrated application was tested before submission.

## Security Notes

- Passwords and signing keys are not stored in tracked source files.
- Local secrets are stored using .NET User Secrets or environment variables.
- Passwords are hashed with BCrypt.
- Protected endpoints require JWT bearer tokens.
- Administration endpoints require the Administrator role.
- `.env`, `bin`, `obj`, `node_modules` and `dist` are ignored by Git.

## Repository

[GitHub – TalentFlowAI-Team](https://github.com/imsanilka/TalentFlowAI-Team)