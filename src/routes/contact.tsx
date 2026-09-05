import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eyebrow, InkButton, Photo, Reveal, Shell, Tag } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Localbite" },
      {
        name: "description",
        content:
          "Reach the Localbite team — for vendor listings, press, support, partnerships and reporting a stall that's gone rogue.",
      },
    ],
  }),
  component: ContactPage,
});

const reasons = [
  {
    eyebrow: "01",
    title: "List a stall",
    body: "Run a cart, a counter or a kitchen window? Get your stall on the map — no GST, no tablet, no commission.",
    to: "/submit",
    cta: "Submit a stall →",
    accent: "chilli",
  },
  {
    eyebrow: "02",
    title: "Press & media",
    body: "Working on a story about India's street food economy? We can pull numbers, arrange interviews and share data.",
    to: "/about",
    cta: "Read our story →",
    accent: "cobalt",
  },
  {
    eyebrow: "03",
    title: "Partnerships",
    body: "Tourism boards, food festivals, neighbourhood councils — let's talk about putting your city on Localbite.",
    to: "/vendors",
    cta: "Partner with us →",
    accent: "turmeric",
  },
  {
    eyebrow: "04",
    title: "Report a problem",
    body: "Stall moved, hours are wrong, a review feels off? Flag it and our editorial team picks it up within 24 hours.",
    to: "/help",
    cta: "Open help centre →",
    accent: "chilli",
  },
];

const offices = [
  { city: "Mumbai", line: "Bandra West · 400050", who: "HQ · Editorial · Vendor ops", tz: "IST (UTC+5:30)" },
  { city: "Bengaluru", line: "Indiranagar · 560038", who: "Engineering · Map team", tz: "IST (UTC+5:30)" },
  { city: "Kolkata", line: "Park Street · 700016", who: "Trail curation", tz: "IST (UTC+5:30)" },
];

const accentBg: Record<"chilli" | "cobalt" | "turmeric", string> = {
  chilli: "bg-chilli text-cream",
  cobalt: "bg-cobalt text-cream",
  turmeric: "bg-turmeric text-ink",
};

type FormState = "idle" | "sending" | "sent";

function ContactPage() {
  const [state, setState] = useState<FormState>("idle");
  const [topic, setTopic] = useState("List a stall");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setState("sending");
    setTimeout(() => setState("sent"), 700);
  };

  return (
    <Shell>
      <section className="paper border-b-2 border-ink">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <Reveal>
            <div>
              <Eyebrow dot="bg-chilli">Contact</Eyebrow>
              <h1 className="mt-5 text-5xl md:text-7xl">
                Talk to a <span className="text-chilli">human.</span>
              </h1>
              <p className="mt-5 max-w-lg text-muted-foreground">
                Localbite is a small team. The fastest way to reach the right person is to pick a topic
                below — every form goes to a real inbox, not a void.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Tag tone="ink">Reply within 24 hrs</Tag>
                <Tag tone="turmeric">Mon–Sat · 10 AM – 8 PM IST</Tag>
                <Tag>No bots, no auto-replies</Tag>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Photo
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=70"
              alt="A street vendor at a busy Indian food lane"
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
              <Eyebrow dot="bg-turmeric">Pick your lane</Eyebrow>
              <h2 className="mt-3 text-4xl md:text-5xl">What can we help with?</h2>
              <p className="mt-2 text-sm text-cream/70">
                One inbox, sorted by topic — your message goes to the right desk.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 80}>
                <Link
                  to={r.to}
                  onClick={() => setTopic(r.title)}
                  className="ink-border lift flex h-full items-start gap-4 bg-cream p-5 text-foreground shadow-hard-sm"
                >
                  <span
                    className={`ink-border grid size-12 shrink-0 place-items-center rounded-full font-display text-base ${accentBg[r.accent]}`}
                  >
                    {r.eyebrow}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-2xl">{r.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
                    <p className="eyebrow mt-3 border-b-2 border-ink pb-0.5 text-foreground">
                      {r.cta}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow>Send a message</Eyebrow>
                <h2 className="mt-3 text-4xl md:text-5xl">Write to the team.</h2>
                <p className="mt-3 max-w-md text-sm text-muted-foreground">
                  We read every message. A real person — usually Meera or Vivek — replies within a
                  working day.
                </p>

                {state === "sent" ? (
                  <div className="ink-border mt-8 bg-turmeric p-6 shadow-hard">
                    <p className="eyebrow">Message sent</p>
                    <h3 className="mt-2 text-2xl">Thanks, {name.split(" ")[0] || "friend"}.</h3>
                    <p className="mt-2 text-sm">
                      We got your note about <strong>{topic}</strong>. You'll hear back at{" "}
                      <strong>{email}</strong> within 24 hours. In the meantime, the community is
                      busy on the feed.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          setState("idle");
                          setName("");
                          setEmail("");
                          setMessage("");
                        }}
                        className="eyebrow ink-border bg-cream px-4 py-3 shadow-hard-sm lift"
                      >
                        Send another →
                      </button>
                      <Link
                        to="/feed"
                        className="eyebrow ink-border bg-ink px-4 py-3 text-cream shadow-hard-sm lift"
                      >
                        Open the feed →
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                      <label className="eyebrow block" htmlFor="topic">
                        Topic
                      </label>
                      <select
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="ink-border mt-2 w-full bg-background px-4 py-3 text-base shadow-hard-sm focus:outline-none focus:ring-2 focus:ring-chilli"
                      >
                        {reasons.map((r) => (
                          <option key={r.title}>{r.title}</option>
                        ))}
                        <option>Something else</option>
                      </select>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="eyebrow block" htmlFor="name">
                          Your name
                        </label>
                        <input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Riya S."
                          className="ink-border mt-2 w-full bg-background px-4 py-3 text-base shadow-hard-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-chilli"
                        />
                      </div>
                      <div>
                        <label className="eyebrow block" htmlFor="email">
                          Email *
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@localbite.in"
                          className="ink-border mt-2 w-full bg-background px-4 py-3 text-base shadow-hard-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-chilli"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="eyebrow block" htmlFor="message">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us what's on your mind — stall address, story idea, partnership angle…"
                        className="ink-border mt-2 w-full resize-y bg-background px-4 py-3 text-base shadow-hard-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-chilli"
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="submit"
                        disabled={state === "sending"}
                        className="eyebrow ink-border bg-chilli px-5 py-3 text-cream shadow-hard-sm lift disabled:opacity-60"
                      >
                        {state === "sending" ? "Sending…" : "Send message →"}
                      </button>
                      <p className="text-xs text-muted-foreground">
                        By sending, you agree to our{" "}
                        <Link to="/privacy" className="border-b-2 border-ink hover:text-chilli">
                          privacy policy
                        </Link>
                        .
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <aside className="space-y-6">
                <div className="ink-border shadow-hard bg-card p-6">
                  <p className="eyebrow text-chilli">Direct lines</p>
                  <h3 className="mt-2 text-2xl">Reach a person, fast.</h3>
                  <ul className="mt-5 space-y-4 text-sm">
                    <li className="flex items-start justify-between gap-3 border-b-2 border-dashed border-ink/20 pb-3">
                      <div>
                        <p className="font-display text-base">Vendor & listings</p>
                        <p className="text-xs text-muted-foreground">stalls@localbite.in</p>
                      </div>
                      <Tag tone="ink">Mon–Sat</Tag>
                    </li>
                    <li className="flex items-start justify-between gap-3 border-b-2 border-dashed border-ink/20 pb-3">
                      <div>
                        <p className="font-display text-base">Press</p>
                        <p className="text-xs text-muted-foreground">press@localbite.in</p>
                      </div>
                      <Tag tone="turmeric">48 hrs</Tag>
                    </li>
                    <li className="flex items-start justify-between gap-3 border-b-2 border-dashed border-ink/20 pb-3">
                      <div>
                        <p className="font-display text-base">Partnerships</p>
                        <p className="text-xs text-muted-foreground">hello@localbite.in</p>
                      </div>
                      <Tag tone="ink">1 week</Tag>
                    </li>
                    <li className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-base">Support & reports</p>
                        <p className="text-xs text-muted-foreground">help@localbite.in</p>
                      </div>
                      <Tag tone="chilli">24 hrs</Tag>
                    </li>
                  </ul>
                </div>

                <div className="ink-border shadow-hard bg-turmeric p-6">
                  <p className="eyebrow">Phone</p>
                  <p className="mt-2 font-display text-3xl">+91 22 4000 1240</p>
                  <p className="mt-1 text-xs">Mon–Sat · 10 AM – 8 PM IST · Call for urgent vendor issues only.</p>
                </div>

                <div className="ink-border shadow-hard bg-ink p-6 text-cream">
                  <p className="eyebrow text-turmeric">Field team</p>
                  <h3 className="mt-2 text-2xl">Find us on the ground.</h3>
                  <p className="mt-2 text-sm text-cream/70">
                    Our vendor-ops team is out mapping stalls Tuesday to Friday. If you spot a
                    Localbite tee in your city, say hi.
                  </p>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-card">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <Reveal>
            <div>
              <Eyebrow dot="bg-chilli">Where we work</Eyebrow>
              <h2 className="mt-3 text-4xl md:text-5xl">Three offices, six cities.</h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {offices.map((o, i) => (
              <Reveal key={o.city} delay={i * 80}>
                <div className="ink-border lift h-full bg-background p-6 shadow-hard-sm">
                  <p className="eyebrow text-chilli">{o.tz}</p>
                  <h3 className="mt-2 text-3xl">{o.city}</h3>
                  <p className="mt-2 text-sm">{o.line}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{o.who}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <Reveal>
            <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
              <div>
                <Eyebrow dot="bg-chilli">Before you write</Eyebrow>
                <h2 className="mt-3 text-4xl md:text-5xl">Try the help centre first.</h2>
                <p className="mt-4 max-w-lg text-muted-foreground">
                  Most questions — saving stalls, posting reviews, claiming a listing — already have
                  an answer in the help centre. Faster for you, fewer emails for us.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <InkButton to="/help">Open help centre →</InkButton>
                <Link
                  to="/feed"
                  className="eyebrow ink-border bg-cream px-4 py-3 shadow-hard-sm lift"
                >
                  Community feed →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Shell>
  );
}
