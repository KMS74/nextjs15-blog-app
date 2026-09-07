"use client";

import * as React from "react";
import { Search, X, SlidersHorizontal, Sparkles } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { PostCard } from "./PostCard";

export function BlogSearch({ initialPosts }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  // Extract unique categories from posts
  const categories = React.useMemo(() => {
    const set = new Set();
    initialPosts.forEach((post) => {
      if (post.category) set.add(post.category);
    });
    return ["All", ...Array.from(set)];
  }, [initialPosts]);

  // Filter posts based on query and selected category
  const filteredPosts = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!query) return true;

      const titleMatch = post.title?.toLowerCase().includes(query);
      const descMatch = post.description?.toLowerCase().includes(query);
      const tagMatch = post.tags?.some((tag) =>
        tag.toLowerCase().includes(query)
      );
      const categoryMatch = post.category?.toLowerCase().includes(query);

      return titleMatch || descMatch || tagMatch || categoryMatch;
    });
  }, [initialPosts, searchQuery, selectedCategory]);

  const featuredPost = React.useMemo(() => {
    if (searchQuery || selectedCategory !== "All") return null;
    return initialPosts.find((p) => p.featured) || initialPosts[0];
  }, [initialPosts, searchQuery, selectedCategory]);

  const remainingPosts = React.useMemo(() => {
    if (!featuredPost) return filteredPosts;
    return filteredPosts.filter((p) => p.id !== featuredPost.id);
  }, [filteredPosts, featuredPost]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Controls */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search articles by title, tags, or concepts (e.g. Next.js, Generics, Passkeys)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 h-12 text-sm rounded-xl bg-card border-border/80 shadow-sm focus-visible:ring-primary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div id="topics" className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 select-none ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-105"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border/40"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          {searchQuery ? "Search Results" : selectedCategory === "All" ? "Latest Articles" : selectedCategory}
          <span className="text-xs font-medium text-muted-foreground py-0.5 px-2 rounded-full bg-muted">
            {filteredPosts.length}
          </span>
        </h2>

        {(searchQuery || selectedCategory !== "All") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Reset filters
          </Button>
        )}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-border/60 bg-muted/20">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1">
            No articles found
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-4">
            We couldn't find any articles matching &ldquo;{searchQuery}&rdquo;. Try adjusting your keywords or category filter.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}

      {/* Posts Showcase & Grid */}
      {filteredPosts.length > 0 && (
        <div className="space-y-6">
          {/* Featured Post Spotlight (shown when no active search) */}
          {featuredPost && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Featured Article
              </div>
              <PostCard post={featuredPost} featured={true} />
            </div>
          )}

          {/* Regular Posts Grid */}
          {remainingPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {remainingPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
