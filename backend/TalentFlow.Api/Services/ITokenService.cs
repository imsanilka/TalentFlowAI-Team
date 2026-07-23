using TalentFlow.Api.Models;

namespace TalentFlow.Api.Services;

public sealed record GeneratedToken(
    string AccessToken,
    DateTimeOffset ExpiresAtUtc);

public interface ITokenService
{
    GeneratedToken CreateToken(UserAccount user);
}