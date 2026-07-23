using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TalentFlow.Api.DTOs;
using TalentFlow.Api.Services;

namespace TalentFlow.Api.Controllers;

[ApiController]
[Route("api/auth")]
public sealed class AuthController : ControllerBase
{
    private readonly IUserStore _users;
    private readonly IPasswordService _passwords;
    private readonly ITokenService _tokens;

    public AuthController(
        IUserStore users,
        IPasswordService passwords,
        ITokenService tokens)
    {
        _users = users;
        _passwords = passwords;
        _tokens = tokens;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    [ProducesResponseType<LoginResponse>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public ActionResult<LoginResponse> Login(LoginRequest request)
    {
        var user = _users.FindByEmail(request.Email);

        if (user is null ||
            !_passwords.VerifyPassword(request.Password, user.PasswordHash))
        {
            return Unauthorized(new
            {
                message = "Invalid email or password."
            });
        }

        if (!user.IsActive)
        {
            return StatusCode(StatusCodes.Status403Forbidden, new
            {
                message = "This account is inactive."
            });
        }

        var token = _tokens.CreateToken(user);

        return Ok(new LoginResponse(
            token.AccessToken,
            "Bearer",
            token.ExpiresAtUtc,
            new AuthenticatedUserResponse(
                user.Id,
                user.FullName,
                user.Email,
                user.Role,
                user.IsActive)));
    }
}