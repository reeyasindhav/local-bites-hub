import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, InkButton, Photo, Reveal, Shell, Tag } from "@/components/site";

export const Route = createFileRoute("/vendors")({
  head: () => ({
    meta: [
      { title: "For vendors — Localbite" },
      {
        name: "description",
        content: "Localbite helps street food vendors get discovered, reviewed and mapped by hungry locals.",
      },
    ],
  }),
  component: VendorsPage,
});

function VendorsPage() {
  return (
    <Shell>
      <section className="paper border-b-2 border-ink">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:py-24">
          <Reveal>
            <div>
              <Eyebrow dot="bg-chilli">For vendors</Eyebrow>
              <h1 className="mt-5 text-5xl md:text-7xl">
                Put your stall <span className="text-chilli">on the map.</span>
              </h1>
              <p className="mt-5 max-w-lg text-muted-foreground">
                Get discovered by thousands of hungry locals. Add your stall, share your story and watch the reviews roll in.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <InkButton to="/submit">List your stall →</InkButton>
                <InkButton to="/discover" tone="cream">Explore Localbite →</InkButton>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Photo
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=70"
              alt="Street food vendor"
              accent="cobalt"
              className="ink-border shadow-hard-lg h-[520px] w-full"
            />
          </Reveal>
        </div>
      </section>

      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <Reveal>
            <div className="text-center">
              <Eyebrow>Why Localbite</Eyebrow>
              <h2 className="mt-3 text-5xl md:text-6xl">Built for the <span className="text-chilli">queue.</span></h2>
              <p className="mt-5 max-w-2xl mx-auto text-muted-foreground">
                Mainstream apps don’t show carts. Localbite is built for the stalls, trucks and hidden gems that make street food culture what it is.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              ["Get discovered", "Show up on the map, in search results and on curated food trails."],
              ["Share your story", "Tell locals why your dish is the one they’ve been looking for."],
              ["Earn reviews", "Real reviews from real regulars build trust faster than any ad."],
            ].map(([h, p], i) => (
              <Reveal key={h} delay={i * 100}>
                <div className="ink-border lift h-full bg-card p-6 shadow-hard-sm">
                  <span className="eyebrow text-chilli">0{i + 1}</span>
                  <h3 className="mt-3 text-2xl">{h}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <Reveal>
            <div className="ink-border shadow-hard bg-background p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <Eyebrow>Ready?</Eyebrow>
                  <h2 className="mt-3 text-4xl md:text-5xl">List your stall today.</h2>
                  <p className="mt-4 text-muted-foreground">
                    It takes a few minutes to add your cart, menu and story. Once live, locals can find, save and review you.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Tag>Free listing</Tag>
                    <Tag tone="turmeric">No app required</Tag>
                    <Tag tone="cream">Instant updates</Tag>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-4">
                  <InkButton to="/submit" full>List your stall →</InkButton>
                  <Link to="/discover" className="eyebrow text-center border-b-2 border-ink pb-0.5 hover:text-chilli">
                    Browse existing stalls
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Shell>
  );
}
