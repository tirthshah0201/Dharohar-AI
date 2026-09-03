"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

/* ========================================
   Astrova — Auth Context
   ========================================
   Manages user authentication state.
   Reads session from cookie-backed /api/auth/me.
   ======================================== */

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/proxy/auth/me", { credentials: "include" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setUser(json.data);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  }, []);

  // Check session on mount
  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch("/api/proxy/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error?.message || "Login failed");
    }
    setUser(json.data);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const res = await fetch("/api/proxy/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error?.message || "Registration failed");
    }
    setUser(json.data);
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/proxy/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Logout should clear client state even if server call fails
    }
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
