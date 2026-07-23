import { useState } from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";

const stages = ["Applied", "Screening", "Shortlisted", "Interview", "Offer", "Hired"];

export default function ApplicationStatus() {
  const [status, setStatus] = useState("Shortlisted");
  const [saved, setSaved] = useState(false);

  function updateStatus(event) {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="role-dashboard">
      <header className="role-header">
        <div>
          <p className="eyebrow">Recruitment pipeline</p>
          <h1>Application status</h1>
          <p>Move candidates through the approved recruitment workflow.</p>
        </div>
        <Link className="role-action-secondary" to="/recruiter">← Recruiter dashboard</Link>
      </header>

      <div className="role-layout">
        <section className="role-panel" aria-labelledby="application-title">
          <div className="role-section-heading">
            <div>
              <p className="eyebrow">Application TF-0021</p>
              <h2 id="application-title">Dinitha Rathnayaka</h2>
              <p>Frontend Engineer · 92% AI match</p>
            </div>
            <span className="role-status green">{status}</span>
          </div>

          <form className="status-control" onSubmit={updateStatus}>
            <div className="role-field">
              <label htmlFor="application-status">Current pipeline stage</label>
              <select id="application-status" value={status} onChange={(event) => setStatus(event.target.value)}>
                {stages.map((stage) => <option key={stage}>{stage}</option>)}
              </select>
            </div>
            <button className="role-action-secondary" type="submit">Save status</button>
          </form>
          {saved && <p className="role-success" role="status">✓ Application status updated successfully.</p>}
        </section>

        <aside className="role-panel" aria-labelledby="history-title">
          <div className="role-section-heading">
            <div><p className="eyebrow">Audit trail</p><h2 id="history-title">Status history</h2></div>
          </div>
          <ol className="status-history">
            <li><strong>Shortlisted</strong>23 July 2026 · Sarah Johnson</li>
            <li><strong>Screening completed</strong>22 July 2026 · AI ranking service</li>
            <li><strong>Application received</strong>21 July 2026 · Candidate portal</li>
          </ol>
        </aside>
      </div>
    </div>
  );
}
