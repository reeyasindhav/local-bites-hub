import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Eyebrow, InkButton, Photo, Reveal, Shell, StallCard, StallMap, Tag } from "@/components/site";
import { img, reviews, stalls, trails } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Localbite — Hyperlocal Street Food Guide" },
      {
        name: "description",
        content:
          "Discover street food stalls, carts and hidden gems near you. Community reviews, live stall maps and curated neighbourhood food trails.",
      },
      { property: "og:title", content: "Localbite — Hyperlocal Street Food Guide" },
      {
        property: "og:description",
        content: "Map-based street food discovery, dish photo cards and curated food trails across India.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(stalls[3].id);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.navigate({ to: "/discover", search: { q } });
  };

  return (
    <Shell>
      {/* HERO */}
      <section className="paper border-b-2 border-ink">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 lg:grid-cols-[1fr_1.05fr] lg:py-20">
          <div className="animate-slide-in">
            <Eyebrow>The street food atlas</Eyebrow>
            <h1 className="display-xl mt-5">
              Eat local.
              <br />
              <span className="text-chilli">Find magic.</span>
            </h1>
            <p className="mt-6 max-w-md text-muted-foreground">
              The good stuff isn't always on a menu. Discover the stalls, carts and hole-in-the-wall
              legends that make every neighbourhood taste different.
            </p>

            <form onSubmit={submit} className="ink-border shadow-hard mt-8 flex max-w-md bg-card">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search a dish, stall or neighbourhood"
                className="w-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="eyebrow border-l-2 border-ink bg-chilli px-5 text-cream transition-colors hover:bg-ink"
              >
                Find it →
              </button>
            </form>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Vada Pav", "Chaat", "Momos", "Filter Coffee"].map((t) => (
                <Link key={t} to="/discover" search={{ q: t }}>
                  <Tag>{t}</Tag>
                </Link>
              ))}
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t-2 border-dashed border-ink/30 pt-6">
              {[
                ["1,240", "stalls mapped"],
                ["18k", "community reviews"],
                ["6", "cities live"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-2xl">{n}</dt>
                  <dd className="text-xs text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="animate-pop">
            <StallMap
              items={stalls}
              selectedId={selected}
              onSelect={setSelected}
              className="h-[420px] w-full lg:h-[520px]"
            />
          </div>
        </div>
      </section>

      {/* PROBLEM STRIP */}
      <section className="border-b-2 border-ink bg-ink text-cream">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-3">
          {[
            ["Unmapped", "Carts move. Apps don't follow. Localbite tracks where a vendor actually is today."],
            ["Unreviewed", "No dine-in listings, no ratings. We collect dish-level reviews from people who eat there weekly."],
            ["Undiscovered", "Hidden gems stay hidden. Curated trails walk you straight to them."],
          ].map(([h, p], i) => (
            <Reveal key={h} delay={i * 100}>
              <div>
                <span className="font-display text-5xl text-chilli">0{i + 1}</span>
                <h3 className="mt-3 text-2xl">{h}</h3>
                <p className="mt-2 text-sm text-cream/70">{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEED */}
      <section className="border-b-2 border-ink bg-cobalt text-cream">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow dot="bg-turmeric">Fresh on the feed</Eyebrow>
              <h2 className="mt-3 text-5xl md:text-6xl">Worth the detour.</h2>
            </div>
            <InkButton to="/discover" tone="cream">
              Explore all bites →
            </InkButton>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stalls.slice(0, 6).map((s, i) => (
              <StallCard key={s.id} stall={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* TRAIL */}
      <section className="border-b-2 border-ink">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2">
          <Reveal>
            <div>
              <Eyebrow>Go beyond the pin</Eyebrow>
              <h2 className="mt-4 text-5xl md:text-6xl">
                Follow the
                <br />
                <span className="text-chilli">flavour trail.</span>
              </h2>
              <p className="mt-5 max-w-sm text-muted-foreground">
                Curated walks through the neighbourhoods that know how to eat. Bring an appetite. Leave
                with a new favourite.
              </p>
              <ul className="mt-8 space-y-3">
                {trails.map((t) => (
                  <li key={t.slug}>
                    <Link
                      to="/trails/$slug"
                      params={{ slug: t.slug }}
                      className="ink-border lift flex items-center justify-between bg-card px-4 py-3 shadow-hard-sm"
                    >
                      <span>
                        <span className="font-display text-lg">{t.title}</span>
                        <span className="ml-2 text-xs text-muted-foreground">
                          {t.stops} stops · {t.duration}
                        </span>
                      </span>
                      <span className="eyebrow">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <InkButton to="/trails">See all trails →</InkButton>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative">
              <Photo
                src={img("1555939594-58d7cb561ad1", 1200)}
                alt="Grilled street food spread"
                className="ink-border shadow-hard-lg h-[520px] w-full"
              />
              <span className="ink-border eyebrow absolute right-4 top-4 bg-turmeric px-3 py-1">
                Hot route
              </span>
              <span className="ink-border animate-pop absolute bottom-6 left-[-12px] bg-cream px-4 py-2 font-display text-xl">
                Eat like a local.
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="border-b-2 border-ink bg-card">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <Eyebrow>Straight from the queue</Eyebrow>
          <h2 className="mt-3 text-4xl md:text-5xl">People who actually ate there.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {reviews.map((r, i) => (
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

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <Eyebrow>How it works</Eyebrow>
        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {[
            ["Search", "Type a craving or drop a pin on your neighbourhood."],
            ["Locate", "See live open hours and where the cart is parked today."],
            ["Taste", "Order the dish the regulars order, not the one on the board."],
            ["Review", "Add a photo, rate the dish, help the next hungry local."],
          ].map(([h, p], i) => (
            <Reveal key={h} delay={i * 80}>
              <div className="ink-border lift h-full bg-card p-5 shadow-hard-sm">
                <span className="eyebrow text-chilli">Step {i + 1}</span>
                <h3 className="mt-2 text-2xl">{h}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </Shell>
  );
}
