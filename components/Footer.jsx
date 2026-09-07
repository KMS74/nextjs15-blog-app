import Link from "next/link";
import { Terminal, Heart, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { BrandLogo } from "./BrandLogo";
import { Badge } from "./ui/badge";
import { Copyright } from "./Copyright";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/50 bg-muted/30 py-12 mt-20 transition-colors">
      <div className="container max-w-6xl px-4 sm:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Bio */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <BrandLogo size={28} />
              <span className="font-bold text-foreground">Karim Shabana</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Frontend Engineer and UI/UX enthusiast. Sharing deep architectural insights, modern React/Next.js patterns, TypeScript, and web engineering best practices.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="outline" className="text-[11px]">Next.js 16</Badge>
              <Badge variant="outline" className="text-[11px]">React 19</Badge>
              <Badge variant="outline" className="text-[11px]">Tailwind CSS</Badge>
              <Badge variant="outline" className="text-[11px]">shadcn/ui</Badge>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  All Articles
                </Link>
              </li>
              <li>
                <a href="#topics" className="hover:text-primary transition-colors">
                  Explore Topics
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary transition-colors">
                  About the Author
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Connect */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Connect
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://github.com/KMS74"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <GithubIcon className="h-3.5 w-3.5" /> GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <LinkedinIcon className="h-3.5 w-3.5" /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <Copyright />
          <p className="flex items-center gap-1">
            Built with passion & precision using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
