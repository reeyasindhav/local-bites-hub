import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Eyebrow, InkButton, Photo, Reveal, Shell, Tag } from "@/components/site";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "List your stall — Localbite" },
      {
        name: "description",
        content: "Submit your street food stall to Localbite and get discovered by hungry locals.",
      },
    ],
  }),
  component: SubmitPage,
});

type FormData = {
  name: string;
  dish: string;
  vendor: string;
  neighbourhood: string;
  city: string;
  price: string;
  hours: string;
  story: string;
};

function SubmitPage() {
  const [data, setData] = useState<FormData>({
    name: "",
    dish: "",
    vendor: "",
    neighbourhood: "",
    city: "Mumbai",
    price: "",
    hours: "",
    story: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reset = () => {
    setData({
      name: "",
      dish: "",
      vendor: "",
      neighbourhood: "",
      city: "Mumbai",
      price: "",
      hours: "",
      story: "",
    });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <Shell>
        <section className="paper border-b-2 border-ink">
          <div className="mx-auto max-w-7xl px-5 py-14 lg:py-20">
            <Reveal>
              <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
                <div>
                  <div className="ink-border inline-flex items-center gap-2 bg-mint px-3 py-1.5">
                    <span className="grid size-5 place-items-center rounded-full bg-ink text-xs text-cream">✓</span>
                    <span className="eyebrow">Submitted for review</span>
                  </div>
                  <h1 className="mt-5 text-5xl md:text-7xl">
                    You’re <span className="text-chilli">on the list.</span>
                  </h1>
                  <p className="mt-5 max-w-lg text-muted-foreground">
                    Your stall has been sent to the Localbite review queue. We personally verify every listing, so you’ll hear back within 24 hours.
                  </p>
                  <p className="mt-2 max-w-lg text-sm text-muted-foreground">
                    A confirmation has been sent to <strong className="text-foreground">{data.vendor || "your inbox"}</strong>.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <InkButton to="/">Back to home →</InkButton>
                    <button
                      onClick={reset}
                      className="eyebrow ink-border bg-cream px-4 py-3 shadow-hard-sm lift"
                    >
                      Submit another
                    </button>
                  </div>
                </div>

                <Reveal delay={120}>
                  <div className="ink-border shadow-hard-lg bg-card p-5">
                    <p className="eyebrow text-muted-foreground">Preview</p>
                    <h2 className="mt-2 text-2xl">{data.dish || "Your signature dish"}</h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {data.name || "Your stall"} · {data.neighbourhood || "Neighbourhood"}, {data.city}
                    </p>

                    <Photo
                      src="https://images.unsplash.com/photo-1532384159185-16f0bcfd5a5b?auto=format&fit=crop&w=900&q=70"
                      alt={data.dish || "Preview"}
                      accent="chilli"
                      className="mt-4 h-44 w-full"
                    />

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Tag tone="ink">★ New</Tag>
                      {data.price && <Tag tone="turmeric">₹{data.price}</Tag>}
                      {data.hours && <Tag tone="cream">{data.hours}</Tag>}
                      <Tag tone="cream">{data.city}</Tag>
                    </div>

                    {data.story && (
                      <p className="mt-4 border-t-2 border-dashed border-ink/25 pt-3 text-sm text-muted-foreground">
                        “{data.story}”
                      </p>
                    )}
                  </div>
                </Reveal>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-7xl px-5 py-14">
            <Reveal>
              <div>
                <Eyebrow dot="bg-chilli">What happens next</Eyebrow>
                <h2 className="mt-3 text-4xl md:text-5xl">Three small steps.</h2>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "We verify",
                  text: "A human checks the dish, hours and location. Most stalls are approved within a day.",
                },
                {
                  step: "02",
                  title: "You go live",
                  text: "Your stall appears on the map, in search and on neighbourhood trails.",
                },
                {
                  step: "03",
                  title: "Reviews roll in",
                  text: "Hungry locals save, review and share your stall. You stay in control of the menu and story.",
                },
              ].map((s, i) => (
                <Reveal key={s.step} delay={i * 90}>
                  <div className="ink-border lift h-full bg-card p-6 shadow-hard-sm">
                    <p className="eyebrow text-chilli">{s.step}</p>
                    <h3 className="mt-2 text-2xl">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-cobalt text-cream">
          <div className="mx-auto max-w-7xl px-5 py-14">
            <Reveal>
              <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
                <div>
                  <Eyebrow dot="bg-turmeric">While you wait</Eyebrow>
                  <h2 className="mt-3 text-4xl md:text-5xl">Snoop the neighbourhood.</h2>
                  <p className="mt-3 max-w-lg text-cream/70">
                    See how a finished Localbite listing looks — and what the regulars are ordering.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/discover"
                    className="eyebrow ink-border bg-turmeric px-4 py-3 text-ink shadow-hard-sm lift"
                  >
                    Browse Discover →
                  </Link>
                  <Link
                    to="/dishes"
                    className="eyebrow ink-border bg-cream px-4 py-3 text-ink shadow-hard-sm lift"
                  >
                    See dishes →
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </Shell>
    );
  }

  return (
    <Shell>
      <section className="paper border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:py-20">
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow dot="bg-chilli">List a stall</Eyebrow>
              <h1 className="mt-5 text-5xl md:text-7xl">
                Put your stall <span className="text-chilli">on the map.</span>
              </h1>
              <p className="mt-5 max-w-xl text-muted-foreground">
                Tell locals about your cart, your dish and your story. It takes a few minutes and it’s free.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <Reveal delay={80}>
              <form onSubmit={submit} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="eyebrow text-xs uppercase tracking-wide text-muted-foreground">Stall name</label>
                    <input
                      value={data.name}
                      onChange={update("name")}
                      placeholder="e.g. Noor Kheema Corner"
                      className="mt-2 w-full bg-transparent px-4 py-3 ink-border outline-none placeholder:text-muted-foreground"
                      required
                    />
                  </div>
                  <div>
                    <label className="eyebrow text-xs uppercase tracking-wide text-muted-foreground">Signature dish</label>
                    <input
                      value={data.dish}
                      onChange={update("dish")}
                      placeholder="e.g. Kheema Pav"
                      className="mt-2 w-full bg-transparent px-4 py-3 ink-border outline-none placeholder:text-muted-foreground"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="eyebrow text-xs uppercase tracking-wide text-muted-foreground">Vendor name</label>
                    <input
                      value={data.vendor}
                      onChange={update("vendor")}
                      placeholder="e.g. Noor Bhai"
                      className="mt-2 w-full bg-transparent px-4 py-3 ink-border outline-none placeholder:text-muted-foreground"
                      required
                    />
                  </div>
                  <div>
                    <label className="eyebrow text-xs uppercase tracking-wide text-muted-foreground">Neighbourhood</label>
                    <input
                      value={data.neighbourhood}
                      onChange={update("neighbourhood")}
                      placeholder="e.g. Mohammed Ali Road"
                      className="mt-2 w-full bg-transparent px-4 py-3 ink-border outline-none placeholder:text-muted-foreground"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  <div>
                    <label className="eyebrow text-xs uppercase tracking-wide text-muted-foreground">City</label>
                    <select
                      value={data.city}
                      onChange={update("city")}
                      className="mt-2 w-full bg-transparent px-4 py-3 ink-border outline-none"
                    >
                      {["Mumbai", "Delhi", "Kolkata", "Chennai", "Pune", "Patna"].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="eyebrow text-xs uppercase tracking-wide text-muted-foreground">Price per plate</label>
                    <input
                      value={data.price}
                      onChange={update("price")}
                      placeholder="e.g. 140"
                      className="mt-2 w-full bg-transparent px-4 py-3 ink-border outline-none placeholder:text-muted-foreground"
                      required
                    />
                  </div>
                  <div>
                    <label className="eyebrow text-xs uppercase tracking-wide text-muted-foreground">Hours</label>
                    <input
                      value={data.hours}
                      onChange={update("hours")}
                      placeholder="e.g. 6:00 PM – 2:00 AM"
                      className="mt-2 w-full bg-transparent px-4 py-3 ink-border outline-none placeholder:text-muted-foreground"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="eyebrow text-xs uppercase tracking-wide text-muted-foreground">Story</label>
                  <textarea
                    value={data.story}
                    onChange={update("story")}
                    placeholder="Tell locals what makes this stall special..."
                    rows={4}
                    className="mt-2 w-full bg-transparent px-4 py-3 ink-border outline-none placeholder:text-muted-foreground"
                    required
                  />
                </div>

                <InkButton type="submit" full>
                  Submit for review →
                </InkButton>
              </form>
            </Reveal>

            <Reveal delay={120}>
              <div className="space-y-6">
                <div className="ink-border shadow-hard bg-card p-5">
                  <h3 className="text-xl">What happens next?</h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li>• We review the listing within 24 hours.</li>
                    <li>• Once approved, your stall shows up on the map and in search.</li>
                    <li>• Locals can save, review and share your stall.</li>
                    <li>• You can update your hours, menu and story anytime.</li>
                  </ul>
                </div>
                <div className="ink-border shadow-hard bg-card p-5">
                  <h3 className="text-xl">Pro tips</h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li>• Add a clear photo of your signature dish.</li>
                    <li>• Mention what the regulars order.</li>
                    <li>• Keep your hours accurate — locals rely on them.</li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Shell>
  );
}
