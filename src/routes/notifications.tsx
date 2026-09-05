import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Eyebrow, InkButton, Reveal, RequireAuth, Shell, Tag } from "@/components/site";
import { useAuth } from "@/lib/auth";
import { reviews, stalls, trails } from "@/lib/data";

type NotifType = "reply" | "follow" | "stock" | "trail" | "digest";

type Notification = {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  when: string;
  read: boolean;
  to?: string;
  cta?: string;
};

const meta: Record<NotifType, { icon: string; bg: string; label: string }> = {
  reply: { icon: "💬", bg: "bg-chilli", label: "Review reply" },
  follow: { icon: "👥", bg: "bg-cobalt", label: "New follower" },
  stock: { icon: "🔥", bg: "bg-turmeric", label: "Back in action" },
  trail: { icon: "🗺️", bg: "bg-mint", label: "New trail" },
  digest: { icon: "📬", bg: "bg-cream", label: "Weekly digest" },
};

const seedNotifications = (city: string): Notification[] => {
  const localStall = stalls.find((s) => s.city === city) ?? stalls[0];
  const localTrail = trails.find((t) => t.city === city) ?? trails[0];
  const featuredReview = reviews[0];

  return [
    {
      id: "n-1",
      type: "reply",
      title: "Noor Bhai replied to your review",
      body: `"${featuredReview.text.slice(0, 88)}…" — Noor Bhai said: "Aapka swagat hai. Next time, ask for extra gravy on the side."`,
      when: "12 min ago",
      read: false,
      to: "/stalls/$id",
      cta: "Open thread",
    },
    {
      id: "n-2",
      type: "follow",
      title: "Aarti M. started following you",
      body: "Late-shift grazer · 412 followers. They're saving 3 stalls in your city.",
      when: "2 hrs ago",
      read: false,
      to: "/feed",
      cta: "See their feed",
    },
    {
      id: "n-3",
      type: "stock",
      title: `${localStall.dish} is back on the cart`,
      body: `${localStall.name} re-opened 10 minutes ago. Live location is updated and the queue is moving.`,
      when: "4 hrs ago",
      read: false,
      to: "/stalls/$id",
      cta: "Get directions",
    },
    {
      id: "n-4",
      type: "trail",
      title: `New trail near you: ${localTrail.title}`,
      body: `${localTrail.distance} · ${localTrail.duration} · ${localTrail.budget}. A ${localTrail.stops}-stop crawl through ${localTrail.city}.`,
      when: "Yesterday",
      read: true,
      to: "/trails/$slug",
      cta: "See the route",
    },
    {
      id: "n-5",
      type: "digest",
      title: "Your week on Localbite",
      body: "You saved 2 new stalls, walked 1 trail and dropped into 0 reviews. The map now has 14 saved spots in your rotation.",
      when: "Mon · 9:00 AM",
      read: true,
      to: "/dashboard",
      cta: "Open dashboard",
    },
    {
      id: "n-6",
      type: "stock",
      title: "Ramesh Chaatwala just lit the sigri",
      body: "Girgaon Chaat Gully · 3:00 PM opening. Sev puri first batch is in 5 minutes.",
      when: "2 days ago",
      read: true,
      to: "/stalls/$id",
      cta: "View stall",
    },
  ];
};

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Localbite" },
      {
        name: "description",
        content: "Replies from vendors, follower updates, back-on-the-cart alerts and weekly digests.",
      },
    ],
  }),
  component: NotificationsPage,
});

type Filter = "all" | "unread";

function NotificationsPage() {
  const { user } = useAuth();
  const city = user?.city ?? "Mumbai";
  const all = useMemo(() => seedNotifications(city), [city]);
  const [items, setItems] = useState<Notification[]>(all);
  const [filter, setFilter] = useState<Filter>("all");

  const unreadCount = items.filter((n) => !n.read).length;

  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  const toggleRead = (id: string) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));

  const visible = filter === "unread" ? items.filter((n) => !n.read) : items;

  return (
    <RequireAuth>
      <Shell>
        <section className="paper border-b-2 border-ink">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:py-20">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <Eyebrow dot="bg-chilli">Inbox</Eyebrow>
                  <h1 className="mt-3 text-5xl md:text-7xl">Notifications.</h1>
                  <p className="mt-4 max-w-xl text-muted-foreground">
                    Vendor replies, follower updates, fresh trails and the weekly digest — all in one
                    place.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Tag tone={unreadCount > 0 ? "chilli" : "ink"}>
                      {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
                    </Tag>
                    <Tag tone="turmeric">{items.length} total</Tag>
                    <Tag>{user?.city ?? "India"}</Tag>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={markAllRead}
                    disabled={unreadCount === 0}
                    className="eyebrow ink-border bg-cream px-4 py-3 shadow-hard-sm lift disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Mark all read
                  </button>
                  <Link
                    to="/dashboard"
                    className="eyebrow ink-border bg-ink px-4 py-3 text-cream shadow-hard-sm lift"
                  >
                    Dashboard →
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-b-2 border-ink bg-cobalt text-cream">
          <div className="mx-auto max-w-7xl px-5 py-10">
            <Reveal>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {(["all", "unread"] as const).map((f) => (
                    <button key={f} onClick={() => setFilter(f)}>
                      <Tag tone={filter === f ? "turmeric" : "ink"}>
                        {f === "all" ? `All · ${items.length}` : `Unread · ${unreadCount}`}
                      </Tag>
                    </button>
                  ))}
                </div>
                <p className="eyebrow text-cream/70">
                  Showing {visible.length} {visible.length === 1 ? "notification" : "notifications"}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-7xl px-5 py-12">
            {visible.length === 0 ? (
              <Reveal>
                <div className="ink-border shadow-hard-sm bg-card p-10 text-center">
                  <p className="eyebrow text-muted-foreground">Inbox zero</p>
                  <h3 className="mt-2 text-2xl">Nothing unread.</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    New vendor replies, follower pings and trail alerts will land here.
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    <InkButton to="/feed">Open the feed</InkButton>
                    <Link
                      to="/discover"
                      className="eyebrow ink-border bg-cream px-4 py-3 shadow-hard-sm lift"
                    >
                      Find new stalls
                    </Link>
                  </div>
                </div>
              </Reveal>
            ) : (
              <ol className="space-y-4">
                {visible.map((n, i) => {
                  const m = meta[n.type];
                  const linkProps = n.to?.includes("$id")
                    ? { to: "/stalls/$id" as const, params: { id: stalls[0].id } }
                    : n.to?.includes("$slug")
                    ? { to: "/trails/$slug" as const, params: { slug: trails[0].slug } }
                    : n.to === "/feed"
                    ? { to: "/feed" as const }
                    : n.to === "/dashboard"
                    ? { to: "/dashboard" as const }
                    : null;

                  return (
                    <Reveal key={n.id} delay={i * 50}>
                      <li>
                        <article
                          className={`ink-border shadow-hard-sm lift relative flex flex-col gap-4 bg-card p-5 md:flex-row md:items-start md:p-6 ${
                            n.read ? "opacity-80" : ""
                          }`}
                        >
                          {!n.read && (
                            <span
                              className="absolute right-4 top-4 size-2.5 rounded-full bg-chilli"
                              aria-label="Unread"
                            />
                          )}
                          <span
                            className={`ink-border grid size-12 shrink-0 place-items-center rounded-full text-xl ${m.bg} ${
                              n.type === "trail" || n.type === "digest" ? "text-ink" : "text-cream"
                            }`}
                            aria-hidden
                          >
                            {m.icon}
                          </span>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <Tag tone="ink">{m.label}</Tag>
                              <span className="eyebrow text-muted-foreground">{n.when}</span>
                            </div>
                            <h3 className="mt-2 text-2xl">{n.title}</h3>
                            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{n.body}</p>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {linkProps && "to" in linkProps && n.cta && (
                                <Link
                                  to={linkProps.to}
                                  params={"params" in linkProps ? linkProps.params : undefined}
                                  className="eyebrow ink-border bg-ink px-3 py-2 text-cream shadow-hard-sm lift"
                                >
                                  {n.cta} →
                                </Link>
                              )}
                              <button
                                onClick={() => toggleRead(n.id)}
                                className="eyebrow border-b-2 border-ink pb-0.5 text-foreground hover:text-chilli"
                              >
                                {n.read ? "Mark unread" : "Mark read"}
                              </button>
                            </div>
                          </div>
                        </article>
                      </li>
                      </Reveal>
                  );
                })}
              </ol>
            )}
          </div>
        </section>

        <section className="bg-card">
          <div className="mx-auto max-w-7xl px-5 py-14">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <Eyebrow dot="bg-turmeric">Tune your inbox</Eyebrow>
                  <h2 className="mt-3 text-4xl md:text-5xl">What hits your notifications?</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Fine-tune which signals reach you. (Demo — toggles are visual only.)
                  </p>
                </div>
                <Link to="/help" className="eyebrow border-b-2 border-ink pb-0.5 hover:text-chilli">
                  How alerts work →
                </Link>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(
                [
                  { label: "Vendor replies on my reviews", on: true, hint: "Push + email" },
                  { label: "New followers", on: true, hint: "Push only" },
                  { label: "Saved stall back in action", on: true, hint: "Push only" },
                  { label: "New trails in my city", on: true, hint: "Weekly digest" },
                  { label: "Weekly digest", on: true, hint: "Monday 9 AM" },
                  { label: "Promotional offers", on: false, hint: "Off" },
                ] as const
              ).map((p, i) => (
                <Reveal key={p.label} delay={i * 60}>
                  <div className="ink-border lift flex items-center justify-between gap-3 bg-background p-4 shadow-hard-sm">
                    <div>
                      <p className="font-display text-lg">{p.label}</p>
                      <p className="eyebrow text-muted-foreground">{p.hint}</p>
                    </div>
                    <span
                      className={`ink-border grid h-7 w-12 shrink-0 place-items-center px-0.5 ${
                        p.on ? "justify-end bg-chilli" : "justify-start bg-cream"
                      }`}
                      aria-label={p.on ? "On" : "Off"}
                    >
                      <span className="block size-5 rounded-full bg-cream shadow-hard-sm" />
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Shell>
    </RequireAuth>
  );
}
