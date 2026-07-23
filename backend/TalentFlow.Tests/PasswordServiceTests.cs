using TalentFlow.Api.Services;

namespace TalentFlow.Tests;

public sealed class PasswordServiceTests
{
    private readonly PasswordService _service = new();

    [Fact]
    public void HashPassword_DoesNotStorePlainPassword()
    {
        const string password = "SecurePassword123!";

        var hash = _service.HashPassword(password);

        Assert.NotEqual(password, hash);
        Assert.NotEmpty(hash);
    }

    [Fact]
    public void VerifyPassword_ReturnsTrueForCorrectPassword()
    {
        const string password = "SecurePassword123!";
        var hash = _service.HashPassword(password);

        var result = _service.VerifyPassword(password, hash);

        Assert.True(result);
    }

    [Fact]
    public void VerifyPassword_ReturnsFalseForWrongPassword()
    {
        var hash = _service.HashPassword("CorrectPassword123!");

        var result = _service.VerifyPassword("WrongPassword123!", hash);

        Assert.False(result);
    }

    [Fact]
    public void HashPassword_RejectsEmptyPassword()
    {
        Assert.Throws<ArgumentException>(
            () => _service.HashPassword(string.Empty));
    }
}