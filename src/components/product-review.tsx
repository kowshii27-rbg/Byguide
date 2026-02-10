import Image from "next/image";
import { ArrowUpRight, CheckCircle2, Info, XCircle } from "lucide-react";
import type { ProductReviewContent } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface ProductReviewProps {
  review: ProductReviewContent;
}

export function ProductReview({ review }: ProductReviewProps) {
  const {
    title,
    heroImage,
    shortDescription,
    description,
    pros,
    cons,
    rating,
    verdict,
    affiliateUrl,
    priceHint,
  } = review;

  const ratingLabel = `${rating.toFixed(1)}/5`;

  return (
    <article className="space-y-10">
      <header className="grid gap-8 lg:grid-cols-[3fr,2fr] lg:items-center">
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
            In-depth review
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            {title}
          </h1>
          <p className="max-w-xl text-balance text-sm text-zinc-600 sm:text-base">
            {shortDescription}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              asChild={false}
              type="button"
              className="shadow-sm"
              aria-label="Check price on Amazon (opens in a new tab)"
              onClick={() => {
                window.open(affiliateUrl, "_blank", "noopener,noreferrer");
              }}
            >
              <span>Check price on Amazon</span>
              <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden="true" />
            </Button>
            {priceHint ? (
              <span className="text-xs text-zinc-500">{priceHint}</span>
            ) : null}
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 320px, 100vw"
          />
        </div>
      </header>

      <section
        aria-label="Verdict and rating"
        className="grid gap-8 lg:grid-cols-[3fr,2fr]"
      >
        <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="mr-1 h-4 w-4" aria-hidden="true" />
              Verdict
            </div>
            <span className="text-xs text-zinc-500">
              For students & young professionals
            </span>
          </div>
          <p className="text-sm text-zinc-700">{verdict}</p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-zinc-900">
                {ratingLabel}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                Overall score
              </span>
            </div>
          </div>
          <p className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
            <Info className="h-3.5 w-3.5" aria-hidden="true" />
            Ratings are based on build quality, value, and focus-friendliness.
          </p>
        </div>
      </section>

      <section
        aria-label="Details, pros and cons"
        className="grid gap-10 lg:grid-cols-[3fr,2fr]"
      >
        <div className="space-y-4 text-sm leading-relaxed text-zinc-700">
          <p>{description}</p>
        </div>

        <div className="space-y-6">
          <div aria-label="Pros" className="rounded-2xl bg-emerald-50 p-5">
            <div className="mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Pros
              </h2>
            </div>
            <ul className="space-y-2 text-xs text-emerald-900">
              {pros.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div aria-label="Cons" className="rounded-2xl bg-rose-50 p-5">
            <div className="mb-2 flex items-center gap-2">
              <XCircle className="h-4 w-4 text-rose-600" />
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">
                Cons
              </h2>
            </div>
            <ul className="space-y-2 text-xs text-rose-900">
              {cons.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-label="Amazon call to action"
        className="sticky bottom-0 z-20 border-t border-zinc-200 bg-white/90 py-4 backdrop-blur lg:relative lg:border-none lg:bg-transparent lg:py-0"
      >
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm lg:border-none lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none">
          <div className="hidden flex-col text-xs text-zinc-600 sm:flex">
            <span className="font-medium text-zinc-800">
              Ready to add this to your setup?
            </span>
            <span>Amazon pricing can change—always check the latest price.</span>
          </div>
          <Button
            type="button"
            className="ml-auto min-w-[220px]"
            aria-label="Check price on Amazon (opens in a new tab)"
            onClick={() => {
              window.open(affiliateUrl, "_blank", "noopener,noreferrer");
            }}
          >
            <span>Check price on Amazon</span>
            <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </section>
    </article>
  );
}


