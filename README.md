# Karim Shabana — Modern Engineering & Architecture Blog

A high-performance, modern developer blog built with **Next.js 16**, **React 19**, **Tailwind CSS**, and **shadcn/ui** components.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-blue?style=for-the-badge&logo=vercel)](https://nextjs-blog-app-virid.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

## 🌟 Overview

This project is a fully-featured personal engineering blog crafted for deep technical writing, architecture exploration, and modern frontend showcases. Built on top of the **Next.js App Router** and powered by **React 19**, it incorporates cutting-edge web development standards, client-side reactivity, and server-side static prerendering.

---

## ✨ Key Features

### 🎨 Design & Theme
- **Dark / Light Theme System**: Zero-flash theme toggling powered by `next-themes` and a custom animated toggle button.
- **Modern Typography**: Integrated **Plus Jakarta Sans** for body and heading typography, complemented by **JetBrains Mono** for code snippets and terminal labels.
- **Curated HSL Color Palette**: Tokyo Night / Obsidian-inspired dark theme and a clean, high-contrast light theme.
- **Custom Brand Identity**: Bespoke SVG `BrandLogo` combining an architectural pillar, code chevron (`>`), and interlocking `K` monogram.

### ⚡ Performance & Architecture
- **Next.js 16 with Turbopack**: Blazing fast development server and optimized static production builds (`SSG` via `generateStaticParams`).
- **Component Caching & Partial Prefetching**: Configured with Next.js modern cache strategies for instant navigation.
- **Robust Error Handling**: Dedicated App Router error boundary (`app/error.jsx`), branded 404 page (`app/not-found.jsx`), and animated skeleton (`app/loading.jsx`).

### 🔍 Content Discovery & Filtering
- **Real-Time Client Search**: Instant search across post titles, descriptions, categories, and tags with zero network latency.
- **Category Filter Chips**: Filter articles by topics such as `React & Next.js`, `TypeScript`, `Architecture`, `Web Security`, and `Frontend`.
- **Featured Post Spotlight**: Highlights flagship technical deep dives with reading times and tag badges.

### 📖 Premium Reading Experience
- **Reading Progress Indicator**: Dynamic gradient bar at the top of the viewport reflecting scroll position.
- **Table of Contents (TOC)**: Automatically extracted from markdown `##` and `###` headings with smooth anchor navigation.
- **IDE-Style Code Blocks**:
  - Pre-rendered syntax highlighting powered by `highlight.js`.
  - macOS traffic light window controls (`🔴 🟡 🟢`).
  - Language indicator badges with color-coded dot status.
  - 1-click **Copy Code** button with animated checkmark confirmation.
- **Social Sharing & Navigation**: Direct sharing to X (Twitter), LinkedIn, and 1-click Copy Article Link, alongside "Newer" and "Older" adjacent article cards.

---

## 📚 Technical Articles Included

| Title | Category | Focus Areas |
| :--- | :--- | :--- |
| **Mastering TypeScript Generics** | `TypeScript` | Conditional Types, Mapped Types, `infer`, Recursive `DeepReadonly` |
| **Building High-Performance React 19 Apps** | `React & Next.js` | Server Actions, `use()` hook, `useOptimistic`, React Compiler |
| **System Design: Scalable Real-time Chat** | `Architecture` | WebSockets, Redis Pub/Sub, Distributed Architecture, Offline Sync |
| **Modern Web Security: JWTs vs Sessions & Passkeys** | `Web Security` | HttpOnly Cookies, XSS/CSRF Mitigation, WebAuthn Passkeys |
| **A Comprehensive Guide to Next.js App Router** | `React & Next.js` | Server Components, Nested Layouts, Streaming with Suspense |
| **Introduction to Angular Framework: Core Features** | `Frontend` | Component Architecture, 2-Way Data Binding, Directives, DI |
| **Two Forms of Pre-rendering in Next.js** | `React & Next.js` | Static Generation vs Server-Side Rendering tradeoffs |
| **When to Use Static Generation vs SSR** | `React & Next.js` | Hybrid rendering patterns and CDN caching strategies |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v16 App Router)
- **Library**: [React](https://react.dev/) (v19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography)
- **UI Primitives**: Inspired by [shadcn/ui](https://ui.shadcn.com/) (`class-variance-authority`, `tailwind-merge`, `clsx`)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG Icons
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Markdown & Syntax**: [gray-matter](https://github.com/jonschlinkert/gray-matter), [remark](https://remark.js.org/), [remark-html](https://github.com/remarkjs/remark-html), [highlight.js](https://highlightjs.org/)
- **Date Formatting**: [date-fns](https://date-fns.org/)

---

## 📁 Project Structure

```bash
├── app/
│   ├── layout.jsx            # Root layout with ThemeProvider, fonts & global metadata
│   ├── page.jsx              # Home page with Hero, stats, and BlogSearch showcase
│   ├── not-found.jsx         # Custom 404 page
│   ├── error.jsx             # Client error boundary with retry capability
│   ├── loading.jsx           # Animated page loader
│   └── posts/
│       └── [id]/
│           └── page.jsx      # Article reader with progress bar, TOC & adjacent navigation
├── components/
│   ├── ui/                   # Reusable shadcn/ui components (Button, Badge, Card, Input)
│   ├── BrandLogo.jsx         # Custom SVG brand mark for Karim Shabana
│   ├── BlogSearch.jsx        # Client-side live search & category filter component
│   ├── CodeBlockEnhancer.jsx # Client enhancer for macOS window controls & copy button
│   ├── Copyright.jsx         # Client component for dynamic copyright year
│   ├── Footer.jsx            # Site footer with author bio & social links
│   ├── Navbar.jsx            # Sticky blurred glassmorphism navigation header
│   ├── PostCard.jsx          # Responsive post card with metadata & tags
│   ├── ReadingProgressBar.jsx# Scroll depth progress bar
│   ├── ShareButtons.jsx      # Social share bar (Twitter, LinkedIn, Copy Link)
│   ├── TableOfContents.jsx   # Article TOC with anchor links
│   └── ThemeToggle.jsx       # Dark / Light theme switcher
├── lib/
│   ├── posts.js              # Markdown loader, TOC extractor & highlight.js parser
│   └── utils.js              # cn() class merger & date helpers
├── posts/                    # Markdown (.md) technical blog posts with YAML frontmatter
└── styles/
    └── globals.css           # Tailwind directives, HSL theme variables & syntax CSS
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `20.x` or later
- npm `10.x` or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KMS74/nextjs15-blog-app.git
   cd nextjs15-blog-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` — Starts local development server with Turbopack
- `npm run build` — Generates static production build
- `npm run start` — Runs the production server locally

---

## 👨‍💻 Author

**Karim Shabana**
- Computer Science Graduate & ITI 9-Month Professional Diploma Alumni
- Focus: Frontend Engineering, React / Next.js Architecture, and UI/UX Design
- GitHub: [@KMS74](https://github.com/KMS74)
- LinkedIn: [Karim Shabana](https://linkedin.com)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
