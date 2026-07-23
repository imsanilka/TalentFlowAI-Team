 using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using TalentFlow.Api.Models;
using TalentFlow.Api.Security;
using TalentFlow.Api.Services;
using Microsoft.EntityFrameworkCore;
using TalentFlow.Api.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException(
            "DefaultConnection connection string is missing.")));



builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter the JWT access token."
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        [new OpenApiSecurityScheme
        {
            Reference = new OpenApiReference
            {
                Type = ReferenceType.SecurityScheme,
                Id = "Bearer"
            }
        }] = Array.Empty<string>()
    });
});

var jwtSection = builder.Configuration.GetSection(JwtOptions.SectionName);
var jwtOptions = jwtSection.Get<JwtOptions>()
    ?? throw new InvalidOperationException("JWT configuration is missing.");

if (Encoding.UTF8.GetByteCount(jwtOptions.SigningKey) < 32)
{
    throw new InvalidOperationException(
        "Jwt:SigningKey must be provided through user secrets or an environment variable.");
}

builder.Services.Configure<JwtOptions>(jwtSection);

builder.Services.AddSingleton<IPasswordService, PasswordService>();
builder.Services.AddSingleton<ITokenService, JwtTokenService>();

builder.Services.AddSingleton<IUserStore>(serviceProvider =>
{
    var passwordService =
        serviceProvider.GetRequiredService<IPasswordService>();

    var demoPassword = builder.Configuration["DemoUsers:Password"];

    if (string.IsNullOrWhiteSpace(demoPassword))
    {
        throw new InvalidOperationException(
            "DemoUsers:Password must be provided through user secrets.");
    }

    UserAccount CreateUser(string name, string email, string role)
    {
        return new UserAccount
        {
            FullName = name,
            Email = email,
            PasswordHash = passwordService.HashPassword(demoPassword),
            Role = role
        };
    }

    return new InMemoryUserStore(new[]
    {
        CreateUser(
            "Nethmi Perera",
            "candidate@talentflow.demo",
            Roles.Candidate),

        CreateUser(
            "Sarah Johnson",
            "recruiter@talentflow.demo",
            Roles.Recruiter),

        CreateUser(
            "Michael Chen",
            "manager@talentflow.demo",
            Roles.HiringManager),

        CreateUser(
            "System Administrator",
            "admin@talentflow.demo",
            Roles.Administrator)
    });
});

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.MapInboundClaims = false;

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtOptions.Issuer,
            ValidAudience = jwtOptions.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtOptions.SigningKey)),
            NameClaimType = JwtRegisteredClaimNames.Name,
            RoleClaimType = "role",
            ClockSkew = TimeSpan.FromMinutes(1)
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

/*
Authentication must come before authorization:
1. Authentication identifies the user.
2. Authorization checks what the identified user may do.
*/
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

