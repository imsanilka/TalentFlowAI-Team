using Microsoft.AspNetCore.Mvc;

namespace TalentFlow.Api.Controllers;

[ApiController]
[Route("api/evaluations")]
public class EvaluationsController : ControllerBase
{
    [HttpPost]
    public IActionResult CreateEvaluation([FromBody] object evaluation)
    {
        return Ok(new
        {
            message = "Evaluation recorded successfully",
            data = evaluation
        });
    }
}