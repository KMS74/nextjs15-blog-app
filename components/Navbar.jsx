import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { BookOpen, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { BrandLogo } from "./BrandLogo";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/85 backdrop-blur-md transition-all">
      <div className="container flex h-16 max-w-6xl items-center justify-between px-4 sm:px-8">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group transition-transform active:scale-95"
        >
          <BrandLogo size={36} />
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              Karim Shabana
            </span>
            <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
              Engineering & Architecture
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link
            href="/"
            className="transition-colors hover:text-foreground hover:underline underline-offset-8"
          >
            Articles
          </Link>
          <a
            href="#topics"
            className="transition-colors hover:text-foreground hover:underline underline-offset-8"
          >
            Topics
          </a>
          <a
            href="#about"
            className="transition-colors hover:text-foreground hover:underline underline-offset-8"
          >
            About
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="w-9 h-9 text-muted-foreground hover:text-foreground"
          >
            <a
              href="https://github.com/KMS74"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            asChild
            className="w-9 h-9 text-muted-foreground hover:text-foreground"
          >
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </Button>

          <div className="h-4 w-[1px] bg-border mx-1" />

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
