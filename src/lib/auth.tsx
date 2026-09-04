import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type User = { name: string; email: string; city: string };

type AuthValue = {
  user: User | null;
  ready: boolean;
  signIn: (email: string, name?: string, city?: string) => User;
  signOut: () => void;
  saved: string[];
  toggleSave: (id: string) => void;
};

const KEY = "localbite.user";
const SAVED_KEY = "localbite.saved";

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw) as User);
      const s = localStorage.getItem(SAVED_KEY);
      if (s) setSaved(JSON.parse(s) as string[]);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const value = useMemo<AuthValue>(
    () => ({
      user,
      ready,
      saved,
      signIn: (email, name, city) => {
        const next: User = {
          email,
          name: name?.trim() || email.split("@")[0].replace(/[._]/g, " "),
          city: city || "Mumbai",
        };
        localStorage.setItem(KEY, JSON.stringify(next));
        setUser(next);
        return next;
      },
      signOut: () => {
        localStorage.removeItem(KEY);
        setUser(null);
      },
      toggleSave: (id) => {
        setSaved((prev) => {
          const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
          localStorage.setItem(SAVED_KEY, JSON.stringify(next));
          return next;
        });
      },
    }),
    [user, ready, saved],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
