import { Link } from "react-router-dom";
import "./dashboard.css";

const candidates = [
  {
    initials: "DR",
    name: "Dinitha Rathnayaka",
    role: "Frontend Engineer",
    match: "92%",
    skills: ["React", "TypeScript", "Accessibility"],
  },
  {
    initials: "NP",
    name: "Nethmi Perera",
    role: "Data Analyst",
    match: "86%",
    skills: ["Python", "SQL", "Power BI"],
  },
];

export default function HiringManagerDashboard() {
  return (
    <div className="role-dashboard">
      <header className="role-header">
        <div>
          <p className="eyebrow">Hiring manager workspace</p>
          <h1>Make confident hiring decisions</h1>
          <p>
            Review shortlisted talent, prepare for interviews and record
            evidence-based evaluations.
          </p>
        </div>
        <div className="role-user" aria-label="Signed in hiring manager">
          <span className="role-avatar green" aria-hidden="true">MC</span>
          <span className="role-user-copy"><strong>Michael Chen</strong><small>Hiring Manager</small></span>
        </div>
      </header>

      <section className="role-stat-grid" aria-label="Hiring manager summary">
        <article className="role-stat">
          <span className="role-stat-icon" aria-hidden="true">◎</span>
          <span className="role-stat-copy"><strong>2</strong><small>Candidates for review</small></span>
        </article>
        <article className="role-stat">
          <span className="role-stat-icon purple" aria-hidden="true">◫</span>
          <span className="role-stat-copy"><strong>1</strong><small>Upcoming interview</small></span>
        </article>
        <article className="role-stat">
          <span className="role-stat-icon green" aria-hidden="true">✓</span>
          <span className="role-stat-copy"><strong>1</strong><small>Evaluation due</small></span>
        </article>
        <article className="role-stat">
          <span className="role-stat-icon amber" aria-hidden="true">◇</span>
          <span className="role-stat-copy"><strong>0</strong><small>Offers pending</small></span>
        </article>
      </section>

      <section className="role-hero" aria-labelledby="manager-hero-title">
        <div>
          <p className="eyebrow">Decision insight</p>
          <h2 id="manager-hero-title">Dinitha leads the shortlist</h2>
          <p>92% role alignment based on skills and experience.</p>
        </div>
        <Link className="role-action" to="/interview-evaluation">
          Start evaluation →
        </Link>
      </section>

      <div className="role-layout">
        <section className="role-panel" aria-labelledby="finalist-title">
          <div className="role-section-heading">
            <div>
              <p className="eyebrow">Shortlist</p>
              <h2 id="finalist-title">Finalists requiring review</h2>
            </div>
          </div>
          <div className="candidate-review-list">
            {candidates.map((candidate) => (
              <article className="candidate-card" key={candidate.name}>
                <div className="candidate-card-top">
                  <span className="role-table-person">
                    <span className="mini-avatar" aria-hidden="true">{candidate.initials}</span>
                    <span><strong>{candidate.name}</strong><small>{candidate.role}</small></span>
                  </span>
                  <span className="match-score">{candidate.match}</span>
                </div>
                <div className="tag-list">
                  {candidate.skills.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
                <Link className="role-action-secondary" to="/interview-evaluation">
                  Evaluate candidate
                </Link>
              </article>
            ))}
          </div>
        </section>

        <aside className="role-panel" aria-labelledby="interview-title">
          <div className="role-section-heading">
            <div>
              <p className="eyebrow">Schedule</p>
              <h2 id="interview-title">Upcoming interview</h2>
            </div>
          </div>
          <div className="interview-list">
            <article className="interview-row">
              <span className="interview-date" aria-hidden="true">28<br />JUL</span>
              <div className="interview-copy">
                <h3>Dinitha Rathnayaka</h3>
                <p>10:00 AM · Microsoft Teams</p>
              </div>
              <span className="role-status purple">Scheduled</span>
            </article>
          </div>
        </aside>
      </div>
    </div>
  );
}
