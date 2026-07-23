import { Link } from "react-router-dom";
import "./dashboard.css";

const applications = [
  {
    initials: "DR",
    name: "Dinitha Rathnayaka",
    role: "Frontend Engineer",
    match: "92%",
    status: "Shortlisted",
    tone: "green",
  },
  {
    initials: "NP",
    name: "Nethmi Perera",
    role: "Data Analyst",
    match: "86%",
    status: "Screening",
    tone: "purple",
  },
  {
    initials: "AK",
    name: "Akeel Khan",
    role: "Product Designer",
    match: "81%",
    status: "Applied",
    tone: "",
  },
];

const pipeline = [
  { label: "Applied", count: 2, width: "100%" },
  { label: "Screening", count: 1, width: "50%" },
  { label: "Shortlisted", count: 1, width: "50%" },
  { label: "Interview", count: 0, width: "0%" },
  { label: "Offer", count: 0, width: "0%" },
];

export default function RecruiterDashboard() {
  return (
    <div className="role-dashboard">
      <header className="role-header">
        <div>
          <p className="eyebrow">Recruiter workspace</p>
          <h1>Recruitment command center</h1>
          <p>
            Review the strongest applicants, publish roles and move candidates
            through a structured hiring pipeline.
          </p>
        </div>
        <div className="role-user" aria-label="Signed in recruiter">
          <span className="role-avatar" aria-hidden="true">
            SJ
          </span>
          <span className="role-user-copy">
            <strong>Sarah Johnson</strong>
            <small>Recruiter</small>
          </span>
        </div>
      </header>

      <section className="role-hero" aria-labelledby="recruiter-hero-title">
        <div>
          <p className="eyebrow">AI talent discovery</p>
          <h2 id="recruiter-hero-title">Find the right candidate faster</h2>
          <p>Rank applicants by skills, experience and role requirements.</p>
        </div>
        <button className="role-action" type="button">
          + Create job
        </button>
      </section>

      <section className="role-stat-grid" aria-label="Recruitment summary">
        <article className="role-stat">
          <span className="role-stat-icon" aria-hidden="true">▣</span>
          <span className="role-stat-copy"><strong>3</strong><small>Active jobs</small></span>
        </article>
        <article className="role-stat">
          <span className="role-stat-icon purple" aria-hidden="true">◎</span>
          <span className="role-stat-copy"><strong>2</strong><small>Applications received</small></span>
        </article>
        <article className="role-stat">
          <span className="role-stat-icon green" aria-hidden="true">✓</span>
          <span className="role-stat-copy"><strong>1</strong><small>Shortlisted candidate</small></span>
        </article>
        <article className="role-stat">
          <span className="role-stat-icon amber" aria-hidden="true">✦</span>
          <span className="role-stat-copy"><strong>89%</strong><small>Top AI match</small></span>
        </article>
      </section>

      <div className="role-layout">
        <section className="role-panel" aria-labelledby="applicant-title">
          <div className="role-section-heading">
            <div>
              <p className="eyebrow">Live pipeline</p>
              <h2 id="applicant-title">AI-ranked applicants</h2>
            </div>
            <Link className="role-text-button" to="/application-status">
              Manage pipeline →
            </Link>
          </div>
          <div className="role-table-wrap">
            <table className="role-table">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Applied role</th>
                  <th>AI match</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application.name}>
                    <td>
                      <span className="role-table-person">
                        <span className="mini-avatar" aria-hidden="true">{application.initials}</span>
                        <span><strong>{application.name}</strong><small>4 years experience</small></span>
                      </span>
                    </td>
                    <td>{application.role}</td>
                    <td><strong>{application.match}</strong></td>
                    <td><span className={`role-status ${application.tone}`}>{application.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="role-panel" aria-labelledby="pipeline-title">
          <div className="role-section-heading">
            <div>
              <p className="eyebrow">Overview</p>
              <h2 id="pipeline-title">Hiring pipeline</h2>
            </div>
          </div>
          <ul className="pipeline-list">
            {pipeline.map((stage) => (
              <li className="pipeline-row" key={stage.label}>
                <span>{stage.label}</span>
                <span className="pipeline-bar" aria-hidden="true"><span style={{ width: stage.width }} /></span>
                <strong>{stage.count}</strong>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
