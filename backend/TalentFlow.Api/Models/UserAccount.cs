namespace TalentFlow.Api.Models;

public sealed class UserAccount
{
    public Guid Id { get; init; } = Guid.NewGuid();

    public required string FullName { get; set; }

    public required string Email { get; set; }

    public required string PasswordHash { get; set; }

    public required string Role { get; set; }

    public bool IsActive { get; set; } = true;

    public DateTimeOffset CreatedAtUtc { get; init; } = DateTimeOffset.UtcNow;
}