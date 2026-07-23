using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using TalentFlow.Api.Models;
using TalentFlow.Api.Security;
using TalentFlow.Api.Services;

namespace TalentFlow.Tests;

public sealed class JwtTokenServiceTests
{
    private const string TestSigningKey =
        "talentflow-test-signing-key-with-at-least-32-bytes";

    [Fact]
    public void CreateToken_ReturnsSignedTokenWithUserClaims()
    {
        var service = CreateService();
        var user = CreateUser();

        var result = service.CreateToken(user);
        var token = new JwtSecurityTokenHandler()
            .ReadJwtToken(result.AccessToken);

        Assert.NotEmpty(result.AccessToken);
        Assert.True(result.ExpiresAtUtc > DateTimeOffset.UtcNow);
        Assert.Equal(
            user.Id.ToString(),
            token.Claims.Single(claim => claim.Type == "sub").Value);
        Assert.Equal(
            user.Email,
            token.Claims.Single(claim => claim.Type == "email").Value);
        Assert.Equal(
            user.Role,
            token.Claims.Single(claim => claim.Type == "role").Value);
    }

    [Fact]
    public void Constructor_RejectsShortSigningKey()
    {
        var options = Options.Create(new JwtOptions
        {
            Issuer = "TalentFlow.Api",
            Audience = "TalentFlow.Client",
            SigningKey = "too-short",
            ExpiryMinutes = 60
        });

        Assert.Throws<InvalidOperationException>(
            () => new JwtTokenService(options));
    }

    private static JwtTokenService CreateService()
    {
        var options = Options.Create(new JwtOptions
        {
            Issuer = "TalentFlow.Api",
            Audience = "TalentFlow.Client",
            SigningKey = TestSigningKey,
            ExpiryMinutes = 60
        });

        return new JwtTokenService(options);
    }

    private static UserAccount CreateUser()
    {
        return new UserAccount
        {
            FullName = "Test Recruiter",
            Email = "recruiter@example.com",
            PasswordHash = "not-used-by-token-test",
            Role = Roles.Recruiter
        };
    }
}