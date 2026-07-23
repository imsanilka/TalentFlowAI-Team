import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { getRoleHome } from "../auth/authContext";
import "./login.css";

export default function LoginPage() {
  const { isAuthenticated, user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to={getRoleHome(user.role)} replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await login(email.trim(), password);
      navigate(getRoleHome(response.user.role), { replace: true });
    } catch (requestError) {
      setError(
        requestError.message.includes("401")
          ? "The email or password is incorrect."
          : requestError.message,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-brand-panel" aria-label="TalentFlow AI introduction">
        <div className="login-brand">
          <span className="login-logo" aria-hidden="true">✦</span>
          <span><strong>TalentFlow AI</strong><small>Secure recruitment platform</small></span>
        </div>
        <div className="login-message">
          <p className="login-eyebrow">Intelligent talent operations</p>
          <h1>Connect exceptional people with meaningful work.</h1>
          <p>
            One secure platform for candidate discovery, recruitment operations,
            structured interviews and workforce insight.
          </p>
        </div>
        <div className="login-assurance">
          <span><strong>4</strong> role workspaces</span>
          <span><strong>JWT</strong> secure sessions</span>
          <span><strong>24/7</strong> audit visibility</span>
        </div>
      </section>

      <section className="login-form-panel">
        <div className="login-form-wrap">
          <p className="login-secure-label"><span aria-hidden="true">◇</span> Secure workspace</p>
          <h2>Welcome back</h2>
          <p className="login-subtitle">Sign in to continue to your recruitment workspace.</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="login-email">Email address</label>
              <input
                id="login-email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                placeholder="name@company.com"
                required
              />
            </div>
            <div className="login-field">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                placeholder="Enter your password"
                minLength="8"
                required
              />
            </div>

            {error && <p className="login-error" role="alert">{error}</p>}

            <button className="login-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in…" : "Sign in securely"} <span aria-hidden="true">→</span>
            </button>
          </form>

          <div className="login-security-note">
            <span aria-hidden="true">▣</span>
            <span><strong>Protected access</strong><small>JWT authentication and role-based authorization</small></span>
          </div>
        </div>
      </section>
    </main>
  );
}
