import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ByGuide",
  description:
    "ByGuide is a curated review blog for students and young professionals, featuring tech gadgets, desk setups, and productivity tools.",
  metadataBase: new URL("https://byguide.example"), // replace with real domain when ready
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-background text-foreground`}
      >
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-zinc-200 bg-white/80 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-semibold tracking-tight">
                  ByGuide
                </span>
                <span className="hidden text-xs text-zinc-500 sm:inline">
                  Study smarter. Work sharper.
                </span>
              </div>
              <nav
                aria-label="Primary"
                className="flex items-center gap-4 text-sm text-zinc-600"
              >
                <a href="/" className="hover:text-zinc-900">
                  Home
                </a>
              </nav>
            </div>
          </header>

          <main className="flex-1 bg-zinc-50">
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>

          <footer className="border-t border-zinc-200 bg-white">
            <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <p>© {new Date().getFullYear()} ByGuide. All rights reserved.</p>
              <p>
                Some links may be affiliate links. We may earn a commission at
                no extra cost to you.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
