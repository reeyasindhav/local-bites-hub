import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Eyebrow, InkButton, Photo, Reveal, Shell, Tag } from "@/components/site";
import { trails } from "@/lib/data";

export const Route = createFileRoute("/trails")({
  head: () => ({
    meta: [
      { title: "Food trails — Localbite" },
      {
        name: "description",
        content: "Curated neighbourhood food trails across India. Walk, eat and discover hidden street food gems.",
      },
    ],
  }),
  component: TrailsLayout,
});

function TrailsLayout() {
  return <Outlet />;
}

export function TrailsPage() {
  return (
    <Shell>
      <section className="paper border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:py-20">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow dot="bg-turmeric">Neighbourhood walks</Eyebrow>
              <h1 className="mt-5 text-5xl md:text-7xl">
                Follow the <span className="text-chilli">flavour trail.</span>
              </h1>
              <p className="mt-5 max-w-xl text-muted-foreground">
                Curated routes through the streets that know how to eat. Each trail is a walkable route of handpicked stalls, dishes and stories.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {trails.map((t, i) => (
              <Reveal key={t.slug} delay={i * 100}>
                <Link
                  to="/trails/$slug"
                  params={{ slug: t.slug }}
                  className="ink-border shadow-hard lift group h-full bg-card"
                >
                  <div className="relative border-b-2 border-ink">
                    <Photo
                      src={t.photo}
                      alt={t.title}
                      accent={t.accent}
                      className="h-56 w-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className={`ink-border eyebrow absolute left-3 top-3 px-2 py-1 ${t.accent === "chilli" ? "bg-chilli text-cream" : t.accent === "cobalt" ? "bg-cobalt text-cream" : "bg-turmeric text-ink"}`}>
                      {t.city}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-2xl">{t.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{t.blurb}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <Tag tone="cream">{t.stops} stops</Tag>
                      <Tag tone="cream">{t.duration}</Tag>
                      <Tag tone="cream">{t.distance}</Tag>
                    </div>
                    <div className="mt-5 eyebrow border-b-2 border-ink pb-0.5">See route →</div>
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
