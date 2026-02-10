import { notFound } from "next/navigation";
import Link from "next/link";
import { getReviewBySlug, getReviewsByCategory } from "@/lib/data";
import { ProductReview } from "@/components/product-review";

interface GuidePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  const { reviews } = require("@/lib/data") as typeof import("@/lib/data");
  return reviews.map((review) => ({ slug: review.slug }));
}

export default function GuidePage({ params }: GuidePageProps) {
  const review = getReviewBySlug(params.slug);

  if (!review) {
    notFound();
  }

  const related = getReviewsByCategory(review.category).filter(
    (item) => item.slug !== review.slug
  );

  return (
    <main className="space-y-12">
      <ProductReview review={review} />

      {related.length > 0 && (
        <section
          aria-labelledby="related-heading"
          className="space-y-4 border-t border-zinc-200 pt-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2
                id="related-heading"
                className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500"
              >
                Related guides
              </h2>
              <p className="mt-1 text-xs text-zinc-600">
                More picks from the same category.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <article
                key={item.slug}
                className="rounded-2xl border border-zinc-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                  {item.category === "desk-setup"
                    ? "Desk Setup"
                    : item.category === "tech"
                    ? "Tech"
                    : "Productivity"}
                </p>
                <h3 className="mt-2 line-clamp-2 text-sm font-semibold tracking-tight text-zinc-900">
                  <Link href={`/guides/${item.slug}`}>{item.title}</Link>
                </h3>
                <p className="mt-2 line-clamp-3 text-xs text-zinc-600">
                  {item.shortDescription}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}


