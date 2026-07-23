using System.ComponentModel.DataAnnotations;

namespace TalentFlow.Api.Models;

public class Department
{
    public int Id { get; set; }

    [MaxLength(120)]
    public required string Name { get; set; }

    [MaxLength(120)]
    public string OrganizationName { get; set; } = "TalentFlow Global";

    public ICollection<JobPosting> Jobs { get; set; } =
        new List<JobPosting>();
}

public class CandidateProfile
{
    public int Id { get; set; }

    public Guid UserId { get; set; }

    public UserAccount? User { get; set; }

    [MaxLength(120)]
    public string? Headline { get; set; }

    [MaxLength(1000)]
    public string? Summary { get; set; }

    [MaxLength(100)]
    public string? Location { get; set; }

    public int YearsOfExperience { get; set; }

    [MaxLength(1000)]
    public string SkillsCsv { get; set; } = "";

    [MaxLength(500)]
    public string? ResumeUrl { get; set; }

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<JobApplication> Applications { get; set; } =
        new List<JobApplication>();
}

public class JobPosting
{
    public int Id { get; set; }

    [MaxLength(160)]
    public required string Title { get; set; }

    [MaxLength(3000)]
    public required string Description { get; set; }

    [MaxLength(1000)]
    public string RequiredSkillsCsv { get; set; } = "";

    [MaxLength(100)]
    public required string Location { get; set; }

    [MaxLength(50)]
    public string EmploymentType { get; set; } = "Full-time";

    [MaxLength(30)]
    public string Status { get; set; } = "Draft";

    public int DepartmentId { get; set; }

    public Department? Department { get; set; }

    public Guid CreatedByUserId { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? ClosingDate { get; set; }

    public ICollection<JobApplication> Applications { get; set; } =
        new List<JobApplication>();
}

public class JobApplication
{
    public int Id { get; set; }

    public int CandidateProfileId { get; set; }

    public CandidateProfile? CandidateProfile { get; set; }

    public int JobPostingId { get; set; }

    public JobPosting? JobPosting { get; set; }

    [MaxLength(30)]
    public string Status { get; set; } = "Applied";

    public decimal MatchScore { get; set; }

    public DateTime AppliedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Interview> Interviews { get; set; } =
        new List<Interview>();

    public ICollection<Evaluation> Evaluations { get; set; } =
        new List<Evaluation>();
}

public class Interview
{
    public int Id { get; set; }

    public int JobApplicationId { get; set; }

    public JobApplication? JobApplication { get; set; }

    public DateTime ScheduledAt { get; set; }

    [MaxLength(50)]
    public required string Mode { get; set; }

    [MaxLength(500)]
    public string? MeetingLink { get; set; }

    [MaxLength(300)]
    public string PanelMembers { get; set; } = "";

    [MaxLength(30)]
    public string Status { get; set; } = "Scheduled";
}

public class Evaluation
{
    public int Id { get; set; }

    public int JobApplicationId { get; set; }

    public JobApplication? JobApplication { get; set; }

    public Guid EvaluatorUserId { get; set; }

    public int TechnicalScore { get; set; }

    public int CommunicationScore { get; set; }

    public int ProblemSolvingScore { get; set; }

    public int CultureScore { get; set; }

    [MaxLength(2000)]
    public required string Feedback { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class AuditLog
{
    public long Id { get; set; }

    public Guid? UserId { get; set; }

    [MaxLength(80)]
    public required string Action { get; set; }

    [MaxLength(80)]
    public required string EntityName { get; set; }

    [MaxLength(50)]
    public string? EntityId { get; set; }

    [MaxLength(500)]
    public string? Details { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}