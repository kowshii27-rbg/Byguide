import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { prisma } from "@/lib/db";

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug }
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="space-y-10" aria-labelledby="post-title">
      <article className="space-y-8">
        <header className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
            Product review
          </p>
          <h1
            id="post-title"
            className="text-balance text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl"
          >
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600">
            <span>
              Rating:{" "}
              <span className="font-semibold text-zinc-900">
                {post.rating.toFixed(1)}
              </span>{" "}
              /5
            </span>
            <span className="h-1 w-1 rounded-full bg-zinc-300" />
            <span className="capitalize">{post.category}</span>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[3fr,2fr] lg:items-start">
          <div className="space-y-6 text-sm leading-relaxed text-zinc-700">
            <div className="space-y-3">
              {post.content.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 380px, 100vw"
              />
            </div>

            <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Buy on Amazon
              </p>
              <p className="text-xs text-zinc-600">
                This button uses an Amazon affiliate link. Using it helps keep
                ByGuide free at no extra cost to you.
              </p>
              <a
                href={post.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Buy on Amazon (opens in a new tab)"
              >
                <span>Buy on Amazon</span>
                <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </a>
              <p className="text-[11px] text-zinc-500">
                Always double-check pricing and availability on Amazon before
                purchasing. Prices can change quickly.
              </p>
            </div>
          </aside>
        </div>
      </article>

      <div>
        <Link
          href="/"
          className="text-xs font-medium text-zinc-700 hover:text-zinc-900"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}


