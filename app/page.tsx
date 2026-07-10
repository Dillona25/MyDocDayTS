import Image from "next/image";

const features = [
  {
    number: "01",
    title: "Appointments at a glance",
    description:
      "Add upcoming visits, keep the important details nearby, and see your healthcare schedule in one simple timeline.",
  },
  {
    number: "02",
    title: "Your care team, organized",
    description:
      "Manage doctors, specialists, offices, and contact information without searching through portals, emails, or paperwork.",
  },
  {
    number: "03",
    title: "Reminders that keep you ready",
    description:
      "Remember follow-ups, prescription questions, forms, and the things you want to discuss at your next appointment.",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#f4f7fa] text-slate-950">
      <nav className="absolute inset-x-0 top-0 z-20 border-b border-white/10 bg-primary/95 backdrop-blur-xl">
        <div className="container flex min-h-20 items-center justify-between gap-6">
          <a
            className="flex items-center gap-3"
            href="#top"
            aria-label="MyDocDay home"
          >
            <span className="grid size-10 place-items-center rounded-md bg-secondary text-lg font-bold text-primary">
              M
            </span>
            <span className="text-lg font-bold tracking-tight text-white">
              MyDocDay
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <a className="nav-link" href="#features">
              Features
            </a>
            <a className="nav-link" href="#how-it-works">
              How it works
            </a>
            <a className="nav-link" href="#get-started">
              Get started
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              className="hidden text-sm font-semibold text-slate-300 transition hover:text-white sm:block"
              href="#"
            >
              Sign in
            </a>
            <a
              className="rounded-md bg-secondary px-4 py-2.5 text-sm font-bold text-primary transition hover:bg-white"
              href="#"
            >
              Sign up
            </a>
          </div>
        </div>
      </nav>

      <section
        className="hero-surface relative pb-20 pt-36 text-white lg:pb-28 lg:pt-44"
        id="top"
      >
        <div className="container relative z-10">
          <div className="row items-center [--gutter-y:3.5rem] lg:[--gutter-x:4rem]">
            <div className="col-12 lg:col-6">
              <div className="max-w-2xl">
                <span className="eyebrow">Organize. Plan. Stay ahead.</span>
                <h1 className="mt-7 text-5xl font-bold leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-6xl">
                  Your healthcare, finally in one place.
                </h1>
                <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
                  MyDocDay is a simpler way to manage appointments, doctors,
                  reminders, and the health details you need to keep close.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <a className="button-primary" href="#">
                    Start organizing
                  </a>
                  <a className="button-secondary" href="#features">
                    Explore features <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12 lg:col-6">
              <div className="hero-image-shell">
                <div className="mb-3 flex items-center gap-1.5 px-1">
                  <span className="size-2 rounded-full bg-secondary" />
                  <span className="size-2 rounded-full bg-primary-light" />
                  <span className="size-2 rounded-full bg-success" />
                </div>
                <Image
                  priority
                  className="h-auto w-full rounded-md"
                  src="/images/dashboard-placeholder.svg"
                  alt="Placeholder preview of the future MyDocDay healthcare dashboard"
                  width={1200}
                  height={820}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:pt-32" id="features">
        <div className="container">
          <div className="row [--gutter-y:2rem] lg:[--gutter-x:3rem]">
            <div className="col-12 lg:col-5">
              <span className="eyebrow eyebrow-dark">
                Your personal health hub
              </span>
              <h2 className="section-title mt-6">
                Less portal hopping. More clarity.
              </h2>
              <p className="section-copy mt-6 max-w-lg">
                The MVP brings the practical parts of managing your healthcare
                into one focused, easy-to-use place.
              </p>
            </div>
            <div className="col-12 lg:col-7">
              <div className="row [--gutter-y:1rem]">
                {features.map((feature) => (
                  <div className="col-12" key={feature.number}>
                    <article className="feature-card">
                      <span className="feature-number">{feature.number}</span>
                      <div>
                        <h3 className="text-xl font-bold tracking-tight">
                          {feature.title}
                        </h3>
                        <p className="mt-2 leading-7 text-slate-600">
                          {feature.description}
                        </p>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:pb-20 lg:pt-0" id="get-started">
        <div className="container">
          <div className="cta-panel">
            <div className="row items-center [--gutter-y:2rem]">
              <div className="col-12 lg:col-8">
                <span className="eyebrow">Your health, with more clarity</span>
                <h2 className="mt-6 max-w-3xl text-4xl font-bold tracking-[-0.025em] text-white sm:text-5xl">
                  Keep your healthcare details together and your next step
                  clear.
                </h2>
              </div>
              <div className="col-12 lg:col-4">
                <div className="flex lg:justify-end">
                  <a className="button-primary whitespace-nowrap" href="#">
                    Create your account
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8">
        <div className="container flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500">
          <p>© 2026 MyDocDay. Your healthcare, organized.</p>
          <div className="flex gap-6">
            <a className="hover:text-slate-950" href="#">
              Privacy
            </a>
            <a className="hover:text-slate-950" href="#">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
