import "../styles/globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

export const metadata = {
  metadataBase: new URL("https://karimshabana.dev"),
  title: {
    default: "Karim Shabana | Engineering & Architecture Blog",
    template: "%s | Karim Shabana",
  },
  description:
    "Deep dive technical articles on Next.js 15, React, TypeScript, System Design, and modern web architecture by Karim Shabana.",
  authors: [{ name: "Karim Shabana" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Karim Shabana | Engineering & Architecture Blog",
    description:
      "Deep dive technical articles on Next.js 15, React, TypeScript, System Design, and modern web architecture.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/20 selection:text-primary">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
