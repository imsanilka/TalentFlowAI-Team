namespace TalentFlow.Api.Security;

public static class Roles
{
    public const string Candidate = "Candidate";
    public const string Recruiter = "Recruiter";
    public const string HiringManager = "HiringManager";
    public const string Administrator = "Administrator";

    public static readonly IReadOnlySet<string> All =
        new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        {
            Candidate,
            Recruiter,
            HiringManager,
            Administrator
        };
}