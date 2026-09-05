import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, InkButton, Reveal, Shell, StallCard, Tag } from "@/components/site";
import { reviews, stalls } from "@/lib/data";

export const Route = createFileRoute("/feed")({
  head: () => ({
    meta: [
      { title: "Community feed — Localbite" },
      {
        name: "description",
        content: "A live, chronological stream of recent reviews, new stalls and trending dishes across India.",
      },
    ],
  }),
  component: FeedPage,
});

type FeedItem =
  | { kind: "review"; id: string; when: string; payload: (typeof reviews)[number] }
  | { kind: "stall"; id: string; when: string; payload: (typeof stalls)[number] }
  | { kind: "milestone"; id: string; when: string; payload: { title: string; subtitle: string; accent: "chilli" | "cobalt" | "turmeric" } };

const buildFeed = (): FeedItem[] => {
  const items: FeedItem[] = [
    ...reviews.map((r, i) => ({
      kind: "review" as const,
      id: `feed-r-${r.id}`,
      when: `${i + 1}h ago`,
      payload: r,
    })),
    ...stalls.slice(0, 3).map((s, i) => ({
      kind: "stall" as const,
      id: `feed-s-${s.id}`,
      when: `${i + 2}d ago`,
      payload: s,
    })),
    { kind: "milestone", id: "feed-m-1", when: "1 week ago", payload: { title: "1,240 stalls mapped", subtitle: "across 6 cities", accent: "chilli" as const } },
    { kind: "milestone", id: "feed-m-2", when: "2 weeks ago", payload: { title: "18,000 reviews served", subtitle: "from real regulars", accent: "turmeric" as const } },
  ];
  return items;
};

const accentBg: Record<"chilli" | "cobalt" | "turmeric", string> = {
  chilli: "bg-chilli text-cream",
  cobalt: "bg-cobalt text-cream",
  turmeric: "bg-turmeric text-ink",
};

function FeedPage() {
  const items = buildFeed();

  return (
    <Shell>
      <section className="paper border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:py-20">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow dot="bg-chilli">Community feed</Eyebrow>
              <h1 className="mt-5 text-5xl md:text-7xl">
                The <span className="text-chilli">live</span> street.
              </h1>
              <p className="mt-5 max-w-xl text-muted-foreground">
                Recent reviews, new stalls and what the queue is talking about — all in one stream.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Tag tone="ink">All activity</Tag>
                <Tag tone="cream">Reviews</Tag>
                <Tag tone="cream">New stalls</Tag>
                <Tag tone="cream">Trending</Tag>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 py-12">
          <ol className="space-y-5">
            {items.map((item, i) => (
              <Reveal key={item.id} delay={i * 60}>
                <li>
                  {item.kind === "review" && (
                    <article className="ink-border shadow-hard-sm lift bg-card p-5 md:p-6">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="ink-border grid size-10 place-items-center rounded-full bg-turmeric font-display text-sm">
                            {item.payload.user.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{item.payload.user}</p>
                            <p className="text-xs text-muted-foreground">
                              reviewed <strong className="text-foreground">{item.payload.dish}</strong> at {item.payload.stall} · {item.payload.city}
                            </p>
                          </div>
                        </div>
                        <div className="eyebrow text-chilli">{"★".repeat(item.payload.rating)} <span className="text-muted-foreground">· {item.when}</span></div>
                      </div>
                      <blockquote className="mt-4 text-sm">“{item.payload.text}”</blockquote>
                    </article>
                  )}

                  {item.kind === "stall" && (
                    <article className="ink-border shadow-hard-sm lift flex flex-col gap-4 bg-card p-5 md:flex-row md:items-center md:p-6">
                      <div className="flex-1">
                        <p className="eyebrow text-chilli">New on the map</p>
                        <h3 className="mt-2 text-2xl">{item.payload.dish}</h3>
                        <p className="text-xs text-muted-foreground">
                          {item.payload.name} · {item.payload.neighbourhood}, {item.payload.city}
                        </p>
                        <p className="mt-3 text-sm">{item.payload.story}</p>
                      </div>
                      <Link
                        to="/stalls/$id"
                        params={{ id: item.payload.id }}
                        className="eyebrow ink-border bg-turmeric px-4 py-3 shadow-hard-sm lift"
                      >
                        View stall →
                      </Link>
                    </article>
                  )}

                  {item.kind === "milestone" && (
                    <article className={`ink-border shadow-hard-sm lift ${accentBg[item.payload.accent]} p-5 md:p-6`}>
                      <p className="eyebrow opacity-80">Milestone · {item.when}</p>
                      <h3 className="mt-2 text-2xl md:text-3xl">{item.payload.title}</h3>
                      <p className="mt-1 text-sm opacity-80">{item.payload.subtitle}</p>
                    </article>
                  )}
                </li>
              </Reveal>
            ))}
          </ol>

          <div className="mt-12 text-center">
            <p className="eyebrow text-muted-foreground">You’ve reached the end of the feed</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <InkButton to="/discover">Find more stalls →</InkButton>
              <Link to="/leaderboard" className="eyebrow ink-border bg-cream px-4 py-3 shadow-hard-sm lift">
                See leaderboard →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
