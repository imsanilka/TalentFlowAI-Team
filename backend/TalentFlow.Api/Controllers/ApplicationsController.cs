using Microsoft.AspNetCore.Mvc;

namespace TalentFlow.Api.Controllers;

[ApiController]
[Route("api/applications")]
public class ApplicationsController : ControllerBase
{
    [HttpPost]
    public IActionResult Apply()
    {
        return Ok(new
        {
            message = "Application submitted successfully"
        });
    }

    [HttpGet("mine")]
    public IActionResult GetMyApplications()
    {
        return Ok(new[]
        {
            new { Id = 1, Job = "Software Engineer", Status = "Applied" }
        });
    }

    [HttpGet]
    public IActionResult GetAllApplications()
    {
        return Ok(new[]
        {
            new { Id = 1, Candidate = "Sample Candidate", Status = "Applied" }
        });
    }

    [HttpPatch("{id}/status")]
    public IActionResult UpdateStatus(int id)
    {
        return Ok(new
        {
            message = $"Application {id} status updated"
        });
    }
}