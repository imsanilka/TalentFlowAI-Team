import React from "react";

function RecruiterDashboard() {
  return (
    <div className="dashboard">
      <h1>Recruiter Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h3>Open Jobs</h3>
          <p>10</p>
        </div>

        <div className="card">
          <h3>Total Applicants</h3>
          <p>120</p>
        </div>

        <div className="card">
          <h3>Shortlisted Candidates</h3>
          <p>25</p>
        </div>

        <div className="card">
          <h3>Pending Interviews</h3>
          <p>8</p>
        </div>
      </div>

      <h2>Recent Applications</h2>

      <table>
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Job</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>John Smith</td>
            <td>Software Engineer</td>
            <td>Screening</td>
          </tr>

          <tr>
            <td>Sarah Lee</td>
            <td>UI/UX Designer</td>
            <td>Interview</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default RecruiterDashboard;