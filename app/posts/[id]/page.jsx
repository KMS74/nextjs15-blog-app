import Layout from "../../../components/layout";
import { getPostData, getAllPostsIds, getAdjacentPosts } from "../../../lib/posts";
import { ReadingProgressBar } from "../../../components/ReadingProgressBar";
import { CodeBlockEnhancer } from "../../../components/CodeBlockEnhancer";
import { TableOfContents } from "../../../components/TableOfContents";
import { ShareButtons } from "../../../components/ShareButtons";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, ArrowRight, Home, ChevronRight, Tag } from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { formatDate } from "../../../lib/utils";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const post = await getPostData(id);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Karim Shabana`,
    description: post.description || "Read this technical article by Karim Shabana.",
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Karim Shabana"],
    },
  };
}

export async function generateStaticParams() {
  const paths = getAllPostsIds();
  return paths;
}

export default async function PostPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const postData = await getPostData(id);

  if (!postData) {
    notFound();
  }

  const { prevPost, nextPost } = getAdjacentPosts(id);

  const categoryColorMap = {
    "React & Next.js": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/50",
    TypeScript: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/50",
    Architecture: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/50",
    "Web Security": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50",
    Frontend: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/50",
  };

  const categoryStyle =
    categoryColorMap[postData.category] || "bg-primary/10 text-primary border-primary/20";

  return (
    <Layout>
      <ReadingProgressBar />
      <CodeBlockEnhancer />

      <article className="max-w-3xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground inline-flex items-center gap-1">
            <Home className="h-3 w-3" />
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/#articles" className="hover:text-foreground">
            Articles
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground truncate max-w-[200px] sm:max-w-xs font-medium">
            {postData.title}
          </span>
        </nav>

        {/* Article Header */}
        <header className="space-y-4 pb-8 border-b border-border/60">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold border ${categoryStyle}`}
            >
              {postData.category}
            </span>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {postData.readingTime}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(postData.date)}
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            {postData.title}
          </h1>

          {postData.description && (
            <p className="text-lg text-muted-foreground leading-relaxed">
              {postData.description}
            </p>
          )}

          {/* Author & Action Bar */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-full overflow-hidden border border-border">
                <Image
                  src="/images/profile-pic.png"
                  fill
                  sizes="40px"
                  alt="Karim Shabana"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">Karim Shabana</div>
                <div className="text-xs text-muted-foreground">Software Engineer • ITI Graduate</div>
              </div>
            </div>

            <ShareButtons title={postData.title} id={id} />
          </div>
        </header>

        {/* Table of Contents */}
        {postData.toc && postData.toc.length > 0 && (
          <TableOfContents toc={postData.toc} />
        )}

        {/* Article Markdown Body */}
        <div
          className="prose prose-slate dark:prose-invert max-w-none pt-6 pb-12 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />

        {/* Tags Section */}
        {postData.tags && postData.tags.length > 0 && (
          <div className="py-6 border-t border-border/50 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground inline-flex items-center gap-1 mr-1">
              <Tag className="h-3.5 w-3.5" /> Tags:
            </span>
            {postData.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Bottom Share & Back */}
        <div className="py-6 border-t border-border/50 flex flex-wrap items-center justify-between gap-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/" className="inline-flex items-center gap-1.5">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to all articles
            </Link>
          </Button>

          <ShareButtons title={postData.title} id={id} />
        </div>

        {/* Adjacent Posts Navigation Cards */}
        {(prevPost || nextPost) && (
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 pb-12" aria-label="Adjacent Articles">
            {prevPost ? (
              <Link
                href={`/posts/${prevPost.id}`}
                className="group p-4 rounded-xl border border-border/70 bg-card hover:border-primary/50 transition-all text-left flex flex-col justify-between space-y-1.5"
              >
                <div className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
                  <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                  Newer Article
                </div>
                <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {prevPost.title}
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextPost && (
              <Link
                href={`/posts/${nextPost.id}`}
                className="group p-4 rounded-xl border border-border/70 bg-card hover:border-primary/50 transition-all text-right flex flex-col justify-between space-y-1.5"
              >
                <div className="text-[11px] font-medium text-muted-foreground flex items-center justify-end gap-1">
                  Older Article
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
                <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {nextPost.title}
                </div>
              </Link>
            )}
          </nav>
        )}
      </article>
    </Layout>
  );
}
