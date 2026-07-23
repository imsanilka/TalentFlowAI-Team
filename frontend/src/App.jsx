import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppShell from "./components/AppShell";
import HomePage from "./pages/HomePage";
import RolePlaceholder from "./pages/RolePlaceholder";

import RecruiterDashboard from "./pages/RecruiterDashboard";
import HiringManagerDashboard from "./pages/HiringManagerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import ApplicationStatus from "./pages/ApplicationStatus";
import InterviewEvaluation from "./pages/InterviewEvaluation";
import UserManagement from "./pages/UserManagement";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<AppShell />}>

          <Route index element={<HomePage />} />

          <Route
            path="candidate"
            element={
              <RolePlaceholder
                title="Candidate workspace"
                owner="candidate frontend"
              />
            }
          />

          <Route
            path="recruiter"
            element={<RecruiterDashboard />}
          />

          <Route
            path="manager"
            element={<HiringManagerDashboard />}
          />

          <Route
            path="admin"
            element={<AdminDashboard />}
          />

          <Route
            path="application-status"
            element={<ApplicationStatus />}
          />

          <Route
            path="interview-evaluation"
            element={<InterviewEvaluation />}
          />

          <Route
            path="user-management"
            element={<UserManagement />}
          />

          <Route
            path="*"
            element={
              <RolePlaceholder
                title="Page not found"
                owner="integration"
              />
            }
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}