import { NavLink, Outlet } from "react-router-dom";
import "../App.css";

const navigation = [
  { to: "/", label: "Home", icon: "⌂", end: true },
  { to: "/candidate", label: "Candidate", icon: "◉" },
  { to: "/recruiter", label: "Recruiter", icon: "▣" },
  { to: "/manager", label: "Hiring Manager", icon: "◇" },
  { to: "/admin", label: "Administrator", icon: "⚙" },
];

export default function AppShell() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <aside className="sidebar">
        <div>
          <div className="brand">
            <span className="brand-icon" aria-hidden="true">✦</span>
            <span className="brand-copy"><strong>TalentFlow AI</strong><small>Recruitment platform</small></span>
          </div>
          <p className="nav-label">Workspaces</p>
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
        <div className="sidebar-footer">
          <span className="sidebar-status" aria-hidden="true" />
          <span><strong>Talent intelligence online</strong><small>Data synchronized securely</small></span>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <div><strong>TalentFlow AI</strong><span className="topbar-subtitle">Secure team workspace</span></div>
          <span className="status-badge"><span aria-hidden="true">●</span> System online</span>
        </header>
        <main className="content" id="main-content" tabIndex="-1"><Outlet /></main>
      </div>
    </div>
  );
}
