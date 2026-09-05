import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Eyebrow, InkButton, Photo, Reveal, Shell, StallCard, Tag } from "@/components/site";
import { dishes, reviews, stalls } from "@/lib/data";

export const Route = createFileRoute("/dishes/$slug")({
  loader: ({ params }) => {
    const dish = dishes.find((d) => d.slug === params.slug);
    if (!dish) throw notFound();
    const dishStalls = stalls.filter((s) => s.dish === dish.name);
    const dishReviews = reviews.filter((r) => r.dish === dish.name);
    return { dish, dishStalls, dishReviews };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Dish not found — Localbite" }, { name: "robots", content: "noindex" }] };
    const d = loaderData.dish;
    return {
      meta: [
        { title: `${d.name} — Localbite` },
        { name: "description", content: d.blurb },
        { property: "og:title", content: d.name },
        { property: "og:description", content: d.blurb },
        { property: "og:image", content: d.photo },
      ],
    };
  },
  component: DishDetailPage,
});

function DishDetailPage() {
  const { dish, dishStalls, dishReviews } = Route.useLoaderData();

  return (
    <Shell>
      <section className="border-b-2 border-ink">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="animate-slide-in">
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone="ink">{dish.region}</Tag>
              {dish.tags.map((t) => (
                <Tag key={t} tone="cream">
                  {t}
                </Tag>
              ))}
            </div>
            <h1 className="mt-5 text-5xl md:text-7xl">{dish.name}.</h1>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">{dish.blurb}</p>

            <div className="mt-6 border-l-4 border-chilli pl-4">
              <p className="eyebrow text-muted-foreground">Origin</p>
              <p className="mt-1 text-sm">{dish.origin}</p>
            </div>

            <p className="mt-6 max-w-lg text-sm leading-relaxed text-foreground/90">
              {dish.description}
            </p>
          </div>

          <div className="animate-pop">
            <Photo
              src={dish.photo}
              alt={dish.name}
              accent={dish.accent}
              className="ink-border shadow-hard-lg h-[420px] w-full"
            />
          </div>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-card">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Eyebrow dot="bg-chilli">Where to eat it</Eyebrow>
                <h2 className="mt-3 text-4xl md:text-5xl">Stalls that do it right.</h2>
              </div>
              <InkButton to="/discover">Browse all stalls →</InkButton>
            </div>
          </Reveal>

          {dishStalls.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {dishStalls.map((s, i) => (
                <StallCard key={s.id} stall={s} index={i} />
              ))}
            </div>
          ) : (
            <Reveal delay={100}>
              <div className="ink-border bg-background p-8 text-center">
                <p className="text-muted-foreground">No specific stalls tagged for this dish yet.</p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <Reveal>
            <div>
              <Eyebrow dot="bg-turmeric">Regional variations</Eyebrow>
              <h2 className="mt-3 text-4xl md:text-5xl">How it changes across India.</h2>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {dish.variations.map((v, i) => (
              <Reveal key={v.city} delay={i * 90}>
                <div className="ink-border lift h-full bg-card p-5 shadow-hard-sm">
                  <p className="eyebrow text-chilli">{v.city}</p>
                  <p className="mt-3 text-sm">{v.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {dishReviews.length > 0 && (
        <section className="bg-card">
          <div className="mx-auto max-w-7xl px-5 py-14">
            <Reveal>
              <div>
                <Eyebrow>Reviews for {dish.name}</Eyebrow>
                <h2 className="mt-3 text-4xl md:text-5xl">What people are saying.</h2>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {dishReviews.map((r, i) => (
                <Reveal key={r.id} delay={i * 80}>
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
      )}
    </Shell>
  );
}
