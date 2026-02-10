import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";

export default async function Home() {
  const latestPosts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 6
  });

  return (
    <main aria-labelledby="hero-title" className="space-y-12">
      <section className="grid gap-10 lg:grid-cols-[3fr,2fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
            Study smarter, not harder
          </p>
          <h1
            id="hero-title"
            className="text-balance text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl"
          >
            Curated gear and guides for TECHIES who take focus seriously.
          </h1>
          <p className="max-w-xl text-sm text-zinc-600 sm:text-base">
            ByGuide reviews tech, desk setups, and productivity tools built for
            lecture halls, late-night libraries, and hybrid work. No fluff—just
            the gear that actually helps you stay in flow.
          </p>
        </div>

        <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            How ByGuide works
          </p>
          <ul className="space-y-3 text-xs text-zinc-600">
            <li>
              We focus on{" "}
              <span className="font-medium text-zinc-900">
                students and young professionals
              </span>{" "}
              and evaluate how gear performs in small spaces, shared rooms, and
              hybrid schedules.
            </li>
            <li>
              Every pick balances{" "}
              <span className="font-medium text-zinc-900">
                value, build quality, and focus-friendliness
              </span>{" "}
              so you&apos;re not paying for features you won&apos;t use.
            </li>
            <li>
              Some links are{" "}
              <span className="font-medium text-zinc-900">
                Amazon affiliate links
              </span>
              . Using them helps keep guides free at no extra cost to you.
            </li>
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="latest-heading"
        className="space-y-4 border-t border-zinc-200 pt-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2
              id="latest-heading"
              className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500"
            >
              Latest product reviews
            </h2>
            <p className="mt-1 text-xs text-zinc-600">
              Fresh reviews you&apos;ve added from the ByGuide admin dashboard.
            </p>
          </div>
        </div>

        {latestPosts.length === 0 ? (
          <p className="text-sm text-zinc-500">
            No posts yet.{" "}
            <Link href="/admin" className="font-medium text-zinc-900">
              Create your first review from the admin dashboard.
            </Link>
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {latestPosts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-zinc-200 bg-zinc-100">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 320px, 100vw"
                  />
                </div>

                <div className="space-y-2 p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                    {post.category === "desk-setup"
                      ? "Desk Setup"
                      : post.category === "tech"
                      ? "Tech"
                      : post.category === "productivity"
                      ? "Productivity"
                      : "Review"}
                  </p>
                  <h3 className="line-clamp-2 text-sm font-semibold tracking-tight text-zinc-900">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="line-clamp-3 text-xs text-zinc-600">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between px-5 pb-5 text-xs text-zinc-500">
                  <span>
                    <span className="font-semibold text-zinc-900">
                      {post.rating.toFixed(1)}
                    </span>{" "}
                    /5
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 font-medium text-zinc-900"
                  >
                    Read more
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

