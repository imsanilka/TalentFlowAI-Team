using Microsoft.AspNetCore.Mvc;

namespace TalentFlow.Api.Controllers;

[ApiController]
[Route("api/candidates")]
public class CandidatesController : ControllerBase
{
    [HttpGet("me")]
    public IActionResult GetMyProfile()
    {
        return Ok(new
        {
            id = 1,
            name = "Sample Candidate",
            email = "candidate@example.com"
        });
    }

    [HttpPut("me")]
    public IActionResult UpdateMyProfile([FromBody] object candidate)
    {
        return Ok(new
        {
            message = "Candidate profile updated successfully",
            data = candidate
        });
    }
}