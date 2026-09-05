import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow, InkButton, Reveal, Shell } from "@/components/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Localbite" },
      {
        name: "description",
        content: "How Localbite collects, uses and protects your data. We keep it short and plain.",
      },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "What we collect",
    body: "When you sign up, we store your name, email and home city. When you save a stall or write a review, that action is linked to your account. That's it — no browsing history, no location pings, no third-party trackers.",
  },
  {
    title: "How we use it",
    body: "Your saved stalls and home city power your dashboard feed. Your reviews appear under your first name so other locals know they're real. We never sell your data, and we don't run ad networks.",
  },
  {
    title: "Where it lives",
    body: "Your data is stored in localStorage on your device, plus a small mirror in your browser's storage. In production this is backed by an encrypted database. Only you can see your saved stalls.",
  },
  {
    title: "Cookies & analytics",
    body: "Localbite uses zero third-party cookies and no third-party analytics. We don't embed Facebook pixels, Google tags or any tracking scripts. The only data we have is the data you give us.",
  },
  {
    title: "Your rights",
    body: "You can edit your name, email and city at any time from your profile. You can delete your account and all associated data by signing out and clearing your browser storage — or by emailing us at hello@localbite.in.",
  },
  {
    title: "Changes to this policy",
    body: "If we change anything material, we'll surface it in the feed and via a banner before it takes effect. We won't quietly expand what we collect.",
  },
  {
    title: "Contact",
    body: "Questions, complaints, or a data-deletion request? Email hello@localbite.in. We reply within 48 hours.",
  },
];

function PrivacyPage() {
  return (
    <Shell>
      <section className="paper border-b-2 border-ink">
        <div className="mx-auto max-w-4xl px-5 py-14 lg:py-20">
          <Reveal>
            <Eyebrow dot="bg-turmeric">Privacy policy</Eyebrow>
            <h1 className="mt-5 text-5xl md:text-7xl">
              Plain <span className="text-chilli">English.</span> No fine print.
            </h1>
            <p className="mt-5 max-w-2xl text-muted-foreground">
              Localbite is a community guide, not an ad network. We collect as little as possible, keep it to ourselves, and tell you clearly what we do with it.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">Last updated · 5 September 2026</p>
          </Reveal>
        </div>
      </section>

      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-4xl px-5 py-14">
          <ol className="space-y-10">
            {sections.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <li className="grid gap-4 md:grid-cols-[1fr_3fr]">
                  <div>
                    <p className="eyebrow text-chilli">0{i + 1}</p>
                    <h2 className="mt-1 text-2xl">{s.title}</h2>
                  </div>
                  <p className="text-muted-foreground">{s.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={200}>
            <div className="ink-border shadow-hard mt-14 bg-card p-6 md:p-8">
              <Eyebrow dot="bg-chilli">Quick summary</Eyebrow>
              <h3 className="mt-3 text-2xl">TL;DR</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>• We store your name, email, city, and your saved stalls.</li>
                <li>• No third-party trackers, no ads, no data sales.</li>
                <li>• You can delete everything anytime.</li>
                <li>• Real humans read the feedback, not algorithms.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-10 flex flex-wrap gap-3">
              <InkButton to="/">Back to home →</InkButton>
              <InkButton to="/discover" tone="cream">
                Explore stalls →
              </InkButton>
            </div>
          </Reveal>
        </div>
      </section>
    </Shell>
  );
}
