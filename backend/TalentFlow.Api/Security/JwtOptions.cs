namespace TalentFlow.Api.Security;

public sealed class JwtOptions
{
    public const string SectionName = "Jwt";

    public string Issuer { get; set; } = "TalentFlow.Api";

    public string Audience { get; set; } = "TalentFlow.Client";

    public string SigningKey { get; set; } = string.Empty;

    public int ExpiryMinutes { get; set; } = 60;
}