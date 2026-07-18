"use client";

import Image from "next/image";
import { Button } from "./components/common/button";
import { useModal } from "./store/modalContext";
import Link from "next/link";
import "./styles/landingPage.css";

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
      "Manage providers, specialists, offices, and contact information without searching through portals, emails, or paperwork.",
  },
  {
    number: "03",
    title: "Reminders that keep you ready",
    description:
      "Remember follow-ups, prescription questions, forms, and the things you want to discuss at your next appointment.",
  },
];

export default function Home() {
  const { openSignInModal } = useModal();

  return (
    <main className="overflow-hidden bg-[#f4f7fa] text-slate-950">
      <nav className="absolute inset-x-0 top-0 z-20 border-b border-white/10 bg-primary/95 backdrop-blur-xl">
        <div className="container flex min-h-20 items-center justify-between gap-6">
          <a
            className="flex items-center gap-3"
            href="#top"
            aria-label="MyDocDay home"
          >
            <span className="text-lg font-bold tracking-tight text-white">
              MyDocDay
            </span>
          </a>

          <div className="flex items-center gap-6">
            <Button buttonText="Sign in" onClick={openSignInModal} />
            <Link href="/onboarding/">
              <Button buttonText="Sign up" varient="primary" />
            </Link>
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
                <span className="inline-flex items-center border-l-[3px] border-secondary py-[0.15rem] pl-[0.7rem] text-[0.72rem] font-extrabold uppercase leading-none tracking-[0.16em] text-[#b9efed]">
                  Organize. Plan. Stay ahead.
                </span>
                <h1 className="mt-7 text-5xl font-bold leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-6xl">
                  Your healthcare, finally in one place.
                </h1>
                <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">
                  MyDocDay is a simpler way to manage appointments, providers,
                  reminders, and the health details you need to keep close.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <Link href="/onboarding/">
                    <Button varient="primary" buttonText="Get Organized" />
                  </Link>
                  <a href="#features" className="button-secondary">
                    Explore Features
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12 lg:col-6">
              <div className="rounded-xl border border-white/15 bg-white/[0.07] p-[0.8rem] shadow-[0_35px_80px_rgb(0_0_0/35%)] backdrop-blur-[18px] md:[transform:perspective(1200px)_rotateY(-1deg)]">
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
              <span className="inline-flex items-center border-l-[3px] border-secondary py-[0.15rem] pl-[0.7rem] text-[0.72rem] font-extrabold uppercase leading-none tracking-[0.16em] text-primary">
                Your personal health hub
              </span>
              <h2 className="mt-6 max-w-2xl text-[clamp(2.5rem,5vw,4.25rem)] font-bold leading-[1.08] tracking-[-0.035em] text-slate-950">
                Less portal hopping. More clarity.
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-[1.8] text-slate-500">
                The MVP brings the practical parts of managing your healthcare
                into one focused, easy-to-use place.
              </p>
            </div>
            <div className="col-12 lg:col-7">
              <div className="row [--gutter-y:1rem]">
                {features.map((feature) => (
                  <div className="col-12" key={feature.number}>
                    <article className="flex gap-5 rounded-xl border border-slate-200 bg-white/[0.86] p-6 shadow-[0_10px_28px_rgb(31_53_87/6%)] transition-[border-color,transform,box-shadow] duration-[180ms] hover:-translate-y-0.5 hover:border-[#8bb4b2] hover:shadow-[0_14px_34px_rgb(31_53_87/9%)]">
                      <span className="grid size-11 shrink-0 place-items-center rounded-[0.4rem] bg-[#dff4f3] text-xs font-black text-primary">
                        {feature.number}
                      </span>
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
          <div className="cta-panel relative overflow-hidden rounded-2xl p-[clamp(2rem,6vw,5rem)] shadow-[0_24px_60px_rgb(31_53_87/18%)]">
            <div className="row items-center [--gutter-y:2rem]">
              <div className="col-12 lg:col-8">
                <span className="inline-flex items-center border-l-[3px] border-secondary py-[0.15rem] pl-[0.7rem] text-[0.72rem] font-extrabold uppercase leading-none tracking-[0.16em] text-[#b9efed]">
                  Your health, with more clarity
                </span>
                <h2 className="mt-6 max-w-3xl text-4xl font-bold tracking-[-0.025em] text-white sm:text-5xl">
                  Keep your healthcare details together and your next step
                  clear.
                </h2>
              </div>
              <div className="col-12 lg:col-4">
                <div className="flex lg:justify-end">
                  <Link href="/onboarding/">
                    <Button varient="primary" buttonText="Create Account" />
                  </Link>
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
