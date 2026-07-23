using Microsoft.EntityFrameworkCore;
using TalentFlow.Api.Models;

namespace TalentFlow.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<UserAccount> Users => Set<UserAccount>();
    public DbSet<CandidateProfile> CandidateProfiles =>
        Set<CandidateProfile>();
    public DbSet<Department> Departments => Set<Department>();
    public DbSet<JobPosting> JobPostings => Set<JobPosting>();
    public DbSet<JobApplication> JobApplications => Set<JobApplication>();
    public DbSet<Interview> Interviews => Set<Interview>();
    public DbSet<Evaluation> Evaluations => Set<Evaluation>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserAccount>()
            .HasIndex(user => user.Email)
            .IsUnique();

        modelBuilder.Entity<CandidateProfile>()
            .HasIndex(profile => profile.UserId)
            .IsUnique();

        modelBuilder.Entity<CandidateProfile>()
            .HasOne(profile => profile.User)
            .WithOne()
            .HasForeignKey<CandidateProfile>(profile => profile.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<JobPosting>()
            .HasOne(job => job.Department)
            .WithMany(department => department.Jobs)
            .HasForeignKey(job => job.DepartmentId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<JobApplication>()
            .HasIndex(application => new
            {
                application.CandidateProfileId,
                application.JobPostingId
            })
            .IsUnique();

        modelBuilder.Entity<JobApplication>()
            .Property(application => application.MatchScore)
            .HasPrecision(5, 2);

        modelBuilder.Entity<JobApplication>()
            .HasOne(application => application.CandidateProfile)
            .WithMany(profile => profile.Applications)
            .HasForeignKey(application => application.CandidateProfileId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<JobApplication>()
            .HasOne(application => application.JobPosting)
            .WithMany(job => job.Applications)
            .HasForeignKey(application => application.JobPostingId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Interview>()
            .HasOne(interview => interview.JobApplication)
            .WithMany(application => application.Interviews)
            .HasForeignKey(interview => interview.JobApplicationId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Evaluation>()
            .HasOne(evaluation => evaluation.JobApplication)
            .WithMany(application => application.Evaluations)
            .HasForeignKey(evaluation => evaluation.JobApplicationId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}