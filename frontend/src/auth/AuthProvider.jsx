import { useCallback, useEffect, useMemo, useState } from "react";
import { apiRequest } from "../services/api";
import { AuthContext } from "./authContext";

const SESSION_KEY = "talentflow_auth";
const TOKEN_KEY = "talentflow_token";

function readStoredSession() {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (!stored) return null;

    const session = JSON.parse(stored);
    const expiresAt = Date.parse(session.expiresAtUtc);

    if (!session.accessToken || !session.user || !expiresAt || expiresAt <= Date.now()) {
      sessionStorage.removeItem(SESSION_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
      return null;
    }

    sessionStorage.setItem(TOKEN_KEY, session.accessToken);
    return session;
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    return null;
  }
}

export default function AuthProvider({ children }) {
  const [session, setSession] = useState(readStoredSession);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    setSession(null);
  }, []);

  const login = useCallback(async (email, password) => {
    const response = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    sessionStorage.setItem(SESSION_KEY, JSON.stringify(response));
    sessionStorage.setItem(TOKEN_KEY, response.accessToken);
    setSession(response);
    return response;
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => logout();
    window.addEventListener("talentflow:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("talentflow:unauthorized", handleUnauthorized);
  }, [logout]);

  useEffect(() => {
    if (!session?.expiresAtUtc) return undefined;

    const remaining = Date.parse(session.expiresAtUtc) - Date.now();
    const timeout = window.setTimeout(logout, Math.max(0, remaining));
    return () => window.clearTimeout(timeout);
  }, [session, logout]);

  const value = useMemo(() => ({
    session,
    user: session?.user ?? null,
    isAuthenticated: Boolean(session?.accessToken && session?.user),
    login,
    logout,
  }), [session, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
