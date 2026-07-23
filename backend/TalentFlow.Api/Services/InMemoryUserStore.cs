using System.Collections.Concurrent;
using TalentFlow.Api.Models;

namespace TalentFlow.Api.Services;

public sealed class InMemoryUserStore : IUserStore
{
    private readonly ConcurrentDictionary<string, UserAccount> _users;

    public InMemoryUserStore(IEnumerable<UserAccount> users)
    {
        _users = new ConcurrentDictionary<string, UserAccount>(
            users.ToDictionary(
                user => NormalizeEmail(user.Email),
                user => user));
    }

    public IReadOnlyCollection<UserAccount> GetAll()
    {
        return _users.Values
            .OrderBy(user => user.FullName)
            .ToArray();
    }

    public UserAccount? FindById(Guid id)
    {
        return _users.Values.FirstOrDefault(user => user.Id == id);
    }

    public UserAccount? FindByEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
        {
            return null;
        }

        _users.TryGetValue(NormalizeEmail(email), out var user);
        return user;
    }

    public bool SetActiveStatus(Guid id, bool isActive)
    {
        var user = FindById(id);

        if (user is null)
        {
            return false;
        }

        user.IsActive = isActive;
        return true;
    }

    private static string NormalizeEmail(string email)
    {
        return email.Trim().ToUpperInvariant();
    }
}