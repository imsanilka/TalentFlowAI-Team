using System.ComponentModel.DataAnnotations;

namespace TalentFlow.Api.DTOs;

public sealed class LoginRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; init; } = string.Empty;

    [Required]
    [MinLength(8)]
    public string Password { get; init; } = string.Empty;
}

public sealed record AuthenticatedUserResponse(
    Guid Id,
    string FullName,
    string Email,
    string Role,
    bool IsActive);

public sealed record LoginResponse(
    string AccessToken,
    string TokenType,
    DateTimeOffset ExpiresAtUtc,
    AuthenticatedUserResponse User);

public sealed class UpdateAccountStatusRequest
{
    public bool IsActive { get; init; }
}