import { createContext } from "react";

export const AuthContext = createContext(null);

export const ROLE_HOME = {
  Candidate: "/candidate",
  Recruiter: "/recruiter",
  HiringManager: "/manager",
  Administrator: "/admin",
};

export function getRoleHome(role) {
  return ROLE_HOME[role] ?? "/login";
}
