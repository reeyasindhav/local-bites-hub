import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, InkButton, Photo, Reveal, Shell, Tag } from "@/components/site";
import { dishes, stalls } from "@/lib/data";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — Localbite" },
      {
        name: "description",
        content: "This week's most-saved, most-reviewed and most-discussed stalls and dishes across India.",
      },
    ],
  }),
  component: LeaderboardPage,
});

function LeaderboardPage() {
  const topStalls = [...stalls].sort((a, b) => b.reviews - a.reviews).slice(0, 6);
  const topDishes = [...dishes].slice(0, 5);
  const topCities = ["Mumbai", "Delhi", "Kolkata", "Chennai", "Pune", "Patna"] as const;

  return (
    <Shell>
      <section className="paper border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:py-20">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow dot="bg-chilli">This week</Eyebrow>
              <h1 className="mt-5 text-5xl md:text-7xl">
                The <span className="text-chilli">leaderboard.</span>
              </h1>
              <p className="mt-5 max-w-xl text-muted-foreground">
                The most-saved, most-reviewed and most-discussed stalls and dishes — fresh every Monday.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Tag tone="ink">Weekly</Tag>
                <Tag tone="turmeric">Updated Mon 9 AM IST</Tag>
                <Tag tone="cream">1,240 stalls ranked</Tag>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-cobalt text-cream">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <Reveal>
            <div>
              <Eyebrow dot="bg-chilli">Top stalls</Eyebrow>
              <h2 className="mt-3 text-4xl md:text-5xl">Most reviewed this week.</h2>
            </div>
          </Reveal>

          <ol className="mt-10 space-y-4">
            {topStalls.map((s, i) => (
              <Reveal key={s.id} delay={i * 70}>
                <li>
                  <Link
                    to="/stalls/$id"
                    params={{ id: s.id }}
                    className="ink-border lift group flex items-center gap-4 bg-cream p-3 text-foreground shadow-hard-sm"
                  >
                    <span className="ink-border grid size-12 shrink-0 place-items-center bg-turmeric font-display text-2xl">
                      {i + 1}
                    </span>
                    <Photo
                      src={s.photo}
                      alt={s.dish}
                      accent={s.accent}
                      className="size-14 w-14 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-lg">{s.dish}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {s.name} · {s.neighbourhood}, {s.city}
                      </p>
                    </div>
                    <div className="hidden text-right sm:block">
                      <p className="font-display text-lg">★ {s.rating}</p>
                      <p className="text-xs text-muted-foreground">{s.reviews} reviews</p>
                    </div>
                    <span className="eyebrow ml-2 hidden border-b-2 border-ink pb-0.5 group-hover:text-chilli md:inline">
                      View →
                    </span>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow dot="bg-turmeric">Top dishes</Eyebrow>
                <h2 className="mt-3 text-4xl md:text-5xl">The dishes everyone is talking about.</h2>
              </div>
              <InkButton to="/dishes">All dishes →</InkButton>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topDishes.map((d, i) => (
              <Reveal key={d.slug} delay={i * 80}>
                <Link
                  to="/dishes/$slug"
                  params={{ slug: d.slug }}
                  className="ink-border lift flex h-full items-center gap-3 bg-card p-3 shadow-hard-sm"
                >
                  <span className="ink-border grid size-10 shrink-0 place-items-center bg-chilli font-display text-base text-cream">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-display text-lg">{d.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{d.region}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <Reveal>
            <div>
              <Eyebrow>By city</Eyebrow>
              <h2 className="mt-3 text-4xl md:text-5xl">Where the queue is longest.</h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {topCities.map((city, i) => {
              const cityStalls = stalls.filter((s) => s.city === city);
              return (
                <Reveal key={city} delay={i * 60}>
                  <div className="ink-border lift bg-background p-5 shadow-hard-sm">
                    <p className="eyebrow text-muted-foreground">City rank #{i + 1}</p>
                    <h3 className="mt-2 text-2xl">{city}</h3>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {cityStalls.length} {cityStalls.length === 1 ? "stall" : "stalls"} mapped
                    </p>
                    <Link
                      to="/discover"
                      className="mt-3 inline-block eyebrow border-b-2 border-ink pb-0.5 hover:text-chilli"
                    >
                      Browse {city} →
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </Shell>
  );
}
