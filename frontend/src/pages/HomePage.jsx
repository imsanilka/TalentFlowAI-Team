const workspaces = [
  {
    title: "Candidate",
    description: "Discover jobs, manage a profile and track applications.",
  },
  {
    title: "Recruiter",
    description: "Publish jobs, review candidates and manage the pipeline.",
  },
  {
    title: "Hiring Manager",
    description: "Review finalists, conduct evaluations and record decisions.",
  },
  {
    title: "Administrator",
    description: "Manage users, permissions, audit events and platform health.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="page-heading">
        <p className="eyebrow">TalentFlow AI</p>
        <h1>Smarter talent decisions</h1>
        <p>
          A role-based recruitment platform powered by explainable candidate
          matching and structured hiring workflows.
        </p>
      </section>

      <section className="workspace-grid" aria-label="Application workspaces">
        {workspaces.map((workspace) => (
          <article className="workspace-card" key={workspace.title}>
            <div className="card-icon" aria-hidden="true">
              ✦
            </div>
            <h2>{workspace.title}</h2>
            <p>{workspace.description}</p>
          </article>
        ))}
      </section>
    </>
  );
}
