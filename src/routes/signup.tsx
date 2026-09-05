import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { Eyebrow, InkButton, Reveal, Shell, Tag } from "@/components/site";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign up — Localbite" },
      {
        name: "description",
        content: "Join Localbite to discover street food stalls, save favourites and share reviews.",
      },
    ],
  }),
  component: SignupPage,
  beforeLoad: () => {
    const raw = typeof localStorage !== "undefined" ? localStorage.getItem("localbite.user") : null;
    if (raw) throw redirect({ to: "/dashboard" });
  },
});

function SignupPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Enter your email to get started.");
      return;
    }
    if (!agree) {
      setError("Please agree to the privacy policy and terms to continue.");
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
              <Eyebrow dot="bg-turmeric">Join the hunt</Eyebrow>
              <h1 className="mt-5 text-5xl md:text-7xl">
                Sign up for <span className="text-chilli">Localbite.</span>
              </h1>
              <p className="mt-5 max-w-md text-muted-foreground">
                Create your account to save stalls, build trails and share real reviews from the queue.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                <Tag tone="turmeric">Free account</Tag>
                <Tag>1,240 stalls</Tag>
                <Tag tone="cream">18k reviews</Tag>
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
                    placeholder="What should we call you?"
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

                <label className="flex cursor-pointer items-start gap-3 border-y-2 border-dashed border-ink/25 py-4 text-xs text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="ink-border mt-0.5 size-5 shrink-0 cursor-pointer accent-chilli"
                    aria-required="true"
                  />
                  <span>
                    I agree to the{" "}
                    <Link
                      to="/privacy"
                      target="_blank"
                      rel="noopener"
                      className="border-b-2 border-ink pb-0.5 text-foreground hover:text-chilli"
                    >
                      Privacy Policy
                    </Link>{" "}
                    and the{" "}
                    <Link
                      to="/terms"
                      target="_blank"
                      rel="noopener"
                      className="border-b-2 border-ink pb-0.5 text-foreground hover:text-chilli"
                    >
                      Terms of Service
                    </Link>
                    , and I'm fine with Localbite storing my email and city to power my account.
                  </span>
                </label>

                <InkButton type="submit" full>
                  Create account →
                </InkButton>

                <p className="text-center text-xs text-muted-foreground">
                  No password needed for this demo — just pick your city and start exploring.
                </p>
              </form>

              <div className="mt-6 border-t-2 border-dashed border-ink/25 pt-5 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="eyebrow border-b-2 border-ink pb-0.5 hover:text-chilli">
                    Log in
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
