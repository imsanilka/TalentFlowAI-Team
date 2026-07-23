import { useState } from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";

export default function InterviewEvaluation() {
  const [submitted, setSubmitted] = useState(false);

  function submitEvaluation(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="role-dashboard">
      <header className="role-header">
        <div>
          <p className="eyebrow">Structured assessment</p>
          <h1>Interview evaluation</h1>
          <p>Record consistent, evidence-based feedback for the hiring decision.</p>
        </div>
        <Link className="role-action-secondary" to="/manager">← Hiring manager</Link>
      </header>

      <div className="role-layout">
        <form className="role-panel role-form" onSubmit={submitEvaluation}>
          <div className="role-section-heading">
            <div><p className="eyebrow">Candidate</p><h2>Dinitha Rathnayaka</h2><p>Frontend Engineer · Interview panel evaluation</p></div>
            <span className="role-status purple">In progress</span>
          </div>

          <div className="role-form-grid">
            <div className="role-field">
              <label htmlFor="technical-score">Technical capability</label>
              <select id="technical-score" defaultValue="4" required>
                <option value="">Select score</option>
                {[1, 2, 3, 4, 5].map((score) => <option value={score} key={score}>{score} / 5</option>)}
              </select>
            </div>
            <div className="role-field">
              <label htmlFor="communication-score">Communication</label>
              <select id="communication-score" defaultValue="4" required>
                <option value="">Select score</option>
                {[1, 2, 3, 4, 5].map((score) => <option value={score} key={score}>{score} / 5</option>)}
              </select>
            </div>
            <div className="role-field">
              <label htmlFor="problem-score">Problem solving</label>
              <select id="problem-score" defaultValue="5" required>
                <option value="">Select score</option>
                {[1, 2, 3, 4, 5].map((score) => <option value={score} key={score}>{score} / 5</option>)}
              </select>
            </div>
            <div className="role-field">
              <label htmlFor="culture-score">Team contribution</label>
              <select id="culture-score" defaultValue="4" required>
                <option value="">Select score</option>
                {[1, 2, 3, 4, 5].map((score) => <option value={score} key={score}>{score} / 5</option>)}
              </select>
            </div>
            <div className="role-field full">
              <label htmlFor="evaluation-feedback">Evidence and feedback</label>
              <textarea id="evaluation-feedback" rows="6" placeholder="Describe demonstrated strengths, risks and supporting interview evidence." required />
            </div>
            <div className="role-field full">
              <label htmlFor="recommendation">Hiring recommendation</label>
              <select id="recommendation" defaultValue="" required>
                <option value="" disabled>Select recommendation</option>
                <option>Strong hire</option>
                <option>Hire</option>
                <option>Further review</option>
                <option>Do not hire</option>
              </select>
            </div>
          </div>

          {submitted && <p className="role-success" role="status">✓ Evaluation saved successfully.</p>}
          <div className="role-form-actions">
            <button className="role-action-secondary" type="submit">Submit evaluation</button>
          </div>
        </form>

        <aside className="role-panel" aria-labelledby="guidance-title">
          <div className="role-section-heading"><div><p className="eyebrow">Guidance</p><h2 id="guidance-title">Fair evaluation</h2></div></div>
          <div className="activity-list">
            <article className="activity-item"><span className="mini-avatar">1</span><div><h3>Use observed evidence</h3><p>Score behaviour demonstrated during the interview.</p></div></article>
            <article className="activity-item"><span className="mini-avatar">2</span><div><h3>Apply consistent criteria</h3><p>Use the same role requirements for every candidate.</p></div></article>
            <article className="activity-item"><span className="mini-avatar">3</span><div><h3>Review AI responsibly</h3><p>AI ranking supports—not replaces—the final decision.</p></div></article>
          </div>
        </aside>
      </div>
    </div>
  );
}
