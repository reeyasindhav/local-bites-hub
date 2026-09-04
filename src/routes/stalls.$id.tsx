import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Eyebrow, InkButton, Photo, Reveal, Shell, StallCard, StallMap, Tag } from "@/components/site";
import { useAuth } from "@/lib/auth";
import { reviews as seedReviews, stalls } from "@/lib/data";

export const Route = createFileRoute("/stalls/$id")({
  loader: ({ params }) => {
    const stall = stalls.find((s) => s.id === params.id);
    if (!stall) throw notFound();
    return { stall };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Stall not found — Localbite" }, { name: "robots", content: "noindex" }] };
    const s = loaderData.stall;
    const title = `${s.dish} at ${s.name}, ${s.neighbourhood} — Localbite`;
    const description = `${s.story} Rated ${s.rating} by ${s.reviews} locals. ₹${s.price} a plate, ${s.hours}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: s.photo },
        { name: "twitter:image", content: s.photo },
      ],
    };
  },
  component: StallPage,
});

function StallPage() {
  const { stall } = Route.useLoaderData();
  const { saved, toggleSave } = useAuth();
  const [tab, setTab] = useState<"menu" | "reviews" | "story">("menu");
  const nearby = stalls.filter((s) => s.id !== stall.id && s.city === stall.city).slice(0, 3);
  const isSaved = saved.includes(stall.id);

  return (
    <Shell>
      <section className="border-b-2 border-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="animate-slide-in">
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone="ink">{stall.city}</Tag>
              <Tag tone={stall.open ? "turmeric" : "cream"}>{stall.open ? "Open now" : "Closed"}</Tag>
              <Tag>{stall.veg ? "Veg" : "Non-veg"}</Tag>
            </div>
            <h1 className="mt-5 text-6xl md:text-7xl">{stall.dish}</h1>
            <p className="mt-3 font-display text-xl text-chilli">{stall.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {stall.neighbourhood}, {stall.city} · {stall.hours}
            </p>
            <p className="mt-6 max-w-lg text-muted-foreground">{stall.story}</p>

            <div className="mt-8 grid max-w-lg grid-cols-3 gap-3">
              {[
                [`★ ${stall.rating}`, `${stall.reviews} reviews`],
                [`₹${stall.price}`, "per plate"],
                [stall.vendor, "runs this stall"],
              ].map(([a, b]) => (
                <div key={b} className="ink-border bg-card p-3 shadow-hard-sm">
                  <p className="font-display text-lg">{a}</p>
                  <p className="text-[11px] text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <InkButton tone="chilli" onClick={() => toggleSave(stall.id)}>
                {isSaved ? "★ Saved" : "☆ Save this stall"}
              </InkButton>
              <InkButton to="/trails">Add to a trail →</InkButton>
            </div>
          </div>

          <div className="animate-pop">
            <Photo
              src={stall.photo}
              alt={stall.dish}
              accent={stall.accent}
              className="ink-border shadow-hard-lg h-[420px] w-full"
            />
          </div>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-card">
        <div className="mx-auto max-w-7xl px-5 py-12">
          <div className="flex flex-wrap gap-2">
            {(["menu", "reviews", "story"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}>
                <Tag tone={tab === t ? "ink" : "cream"}>{t}</Tag>
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div className="animate-rise" key={tab}>
              {tab === "menu" && (
                <ul className="divide-y-2 divide-dashed divide-ink/20">
                  {stall.menu.map((m) => (
                    <li key={m.name} className="flex items-center justify-between gap-6 py-4">
                      <div>
                        <p className="font-display text-xl">{m.name}</p>
                        <p className="text-xs text-muted-foreground">{m.note}</p>
                      </div>
                      <span className="font-display text-lg">₹{m.price}</span>
                    </li>
                  ))}
                </ul>
              )}
              {tab === "reviews" && (
                <div className="space-y-4">
                  {seedReviews.map((r) => (
                    <figure key={r.user} className="ink-border bg-background p-5 shadow-hard-sm">
                      <div className="eyebrow text-chilli">{"★".repeat(r.rating)}</div>
                      <blockquote className="mt-2 text-sm">“{r.text}”</blockquote>
                      <figcaption className="mt-3 text-xs text-muted-foreground">
                        {r.user} · {r.city} · {r.date}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}
              {tab === "story" && (
                <div className="space-y-4 text-muted-foreground">
                  <p>{stall.story}</p>
                  <p>
                    {stall.vendor} has been serving this corner of {stall.neighbourhood} for over a
                    decade. The cart opens at {stall.hours.split("–")[0].trim()} and the regulars
                    arrive before the first batch is ready.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {stall.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <Eyebrow>Find the cart</Eyebrow>
              <StallMap items={[stall]} selectedId={stall.id} className="mt-4 h-[320px] w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-4xl">More in {stall.city}</h2>
          <Link to="/discover" className="eyebrow border-b-2 border-ink pb-0.5">
            All stalls →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {nearby.map((s, i) => (
            <StallCard key={s.id} stall={s} index={i} />
          ))}
        </div>
        {!nearby.length && (
          <Reveal>
            <p className="text-sm text-muted-foreground">First stall mapped in this city. More soon.</p>
          </Reveal>
        )}
      </section>
    </Shell>
  );
}
