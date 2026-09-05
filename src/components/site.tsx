import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import type { Stall } from "@/lib/data";

const accentBg = {
  chilli: "bg-chilli",
  cobalt: "bg-cobalt",
  turmeric: "bg-turmeric",
} as const;

const accentText = {
  chilli: "text-cream",
  cobalt: "text-cream",
  turmeric: "text-ink",
} as const;

/* ---------- primitives ---------- */

export function Eyebrow({ children, dot = "bg-chilli" }: { children: ReactNode; dot?: string }) {
  return (
    <p className="eyebrow flex items-center gap-2">
      <span className={`inline-block size-2 rounded-full ${dot}`} />
      {children}
    </p>
  );
}

export function InkButton({
  children,
  to,
  onClick,
  tone = "ink",
  type = "button",
  className = "",
  full = false,
}: {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  tone?: "ink" | "chilli" | "cream" | "turmeric";
  type?: "button" | "submit";
  className?: string;
  full?: boolean;
}) {
  const tones = {
    ink: "bg-ink text-cream",
    chilli: "bg-chilli text-cream",
    cream: "bg-cream text-ink",
    turmeric: "bg-turmeric text-ink",
  } as const;
  const cls = `ink-border shadow-hard-sm lift eyebrow inline-flex items-center justify-center gap-2 px-5 py-3 ${
    tones[tone]
  } ${full ? "w-full" : ""} ${className}`;
  if (to)
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function Tag({ children, tone = "cream" }: { children: ReactNode; tone?: "cream" | "ink" | "turmeric" }) {
  const tones = {
    cream: "bg-cream text-ink",
    ink: "bg-ink text-cream",
    turmeric: "bg-turmeric text-ink",
  } as const;
  return <span className={`ink-border eyebrow px-2.5 py-1 ${tones[tone]}`}>{children}</span>;
}

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={shown ? "animate-rise" : "opacity-0"}
    >
      {children}
    </div>
  );
}

export function Photo({
  src,
  alt,
  className = "",
  accent = "chilli",
}: {
  src: string;
  alt: string;
  className?: string;
  accent?: keyof typeof accentBg;
}) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div className={`${accentBg[accent]} paper flex items-center justify-center ${className}`}>
        <span className="eyebrow opacity-70">{alt}</span>
      </div>
    );
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

/* ---------- dish card ---------- */

export function StallCard({ stall, index = 0 }: { stall: Stall; index?: number }) {
  const { saved, toggleSave, user } = useAuth();
  const isSaved = saved.includes(stall.id);
  return (
    <Reveal delay={index * 80}>
      <article className="ink-border shadow-hard lift group h-full bg-card text-foreground">
        <div className="relative overflow-hidden border-b-2 border-ink">
          <Photo
            src={stall.photo}
            alt={stall.dish}
            accent={stall.accent}
            className="h-52 w-full transition-transform duration-500 group-hover:scale-105"
          />
          <span
            className={`ink-border eyebrow absolute left-3 top-3 px-2 py-1 ${accentBg[stall.accent]} ${
              accentText[stall.accent]
            }`}
          >
            {stall.tags[0]}
          </span>
          <button
            onClick={() => toggleSave(stall.id)}
            aria-label={isSaved ? "Remove from saved" : "Save stall"}
            title={user ? "" : "Saved locally — sign in to sync"}
            className="ink-border absolute right-3 top-3 bg-cream px-2 py-1 text-sm transition-transform hover:scale-110"
          >
            {isSaved ? "★" : "☆"}
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl">{stall.dish}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {stall.name} · {stall.neighbourhood}, {stall.city}
              </p>
            </div>
            <span className="eyebrow whitespace-nowrap">★ {stall.rating}</span>
          </div>
          <div className="mt-4 flex items-center justify-between border-t-2 border-dashed border-ink/25 pt-3">
            <span className="font-display text-lg">
              ₹{stall.price}
              <span className="ml-1 text-xs font-normal text-muted-foreground">/ plate</span>
            </span>
            <Link
              to="/stalls/$id"
              params={{ id: stall.id }}
              className="eyebrow border-b-2 border-ink pb-0.5 transition-colors hover:text-chilli"
            >
              View stall →
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ---------- dialogs ---------- */

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  body,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "chilli",
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  body: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "chilli" | "ink";
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const confirmTone = tone === "chilli" ? "bg-chilli text-cream" : "bg-ink text-cream";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      className="fixed inset-0 z-[100] grid place-items-center px-4"
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
      />
      <div className="ink-border animate-pop relative w-full max-w-md bg-cream p-6 shadow-hard-lg md:p-8">
        <div className="flex items-start gap-4">
          <span className="ink-border grid size-12 shrink-0 place-items-center rounded-full bg-chilli text-2xl text-cream">
            ⚠️
          </span>
          <div className="flex-1">
            <h2 id="confirm-title" className="text-3xl">
              {title}
            </h2>
            <div className="mt-2 text-sm text-muted-foreground">{body}</div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <button
            onClick={onClose}
            className="eyebrow ink-border bg-cream px-4 py-3 shadow-hard-sm lift"
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`eyebrow ink-border ${confirmTone} px-4 py-3 shadow-hard-sm lift`}
          >
            {confirmLabel} →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- header / footer ---------- */

const nav = [
  { to: "/discover", label: "Discover" },
  { to: "/trails", label: "Food trails" },
  { to: "/dishes", label: "Dishes" },
  { to: "/feed", label: "Feed" },
  { to: "/leaderboard", label: "Top 10" },
  { to: "/vendors", label: "For vendors" },
];

export function SiteHeader() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b-2 border-ink bg-cream">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="ink-border grid size-8 place-items-center rounded-full bg-chilli text-sm">
              🍜
            </span>
            <span className="font-display text-xl tracking-tight">
              localbite<span className="text-chilli">.</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="eyebrow transition-colors hover:text-chilli"
                activeProps={{ className: "eyebrow text-chilli" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <>
                <Link
                  to="/notifications"
                  aria-label="Notifications"
                  className="ink-border relative grid size-9 place-items-center bg-cream shadow-hard-sm lift"
                >
                  <span aria-hidden>🔔</span>
                  <span className="ink-border absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-chilli text-[10px] font-bold text-cream">
                    3
                  </span>
                </Link>
                <Link to="/profile" className="eyebrow px-2 py-2 hover:text-chilli">
                  Profile
                </Link>
                <Link to="/dashboard" className="eyebrow ink-border bg-turmeric px-3 py-2 shadow-hard-sm lift">
                  {user.name.split(" ")[0]}'s feed
                </Link>
                <button
                  onClick={() => setSignOutOpen(true)}
                  className="eyebrow px-2 py-2 text-muted-foreground hover:text-chilli"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="eyebrow px-2 py-2 hover:text-chilli">
                  Log in
                </Link>
                <InkButton to="/signup">Sign up →</InkButton>
              </>
            )}
          </div>

          <button
            className="ink-border px-3 py-2 md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <span className="eyebrow">{open ? "Close" : "Menu"}</span>
          </button>
        </div>

        {open && (
          <div className="animate-pop border-t-2 border-ink bg-cream px-5 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {nav.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="eyebrow">
                  {n.label}
                </Link>
              ))}
              <Link to={user ? "/dashboard" : "/login"} onClick={() => setOpen(false)} className="eyebrow">
                {user ? "My feed" : "Log in"}
              </Link>
              <Link to={user ? "/saved" : "/signup"} onClick={() => setOpen(false)} className="eyebrow">
                {user ? "Saved stalls" : "Sign up"}
              </Link>
              {user && (
                <Link to="/notifications" onClick={() => setOpen(false)} className="eyebrow">
                  Notifications
                </Link>
              )}
              {user && (
                <button
                  onClick={() => {
                    setOpen(false);
                    setSignOutOpen(true);
                  }}
                  className="eyebrow text-left text-muted-foreground"
                >
                  Sign out
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={signOutOpen}
        onClose={() => setSignOutOpen(false)}
        onConfirm={() => {
          signOut();
          router.navigate({ to: "/" });
        }}
        title="Sign out of Localbite?"
        body={
          <>
            Your saved stalls will stay on this device, but you'll need to sign back in to sync them
            to your account and post reviews.
          </>
        }
        confirmLabel="Sign out"
        cancelLabel="Stay in"
      />
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-ink bg-cream">
      <div className="border-b-2 border-ink bg-turmeric">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-5 py-10">
          <div>
            <p className="eyebrow">Are you the neighbourhood legend?</p>
            <h2 className="mt-2 text-3xl md:text-4xl">Put your stall on the map.</h2>
          </div>
          <InkButton to="/submit">List your stall →</InkButton>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="ink-border grid size-9 place-items-center rounded-full bg-chilli text-base">
              🍜
            </span>
            <span className="font-display text-2xl tracking-tight">
              localbite<span className="text-chilli">.</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            A community guide to India's best street food — stalls, trails and dishes, mapped by the
            people who actually eat there.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              to="/discover"
              className="eyebrow ink-border bg-ink px-3 py-2 text-cream shadow-hard-sm lift"
            >
              Start exploring →
            </Link>
            <Link
              to="/feed"
              className="eyebrow ink-border bg-cream px-3 py-2 shadow-hard-sm lift"
            >
              Community
            </Link>
          </div>

          <div className="mt-6">
            <p className="eyebrow text-muted-foreground">Follow the cart</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href="#"
                aria-label="Instagram"
                className="ink-border grid size-10 place-items-center bg-cream shadow-hard-sm lift hover:bg-chilli hover:text-cream"
              >
                <span aria-hidden>📷</span>
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="ink-border grid size-10 place-items-center bg-cream shadow-hard-sm lift hover:bg-cobalt hover:text-cream"
              >
                <span aria-hidden>🐦</span>
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="ink-border grid size-10 place-items-center bg-cream shadow-hard-sm lift hover:bg-chilli hover:text-cream"
              >
                <span aria-hidden>▶️</span>
              </a>
              <a
                href="#"
                aria-label="WhatsApp"
                className="ink-border grid size-10 place-items-center bg-cream shadow-hard-sm lift hover:bg-turmeric"
              >
                <span aria-hidden>💬</span>
              </a>
            </div>
          </div>
        </div>

        <div>
          <p className="eyebrow text-chilli">Explore</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link to="/discover" className="border-b-2 border-transparent hover:border-chilli">Discover stalls</Link></li>
            <li><Link to="/trails" className="border-b-2 border-transparent hover:border-chilli">Food trails</Link></li>
            <li><Link to="/dishes" className="border-b-2 border-transparent hover:border-chilli">Dishes A–Z</Link></li>
            <li><Link to="/feed" className="border-b-2 border-transparent hover:border-chilli">Community feed</Link></li>
            <li><Link to="/leaderboard" className="border-b-2 border-transparent hover:border-chilli">Top 10 this week</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-chilli">For locals</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link to="/dashboard" className="border-b-2 border-transparent hover:border-chilli">Your dashboard</Link></li>
            <li><Link to="/saved" className="border-b-2 border-transparent hover:border-chilli">Saved stalls</Link></li>
            <li><Link to="/notifications" className="border-b-2 border-transparent hover:border-chilli">Notifications</Link></li>
            <li><Link to="/profile" className="border-b-2 border-transparent hover:border-chilli">Your profile</Link></li>
            <li><Link to="/signup" className="border-b-2 border-transparent hover:border-chilli">Create an account</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-chilli">For vendors</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link to="/submit" className="border-b-2 border-transparent hover:border-chilli">List your stall</Link></li>
            <li><Link to="/vendors" className="border-b-2 border-transparent hover:border-chilli">Vendor programme</Link></li>
            <li><Link to="/about" className="border-b-2 border-transparent hover:border-chilli">About us</Link></li>
            <li><Link to="/contact" className="border-b-2 border-transparent hover:border-chilli">Contact</Link></li>
            <li><Link to="/help" className="border-b-2 border-transparent hover:border-chilli">Help & FAQs</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t-2 border-ink bg-card">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <p className="eyebrow text-muted-foreground">The Friday digest</p>
            <h3 className="mt-2 text-2xl md:text-3xl">One email. Five stalls. Friday morning.</h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Hand-picked stalls, a fresh trail and the queue report from your city. No noise.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-2 sm:flex-row"
          >
            <label htmlFor="footer-email" className="sr-only">
              Email
            </label>
            <input
              id="footer-email"
              type="email"
              required
              placeholder="you@localbite.in"
              className="ink-border flex-1 bg-background px-4 py-3 text-base shadow-hard-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-chilli"
            />
            <button
              type="submit"
              className="eyebrow ink-border bg-ink px-5 py-3 text-cream shadow-hard-sm lift"
            >
              Subscribe →
            </button>
          </form>
        </div>
      </div>

      <div className="border-t-2 border-ink">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6 text-xs text-muted-foreground">
          <p>© 2026 Localbite · Made for hungry locals across 6 cities.</p>
          <div className="flex flex-wrap gap-5">
            <Link to="/privacy" className="border-b-2 border-transparent hover:border-ink hover:text-foreground">
              Privacy
            </Link>
            <Link to="/terms" className="border-b-2 border-transparent hover:border-ink hover:text-foreground">
              Terms
            </Link>
            <Link to="/about" className="border-b-2 border-transparent hover:border-ink hover:text-foreground">
              About
            </Link>
            <Link to="/help" className="border-b-2 border-transparent hover:border-ink hover:text-foreground">
              Help
            </Link>
            <Link to="/contact" className="border-b-2 border-transparent hover:border-ink hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="overflow-hidden border-t-2 border-ink bg-ink py-1.5 text-cream">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="eyebrow flex gap-10">
              <span>Localbites, big stories</span>
              <span>A community guide to India's best street food</span>
              <span>Est. 2024 · 6 cities · 1,240 stalls mapped</span>
              <span>Localbites, big stories</span>
              <span>A community guide to India's best street food</span>
              <span>Est. 2024 · 6 cities · 1,240 stalls mapped</span>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

/* ---------- auth gate ---------- */

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, ready } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (ready && !user) router.navigate({ to: "/login" });
  }, [ready, user, router]);

  if (!ready || !user)
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <p className="eyebrow animate-pulse">Checking your table…</p>
      </div>
    );
  return <>{children}</>;
}

/* ---------- map ---------- */

export function StallMap({
  items,
  selectedId,
  onSelect,
  className = "",
}: {
  items: Stall[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}) {
  const selected = items.find((s) => s.id === selectedId) ?? items[0];
  return (
    <div className={`ink-border shadow-hard-lg relative overflow-hidden bg-[oklch(0.93_0.04_92)] ${className}`}>
      {/* grid streets */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.17 0.01 60/0.08) 1px, transparent 1px), linear-gradient(90deg, oklch(0.17 0.01 60/0.08) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <div className="absolute inset-y-0 right-0 w-1/4 bg-mint/60" />
      <div className="absolute left-[-10%] top-1/3 h-3 w-[130%] -rotate-12 bg-ink/15" />
      <div className="absolute left-[-10%] top-2/3 h-3 w-[130%] rotate-6 bg-ink/15" />
      <div className="absolute left-1/2 top-[-10%] h-[130%] w-3 rotate-12 bg-ink/15" />

      <span className="ink-border eyebrow absolute left-4 top-4 bg-cream px-2 py-1">
        ● {selected?.city} / India
      </span>

      {items.map((s) => {
        const active = s.id === selected?.id;
        return (
          <button
            key={s.id}
            onClick={() => onSelect?.(s.id)}
            aria-label={s.name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${s.lng}%`, top: `${s.lat}%` }}
          >
            <span className="relative grid place-items-center">
              {active && (
                <span className="animate-ping-soft absolute size-4 rounded-full bg-chilli" />
              )}
              <span
                className={`ink-border block size-4 rotate-45 transition-transform ${
                  active ? "scale-150 bg-chilli" : "bg-turmeric hover:scale-125"
                }`}
              />
            </span>
          </button>
        );
      })}

      {selected && (
        <div className="ink-border animate-pop absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 bg-cream px-4 py-3">
          <div>
            <p className="eyebrow text-muted-foreground">Selected stall</p>
            <p className="font-display text-lg">{selected.dish}</p>
            <p className="text-xs text-muted-foreground">
              {selected.name} · {selected.open ? "Open now" : "Closed"}
            </p>
          </div>
          <Link
            to="/stalls/$id"
            params={{ id: selected.id }}
            className="eyebrow ink-border bg-ink px-3 py-2 text-cream lift shadow-hard-sm"
          >
            Open →
          </Link>
        </div>
      )}
    </div>
  );
}
