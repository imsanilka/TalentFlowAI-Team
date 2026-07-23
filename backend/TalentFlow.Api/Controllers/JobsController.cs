using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TalentFlow.Api.Data;
using TalentFlow.Api.DTOs;
using TalentFlow.Api.Models;
using TalentFlow.Api.Security;

namespace TalentFlow.Api.Controllers;

[ApiController]
[Route("api/jobs")]
[Authorize(Roles = Roles.Recruiter + "," + Roles.Administrator)]
public sealed class JobsController : ControllerBase
{
    private readonly AppDbContext _db;

    public JobsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet("mine")]
    public async Task<ActionResult<IReadOnlyCollection<JobResponse>>> GetMine()
    {
        if (!TryGetUserId(out var userId))
        {
            return Unauthorized();
        }

        var jobEntities = await _db.JobPostings
            .AsNoTracking()
            .Include(job => job.Department)
            .Where(job => job.CreatedByUserId == userId)
            .OrderByDescending(job => job.CreatedAt)
            .ToArrayAsync();

        return Ok(jobEntities.Select(ToResponse).ToArray());
    }

    [HttpPost]
    public async Task<ActionResult<JobResponse>> Create(
        CreateJobRequest request)
    {
        if (!TryGetUserId(out var userId))
        {
            return Unauthorized();
        }

        if (request.ClosingDate is not null
            && request.ClosingDate.Value.Date <= DateTime.UtcNow.Date)
        {
            ModelState.AddModelError(
                nameof(request.ClosingDate),
                "Closing date must be in the future.");
            return ValidationProblem(ModelState);
        }

        var departmentName = request.Department.Trim();
        var department = await _db.Departments
            .FirstOrDefaultAsync(item => item.Name == departmentName);

        if (department is null)
        {
            department = new Department
            {
                Name = departmentName
            };
            _db.Departments.Add(department);
        }

        var skills = request.RequiredSkills
            .Select(skill => skill.Trim())
            .Where(skill => skill.Length > 0)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToArray();

        if (skills.Length == 0)
        {
            ModelState.AddModelError(
                nameof(request.RequiredSkills),
                "At least one required skill is needed.");
            return ValidationProblem(ModelState);
        }

        var job = new JobPosting
        {
            Title = request.Title.Trim(),
            Description = request.Description.Trim(),
            RequiredSkillsCsv = string.Join(",", skills),
            Location = request.Location.Trim(),
            EmploymentType = request.EmploymentType.Trim(),
            Status = "Published",
            Department = department,
            CreatedByUserId = userId,
            ClosingDate = request.ClosingDate?.Date
        };

        _db.JobPostings.Add(job);
        await _db.SaveChangesAsync();

        _db.AuditLogs.Add(new AuditLog
        {
            UserId = userId,
            Action = "JobCreated",
            EntityName = nameof(JobPosting),
            EntityId = job.Id.ToString(),
            Details = $"Published job: {job.Title}"
        });
        await _db.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetMine),
            ToResponse(job));
    }

    private bool TryGetUserId(out Guid userId)
    {
        var value = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
            ?? User.FindFirstValue(ClaimTypes.NameIdentifier);

        return Guid.TryParse(value, out userId);
    }

    private static JobResponse ToResponse(JobPosting job)
    {
        return new JobResponse(
            job.Id,
            job.Title,
            job.Description,
            job.Department?.Name ?? string.Empty,
            job.Location,
            job.EmploymentType,
            job.Status,
            job.RequiredSkillsCsv
                .Split(
                    ',',
                    StringSplitOptions.RemoveEmptyEntries
                    | StringSplitOptions.TrimEntries),
            job.CreatedAt,
            job.ClosingDate);
    }
}
