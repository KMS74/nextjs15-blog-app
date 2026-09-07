import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const name = "Karim Shabana";
export const siteTitle = "Karim Shabana | Engineering & Architecture Blog";

export default function Layout({ children, home }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      <Navbar />
      <main className="flex-1 container max-w-6xl px-4 sm:px-8 py-8 md:py-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}
