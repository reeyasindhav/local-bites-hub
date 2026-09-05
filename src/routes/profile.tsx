import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, InkButton, Reveal, RequireAuth, Shell, StallCard, Tag } from "@/components/site";
import { reviews, stalls } from "@/lib/data";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My profile — Localbite" },
      {
        name: "description",
        content: "Your Localbite profile — saved stalls, reviews and community activity.",
      },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, saved } = useAuth();

  const savedStalls = stalls.filter((s) => saved.includes(s.id));
  const firstName = user?.name.split(" ")[0] ?? "Localbite";
  const initials = user?.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() ?? "LB";

  return (
    <RequireAuth>
      <Shell>
        <section className="paper border-b-2 border-ink">
          <div className="mx-auto max-w-7xl px-5 py-14">
            <Reveal>
              <div className="flex flex-col gap-6 md:flex-row md:items-center">
                <div className="ink-border grid size-24 shrink-0 place-items-center rounded-full bg-chilli font-display text-4xl text-cream shadow-hard-lg md:size-32">
                  {initials}
                </div>
                <div className="flex-1">
                  <Eyebrow dot="bg-turmeric">Your profile</Eyebrow>
                  <h1 className="mt-3 text-4xl md:text-6xl">
                    {user?.name ?? "Hello, foodie."}
                  </h1>
                  {user && (
                    <p className="mt-2 text-muted-foreground">
                      {user.email} · {user.city}
                    </p>
                  )}
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Tag tone="ink">{savedStalls.length} saved</Tag>
                    <Tag tone="turmeric">Member since 2026</Tag>
                    <Tag tone="cream">{user?.city ?? "India"}</Tag>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <InkButton to="/dashboard">Dashboard →</InkButton>
                  <Link
                    to="/saved"
                    className="eyebrow ink-border bg-cream px-4 py-3 shadow-hard-sm lift"
                  >
                    My saved
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-b-2 border-ink bg-cobalt text-cream">
          <div className="mx-auto max-w-7xl px-5 py-14">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <Eyebrow dot="bg-chilli">Saved stalls</Eyebrow>
                  <h2 className="mt-3 text-4xl md:text-5xl">Hi {firstName}, here’s your bite list.</h2>
                  <p className="mt-2 text-sm text-cream/70">
                    {savedStalls.length === 0
                      ? "Star stalls from the Discover page to add them here."
                      : `${savedStalls.length} ${savedStalls.length === 1 ? "stall" : "stalls"} you've saved for your next run.`}
                  </p>
                </div>
                <Link to="/saved" className="eyebrow border-b-2 border-cream pb-0.5 hover:text-chilli">
                  View all →
                </Link>
              </div>
            </Reveal>

            {savedStalls.length > 0 ? (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {savedStalls.slice(0, 3).map((s, i) => (
                  <StallCard key={s.id} stall={s} index={i} />
                ))}
              </div>
            ) : (
              <Reveal delay={100}>
                <div className="ink-border bg-cream/10 p-10 text-center">
                  <p className="text-lg">No saves yet.</p>
                  <p className="mt-2 text-sm text-cream/70">
                    Tap ☆ on any stall from <Link to="/discover" className="underline">Discover</Link>.
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </section>

        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-7xl px-5 py-14">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <Eyebrow>My reviews</Eyebrow>
                  <h2 className="mt-3 text-4xl md:text-5xl">What you’ve been saying.</h2>
                </div>
                <Link
                  to="/discover"
                  className="eyebrow border-b-2 border-ink pb-0.5 hover:text-chilli"
                >
                  Write a review →
                </Link>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Reveal>
                <div className="ink-border shadow-hard lift h-full bg-card p-8 text-center">
                  <p className="eyebrow text-muted-foreground">No reviews yet</p>
                  <p className="mt-3 text-lg">Reviews you post will appear here.</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    In this demo, reviews are mock data — but the UI is wired and ready.
                  </p>
                </div>
              </Reveal>
              {reviews.slice(0, 3).map((r, i) => (
                <Reveal key={r.id} delay={i * 80}>
                  <article className="ink-border shadow-hard lift h-full bg-background p-5">
                    <p className="eyebrow text-muted-foreground">Sample review</p>
                    <div className="mt-2 eyebrow text-chilli">{"★".repeat(r.rating)}</div>
                    <blockquote className="mt-2 text-sm">“{r.text}”</blockquote>
                    <p className="mt-4 border-t-2 border-dashed border-ink/25 pt-3 text-xs text-muted-foreground">
                      {r.user} · {r.stall} · {r.date}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-card">
          <div className="mx-auto max-w-7xl px-5 py-14">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <Eyebrow dot="bg-turmeric">Stats</Eyebrow>
                  <h2 className="mt-3 text-4xl md:text-5xl">Your Localbite in numbers.</h2>
                </div>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {[
                { value: savedStalls.length, label: "Stalls saved" },
                { value: 0, label: "Reviews posted" },
                { value: 0, label: "Trails completed" },
                { value: 0, label: "Followers" },
              ].map((s, i) => (
                <Reveal key={s.label} delay={i * 60}>
                  <div className="ink-border lift bg-background p-5 shadow-hard-sm">
                    <p className="font-display text-4xl">{s.value}</p>
                    <p className="eyebrow mt-1 text-muted-foreground">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Shell>
    </RequireAuth>
  );
}
