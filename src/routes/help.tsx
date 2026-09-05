import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eyebrow, InkButton, Reveal, Shell, Tag } from "@/components/site";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help — Localbite" },
      {
        name: "description",
        content: "How Localbite works, what the markers mean, how to save stalls and add a vendor.",
      },
    ],
  }),
  component: HelpPage,
});

type Faq = { q: string; a: string };

const faqs: Faq[] = [
  {
    q: "What is Localbite?",
    a: "Localbite is a community guide to street food across India. We map stalls, trucks and hidden counters — the kind of places that don't show up on Swiggy or Zomato because they don't have GST numbers, tablets or delivery riders.",
  },
  {
    q: "Do I need an account to browse?",
    a: "No. You can browse Discover, Trails, Dishes, the Leaderboard and the Feed without an account. You only need to sign up to save stalls, leave reviews or submit a new stall.",
  },
  {
    q: "How do I sign up?",
    a: "Tap Sign up in the top-right corner. We only ask for your name, email and home city. No passwords, no OTPs — this is a local demo session, and your data is stored in your browser.",
  },
  {
    q: "How do I save a stall?",
    a: "On any stall card or stall page, tap the ☆ icon in the top-right of the image. The star fills in and the stall goes to your Saved list. Open Saved from the header or your dashboard to see everything you've starred.",
  },
  {
    q: "Why is there a pulsing pin on the map?",
    a: "Pins on the live map show every mapped stall in the area. The pulsing red one is the selected stall — tap any pin to switch the selection. Tap the Open button on the bottom bar to jump to the full stall page.",
  },
  {
    q: "How do I add a new stall?",
    a: "Tap List your stall in the footer (or the CTA on the Vendors page). Fill in the name, signature dish, neighbourhood, hours, price and a short story. Submissions go to a human review queue and usually go live within 24 hours.",
  },
  {
    q: "Are the reviews real?",
    a: "Yes. Reviews are tied to a Localbite account and a real first name. We don't allow paid reviews, bot reviews or self-promotion. If you spot a fake review, email hello@localbite.in and we'll investigate.",
  },
  {
    q: "Do you take orders or payments?",
    a: "No. Localbite is a discovery tool only. We don't process orders, deliveries or payments. You visit the stall in person and pay the vendor directly.",
  },
  {
    q: "What if a stall is closed or has moved?",
    a: "Hours and locations on Localbite are community-reported. If something is wrong, you can flag the stall from its page and we'll verify. Live, on-the-ground reporting is what keeps the map honest.",
  },
  {
    q: "How do I delete my account?",
    a: "Clear your browser's local storage for this site, or email hello@localbite.in and we'll remove your account and all associated reviews within 7 days.",
  },
];

const guides = [
  {
    eyebrow: "01",
    title: "Discover stalls near you",
    body: "Open the Discover page, filter by city, price or open-now status, and tap any card to read the full story.",
    to: "/discover",
    cta: "Open Discover →",
  },
  {
    eyebrow: "02",
    title: "Follow a curated trail",
    body: "Trails are walkable routes of 4–6 handpicked stalls. Pick one, save it to your dashboard, and follow the itinerary in order.",
    to: "/trails",
    cta: "See trails →",
  },
  {
    eyebrow: "03",
    title: "Browse dishes, not just places",
    body: "The Dish encyclopedia is sorted by what you're craving — Kheema Pav, Kathi Roll, Misal Pav, Litti Chokha and more. Each page tells you the story and shows the best stalls for it.",
    to: "/dishes",
    cta: "Browse dishes →",
  },
  {
    eyebrow: "04",
    title: "Run a stall? List it",
    body: "Free to list, free to update. Vendors stay in control of their menu, hours and story. We just put you on the map.",
    to: "/submit",
    cta: "List your stall →",
  },
];

function HelpPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <Shell>
      <section className="paper border-b-2 border-ink">
        <div className="mx-auto max-w-4xl px-5 py-14 lg:py-20">
          <Reveal>
            <Eyebrow dot="bg-turmeric">Help & FAQ</Eyebrow>
            <h1 className="mt-5 text-5xl md:text-7xl">
              How can we <span className="text-chilli">help?</span>
            </h1>
            <p className="mt-5 max-w-2xl text-muted-foreground">
              Quick answers to common questions, a four-step getting-started guide, and a direct line to the team. If something's missing, just email us.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Tag tone="ink">10 FAQs</Tag>
              <Tag tone="turmeric">4-step guide</Tag>
              <Tag tone="cream">Replies within 48h</Tag>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-4xl px-5 py-14">
          <Reveal>
            <div>
              <Eyebrow dot="bg-chilli">Getting started</Eyebrow>
              <h2 className="mt-3 text-4xl md:text-5xl">Four things to try first.</h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {guides.map((g, i) => (
              <Reveal key={g.title} delay={i * 80}>
                <Link
                  to={g.to}
                  className="ink-border lift block h-full bg-card p-6 shadow-hard-sm"
                >
                  <p className="eyebrow text-chilli">{g.eyebrow}</p>
                  <h3 className="mt-3 text-2xl">{g.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{g.body}</p>
                  <span className="eyebrow mt-5 inline-block border-b-2 border-ink pb-0.5 hover:text-chilli">
                    {g.cta}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-card">
        <div className="mx-auto max-w-4xl px-5 py-14">
          <Reveal>
            <div>
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="mt-3 text-4xl md:text-5xl">Common questions.</h2>
            </div>
          </Reveal>

          <ol className="mt-10 space-y-3">
            {faqs.map((f, i) => {
              const open = openIdx === i;
              return (
                <Reveal key={f.q} delay={i * 30}>
                  <li className="ink-border bg-background shadow-hard-sm">
                    <button
                      onClick={() => setOpenIdx(open ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      aria-expanded={open}
                    >
                      <span className="text-base font-semibold md:text-lg">
                        <span className="eyebrow mr-3 text-chilli">0{i + 1}</span>
                        {f.q}
                      </span>
                      <span
                        className={`ink-border grid size-8 shrink-0 place-items-center bg-turmeric font-display transition-transform ${
                          open ? "rotate-45" : ""
                        }`}
                        aria-hidden
                      >
                        +
                      </span>
                    </button>
                    {open && (
                      <div className="border-t-2 border-dashed border-ink/25 px-5 py-4 text-sm text-muted-foreground">
                        {f.a}
                      </div>
                    )}
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="bg-cobalt text-cream">
        <div className="mx-auto max-w-4xl px-5 py-16">
          <Reveal>
            <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
              <div>
                <Eyebrow dot="bg-turmeric">Still stuck?</Eyebrow>
                <h2 className="mt-3 text-4xl md:text-5xl">Talk to a real human.</h2>
                <p className="mt-4 max-w-lg text-cream/70">
                  We read every email. For bug reports, vendor support, data requests, or just to say hi — drop us a line and we'll get back within 48 hours.
                </p>
                <p className="mt-4 font-display text-2xl">hello@localbite.in</p>
              </div>
              <div className="flex flex-col gap-3">
                <InkButton to="/about">About Localbite →</InkButton>
                <Link
                  to="/privacy"
                  className="eyebrow ink-border bg-cream px-4 py-3 text-ink shadow-hard-sm lift"
                >
                  Read privacy →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Shell>
  );
}
