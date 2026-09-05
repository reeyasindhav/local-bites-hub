import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, InkButton, Reveal, RequireAuth, Shell, StallCard, Tag } from "@/components/site";
import { stalls } from "@/lib/data";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved stalls — Localbite" },
      {
        name: "description",
        content: "Your collection of saved street food stalls, dishes and neighbourhood gems.",
      },
    ],
  }),
  component: SavedPage,
});

function SavedPage() {
  const savedIds = JSON.parse(localStorage.getItem("localbite.saved") || "[]") as string[];
  const saved = stalls.filter((s) => savedIds.includes(s.id));

  return (
    <RequireAuth>
      <Shell>
        <section className="paper border-b-2 border-ink">
          <div className="mx-auto max-w-7xl px-5 py-12">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <Eyebrow dot="bg-chilli">Your collection</Eyebrow>
                  <h1 className="mt-3 text-5xl md:text-7xl">
                    Saved <span className="text-chilli">bites.</span>
                  </h1>
                  <p className="mt-3 max-w-lg text-muted-foreground">
                    Every stall you’ve starred, ready for your next hunger strike.
                  </p>
                </div>
                <InkButton to="/discover">Discover more →</InkButton>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-7xl px-5 py-12">
            {saved.length ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {saved.map((s, i) => (
                  <StallCard key={s.id} stall={s} index={i} />
                ))}
              </div>
            ) : (
              <Reveal>
                <div className="ink-border shadow-hard bg-card p-12 text-center">
                  <h2 className="text-3xl">Nothing saved yet.</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Head to <Link to="/discover" className="eyebrow border-b-2 border-ink pb-0.5 hover:text-chilli">Discover</Link> and tap ☆ on stalls you love.
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      </Shell>
    </RequireAuth>
  );
}
