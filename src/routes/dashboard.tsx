import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, InkButton, Reveal, RequireAuth, Shell, StallCard, Tag } from "@/components/site";
import { stalls } from "@/lib/data";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your feed — Localbite" },
      {
        name: "description",
        content: "Personalised feed of new stalls, saved bites and review activity.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { user, saved } = useAuth();

  const savedStalls = stalls.filter((s) => saved.includes(s.id));

  const nearby = user
    ? stalls.filter((s) => s.city === user.city && !saved.includes(s.id)).slice(0, 3)
    : [];

  const openNow = stalls.filter((s) => s.open && !saved.includes(s.id)).slice(0, 3);

  const recent = stalls
    .filter((s) => !saved.includes(s.id))
    .slice(0, 3);

  const recommendations =
    nearby.length > 0
      ? nearby
      : openNow.length > 0
        ? openNow
        : recent;

  return (
    <RequireAuth>
      <Shell>
        <section className="paper border-b-2 border-ink">
          <div className="mx-auto max-w-7xl px-5 py-12 lg:py-16">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <Eyebrow dot="bg-turmeric">Your feed</Eyebrow>
                  <h1 className="mt-3 text-5xl md:text-7xl">
                    {user ? (
                      <>
                        Hello, <span className="text-chilli">{user.name.split(" ")[0]}.</span>
                      </>
                    ) : (
                      <>
                        What’s <span className="text-chilli">cooking</span> nearby.
                      </>
                    )}
                  </h1>
                  {user && (
                    <p className="mt-3 max-w-lg text-muted-foreground">
                      Fresh picks from <span className="font-semibold text-foreground">{user.city}</span>, your saved bites, and what the queue is talking about.
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <InkButton to="/discover">Explore more →</InkButton>
                  <Link
                    to="/saved"
                    className="eyebrow ink-border bg-cream px-4 py-3 shadow-hard-sm lift"
                  >
                    My saved ({savedStalls.length})
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
                  <h2 className="mt-3 text-4xl md:text-5xl">Your bite list.</h2>
                  <p className="mt-2 text-sm text-cream/70">
                    {savedStalls.length === 0
                      ? "Stalls you star will land here for quick access."
                      : `${savedStalls.length} ${savedStalls.length === 1 ? "stall" : "stalls"} ready for your next hunger strike.`}
                  </p>
                </div>
                <Link to="/saved" className="eyebrow border-b-2 border-cream pb-0.5 hover:text-chilli">
                  View all saved →
                </Link>
              </div>
            </Reveal>

            {savedStalls.length ? (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {savedStalls.slice(0, 3).map((s, i) => (
                  <StallCard key={s.id} stall={s} index={i} />
                ))}
              </div>
            ) : (
              <Reveal delay={100}>
                <div className="ink-border bg-cream/10 p-10 text-center">
                  <p className="text-lg">No saved stalls yet.</p>
                  <p className="mt-2 text-sm text-cream/70">
                    Browse <Link to="/discover" className="underline">Discover</Link> and tap ☆ to save your favourites.
                  </p>
                </div>
              </Reveal>
            )}

            {savedStalls.length > 3 && (
              <Reveal delay={200}>
                <p className="mt-6 text-center text-sm text-cream/70">
                  + {savedStalls.length - 3} more in your <Link to="/saved" className="eyebrow border-b border-cream pb-0.5 hover:text-chilli">saved list</Link>
                </p>
              </Reveal>
            )}
          </div>
        </section>

        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-7xl px-5 py-14">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <Eyebrow>{user ? `In ${user.city}` : "Recommended"}</Eyebrow>
                  <h2 className="mt-3 text-4xl md:text-5xl">
                    {nearby.length > 0 ? "Worth the walk." : openNow.length > 0 ? "Open right now." : "Fresh arrivals."}
                  </h2>
                </div>
                <InkButton to="/discover">See all stalls →</InkButton>
              </div>
            </Reveal>

            {recommendations.length > 0 ? (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recommendations.map((s, i) => (
                  <StallCard key={s.id} stall={s} index={i} />
                ))}
              </div>
            ) : (
              <Reveal delay={100}>
                <div className="ink-border bg-card p-10 text-center">
                  <p className="text-lg">Nothing new to show right now.</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Check back soon or browse all stalls.
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </section>

        <section className="bg-card">
          <div className="mx-auto max-w-7xl px-5 py-14">
            <Reveal>
              <div>
                <Eyebrow dot="bg-turmeric">Activity</Eyebrow>
                <h2 className="mt-3 text-4xl md:text-5xl">Recent reviews.</h2>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                { user: "Aarti M.", city: "Mumbai", rating: 5, text: "Queued 20 minutes at 11 PM and would do it again tomorrow.", stall: "Noor Kheema Corner", date: "2 days ago" },
                { user: "Dev S.", city: "Delhi", rating: 4, text: "Cart moves between the two gates — the live location saved me a very sad walk.", stall: "Tashi's Momo Cart", date: "5 days ago" },
                { user: "Rhea K.", city: "Kolkata", rating: 5, text: "Third generation running this counter and you can taste the practice.", stall: "Bade's Roll Counter", date: "1 week ago" },
              ].map((r, i) => (
                <Reveal key={r.user} delay={i * 90}>
                  <figure className="ink-border shadow-hard lift h-full bg-background p-5">
                    <div className="eyebrow text-chilli">{"★".repeat(r.rating)}</div>
                    <blockquote className="mt-3 text-sm">“{r.text}”</blockquote>
                    <figcaption className="mt-5 border-t-2 border-dashed border-ink/25 pt-3 text-xs text-muted-foreground">
                      <strong className="text-foreground">{r.user}</strong> · {r.stall} · {r.date}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Shell>
    </RequireAuth>
  );
}
