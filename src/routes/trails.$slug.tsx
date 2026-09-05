import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Eyebrow, InkButton, Photo, Reveal, Shell, StallCard, StallMap, Tag } from "@/components/site";
import { trails, stalls } from "@/lib/data";

export const Route = createFileRoute("/trails/$slug")({
  loader: ({ params }) => {
    const trail = trails.find((t) => t.slug === params.slug);
    if (!trail) throw notFound();
    return { trail };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Trail not found — Localbite" }, { name: "robots", content: "noindex" }] };
    const t = loaderData.trail;
    return {
      meta: [
        { title: `${t.title} — Localbite` },
        { name: "description", content: t.blurb },
        { property: "og:title", content: t.title },
        { property: "og:description", content: t.blurb },
        { property: "og:image", content: t.photo },
      ],
    };
  },
  component: TrailDetailPage,
});

function TrailDetailPage() {
  const { trail } = Route.useLoaderData();
  const trailStalls = stalls.filter((s) => trail.itinerary.some((i) => i.stall === s.name));

  return (
    <Shell>
      <section className="border-b-2 border-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="animate-slide-in">
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone="ink">{trail.city}</Tag>
              <Tag tone="turmeric">{trail.duration}</Tag>
              <Tag>{trail.distance}</Tag>
            </div>
            <h1 className="mt-5 text-5xl md:text-7xl">{trail.title}</h1>
            <p className="mt-4 max-w-lg text-muted-foreground">{trail.blurb}</p>

            <div className="mt-8 grid max-w-lg grid-cols-3 gap-3">
              {[
                [trail.stops, "stops"],
                [trail.duration, "duration"],
                [trail.budget, "budget"],
              ].map(([a, b]) => (
                <div key={b} className="ink-border bg-card p-3 shadow-hard-sm">
                  <p className="font-display text-lg">{a}</p>
                  <p className="text-[11px] text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-pop">
            <Photo
              src={trail.photo}
              alt={trail.title}
              accent={trail.accent}
              className="ink-border shadow-hard-lg h-[420px] w-full"
            />
          </div>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-card">
        <div className="mx-auto max-w-7xl px-5 py-12">
          <Reveal>
            <div>
              <Eyebrow>Route</Eyebrow>
              <h2 className="mt-3 text-4xl md:text-5xl">Stop by stop.</h2>
            </div>
          </Reveal>

          <ol className="mt-10 space-y-6">
            {trail.itinerary.map((stop, i) => {
              const stall = stalls.find((s) => s.name === stop.stall);
              return (
                <Reveal key={stop.time} delay={i * 80}>
                  <li className="ink-border shadow-hard-sm lift bg-background p-5 md:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="eyebrow text-chilli">{stop.time}</p>
                        <h3 className="mt-2 text-2xl">{stop.stall}</h3>
                        <p className="text-sm text-muted-foreground">{stop.dish}</p>
                      </div>
                      {stall && (
                        <Link
                          to="/stalls/$id"
                          params={{ id: stall.id }}
                          className="eyebrow ink-border bg-turmeric px-3 py-2 shadow-hard-sm"
                        >
                          View stall →
                        </Link>
                      )}
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{stop.note}</p>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {trailStalls.length > 0 && (
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-7xl px-5 py-14">
            <Reveal>
              <div className="flex items-end justify-between gap-4">
                <h2 className="text-4xl">Stalls on this trail</h2>
                <Link to="/discover" className="eyebrow border-b-2 border-ink pb-0.5">
                  All stalls →
                </Link>
              </div>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trailStalls.map((s, i) => (
                <StallCard key={s.id} stall={s} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-card">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow>Plan your walk</Eyebrow>
                <h2 className="mt-3 text-4xl md:text-5xl">Find the route.</h2>
              </div>
              <InkButton to="/discover">Explore more →</InkButton>
            </div>
          </Reveal>
          <div className="mt-8">
            <StallMap
              items={trailStalls.length ? trailStalls : stalls.slice(0, 3)}
              selectedId={trailStalls[0]?.id}
              className="h-[420px] w-full"
            />
          </div>
        </div>
      </section>
    </Shell>
  );
}
