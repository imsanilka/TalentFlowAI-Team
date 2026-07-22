# TalentFlow AI API Contracts

Base route: `/api`

## Authentication

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/auth/login` | Public | Authenticate a user and return a JWT |

## Jobs

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/jobs` | Authenticated | Return available jobs |
| GET | `/jobs/{id}` | Authenticated | Return one job |
| POST | `/jobs` | Recruiter | Create a job |
| PUT | `/jobs/{id}` | Recruiter | Update a job |

## Candidates

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/candidates/me` | Candidate | Return the current candidate profile |
| PUT | `/candidates/me` | Candidate | Update the current candidate profile |

## Applications

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/applications` | Candidate | Submit an application |
| GET | `/applications/mine` | Candidate | Return the candidate's applications |
| GET | `/applications` | Recruiter, HiringManager | Return applications |
| PATCH | `/applications/{id}/status` | Recruiter, HiringManager | Change application status |

## Interviews and Evaluations

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/interviews` | Recruiter, HiringManager | Schedule an interview |
| GET | `/interviews` | Authenticated | Return permitted interviews |
| POST | `/evaluations` | HiringManager | Record an evaluation |

## Administration

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/admin/users` | Administrator | Return system users |
| PATCH | `/admin/users/{id}/status` | Administrator | Change account status |
| GET | `/admin/audit-logs` | Administrator | Return audit events |

## Application Status Values

- Applied
- Screening
- Shortlisted
- Interview
- Offer
- Hired
- Rejected

## Standard Error Response

```json
{
  "message": "A clear description of the error"
}
