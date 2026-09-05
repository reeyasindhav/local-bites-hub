import { createFileRoute } from "@tanstack/react-router";
import { Eyebrow, InkButton, Reveal, Shell, Tag } from "@/components/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of use — Localbite" },
      {
        name: "description",
        content: "The rules of the road for using Localbite — fair, simple and in plain English.",
      },
    ],
  }),
  component: TermsPage,
});

const sections = [
  {
    title: "What Localbite is",
    body: "Localbite is a community guide to street food in India. We map stalls, curate trails and surface real reviews from real regulars. We are not a food delivery service, we don't take orders and we don't process payments.",
  },
  {
    title: "Your account",
    body: "When you sign up, you agree to give us accurate information. You're responsible for keeping your account secure. One account per person. If we spot bots or fake accounts, we'll remove them.",
  },
  {
    title: "What you post",
    body: "Reviews and stall submissions you post must be honest, first-hand and about the actual stall. No spam, no defamatory content, no impersonation. We reserve the right to remove content that breaks these rules.",
  },
  {
    title: "Vendors & listings",
    body: "Stall listings are submitted by vendors and verified by our team before going live. Once live, the listing belongs to the vendor. We may edit listings for clarity but will not change prices, hours or dish names without permission.",
  },
  {
    title: "Content ownership",
    body: "You own the reviews and stories you write. By posting on Localbite, you grant us a non-exclusive licence to display that content on the platform. Photos you upload must be yours to share, or properly licensed.",
  },
  {
    title: "Food safety disclaimer",
    body: "Localbite is a discovery tool, not a health authority. We don't inspect kitchens, test hygiene or guarantee food safety. Eat at your own judgement. If a stall makes you sick, tell us — we'll flag it for review.",
  },
  {
    title: "Liability",
    body: "We work hard to keep listings accurate, but hours change, stalls close, dishes sell out. Localbite is not liable for inaccurate information, food quality, or outcomes from visiting a listed stall.",
  },
  {
    title: "Changes to these terms",
    body: "We may update these terms occasionally. Material changes will be announced in the feed and via a banner before taking effect. Continued use of Localbite means you accept the updated terms.",
  },
  {
    title: "Contact",
    body: "Questions, takedown requests, or vendor support? Email hello@localbite.in. We reply within 48 hours.",
  },
];

function TermsPage() {
  return (
    <Shell>
      <section className="paper border-b-2 border-ink">
        <div className="mx-auto max-w-4xl px-5 py-14 lg:py-20">
          <Reveal>
            <Eyebrow dot="bg-chilli">Terms of use</Eyebrow>
            <h1 className="mt-5 text-5xl md:text-7xl">
              The <span className="text-chilli">rules of the road.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-muted-foreground">
              Localbite is built by the community, for the community. These are the simple rules that keep the road clear for everyone — vendors, regulars and curious wanderers.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag tone="ink">Last updated · 5 September 2026</Tag>
              <Tag tone="cream">Effective immediately</Tag>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-4xl px-5 py-14">
          <ol className="space-y-10">
            {sections.map((s, i) => (
              <Reveal key={s.title} delay={i * 50}>
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
              <Eyebrow dot="bg-turmeric">The short version</Eyebrow>
              <h3 className="mt-3 text-2xl">TL;DR</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>• Be honest in reviews. Be a real person. Be kind.</li>
                <li>• Vendors own their listings. Reviews belong to their authors.</li>
                <li>• Localbite is a discovery tool, not a health authority.</li>
                <li>• We remove spam, bots and bad actors.</li>
                <li>• Tell us when something's wrong. We listen.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-10 flex flex-wrap gap-3">
              <InkButton to="/">Back to home →</InkButton>
              <InkButton to="/privacy" tone="cream">
                Read privacy →
              </InkButton>
            </div>
          </Reveal>
        </div>
      </section>
    </Shell>
  );
}
