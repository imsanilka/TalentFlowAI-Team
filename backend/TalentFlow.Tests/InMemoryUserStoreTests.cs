using TalentFlow.Api.Models;
using TalentFlow.Api.Security;
using TalentFlow.Api.Services;

namespace TalentFlow.Tests;

public sealed class InMemoryUserStoreTests
{
    [Fact]
    public void FindByEmail_IsCaseInsensitive()
    {
        var user = CreateUser();
        var store = new InMemoryUserStore(new[] { user });

        var result = store.FindByEmail("  ADMIN@EXAMPLE.COM ");

        Assert.NotNull(result);
        Assert.Equal(user.Id, result.Id);
    }

    [Fact]
    public void FindByEmail_ReturnsNullForUnknownEmail()
    {
        var store = new InMemoryUserStore(new[] { CreateUser() });

        var result = store.FindByEmail("unknown@example.com");

        Assert.Null(result);
    }

    [Fact]
    public void SetActiveStatus_UpdatesExistingUser()
    {
        var user = CreateUser();
        var store = new InMemoryUserStore(new[] { user });

        var updated = store.SetActiveStatus(user.Id, false);

        Assert.True(updated);
        Assert.False(user.IsActive);
    }

    private static UserAccount CreateUser()
    {
        return new UserAccount
        {
            FullName = "System Administrator",
            Email = "admin@example.com",
            PasswordHash = "test-hash",
            Role = Roles.Administrator
        };
    }
}