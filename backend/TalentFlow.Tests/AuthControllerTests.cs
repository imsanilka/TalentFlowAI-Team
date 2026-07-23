using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TalentFlow.Api.Controllers;
using TalentFlow.Api.DTOs;
using TalentFlow.Api.Models;
using TalentFlow.Api.Security;
using TalentFlow.Api.Services;

namespace TalentFlow.Tests;

public sealed class AuthControllerTests
{
    private const string ValidPassword = "SecurePassword123!";

    private const string TestSigningKey =
        "talentflow-controller-test-key-with-at-least-32-bytes";

    [Fact]
    public void Login_ReturnsTokenForValidCredentials()
    {
        var controller = CreateController();
        var request = new LoginRequest
        {
            Email = "admin@example.com",
            Password = ValidPassword
        };

        var result = controller.Login(request);

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var response = Assert.IsType<LoginResponse>(okResult.Value);

        Assert.NotEmpty(response.AccessToken);
        Assert.Equal("Bearer", response.TokenType);
        Assert.Equal(Roles.Administrator, response.User.Role);
    }

    [Fact]
    public void Login_ReturnsUnauthorizedForWrongPassword()
    {
        var controller = CreateController();
        var request = new LoginRequest
        {
            Email = "admin@example.com",
            Password = "WrongPassword123!"
        };

        var result = controller.Login(request);

        Assert.IsType<UnauthorizedObjectResult>(result.Result);
    }

    [Fact]
    public void Login_ReturnsForbiddenForInactiveAccount()
    {
        var controller = CreateController(isActive: false);
        var request = new LoginRequest
        {
            Email = "admin@example.com",
            Password = ValidPassword
        };

        var result = controller.Login(request);

        var objectResult = Assert.IsType<ObjectResult>(result.Result);
        Assert.Equal(403, objectResult.StatusCode);
    }

    private static AuthController CreateController(bool isActive = true)
    {
        var passwordService = new PasswordService();

        var user = new UserAccount
        {
            FullName = "System Administrator",
            Email = "admin@example.com",
            PasswordHash =
                passwordService.HashPassword(ValidPassword),
            Role = Roles.Administrator,
            IsActive = isActive
        };

        var userStore = new InMemoryUserStore(new[] { user });

        var tokenService = new JwtTokenService(
            Options.Create(new JwtOptions
            {
                Issuer = "TalentFlow.Api",
                Audience = "TalentFlow.Client",
                SigningKey = TestSigningKey,
                ExpiryMinutes = 60
            }));

        return new AuthController(
            userStore,
            passwordService,
            tokenService);
    }
}