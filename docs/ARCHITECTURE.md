# TalentFlow AI Architecture

## 1. Architecture Style

TalentFlow AI uses a layered client-server architecture.

- React and Vite provide the presentation layer.
- ASP.NET Core provides the REST API and business logic.
- Entity Framework Core provides data access.
- SQL Server provides persistent storage.
- JWT authentication and role-based authorization protect the API.

## 2. Main Components

### Frontend

The React frontend contains role-specific interfaces for:

- Candidate
- Recruiter
- Hiring Manager
- Administrator

The frontend communicates with the API using JSON over HTTPS.

### Backend

The ASP.NET Core backend contains:

- Controllers
- DTOs
- Services
- Entity Framework database context
- Domain entities
- Authentication and authorization configuration

### Database

SQL Server stores:

- Users and roles
- Candidate profiles
- Job postings
- Applications
- Interviews
- Evaluations
- Audit events

## 3. Request Flow

1. The user interacts with the React interface.
2. React sends an HTTP request to the API.
3. The API validates the JWT and role.
4. The controller validates the request.
5. A service performs the business operation.
6. Entity Framework reads or updates SQL Server.
7. The API returns a JSON response.
8. React updates the interface.

## 4. Security

- Passwords are stored as secure hashes.
- JWT tokens identify authenticated users.
- Role-based authorization protects restricted endpoints.
- DTOs prevent internal database entities from being exposed directly.
- Audit events record important administrative and recruitment actions.

## 5. Team Integration

Development uses feature branches and reviewed pull requests. The protected
main branch contains only reviewed and tested work.
