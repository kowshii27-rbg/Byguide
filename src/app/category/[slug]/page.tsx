import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, getReviewsByCategory } from "@/lib/data";
import type { CategorySlug } from "@/lib/types";

interface CategoryPageProps {
  params: { slug: CategorySlug };
}

export function generateStaticParams() {
  return (["desk-setup", "tech", "productivity"] as CategorySlug[]).map(
    (slug) => ({ slug })
  );
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  const reviews = getReviewsByCategory(category.slug);

  return (
    <main className="space-y-8" aria-labelledby="category-heading">
      <header className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
          Category
        </p>
        <h1
          id="category-heading"
          className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl"
        >
          {category.label}
        </h1>
        <p className="max-w-xl text-sm text-zinc-600 sm:text-base">
          {category.description}
        </p>
      </header>

      <section aria-label="Guides in this category" className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-sm text-zinc-500">
            We&apos;re still writing guides for this category. Check back
            soon.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {reviews.map((review) => (
              <article
                key={review.slug}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="space-y-2">
                  <h2 className="text-sm font-semibold tracking-tight text-zinc-900">
                    <Link href={`/guides/${review.slug}`}>{review.title}</Link>
                  </h2>
                  <p className="line-clamp-3 text-xs text-zinc-600">
                    {review.shortDescription}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
                  <span>
                    Rating:{" "}
                    <span className="font-semibold text-zinc-900">
                      {review.rating.toFixed(1)}
                    </span>
                    /5
                  </span>
                  <Link
                    href={`/guides/${review.slug}`}
                    className="font-medium text-zinc-900"
                  >
                    Read guide
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


