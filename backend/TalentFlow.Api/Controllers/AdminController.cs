using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using TalentFlow.Api.DTOs;
using TalentFlow.Api.Models;
using TalentFlow.Api.Security;
using TalentFlow.Api.Services;

namespace TalentFlow.Api.Controllers;

[ApiController]
[Route("api/admin/users")]
[Authorize(Roles = Roles.Administrator)]
public sealed class AdminController : ControllerBase
{
    private readonly IUserStore _userStore;

    public AdminController(IUserStore userStore)
    {
        _userStore = userStore;
    }

    [HttpGet]
    public ActionResult<IReadOnlyCollection<AuthenticatedUserResponse>> GetUsers()
    {
        var users = _userStore
            .GetAll()
            .OrderBy(user => user.FullName)
            .Select(ToResponse)
            .ToArray();

        return Ok(users);
    }

    [HttpPatch("{id:guid}/status")]
    public ActionResult<AuthenticatedUserResponse> UpdateStatus(
        Guid id,
        UpdateAccountStatusRequest request)
    {
        var account = _userStore.FindById(id);

        if (account is null)
        {
            return NotFound(new
            {
                message = "User account was not found."
            });
        }

        var currentUserIdValue = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

        if (!request.IsActive &&
            Guid.TryParse(currentUserIdValue, out var currentUserId) &&
            currentUserId == id)
        {
            return BadRequest(new
            {
                message = "Administrators cannot deactivate their own account."
            });
        }

        _userStore.SetActiveStatus(id, request.IsActive);

        var updatedAccount = _userStore.FindById(id)!;

        return Ok(ToResponse(updatedAccount));
    }

    private static AuthenticatedUserResponse ToResponse(UserAccount account)
    {
        return new AuthenticatedUserResponse(
            account.Id,
            account.FullName,
            account.Email,
            account.Role,
            account.IsActive);
    }
}