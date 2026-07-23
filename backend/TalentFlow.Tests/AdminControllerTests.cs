using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using TalentFlow.Api.Controllers;
using TalentFlow.Api.DTOs;
using TalentFlow.Api.Models;
using TalentFlow.Api.Security;
using TalentFlow.Api.Services;
using Xunit;

namespace TalentFlow.Tests;

public sealed class AdminControllerTests
{
    [Fact]
    public void GetUsers_ReturnsAllAccountsWithoutPasswordHashes()
    {
        var admin = CreateAccount(
            "Administrator",
            "admin@talentflow.demo",
            Roles.Administrator);

        var candidate = CreateAccount(
            "Candidate User",
            "candidate@talentflow.demo",
            Roles.Candidate);

        var store = new InMemoryUserStore(new[] { admin, candidate });
        var controller = CreateController(store, admin.Id);

        var action = controller.GetUsers();

        var okResult = Assert.IsType<OkObjectResult>(action.Result);
        var response = Assert.IsType<AuthenticatedUserResponse[]>(okResult.Value);

        Assert.Equal(2, response.Length);
        Assert.Contains(response, user => user.Email == admin.Email);
        Assert.Contains(response, user => user.Email == candidate.Email);
    }

    [Fact]
    public void UpdateStatus_DeactivatesAnotherAccount()
    {
        var admin = CreateAccount(
            "Administrator",
            "admin@talentflow.demo",
            Roles.Administrator);

        var candidate = CreateAccount(
            "Candidate User",
            "candidate@talentflow.demo",
            Roles.Candidate);

        var store = new InMemoryUserStore(new[] { admin, candidate });
        var controller = CreateController(store, admin.Id);

        var action = controller.UpdateStatus(
            candidate.Id,
            new UpdateAccountStatusRequest
            {
                IsActive = false
            });

        var okResult = Assert.IsType<OkObjectResult>(action.Result);
        var response =
            Assert.IsType<AuthenticatedUserResponse>(okResult.Value);

        Assert.False(response.IsActive);
        Assert.False(store.FindById(candidate.Id)!.IsActive);
    }

    [Fact]
    public void UpdateStatus_ReturnsNotFoundForUnknownAccount()
    {
        var admin = CreateAccount(
            "Administrator",
            "admin@talentflow.demo",
            Roles.Administrator);

        var store = new InMemoryUserStore(new[] { admin });
        var controller = CreateController(store, admin.Id);

        var action = controller.UpdateStatus(
            Guid.NewGuid(),
            new UpdateAccountStatusRequest
            {
                IsActive = false
            });

        Assert.IsType<NotFoundObjectResult>(action.Result);
    }

    [Fact]
    public void UpdateStatus_PreventsAdministratorFromDeactivatingSelf()
    {
        var admin = CreateAccount(
            "Administrator",
            "admin@talentflow.demo",
            Roles.Administrator);

        var store = new InMemoryUserStore(new[] { admin });
        var controller = CreateController(store, admin.Id);

        var action = controller.UpdateStatus(
            admin.Id,
            new UpdateAccountStatusRequest
            {
                IsActive = false
            });

        Assert.IsType<BadRequestObjectResult>(action.Result);
        Assert.True(store.FindById(admin.Id)!.IsActive);
    }

    private static AdminController CreateController(
        IUserStore store,
        Guid authenticatedAdminId)
    {
        var identity = new ClaimsIdentity(
            new[]
            {
                new Claim(
                    JwtRegisteredClaimNames.Sub,
                    authenticatedAdminId.ToString()),
                new Claim(ClaimTypes.Role, Roles.Administrator)
            },
            "TestAuthentication");

        return new AdminController(store)
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

    private static UserAccount CreateAccount(
        string fullName,
        string email,
        string role)
    {
        return new UserAccount
        {
            Id = Guid.NewGuid(),
            FullName = fullName,
            Email = email,
            PasswordHash = "test-password-hash",
            Role = role,
            IsActive = true,
            CreatedAtUtc = DateTimeOffset.UtcNow
        };
    }
}