using System.ComponentModel.DataAnnotations;

namespace TalentFlow.Api.DTOs;

public sealed class CreateJobRequest
{
    [Required]
    [MaxLength(160)]
    public string Title { get; init; } = string.Empty;

    [Required]
    [MaxLength(3000)]
    public string Description { get; init; } = string.Empty;

    [Required]
    [MaxLength(120)]
    public string Department { get; init; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Location { get; init; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string EmploymentType { get; init; } = "Full-time";

    [MinLength(1)]
    public string[] RequiredSkills { get; init; } = Array.Empty<string>();

    public DateTime? ClosingDate { get; init; }
}

public sealed record JobResponse(
    int Id,
    string Title,
    string Description,
    string Department,
    string Location,
    string EmploymentType,
    string Status,
    string[] RequiredSkills,
    DateTime CreatedAt,
    DateTime? ClosingDate);
