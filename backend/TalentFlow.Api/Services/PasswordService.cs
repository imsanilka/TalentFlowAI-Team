using BC = BCrypt.Net.BCrypt;

namespace TalentFlow.Api.Services;

public sealed class PasswordService : IPasswordService
{
    private const int WorkFactor = 11;

    public string HashPassword(string password)
    {
        if (string.IsNullOrWhiteSpace(password))
        {
            throw new ArgumentException(
                "Password cannot be empty.",
                nameof(password));
        }

        return BC.HashPassword(password, workFactor: WorkFactor);
    }

    public bool VerifyPassword(string password, string passwordHash)
    {
        if (string.IsNullOrWhiteSpace(password) ||
            string.IsNullOrWhiteSpace(passwordHash))
        {
            return false;
        }

        return BC.Verify(password, passwordHash);
    }
}