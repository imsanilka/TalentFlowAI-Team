import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthProvider from "./auth/AuthProvider";
import ProtectedRoute from "./auth/ProtectedRoute";
import RoleHomeRedirect from "./auth/RoleHomeRedirect";
import AppShell from "./components/AppShell";
import CandidateWorkspace from "./pages/candidate/CandidateWorkspace";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import HiringManagerDashboard from "./pages/HiringManagerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ApplicationStatus from "./pages/ApplicationStatus";
import InterviewEvaluation from "./pages/InterviewEvaluation";
import LoginPage from "./pages/LoginPage";
import UserManagement from "./pages/UserManagement";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AppShell />}>
              <Route index element={<RoleHomeRedirect />} />

              <Route element={<ProtectedRoute allowedRoles={["Candidate"]} />}>
                <Route path="candidate/*" element={<CandidateWorkspace />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={["Recruiter"]} />}>
                <Route path="recruiter/*" element={<RecruiterDashboard />} />
                <Route path="application-status" element={<ApplicationStatus />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={["HiringManager"]} />}>
                <Route path="manager/*" element={<HiringManagerDashboard />} />
                <Route path="interview-evaluation" element={<InterviewEvaluation />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={["Administrator"]} />}>
                <Route path="admin/*" element={<AdminDashboard />} />
                <Route path="user-management" element={<UserManagement />} />
              </Route>

              <Route path="*" element={<RoleHomeRedirect />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
