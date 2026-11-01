"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

/** Currently signed-in volunteer. `avatar` is optional — UI falls back to initials. */
export type AuthUser = {
  name: string;
  email: string;
  avatar?: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  /** True once localStorage has been checked on the client (avoids SSR flicker). */
  hydrated: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "kindora-user";

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

/**
 * Demo auth provider for Kindora.
 * No backend yet — sign-in state lives in localStorage so the Navbar,
 * dropdown menu and protected routes behave like a real app.
 * TODO: replace with real session handling once auth is wired up.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUser(readStoredUser());
    setHydrated(true);
  }, []);

  const login = useCallback((nextUser: AuthUser) => {
    setUser(nextUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    } catch {
      // Storage unavailable (private mode etc.) — session still works in-memory.
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore — mirror of the login failure path.
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, hydrated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
