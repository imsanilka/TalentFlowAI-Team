import { Link } from "react-router-dom";

const workspaces = [
  {
    title: "Candidate",
    description: "Discover jobs, manage a profile and track every application.",
    to: "/candidate",
    label: "Career workspace",
    icon: "◉",
  },
  {
    title: "Recruiter",
    description: "Publish jobs, review applicants and manage the hiring pipeline.",
    to: "/recruiter",
    label: "Talent operations",
    icon: "▣",
  },
  {
    title: "Hiring Manager",
    description: "Review finalists, conduct evaluations and record decisions.",
    to: "/manager",
    label: "Decision workspace",
    icon: "◇",
  },
  {
    title: "Administrator",
    description: "Manage users, permissions, audit events and platform health.",
    to: "/admin",
    label: "Platform control",
    icon: "⚙",
  },
];

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow">Explainable AI recruitment</p>
          <h1>Smarter talent decisions, from application to hire.</h1>
          <p>
            One secure platform for candidate discovery, structured evaluation,
            recruitment operations and workforce insight.
          </p>
          <div className="home-actions">
            <Link className="home-primary-action" to="/candidate">Explore candidate journey →</Link>
            <Link className="home-secondary-action" to="/recruiter">Open recruitment center</Link>
          </div>
        </div>
        <div className="home-insight" aria-label="Platform summary">
          <span className="insight-icon" aria-hidden="true">✦</span>
          <p>Talent intelligence</p>
          <strong>92%</strong>
          <span>Top candidate-to-role match</span>
          <div className="insight-progress"><span /></div>
          <small>Explainable skills-based ranking</small>
        </div>
      </section>

      <section className="home-stat-row" aria-label="Platform statistics">
        <span><strong>3</strong> open positions</span>
        <span><strong>2</strong> active candidates</span>
        <span><strong>1</strong> interview scheduled</span>
        <span><strong>4</strong> active accounts</span>
      </section>

      <div className="home-section-heading">
        <div><p className="eyebrow">Role-based experience</p><h2>Choose a workspace</h2></div>
        <p>Purpose-built access for every hiring stakeholder</p>
      </div>
      <section className="workspace-grid" aria-label="Application workspaces">
        {workspaces.map((workspace) => (
          <Link className="workspace-card" to={workspace.to} key={workspace.title}>
            <div className="workspace-card-top">
              <div className="card-icon" aria-hidden="true">{workspace.icon}</div>
              <span>→</span>
            </div>
            <p className="workspace-label">{workspace.label}</p>
            <h2>{workspace.title}</h2>
            <p>{workspace.description}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
