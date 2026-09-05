import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, InkButton, Photo, Reveal, Shell, Tag } from "@/components/site";
import { dishes } from "@/lib/data";

export const Route = createFileRoute("/dishes")({
  head: () => ({
    meta: [
      { title: "Dishes — Localbite" },
      {
        name: "description",
        content: "The signature dishes of India's street food culture, with stories, origins and where to find the best version.",
      },
    ],
  }),
  component: DishesPage,
});

function DishesPage() {
  return (
    <Shell>
      <section className="paper border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:py-20">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow dot="bg-turmeric">Dish encyclopedia</Eyebrow>
              <h1 className="mt-5 text-5xl md:text-7xl">
                Every <span className="text-chilli">legendary bite.</span>
              </h1>
              <p className="mt-5 max-w-xl text-muted-foreground">
                The signature dishes of India's street food culture — where they come from, how they're made, and where to find the version worth queueing for.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {dishes.map((d, i) => (
              <Reveal key={d.slug} delay={i * 80}>
                <Link
                  to="/dishes/$slug"
                  params={{ slug: d.slug }}
                  className="ink-border shadow-hard lift group h-full bg-card"
                >
                  <div className="relative border-b-2 border-ink">
                    <Photo
                      src={d.photo}
                      alt={d.name}
                      accent={d.accent}
                      className="h-56 w-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      className={`ink-border eyebrow absolute left-3 top-3 px-2 py-1 ${
                        d.accent === "chilli"
                          ? "bg-chilli text-cream"
                          : d.accent === "cobalt"
                            ? "bg-cobalt text-cream"
                            : "bg-turmeric text-ink"
                      }`}
                    >
                      {d.region.split("·")[0].trim()}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-2xl">{d.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{d.blurb}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      {d.tags.slice(0, 2).map((t) => (
                        <Tag key={t} tone="cream">
                          {t}
                        </Tag>
                      ))}
                    </div>
                    <div className="mt-5 eyebrow border-b-2 border-ink pb-0.5">Read the story →</div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  );
}
