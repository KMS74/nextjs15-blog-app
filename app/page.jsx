import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import { BlogSearch } from "../components/BlogSearch";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Terminal, Code2, Cpu, ArrowDown, ExternalLink } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { GithubIcon, LinkedinIcon } from "../components/icons";

export const metadata = {
  title: "Karim Shabana | Engineering & Architecture Blog",
  description:
    "Explore deep dive articles on Next.js 15, React 19, TypeScript, Distributed Systems, and Web Security.",
};

export default async function Home() {
  const posts = getSortedPostsData();

  return (
    <Layout home>
      {/* Hero Section */}
      <section className="relative pt-6 pb-14 md:pt-10 md:pb-18 border-b border-border/50">
        {/* Subtle ambient light gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-72 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
          {/* Left Column: Text & CTAs */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>Available for Frontend Engineering & Tech Writing</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black tracking-tight text-foreground leading-[1.15]">
              Architecting Modern Web Experiences with{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-500 dark:from-blue-400 dark:via-indigo-300 dark:to-sky-400 bg-clip-text text-transparent">
                Precision & Speed
              </span>
            </h1>

            {/* Subheading / Bio */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              Hi, I&apos;m <span className="text-foreground font-semibold">Karim Shabana</span>, a Software Engineer graduated from Faculty of Computers and Information and the ITI 9-month professional diploma. Passionate about React, Next.js, TypeScript, and elegant UI/UX design.
            </p>

            {/* Balanced Metric Cards */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0 pt-1">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2.5 p-3 rounded-xl bg-card border border-border/70 shadow-sm text-center sm:text-left">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Terminal className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-base font-bold text-foreground leading-none">{posts.length}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">Articles</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2.5 p-3 rounded-xl bg-card border border-border/70 shadow-sm text-center sm:text-left">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                  <Code2 className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-base font-bold text-foreground leading-none">5</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">Categories</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2.5 p-3 rounded-xl bg-card border border-border/70 shadow-sm text-center sm:text-left">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 dark:text-emerald-400">
                  <Cpu className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-base font-bold text-foreground leading-none">100%</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">Practical Code</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Button asChild size="default" className="rounded-xl shadow-lg shadow-primary/20 px-6 font-semibold">
                <a href="#articles" className="inline-flex items-center gap-2 whitespace-nowrap">
                  Browse Articles
                  <ArrowDown className="h-4 w-4" />
                </a>
              </Button>

              <Button asChild variant="outline" size="default" className="rounded-xl px-6 font-semibold">
                <a href="#about" className="inline-flex items-center gap-2 whitespace-nowrap">
                  About Me
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column: Modern Developer Showcase Card */}
          <div className="w-full max-w-sm mx-auto lg:mr-0">
            <div className="relative group">
              {/* Card Ambient Glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600/25 via-indigo-500/25 to-sky-400/25 blur-xl opacity-75 transition duration-500 group-hover:opacity-100" />

              <div className="relative rounded-3xl border border-border/80 bg-card/95 p-6 sm:p-7 shadow-xl backdrop-blur-xl space-y-5">
                {/* Card Top Metadata */}
                <div className="flex items-center justify-between text-xs pb-1 border-b border-border/50">
                  <span className="flex items-center gap-1.5 font-medium text-foreground">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Software Engineer
                  </span>
                  <span className="text-muted-foreground">Cairo, EG 📍</span>
                </div>

                {/* Profile Picture */}
                <div className="relative mx-auto w-40 h-40 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-md">
                  <Image
                    priority
                    src="/images/profile-pic.png"
                    fill
                    sizes="(max-width: 768px) 160px, 176px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    alt="Karim Shabana"
                  />
                </div>

                {/* Author Info */}
                <div className="text-center space-y-1">
                  <div className="flex items-center justify-center gap-1.5">
                    <h3 className="text-lg font-bold text-foreground">Karim Shabana</h3>
                    <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-blue-500 text-white text-[10px]" title="Verified Engineer">
                      ✓
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Frontend & Web Architecture Specialist
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                  <Badge variant="secondary" className="text-[11px] font-medium px-2.5 py-0.5">React 19</Badge>
                  <Badge variant="secondary" className="text-[11px] font-medium px-2.5 py-0.5">Next.js 15</Badge>
                  <Badge variant="secondary" className="text-[11px] font-medium px-2.5 py-0.5">TypeScript</Badge>
                  <Badge variant="secondary" className="text-[11px] font-medium px-2.5 py-0.5">Tailwind CSS</Badge>
                </div>

                {/* Card Footer Social */}
                <div className="pt-3 border-t border-border/50 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <a
                    href="https://github.com/KMS74"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors inline-flex items-center gap-1.5"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    <span>github/KMS74</span>
                  </a>
                  <span className="text-border">•</span>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors inline-flex items-center gap-1.5"
                  >
                    <LinkedinIcon className="h-3.5 w-3.5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Articles & Search Section */}
      <section id="articles" className="pt-12 pb-16">
        <BlogSearch initialPosts={posts} />
      </section>

      {/* About Section */}
      <section id="about" className="pt-12 pb-8 border-t border-border/50">
        <div className="rounded-2xl border border-border/70 bg-card/60 p-8 md:p-10 space-y-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              KS
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">About the Author</h2>
              <p className="text-xs text-muted-foreground">Engineering Philosophy & Journey</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            I am Karim Shabana, a Computer Science graduate from the Faculty of Computers and Information and an alumni of the prestigious 9-month professional software engineering diploma at ITI (Information Technology Institute).
          </p>

          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            My primary focus is on frontend engineering, web architecture, and crafting fluid, accessible, and resilient digital experiences. This blog serves as a repository of real-world insights, architecture deep-dives, and performance techniques learned while building modern web applications.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-border/50 bg-background/50">
              <h4 className="text-sm font-semibold text-foreground mb-1">Core Tech Stack</h4>
              <p className="text-xs text-muted-foreground">JavaScript (ESNext), TypeScript, React, Next.js (App Router), HTML5, CSS3/Tailwind.</p>
            </div>
            <div className="p-4 rounded-xl border border-border/50 bg-background/50">
              <h4 className="text-sm font-semibold text-foreground mb-1">Architecture & State</h4>
              <p className="text-xs text-muted-foreground">Server Actions, TanStack Query, Redux Toolkit, Context API, REST & WebSockets.</p>
            </div>
            <div className="p-4 rounded-xl border border-border/50 bg-background/50">
              <h4 className="text-sm font-semibold text-foreground mb-1">UI/UX & Design</h4>
              <p className="text-xs text-muted-foreground">shadcn/ui, Tailwind CSS, Radix Primitives, Responsive Design, Web Accessibility (a11y).</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
