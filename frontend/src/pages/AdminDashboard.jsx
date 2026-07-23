import { Link } from "react-router-dom";
import "./dashboard.css";

const users = [
  { initials: "DR", name: "Dinitha Rathnayaka", email: "candidate@talentflow.demo", role: "Candidate" },
  { initials: "SJ", name: "Sarah Johnson", email: "recruiter@talentflow.demo", role: "Recruiter" },
  { initials: "MC", name: "Michael Chen", email: "manager@talentflow.demo", role: "Hiring Manager" },
  { initials: "SA", name: "System Administrator", email: "admin@talentflow.demo", role: "Administrator" },
];

export default function AdminDashboard() {
  return (
    <div className="role-dashboard">
      <header className="role-header">
        <div>
          <p className="eyebrow">Administrator workspace</p>
          <h1>Platform administration</h1>
          <p>
            Monitor accounts, permissions, recruitment activity and platform
            health from one secure workspace.
          </p>
        </div>
        <div className="role-user" aria-label="Signed in administrator">
          <span className="role-avatar amber" aria-hidden="true">SA</span>
          <span className="role-user-copy"><strong>System Administrator</strong><small>Administrator</small></span>
        </div>
      </header>

      <section className="role-stat-grid" aria-label="Administration summary">
        <article className="role-stat">
          <span className="role-stat-icon" aria-hidden="true">◎</span>
          <span className="role-stat-copy"><strong>4</strong><small>Total users</small></span>
        </article>
        <article className="role-stat">
          <span className="role-stat-icon purple" aria-hidden="true">◇</span>
          <span className="role-stat-copy"><strong>4</strong><small>Active accounts</small></span>
        </article>
        <article className="role-stat">
          <span className="role-stat-icon green" aria-hidden="true">▥</span>
          <span className="role-stat-copy"><strong>2</strong><small>Departments</small></span>
        </article>
        <article className="role-stat">
          <span className="role-stat-icon amber" aria-hidden="true">⌁</span>
          <span className="role-stat-copy"><strong>12</strong><small>Audit events</small></span>
        </article>
      </section>

      <section className="health-strip" aria-label="Platform health">
        <div>
          <strong><span className="health-dot" aria-hidden="true" />All systems operational</strong>
          <p>ASP.NET API, SQL Server, authentication and matching services responded successfully.</p>
        </div>
        <span className="role-status green">Live health check</span>
      </section>

      <div className="role-layout">
        <section className="role-panel" aria-labelledby="users-title">
          <div className="role-section-heading">
            <div>
              <p className="eyebrow">Access control</p>
              <h2 id="users-title">User management</h2>
            </div>
            <Link className="role-text-button" to="/user-management">Manage users →</Link>
          </div>
          <div className="role-table-wrap">
            <table className="role-table">
              <thead><tr><th>User</th><th>Role</th><th>Status</th></tr></thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.email}>
                    <td>
                      <span className="role-table-person">
                        <span className="mini-avatar" aria-hidden="true">{user.initials}</span>
                        <span><strong>{user.name}</strong><small>{user.email}</small></span>
                      </span>
                    </td>
                    <td>{user.role}</td>
                    <td><span className="role-status green">Active</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="role-panel" aria-labelledby="activity-title">
          <div className="role-section-heading">
            <div>
              <p className="eyebrow">Security</p>
              <h2 id="activity-title">Recent activity</h2>
            </div>
          </div>
          <div className="activity-list">
            <article className="activity-item"><span className="mini-avatar">✓</span><div><h3>Administrator login</h3><p>Successful JWT authentication · just now</p></div></article>
            <article className="activity-item"><span className="mini-avatar">DB</span><div><h3>Database migration</h3><p>Initial schema applied successfully</p></div></article>
            <article className="activity-item"><span className="mini-avatar">CI</span><div><h3>Continuous integration</h3><p>Backend tests and frontend build passed</p></div></article>
          </div>
        </aside>
      </div>
    </div>
  );
}
