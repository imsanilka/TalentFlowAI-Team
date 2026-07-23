import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { apiRequest } from "../services/api";
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

const minimumClosingDate = new Date(Date.now() + 86400000)
  .toISOString()
  .slice(0, 10);

export default function RecruiterDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [form, setForm] = useState({
    title: "",
    department: "",
    location: "",
    employmentType: "Full-time",
    skills: "",
    closingDate: "",
    description: "",
  });

  useEffect(() => {
    let isCurrent = true;

    apiRequest("/jobs/mine")
      .then((data) => {
        if (isCurrent) {
          setJobs(data);
        }
      })
      .catch((error) => {
        if (isCurrent) {
          setFeedback({ type: "error", message: error.message });
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape" && !isSubmitting) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isModalOpen, isSubmitting]);

  const initials = (user?.fullName ?? "Recruiter")
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const closeModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false);
    }
  };

  const createJob = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const createdJob = await apiRequest("/jobs", {
        method: "POST",
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          department: form.department,
          location: form.location,
          employmentType: form.employmentType,
          requiredSkills: form.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
          closingDate: form.closingDate || null,
        }),
      });

      setJobs((current) => [createdJob, ...current]);
      setFeedback({
        type: "success",
        message: `${createdJob.title} was published successfully.`,
      });
      setForm({
        title: "",
        department: "",
        location: "",
        employmentType: "Full-time",
        skills: "",
        closingDate: "",
        description: "",
      });
      setIsModalOpen(false);
    } catch (error) {
      setFeedback({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            {initials}
          </span>
          <span className="role-user-copy">
            <strong>{user?.fullName ?? "Recruiter"}</strong>
            <small>{user?.role ?? "Recruiter"}</small>
          </span>
        </div>
      </header>

      <section className="role-hero" aria-labelledby="recruiter-hero-title">
        <div>
          <p className="eyebrow">AI talent discovery</p>
          <h2 id="recruiter-hero-title">Find the right candidate faster</h2>
          <p>Rank applicants by skills, experience and role requirements.</p>
        </div>
        <button
          className="role-action"
          type="button"
          onClick={() => {
            setFeedback(null);
            setIsModalOpen(true);
          }}
        >
          + Create job
        </button>
      </section>

      {feedback && (
        <div
          className={`role-feedback ${feedback.type}`}
          role={feedback.type === "error" ? "alert" : "status"}
        >
          {feedback.message}
        </div>
      )}

      <section className="role-stat-grid" aria-label="Recruitment summary">
        <article className="role-stat">
          <span className="role-stat-icon" aria-hidden="true">▣</span>
          <span className="role-stat-copy"><strong>{jobs.length}</strong><small>Active jobs</small></span>
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
          <div className="published-jobs">
            <h3>Published jobs</h3>
            {jobs.length === 0 ? (
              <p className="role-empty">No jobs published yet.</p>
            ) : (
              jobs.slice(0, 3).map((job) => (
                <article className="published-job" key={job.id}>
                  <span className="mini-avatar" aria-hidden="true">
                    {job.title.slice(0, 2).toUpperCase()}
                  </span>
                  <div>
                    <h3>{job.title}</h3>
                    <p>{job.department} · {job.location}</p>
                  </div>
                </article>
              ))
            )}
          </div>
        </aside>
      </div>

      {isModalOpen && (
        <div
          className="role-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <section
            className="role-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-job-title"
          >
            <div className="role-modal-header">
              <div>
                <p className="eyebrow">New opportunity</p>
                <h2 id="create-job-title">Create a job</h2>
                <p>Publish a role for candidates to discover and apply.</p>
              </div>
              <button
                className="role-modal-close"
                type="button"
                aria-label="Close create job form"
                disabled={isSubmitting}
                onClick={closeModal}
              >
                ×
              </button>
            </div>

            <form className="role-form" onSubmit={createJob}>
              <div className="role-form-grid">
                <div className="role-field full">
                  <label htmlFor="job-title">Job title</label>
                  <input
                    id="job-title"
                    name="title"
                    value={form.title}
                    onChange={updateField}
                    maxLength="160"
                    autoFocus
                    required
                  />
                </div>
                <div className="role-field">
                  <label htmlFor="job-department">Department</label>
                  <input
                    id="job-department"
                    name="department"
                    value={form.department}
                    onChange={updateField}
                    maxLength="120"
                    required
                  />
                </div>
                <div className="role-field">
                  <label htmlFor="job-location">Location</label>
                  <input
                    id="job-location"
                    name="location"
                    value={form.location}
                    onChange={updateField}
                    maxLength="100"
                    placeholder="Colombo, Remote"
                    required
                  />
                </div>
                <div className="role-field">
                  <label htmlFor="job-type">Employment type</label>
                  <select
                    id="job-type"
                    name="employmentType"
                    value={form.employmentType}
                    onChange={updateField}
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
                <div className="role-field">
                  <label htmlFor="job-closing-date">Closing date</label>
                  <input
                    id="job-closing-date"
                    name="closingDate"
                    type="date"
                    value={form.closingDate}
                    min={minimumClosingDate}
                    onChange={updateField}
                  />
                </div>
                <div className="role-field full">
                  <label htmlFor="job-skills">Required skills</label>
                  <input
                    id="job-skills"
                    name="skills"
                    value={form.skills}
                    onChange={updateField}
                    placeholder="React, TypeScript, UI/UX"
                    required
                  />
                  <small>Separate each skill with a comma.</small>
                </div>
                <div className="role-field full">
                  <label htmlFor="job-description">Description</label>
                  <textarea
                    id="job-description"
                    name="description"
                    value={form.description}
                    onChange={updateField}
                    maxLength="3000"
                    rows="5"
                    required
                  />
                </div>
              </div>

              {feedback?.type === "error" && (
                <div className="role-feedback error" role="alert">
                  {feedback.message}
                </div>
              )}

              <div className="role-form-actions">
                <button
                  className="role-action-secondary"
                  type="button"
                  disabled={isSubmitting}
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="role-submit"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Publishing…" : "Publish job"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
