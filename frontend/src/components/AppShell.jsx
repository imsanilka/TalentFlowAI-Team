import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { getRoleHome } from "../auth/authContext";
import "../App.css";

const roleNavigation = {
  Candidate: [
    { to: "/candidate", label: "Overview", icon: "⌂", end: true },
  ],
  Recruiter: [
    { to: "/recruiter", label: "Overview", icon: "⌂", end: true },
    { to: "/application-status", label: "Hiring pipeline", icon: "▤" },
  ],
  HiringManager: [
    { to: "/manager", label: "Overview", icon: "⌂", end: true },
    { to: "/interview-evaluation", label: "Evaluations", icon: "✓" },
  ],
  Administrator: [
    { to: "/admin", label: "Overview", icon: "⌂", end: true },
    { to: "/user-management", label: "User management", icon: "◎" },
  ],
};

function formatRole(role) {
  return role === "HiringManager" ? "Hiring Manager" : role;
}

export default function AppShell() {
  const { user, logout } = useAuth();
  const navigation = roleNavigation[user.role] ?? [];
  const initials = user.fullName
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <aside className="sidebar">
        <div>
          <div className="brand">
            <NavLink className="brand-icon" to={getRoleHome(user.role)} aria-label="TalentFlow AI home">✦</NavLink>
            <span className="brand-copy"><strong>TalentFlow AI</strong><small>Recruitment platform</small></span>
          </div>
          <p className="nav-label">{formatRole(user.role)} workspace</p>
          <nav className="navigation" aria-label="Main navigation">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                <span className="nav-icon" aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="sidebar-account">
          <div className="sidebar-user">
            <span className="account-avatar" aria-hidden="true">{initials}</span>
            <span><strong>{user.fullName}</strong><small>{formatRole(user.role)}</small></span>
          </div>
          <button className="logout-button" type="button" onClick={logout}>
            <span aria-hidden="true">↪</span> Sign out
          </button>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <div><strong>TalentFlow AI</strong><span className="topbar-subtitle">Secure {formatRole(user.role).toLowerCase()} workspace</span></div>
          <div className="topbar-account">
            <span className="status-badge"><span aria-hidden="true">●</span> System online</span>
            <span className="topbar-user"><strong>{user.fullName}</strong><small>{formatRole(user.role)}</small></span>
          </div>
        </header>
        <main className="content" id="main-content" tabIndex="-1"><Outlet /></main>
      </div>
    </div>
  );
}
