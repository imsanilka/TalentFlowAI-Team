using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TalentFlow.Api.Controllers;
using TalentFlow.Api.Data;
using TalentFlow.Api.DTOs;
using TalentFlow.Api.Security;

namespace TalentFlow.Tests;

public sealed class JobsControllerTests
{
    [Fact]
    public async Task Create_PersistsPublishedJobForRecruiter()
    {
        await using var db = CreateDatabase();
        var recruiterId = Guid.NewGuid();
        var controller = CreateController(db, recruiterId);

        var action = await controller.Create(new CreateJobRequest
        {
            Title = "Platform Engineer",
            Description = "Build secure recruitment services.",
            Department = "Engineering",
            Location = "Colombo",
            EmploymentType = "Full-time",
            RequiredSkills = new[] { "C#", "SQL", "Azure" },
            ClosingDate = DateTime.UtcNow.Date.AddDays(14)
        });

        var created = Assert.IsType<CreatedAtActionResult>(action.Result);
        var response = Assert.IsType<JobResponse>(created.Value);

        Assert.Equal("Published", response.Status);
        Assert.Equal("Platform Engineer", response.Title);
        Assert.Single(db.JobPostings);
        Assert.Single(db.AuditLogs);
    }

    [Fact]
    public async Task Create_RejectsPastClosingDate()
    {
        await using var db = CreateDatabase();
        var controller = CreateController(db, Guid.NewGuid());

        var action = await controller.Create(new CreateJobRequest
        {
            Title = "Platform Engineer",
            Description = "Build secure recruitment services.",
            Department = "Engineering",
            Location = "Colombo",
            RequiredSkills = new[] { "C#" },
            ClosingDate = DateTime.UtcNow.Date.AddDays(-1)
        });

        Assert.IsType<ObjectResult>(action.Result);
        Assert.Empty(db.JobPostings);
    }

    [Fact]
    public async Task GetMine_ReturnsOnlyAuthenticatedRecruiterJobs()
    {
        await using var db = CreateDatabase();
        var firstRecruiter = Guid.NewGuid();
        var secondRecruiter = Guid.NewGuid();

        await CreateController(db, firstRecruiter).Create(CreateRequest("First"));
        await CreateController(db, secondRecruiter).Create(CreateRequest("Second"));

        var action = await CreateController(db, firstRecruiter).GetMine();
        var ok = Assert.IsType<OkObjectResult>(action.Result);
        var jobs = Assert.IsType<JobResponse[]>(ok.Value);

        Assert.Single(jobs);
        Assert.Equal("First", jobs[0].Title);
    }

    private static CreateJobRequest CreateRequest(string title)
    {
        return new CreateJobRequest
        {
            Title = title,
            Description = "A complete job description.",
            Department = "Engineering",
            Location = "Remote",
            RequiredSkills = new[] { "C#" }
        };
    }

    private static AppDbContext CreateDatabase()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new AppDbContext(options);
    }

    private static JobsController CreateController(
        AppDbContext db,
        Guid recruiterId)
    {
        var identity = new ClaimsIdentity(
            new[]
            {
                new Claim(
                    JwtRegisteredClaimNames.Sub,
                    recruiterId.ToString()),
                new Claim(ClaimTypes.Role, Roles.Recruiter)
            },
            "TestAuthentication");

        return new JobsController(db)
        {
            ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    User = new ClaimsPrincipal(identity)
                }
            }
        };
    }
}
