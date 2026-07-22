import { NavLink, Outlet } from "react-router-dom";
import "../App.css";

const navigation = [
  { to: "/", label: "Home", end: true },
  { to: "/candidate", label: "Candidate" },
  { to: "/recruiter", label: "Recruiter" },
  { to: "/manager", label: "Hiring Manager" },
  { to: "/admin", label: "Administrator" },
];

export default function AppShell() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <aside className="sidebar">
        <div className="brand"><span className="brand-icon" aria-hidden="true">✦</span><span>TalentFlow AI</span></div>
        <nav className="navigation" aria-label="Main navigation">
          {navigation.map((item) => <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>{item.label}</NavLink>)}
        </nav>
      </aside>
      <div className="workspace">
        <header className="topbar"><div><strong>TalentFlow AI</strong><span className="topbar-subtitle">Team workspace</span></div><span className="status-badge">Development</span></header>
        <main className="content" id="main-content" tabIndex="-1"><Outlet /></main>
      </div>
    </div>
  );
}
