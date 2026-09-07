import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import hljs from "highlight.js";

const postsDirectory = path.join(process.cwd(), "posts");

function unescapeHtml(htmlStr) {
  return htmlStr
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

function highlightCodeBlocks(htmlContent) {
  return htmlContent.replace(
    /<pre><code(?:\s+class="language-([^"]+)")?>([\s\S]*?)<\/code><\/pre>/gi,
    (match, language, codeSnippet) => {
      const lang = language ? language.trim().toLowerCase() : "";
      const rawCode = unescapeHtml(codeSnippet);
      let highlighted = "";

      try {
        if (lang && hljs.getLanguage(lang)) {
          highlighted = hljs.highlight(rawCode, { language: lang, ignoreIllegals: true }).value;
        } else {
          highlighted = hljs.highlightAuto(rawCode).value;
        }
      } catch (err) {
        highlighted = codeSnippet;
      }

      return `<pre class="highlighted-code"><code class="hljs ${lang ? `language-${lang}` : ""}" data-lang="${lang || "code"}">${highlighted}</code></pre>`;
    }
  );
}

function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${readingTimeMinutes} min read`;
}

function extractTableOfContents(markdown) {
  const headingLines = markdown.split("\n").filter((line) => line.startsWith("##"));
  return headingLines.map((line) => {
    const level = line.startsWith("###") ? 3 : 2;
    const rawText = line.replace(/^#{2,3}\s+/, "").trim();
    // Generate clean anchor id
    const id = rawText
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    return { level, text: rawText, id };
  });
}

export function getSortedPostsData() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);

      const readingTime = calculateReadingTime(matterResult.content);

      return {
        id,
        readingTime,
        category: matterResult.data.category || "General",
        tags: matterResult.data.tags || [],
        description:
          matterResult.data.description ||
          matterResult.content.slice(0, 160).replace(/[#*`_]/g, "") + "...",
        featured: Boolean(matterResult.data.featured),
        ...matterResult.data,
      };
    });

  // Sort descending by date
  return allPostsData.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

export function getAllPostsIds() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => ({
      id: fileName.replace(/\.md$/, ""),
    }));
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  const readingTime = calculateReadingTime(matterResult.content);
  const toc = extractTableOfContents(matterResult.content);

  // Convert markdown into HTML string
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(matterResult.content);
  
  let contentHtml = processedContent.toString();

  // Inject heading IDs into h2 and h3 elements for TOC anchor jumps
  contentHtml = contentHtml.replace(
    /<(h[23])>(.*?)<\/\1>/gi,
    (match, tag, innerText) => {
      // Strip HTML inside heading if any
      const cleanText = innerText.replace(/<[^>]+>/g, "");
      const slug = cleanText
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      return `<${tag} id="${slug}">${innerText}</${tag}>`;
    }
  );

  // Syntax highlight all code blocks with highlight.js
  contentHtml = highlightCodeBlocks(contentHtml);

  return {
    id,
    contentHtml,
    readingTime,
    toc,
    category: matterResult.data.category || "General",
    tags: matterResult.data.tags || [],
    description:
      matterResult.data.description ||
      matterResult.content.slice(0, 160).replace(/[#*`_]/g, "") + "...",
    featured: Boolean(matterResult.data.featured),
    ...matterResult.data,
  };
}

export function getAdjacentPosts(currentId) {
  const sortedPosts = getSortedPostsData();
  const currentIndex = sortedPosts.findIndex((post) => post.id === currentId);

  if (currentIndex === -1) {
    return { prevPost: null, nextPost: null };
  }

  // Previous post in chronological order (newer)
  const prevPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  // Next post in chronological order (older)
  const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

  return { prevPost, nextPost };
}
