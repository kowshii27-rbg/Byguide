export type CategorySlug = "desk-setup" | "tech" | "productivity";

export interface ProductReviewMeta {
  slug: string;
  title: string;
  category: CategorySlug;
  heroImage: string;
  rating: number; // 1–5
  verdict: string;
  priceHint?: string;
  tags?: string[];
  featured?: boolean;
}

export interface ProductReviewContent extends ProductReviewMeta {
  shortDescription: string;
  description: string;
  pros: string[];
  cons: string[];
  affiliateUrl: string;
}





