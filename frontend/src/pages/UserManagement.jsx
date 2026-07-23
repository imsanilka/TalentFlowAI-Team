import { useState } from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";

const initialUsers = [
  { id: 1, initials: "DR", name: "Dinitha Rathnayaka", email: "candidate@talentflow.demo", role: "Candidate", active: true },
  { id: 2, initials: "SJ", name: "Sarah Johnson", email: "recruiter@talentflow.demo", role: "Recruiter", active: true },
  { id: 3, initials: "MC", name: "Michael Chen", email: "manager@talentflow.demo", role: "Hiring Manager", active: true },
  { id: 4, initials: "SA", name: "System Administrator", email: "admin@talentflow.demo", role: "Administrator", active: true },
];

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers);

  function toggleUser(id) {
    setUsers((current) => current.map((user) => user.id === id ? { ...user, active: !user.active } : user));
  }

  return (
    <div className="role-dashboard">
      <header className="role-header">
        <div>
          <p className="eyebrow">Role-based access control</p>
          <h1>User management</h1>
          <p>Review demo accounts and safely control platform access.</p>
        </div>
        <Link className="role-action-secondary" to="/admin">← Administrator dashboard</Link>
      </header>

      <section className="role-panel" aria-labelledby="account-title">
        <div className="role-section-heading">
          <div><p className="eyebrow">Platform accounts</p><h2 id="account-title">Active directory</h2><p>{users.filter((user) => user.active).length} of {users.length} accounts active</p></div>
          <button className="role-action-secondary" type="button">+ Add account</button>
        </div>

        <div className="role-table-wrap">
          <table className="role-table">
            <thead><tr><th>User</th><th>Role</th><th>Status</th><th>Control</th></tr></thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <span className="role-table-person">
                      <span className="mini-avatar" aria-hidden="true">{user.initials}</span>
                      <span><strong>{user.name}</strong><small>{user.email}</small></span>
                    </span>
                  </td>
                  <td>{user.role}</td>
                  <td><span className={`role-status ${user.active ? "green" : "amber"}`}>{user.active ? "Active" : "Inactive"}</span></td>
                  <td><button className="role-text-button" type="button" onClick={() => toggleUser(user.id)}>{user.active ? "Deactivate" : "Activate"}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
