import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { Eyebrow, InkButton, Reveal, Shell, Tag } from "@/components/site";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Localbite" },
      {
        name: "description",
        content: "Log in to save stalls, track reviews and build your street food feed.",
      },
    ],
  }),
  component: LoginPage,
  beforeLoad: () => {
    const raw = typeof localStorage !== "undefined" ? localStorage.getItem("localbite.user") : null;
    if (raw) throw redirect({ to: "/dashboard" });
  },
});

function LoginPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Enter your email to continue.");
      return;
    }
    signIn(email.trim(), name.trim() || undefined, city.trim() || undefined);
    window.location.href = "/dashboard";
  };

  return (
    <Shell>
      <section className="paper border-b-2 border-ink">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:py-24">
          <Reveal>
            <div>
              <Eyebrow>Welcome back</Eyebrow>
              <h1 className="mt-5 text-5xl md:text-7xl">
                Log in to <span className="text-chilli">Localbite.</span>
              </h1>
              <p className="mt-5 max-w-md text-muted-foreground">
                Save your favourite carts, keep track of reviews and get a personalised feed of new stalls near you.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                <Tag>Free forever</Tag>
                <Tag tone="turmeric">No credit card</Tag>
                <Tag tone="cream">Community only</Tag>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="ink-border shadow-hard-lg bg-card p-6 md:p-8">
              <form onSubmit={submit} className="space-y-5">
                <div>
                  <label className="eyebrow text-xs uppercase tracking-wide text-muted-foreground">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-2 w-full bg-transparent px-4 py-3 ink-border outline-none placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="eyebrow text-xs uppercase tracking-wide text-muted-foreground">Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="How should we call you?"
                    className="mt-2 w-full bg-transparent px-4 py-3 ink-border outline-none placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="eyebrow text-xs uppercase tracking-wide text-muted-foreground">Home city</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-2 w-full bg-transparent px-4 py-3 ink-border outline-none"
                  >
                    {["Mumbai", "Delhi", "Kolkata", "Chennai", "Pune", "Patna"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {error && (
                  <p className="text-sm text-chilli">{error}</p>
                )}

                <InkButton type="submit" full>
                  Log in →
                </InkButton>

                <p className="text-center text-xs text-muted-foreground">
                  No password needed — this is a local demo session.
                </p>

                <p className="text-center text-[11px] text-muted-foreground">
                  By logging in you accept the{" "}
                  <Link to="/privacy" className="border-b-2 border-ink hover:text-chilli">
                    Privacy Policy
                  </Link>{" "}
                  and the{" "}
                  <Link to="/terms" className="border-b-2 border-ink hover:text-chilli">
                    Terms of Service
                  </Link>
                  .
                </p>
              </form>

              <div className="mt-6 border-t-2 border-dashed border-ink/25 pt-5 text-center">
                <p className="text-sm text-muted-foreground">
                  New here?{" "}
                  <Link to="/signup" className="eyebrow border-b-2 border-ink pb-0.5 hover:text-chilli">
                    Create an account
                  </Link>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Shell>
  );
}
