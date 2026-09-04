import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Eyebrow, Reveal, Shell, StallCard, StallMap, Tag } from "@/components/site";
import { cities, filterTags, stalls } from "@/lib/data";

type Search = { q?: string };

export const Route = createFileRoute("/discover")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Discover street food stalls near you — Localbite" },
      {
        name: "description",
        content: "Filter 1,240 mapped stalls by city, price, craving and open-now status on the Localbite finder.",
      },
      { property: "og:title", content: "Discover street food stalls — Localbite" },
      { property: "og:description", content: "Map-based street food finder with dish-level reviews." },
    ],
  }),
  component: Discover,
});

function Discover() {
  const { q: initialQ } = Route.useSearch();
  const [q, setQ] = useState(initialQ ?? "");
  const [city, setCity] = useState<string>("All");
  const [tag, setTag] = useState<string | null>(null);
  const [openOnly, setOpenOnly] = useState(false);
  const [view, setView] = useState<"grid" | "map">("grid");
  const [selected, setSelected] = useState(stalls[0].id);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return stalls.filter((s) => {
      if (city !== "All" && s.city !== city) return false;
      if (openOnly && !s.open) return false;
      if (tag && !s.tags.includes(tag)) return false;
      if (!needle) return true;
      return [s.dish, s.name, s.neighbourhood, s.city, s.vendor, ...s.tags]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [q, city, tag, openOnly]);

  return (
    <Shell>
      <section className="paper border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 py-12">
          <Eyebrow>The finder</Eyebrow>
          <h1 className="mt-4 text-5xl md:text-7xl">
            What are you <span className="text-chilli">craving?</span>
          </h1>

          <div className="ink-border shadow-hard mt-8 flex max-w-2xl bg-card">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search a dish, stall or neighbourhood"
              className="w-full bg-transparent px-4 py-3 text-sm outline-none"
            />
            <span className="eyebrow grid place-items-center border-l-2 border-ink bg-turmeric px-5">
              {results.length} found
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {["All", ...cities].map((c) => (
              <button key={c} onClick={() => setCity(c)}>
                <Tag tone={city === c ? "ink" : "cream"}>{c}</Tag>
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {filterTags.map((t) => (
              <button key={t} onClick={() => setTag(tag === t ? null : t)}>
                <Tag tone={tag === t ? "turmeric" : "cream"}>{t}</Tag>
              </button>
            ))}
            <button onClick={() => setOpenOnly((o) => !o)}>
              <Tag tone={openOnly ? "turmeric" : "cream"}>Open now</Tag>
            </button>
            <div className="ml-auto flex gap-2">
              <button onClick={() => setView("grid")}>
                <Tag tone={view === "grid" ? "ink" : "cream"}>Grid</Tag>
              </button>
              <button onClick={() => setView("map")}>
                <Tag tone={view === "map" ? "ink" : "cream"}>Map</Tag>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        {view === "map" ? (
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <StallMap
              items={results.length ? results : stalls}
              selectedId={selected}
              onSelect={setSelected}
              className="h-[560px] w-full"
            />
            <div className="max-h-[560px] space-y-4 overflow-y-auto pr-1">
              {(results.length ? results : stalls).map((s) => (
                <button key={s.id} onClick={() => setSelected(s.id)} className="w-full text-left">
                  <div
                    className={`ink-border lift bg-card p-4 shadow-hard-sm ${
                      selected === s.id ? "bg-turmeric" : ""
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className="font-display text-lg">{s.dish}</span>
                      <span className="eyebrow">★ {s.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {s.name} · {s.neighbourhood}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : results.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((s, i) => (
              <StallCard key={s.id} stall={s} index={i} />
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="ink-border shadow-hard bg-card p-12 text-center">
              <h2 className="text-3xl">Nothing on this street.</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Try another craving, or clear the filters.
              </p>
            </div>
          </Reveal>
        )}
      </section>
    </Shell>
  );
}
