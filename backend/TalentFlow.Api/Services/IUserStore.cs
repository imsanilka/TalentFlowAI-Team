using TalentFlow.Api.Models;

namespace TalentFlow.Api.Services;

public interface IUserStore
{
    IReadOnlyCollection<UserAccount> GetAll();

    UserAccount? FindById(Guid id);

    UserAccount? FindByEmail(string email);

    bool SetActiveStatus(Guid id, bool isActive);
}