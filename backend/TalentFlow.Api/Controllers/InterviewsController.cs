using Microsoft.AspNetCore.Mvc;

namespace TalentFlow.Api.Controllers;

[ApiController]
[Route("api/interviews")]
public class InterviewsController : ControllerBase
{
    [HttpPost]
    public IActionResult ScheduleInterview([FromBody] object interview)
    {
        return Ok(new
        {
            message = "Interview scheduled successfully",
            data = interview
        });
    }

    [HttpGet]
    public IActionResult GetInterviews()
    {
        return Ok(new[]
        {
            new
            {
                Id = 1,
                Candidate = "Sample Candidate",
                Date = "2026-07-25",
                Status = "Scheduled"
            }
        });
    }
}