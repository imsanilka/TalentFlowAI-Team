import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell";
import HomePage from "./pages/HomePage";
import RolePlaceholder from "./pages/RolePlaceholder";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />

          <Route
            path="candidate/*"
            element={
              <RolePlaceholder
                title="Candidate workspace"
                owner="candidate frontend"
              />
            }
          />

          <Route
            path="recruiter/*"
            element={
              <RolePlaceholder
                title="Recruiter workspace"
                owner="staff frontend"
              />
            }
          />

          <Route
            path="manager/*"
            element={
              <RolePlaceholder
                title="Hiring manager workspace"
                owner="staff frontend"
              />
            }
          />

          <Route
            path="admin/*"
            element={
              <RolePlaceholder
                title="Administrator workspace"
                owner="staff frontend"
              />
            }
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

