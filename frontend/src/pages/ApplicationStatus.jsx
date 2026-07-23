

      import { useState } from "react";

export default function ApplicationStatus() {

  const [status, setStatus] = useState("Pending");

  return (
    <div>
      <h1>Application Status Control</h1>

      <h3>Candidate: John Smith</h3>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Applied</option>
        <option>Reviewing</option>
        <option>Shortlisted</option>
        <option>Interview</option>
        <option>Accepted</option>
        <option>Rejected</option>
      </select>

      <h3>Current Status: {status}</h3>
    </div>
  );
}