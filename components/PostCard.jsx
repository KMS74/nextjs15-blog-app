import Link from "next/link";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Badge } from "./ui/badge";
import { formatDate } from "../lib/utils";

export function PostCard({ post, featured = false }) {
  const { id, title, date, category, tags = [], description, readingTime } = post;

  const categoryColorMap = {
    "React & Next.js": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/50",
    TypeScript: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/50",
    Architecture: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/50",
    "Web Security": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50",
    Frontend: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/50",
  };

  const categoryStyle = categoryColorMap[category] || "bg-primary/10 text-primary border-primary/20";

  return (
    <article
      className={`group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 ${
        featured ? "md:col-span-2 md:p-8 bg-gradient-to-br from-card via-card to-primary/[0.03]" : ""
      }`}
    >
      <div>
        {/* Header Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${categoryStyle}`}
          >
            {category}
          </span>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {readingTime}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(date)}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3
          className={`font-bold tracking-tight text-foreground group-hover:text-primary transition-colors ${
            featured ? "text-2xl md:text-3xl mb-3" : "text-xl mb-2.5"
          }`}
        >
          <Link href={`/posts/${id}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {title}
          </Link>
        </h3>

        {/* Description / Excerpt */}
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">
          {description}
        </p>
      </div>

      {/* Footer / Tags & Action */}
      <div className="pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-3 relative z-10">
        <div className="flex flex-wrap items-center gap-1.5">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium text-muted-foreground/80 bg-muted/80 px-2 py-0.5 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:translate-x-0.5 transition-transform">
          Read Article
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </article>
  );
}
