import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, InkButton, Photo, Reveal, Shell, Tag } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Localbite" },
      {
        name: "description",
        content: "The story behind Localbite — why we map street food, how we work, and what we believe.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    eyebrow: "01",
    title: "Vendor first",
    body: "Street vendors built the cuisine we love. Localbite is built to put them on the map — fairly, accurately, and without the gatekeeping of mainstream food apps.",
  },
  {
    eyebrow: "02",
    title: "Real reviews only",
    body: "No bots, no paid reviews, no five-star farms. Reviews are tied to real locals, and we moderate aggressively to keep the feed honest.",
  },
  {
    eyebrow: "03",
    title: "Hyperlocal, always",
    body: "We don't average India into one feed. We tell you which stall is open right now, on your street, with the queue the way it actually is this morning.",
  },
  {
    eyebrow: "04",
    title: "No ads, ever",
    body: "Stalls don't pay to appear. Top 10 doesn't accept sponsorships. Localbite is supported by the community, not by vendors trying to out-bid each other.",
  },
];

const stats = [
  { value: "1,240", label: "Stalls mapped" },
  { value: "18k", label: "Real reviews" },
  { value: "6", label: "Cities live" },
  { value: "0", label: "Third-party trackers" },
];

const team = [
  { name: "Riya S.", role: "Founder · ex-Zomato, ex-Bain", initials: "RS" },
  { name: "Aakash D.", role: "Engineering · built the map engine", initials: "AD" },
  { name: "Meera K.", role: "Editorial · curates trails & dishes", initials: "MK" },
  { name: "Vivek N.", role: "Vendor ops · verifies every listing", initials: "VN" },
];

function AboutPage() {
  return (
    <Shell>
      <section className="paper border-b-2 border-ink">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <Reveal>
            <div>
              <Eyebrow dot="bg-chilli">About Localbite</Eyebrow>
              <h1 className="mt-5 text-5xl md:text-7xl">
                We map the <span className="text-chilli">real India.</span>
              </h1>
              <p className="mt-5 max-w-lg text-muted-foreground">
                Localbite is a community guide to street food, built because the mainstream apps forgot the carts, the trucks, the corner stalls and the four-generation counters that actually feed India.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Tag tone="ink">Est. 2024</Tag>
                <Tag tone="turmeric">6 cities</Tag>
                <Tag tone="cream">Community-funded</Tag>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Photo
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=70"
              alt="A bustling Indian street food lane"
              accent="chilli"
              className="ink-border shadow-hard-lg h-[480px] w-full"
            />
          </Reveal>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-cobalt text-cream">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <Reveal>
            <div>
              <Eyebrow dot="bg-turmeric">By the numbers</Eyebrow>
              <h2 className="mt-3 text-4xl md:text-5xl">What we’ve built so far.</h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="ink-border lift bg-cream p-5 text-foreground shadow-hard-sm">
                  <p className="font-display text-5xl">{s.value}</p>
                  <p className="eyebrow mt-1 text-muted-foreground">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow dot="bg-turmeric">Why we exist</Eyebrow>
              <h2 className="mt-3 text-4xl md:text-5xl">The problem with food apps.</h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="ink-border lift h-full bg-card p-6 shadow-hard-sm">
                <p className="eyebrow text-chilli">The mainstream</p>
                <h3 className="mt-3 text-2xl">Fine dining first.</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  Swiggy, Zomato and Google Maps all optimise for the same thing: restaurants with menus, GST numbers and POS systems. A kheema cart on Mohammed Ali Road is invisible — even though it feeds 300 people a night.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="ink-border lift h-full bg-card p-6 shadow-hard-sm">
                <p className="eyebrow text-chilli">What we do instead</p>
                <h3 className="mt-3 text-2xl">Carts first.</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  We map the unofficial, the unmapped and the unbranded. No GST required. No tablet needed. Just a story, a dish, a neighbourhood and a queue that someone in the area can verify.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-card">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <Reveal>
            <div>
              <Eyebrow dot="bg-chilli">What we believe</Eyebrow>
              <h2 className="mt-3 text-4xl md:text-5xl">Four things, non-negotiably.</h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="ink-border lift h-full bg-background p-6 shadow-hard-sm">
                  <p className="eyebrow text-chilli">{v.eyebrow}</p>
                  <h3 className="mt-3 text-2xl">{v.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <Reveal>
            <div>
              <Eyebrow>The people</Eyebrow>
              <h2 className="mt-3 text-4xl md:text-5xl">A small team that eats its way through cities.</h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                We’re four. Between us we’ve eaten at 800+ stalls, written 6,000+ reviews, and argued about whether vada pav counts as a sandwich.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {team.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <div className="ink-border lift h-full bg-card p-5 shadow-hard-sm">
                  <div className="ink-border grid size-14 place-items-center rounded-full bg-turmeric font-display text-lg">
                    {p.initials}
                  </div>
                  <h3 className="mt-4 text-xl">{p.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cobalt text-cream">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <Reveal>
            <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
              <div>
                <Eyebrow dot="bg-turmeric">Join the bite</Eyebrow>
                <h2 className="mt-3 text-4xl md:text-5xl">Help us map the next 10,000 stalls.</h2>
                <p className="mt-4 max-w-lg text-cream/70">
                  Know a cart that deserves to be on the map? Run a stall and want to be listed? We’re always looking for tips, vendors and neighbourhood guides.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <InkButton to="/submit">List a stall →</InkButton>
                <Link
                  to="/discover"
                  className="eyebrow ink-border bg-cream px-4 py-3 text-ink shadow-hard-sm lift"
                >
                  Browse stalls →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Shell>
  );
}
