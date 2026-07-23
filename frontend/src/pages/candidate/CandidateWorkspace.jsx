import { useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { initialApplications, jobs, statusOrder } from "./candidateData";
import "./candidate.css";

const candidateNav = [
  { to: "/candidate", label: "Dashboard", end: true },
  { to: "/candidate/jobs", label: "Find jobs" },
  { to: "/candidate/applications", label: "My applications" },
  { to: "/candidate/profile", label: "Profile" },
];

function Icon({ name }) {
  const icons = { briefcase: "▣", document: "▤", calendar: "◫", profile: "●", search: "⌕", arrow: "→" };
  return <span aria-hidden="true">{icons[name] ?? "•"}</span>;
}

function CandidateHeader() {
  return (
    <div className="candidate-header">
      <div>
        <p className="eyebrow">Candidate workspace</p>
        <h1>Build your next chapter</h1>
      </div>
      <div className="candidate-user" aria-label="Signed in candidate">
        <span className="avatar" aria-hidden="true">DS</span>
        <span><strong>Dinitha Rathnayaka</strong><small>Candidate</small></span>
      </div>
    </div>
  );
}

function Dashboard({ applications }) {
  const interview = applications.find((item) => item.status === "Interview");
  return (
    <section aria-labelledby="dashboard-title">
      <div className="welcome-panel">
        <div>
          <p className="eyebrow">Welcome back</p>
          <h2 id="dashboard-title">Your career dashboard</h2>
          <p>Discover suitable opportunities and keep every application moving.</p>
        </div>
        <Link className="primary-button" to="/candidate/jobs">Search open jobs <Icon name="arrow" /></Link>
      </div>

      <div className="stat-grid" aria-label="Application summary">
        <article className="stat-card"><span className="soft-icon"><Icon name="document" /></span><div><strong>{applications.length}</strong><span>Applications</span></div></article>
        <article className="stat-card"><span className="soft-icon green"><Icon name="calendar" /></span><div><strong>{applications.filter((a) => a.status === "Interview").length}</strong><span>Interviews</span></div></article>
        <article className="stat-card"><span className="soft-icon purple"><Icon name="briefcase" /></span><div><strong>{jobs.length}</strong><span>Open jobs</span></div></article>
        <article className="stat-card"><span className="soft-icon amber"><Icon name="profile" /></span><div><strong>80%</strong><span>Profile complete</span></div></article>
      </div>

      <div className="dashboard-grid">
        <section className="panel" aria-labelledby="recent-title">
          <div className="section-heading"><div><p className="eyebrow">Activity</p><h2 id="recent-title">Recent applications</h2></div><Link to="/candidate/applications">View all</Link></div>
          <div className="application-list">
            {applications.slice(0, 3).map((application) => (
              <article className="application-row" key={application.id}>
                <span className="company-mark" aria-hidden="true">{application.company.charAt(0)}</span>
                <div><h3>{application.role}</h3><p>{application.company} · Applied {application.appliedOn}</p></div>
                <span className={`status status-${application.status.toLowerCase()}`}>{application.status}</span>
              </article>
            ))}
          </div>
        </section>
        <aside className="panel next-step" aria-labelledby="next-title">
          <p className="eyebrow">Up next</p><h2 id="next-title">{interview ? "Interview scheduled" : "Keep exploring"}</h2>
          <div className="calendar-tile"><strong>{interview ? "28" : "--"}</strong><span>{interview ? "JUL" : "DATE"}</span></div>
          <h3>{interview?.role ?? "No upcoming interviews"}</h3><p>{interview?.company ?? "New opportunities are added regularly."}</p><p className="next-detail">{interview?.nextStep}</p>
          <Link className="secondary-button" to="/candidate/applications">View application</Link>
        </aside>
      </div>
    </section>
  );
}

function JobsPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const filteredJobs = useMemo(() => jobs.filter((job) => {
    const matchesQuery = `${job.title} ${job.company} ${job.location}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (type === "All" || job.type === type);
  }), [query, type]);

  return (
    <section aria-labelledby="jobs-title">
      <div className="page-title"><p className="eyebrow">Opportunities</p><h2 id="jobs-title">Find your next role</h2><p>Search roles that match your skills, goals and preferred way of working.</p></div>
      <form className="job-filters" role="search" onSubmit={(event) => event.preventDefault()}>
        <label className="search-field" htmlFor="job-search"><span className="sr-only">Search jobs</span><Icon name="search" /><input id="job-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search job title, company or location" /></label>
        <label htmlFor="job-type"><span className="sr-only">Filter by job type</span><select id="job-type" value={type} onChange={(e) => setType(e.target.value)}><option>All</option><option>Full-time</option><option>Internship</option></select></label>
      </form>
      <p className="result-count" role="status" aria-live="polite" aria-atomic="true">{filteredJobs.length} opportunities found</p>
      <div className="job-grid">
        {filteredJobs.map((job) => (
          <article className="job-card" key={job.id}>
            <div className="job-card-top"><span className="company-mark" aria-hidden="true">{job.company.charAt(0)}</span><span>{job.posted}</span></div>
            <h3><Link to={`/candidate/jobs/${job.id}`}>{job.title}</Link></h3><p className="company-name">{job.company}</p>
            <div className="tag-row"><span>{job.location}</span><span>{job.type}</span></div><p>{job.summary}</p>
            <Link className="text-link" to={`/candidate/jobs/${job.id}`} aria-label={`View details for ${job.title}`}>View job details <Icon name="arrow" /></Link>
          </article>
        ))}
      </div>
      {filteredJobs.length === 0 && <div className="empty-state"><h3>No matching jobs</h3><p>Try a different keyword or job type.</p></div>}
    </section>
  );
}

function JobDetails({ onApply, applications }) {
  const { jobId } = useParams();
  const job = jobs.find((item) => item.id === jobId);
  const navigate = useNavigate();
  const hasApplied = applications.some((item) => item.jobId === jobId);
  const [confirmed, setConfirmed] = useState(false);
  const [confirmationError, setConfirmationError] = useState("");
  if (!job) return <div className="empty-state"><h2>Job not found</h2><Link to="/candidate/jobs">Return to job search</Link></div>;

  function submitApplication(event) {
    event.preventDefault();
    if (!confirmed) {
      setConfirmationError("Confirm that your profile information is accurate before submitting.");
      return;
    }
    setConfirmationError("");
    onApply(job);
    navigate("/candidate/applications", { state: { applied: true } });
  }

  return (
    <section aria-labelledby="job-detail-title">
      <Link className="back-link" to="/candidate/jobs">← Back to all jobs</Link>
      <div className="detail-grid">
        <article className="panel job-detail">
          <span className="company-mark large" aria-hidden="true">{job.company.charAt(0)}</span><p className="eyebrow">{job.department}</p><h2 id="job-detail-title">{job.title}</h2><p className="company-name">{job.company}</p>
          <div className="tag-row"><span>{job.location}</span><span>{job.type}</span><span>{job.posted}</span></div>
          <hr /><h3>About this role</h3><p>{job.description}</p><h3>What you will bring</h3><ul className="requirement-list">{job.requirements.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <aside className="panel apply-panel" aria-labelledby="apply-title">
          <h2 id="apply-title">Apply for this position</h2><p>Your saved profile will be included with the application.</p>
          {hasApplied ? <div className="success-message" role="status">✓ You have already applied for this role.</div> : (
            <form onSubmit={submitApplication} noValidate>
              <label htmlFor="cover-note">Short cover note <span>(optional)</span></label><textarea id="cover-note" name="coverNote" rows="6" placeholder="Tell the hiring team why this opportunity interests you." />
              <label className="checkbox-label" htmlFor="profile-confirmation"><input id="profile-confirmation" name="profileConfirmation" type="checkbox" checked={confirmed} onChange={(event) => { setConfirmed(event.target.checked); if (event.target.checked) setConfirmationError(""); }} aria-invalid={confirmationError ? "true" : "false"} aria-describedby={confirmationError ? "profile-confirmation-error" : undefined} /> <span>I confirm that my profile information is accurate.</span></label>
              {confirmationError && <p className="field-error" id="profile-confirmation-error" role="alert">{confirmationError}</p>}
              <button className="primary-button full-width" type="submit">Submit application</button>
            </form>
          )}
        </aside>
      </div>
    </section>
  );
}

function ApplicationsPage({ applications }) {
  const location = useLocation();
  return (
    <section aria-labelledby="applications-title">
      <div className="page-title"><p className="eyebrow">Track progress</p><h2 id="applications-title">My applications</h2><p>Follow every application and prepare for your next step.</p></div>
      {location.state?.applied && <p className="success-message application-announcement" role="status" aria-live="polite" aria-atomic="true">Application submitted successfully. It is now shown in your application list.</p>}
      <div className="tracking-list">
        {applications.map((application) => {
          const currentIndex = statusOrder.indexOf(application.status);
          return <article className="panel tracking-card" key={application.id}>
            <div className="tracking-heading"><div><p className="eyebrow">Applied {application.appliedOn}</p><h3>{application.role}</h3><p>{application.company}</p></div><span className={`status status-${application.status.toLowerCase()}`}>{application.status}</span></div>
            <ol className="status-track" aria-label={`Application status: ${application.status}`}>
              {statusOrder.slice(0, 5).map((status, index) => <li className={index <= currentIndex ? "complete" : ""} aria-current={index === currentIndex ? "step" : undefined} key={status}><span aria-hidden="true">{index < currentIndex ? "✓" : index + 1}</span><small>{status}{index === currentIndex ? " (current)" : ""}</small></li>)}
            </ol>
            <div className="next-action"><strong>Next step</strong><span>{application.nextStep}</span></div>
          </article>;
        })}
      </div>
    </section>
  );
}

function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState({});
  const [profile, setProfile] = useState({ firstName: "Dinitha", lastName: "Rathnayaka", email: "dinitha@example.com", phone: "+94 77 000 0000", location: "Bandarawela, Sri Lanka", headline: "Computer Science undergraduate | Aspiring UI/UX Engineer", summary: "Computer Science student interested in creating accessible, useful digital products.", skills: "UI/UX Design, Figma, React, JavaScript, Git" });
  const update = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
    if (errors[event.target.name]) setErrors({ ...errors, [event.target.name]: "" });
  };
  function save(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!profile.firstName.trim()) nextErrors.firstName = "Enter your first name.";
    if (!profile.lastName.trim()) nextErrors.lastName = "Enter your last name.";
    if (!profile.email.trim()) nextErrors.email = "Enter your email address.";
    else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(profile.email)) nextErrors.email = "Enter a valid email address.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      document.getElementById(`${Object.keys(nextErrors)[0]}-input`)?.focus();
      return;
    }
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  }
  return (
    <section aria-labelledby="profile-title">
      <div className="page-title"><p className="eyebrow">Your information</p><h2 id="profile-title">Candidate profile</h2><p>A complete profile helps recruiters understand your strengths.</p></div>
      <div className="profile-layout">
        <aside className="panel profile-summary"><span className="avatar large-avatar" aria-hidden="true">DR</span><h3>{profile.firstName} {profile.lastName}</h3><p>{profile.headline}</p><div className="completion"><div><strong id="profile-strength-label">Profile strength</strong><span aria-hidden="true">80%</span></div><progress aria-labelledby="profile-strength-label" max="100" value="80">80%</progress></div></aside>
        <form className="panel profile-form" onSubmit={save} noValidate>
          <h3>Personal details</h3><div className="form-grid">
            <div className="field-group"><label htmlFor="firstName-input">First name</label><input id="firstName-input" name="firstName" autoComplete="given-name" value={profile.firstName} onChange={update} aria-invalid={errors.firstName ? "true" : "false"} aria-describedby={errors.firstName ? "firstName-error" : undefined} required />{errors.firstName && <p className="field-error" id="firstName-error" role="alert">{errors.firstName}</p>}</div>
            <div className="field-group"><label htmlFor="lastName-input">Last name</label><input id="lastName-input" name="lastName" autoComplete="family-name" value={profile.lastName} onChange={update} aria-invalid={errors.lastName ? "true" : "false"} aria-describedby={errors.lastName ? "lastName-error" : undefined} required />{errors.lastName && <p className="field-error" id="lastName-error" role="alert">{errors.lastName}</p>}</div>
            <div className="field-group"><label htmlFor="email-input">Email address</label><input id="email-input" name="email" type="email" autoComplete="email" value={profile.email} onChange={update} aria-invalid={errors.email ? "true" : "false"} aria-describedby={errors.email ? "email-error" : undefined} required />{errors.email && <p className="field-error" id="email-error" role="alert">{errors.email}</p>}</div>
            <div className="field-group"><label htmlFor="phone-input">Phone number</label><input id="phone-input" name="phone" type="tel" autoComplete="tel" value={profile.phone} onChange={update} /></div>
            <div className="field-group full-field"><label htmlFor="location-input">Location</label><input id="location-input" name="location" autoComplete="address-level2" value={profile.location} onChange={update} /></div>
            <div className="field-group full-field"><label htmlFor="headline-input">Professional headline</label><input id="headline-input" name="headline" value={profile.headline} onChange={update} /></div>
            <div className="field-group full-field"><label htmlFor="summary-input">Professional summary</label><textarea id="summary-input" name="summary" rows="4" value={profile.summary} onChange={update} /></div>
            <div className="field-group full-field"><label htmlFor="skills-input">Skills</label><input id="skills-input" name="skills" value={profile.skills} onChange={update} aria-describedby="skills-help" /><small id="skills-help">Separate skills using commas.</small></div>
          </div><div className="form-actions"><span className="save-status" role="status" aria-live="polite" aria-atomic="true">{saved ? "✓ Profile saved" : ""}</span><button className="primary-button" type="submit">Save changes</button></div>
        </form>
      </div>
    </section>
  );
}

export default function CandidateWorkspace() {
  const [applications, setApplications] = useState(initialApplications);
  function apply(job) {
    if (applications.some((item) => item.jobId === job.id)) return;
    setApplications((current) => [{ id: `app-${Date.now()}`, jobId: job.id, role: job.title, company: job.company, status: "Applied", appliedOn: "23 July 2026", nextStep: "Application received — awaiting screening" }, ...current]);
  }
  return (
    <div className="candidate-workspace">
      <CandidateHeader />
      <nav className="candidate-nav" aria-label="Candidate navigation">{candidateNav.map((item) => <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => isActive ? "active" : ""}>{item.label}</NavLink>)}</nav>
      <Routes>
        <Route index element={<Dashboard applications={applications} />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="jobs/:jobId" element={<JobDetails onApply={apply} applications={applications} />} />
        <Route path="applications" element={<ApplicationsPage applications={applications} />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<div className="empty-state"><h2>Candidate page not found</h2><Link to="/candidate">Return to dashboard</Link></div>} />
      </Routes>
    </div>
  );
}
