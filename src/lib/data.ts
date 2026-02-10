import type { CategorySlug, ProductReviewContent } from "./types";

export const categories: { slug: CategorySlug; label: string; description: string }[] = [
  {
    slug: "desk-setup",
    label: "Desk Setup",
    description: "Monitors, keyboards, chairs, and accessories for focused study sessions.",
  },
  {
    slug: "tech",
    label: "Tech",
    description: "Laptops, tablets, and gadgets that keep up with classes and side projects.",
  },
  {
    slug: "productivity",
    label: "Productivity",
    description: "Timers, apps, and tools to help you stay in flow and ship your best work.",
  },
];

export const reviews: ProductReviewContent[] = [
  {
    slug: "compact-student-desk-setup",
    title: "The Compact Student Desk Setup That Actually Fits in a Dorm",
    category: "desk-setup",
    heroImage: "/images/compact-desk-setup.jpg",
    rating: 4.7,
    verdict: "A clean, budget-friendly setup that makes small spaces feel intentional.",
    priceHint: "Usually under $250 total",
    tags: ["small-space", "budget", "ergonomics"],
    featured: true,
    shortDescription:
      "A minimal monitor, keyboard, and lighting combo designed to keep your dorm desk clutter-free.",
    description:
      "If your \"desk\" is more like half a table, this setup keeps everything essential within reach without swallowing your space. We focused on three pillars: posture, lighting, and cable sanity. Every item here is picked with students in mind—affordable, durable, and easy to pack when you move.",
    pros: [
      "Compact footprint that works on narrow dorm desks",
      "Comfortable typing experience for long writing sessions",
      "Neutral aesthetic that blends with any room style",
      "Most pieces are available with fast Prime shipping",
    ],
    cons: [
      "Not ideal if you need a dual-monitor workflow",
      "Chair upgrade may still be needed for all-day comfort",
    ],
    affiliateUrl: "https://www.amazon.com/dp/example-compact-desk-setup?tag=YOUR_TAG_HERE",
  },
  {
    slug: "budget-mechanical-keyboard-for-students",
    title: "The Budget Mechanical Keyboard That Doesn’t Sound Like a Typewriter",
    category: "tech",
    heroImage: "/images/budget-mechanical-keyboard.jpg",
    rating: 4.5,
    verdict: "A quiet, tactile board that feels premium without wrecking your loan refund.",
    priceHint: "Often around $50–$70",
    tags: ["keyboard", "mechanical", "quiet"],
    featured: true,
    shortDescription:
      "A low-profile, quiet mechanical keyboard that feels great for writing essays and coding late at night.",
    description:
      "Mechanical keyboards don’t have to be loud or expensive. This one focuses on low noise, solid build quality, and a layout that’s friendly for both note-taking and shortcuts. It’s hot-swappable, so you can upgrade switches later if you want a different feel.",
    pros: [
      "Quiet switches that won’t annoy roommates or library neighbors",
      "Comfortable low-profile design",
      "Customizable RGB that can be turned off for deep-focus sessions",
    ],
    cons: [
      "No dedicated media keys",
      "Included keycaps are fine but not amazing",
    ],
    affiliateUrl: "https://www.amazon.com/dp/example-mech-keyboard?tag=YOUR_TAG_HERE",
  },
  {
    slug: "pomodoro-timer-for-deep-work",
    title: "The Simple Pomodoro Timer That Actually Stays Off Your Phone",
    category: "productivity",
    heroImage: "/images/pomodoro-timer.jpg",
    rating: 4.8,
    verdict: "A distraction-free timer that nudges you into deep work blocks without notifications.",
    priceHint: "Usually under $30",
    tags: ["focus", "time-management"],
    featured: false,
    shortDescription:
      "A physical Pomodoro-style timer that keeps you off your phone and in the zone.",
    description:
      "If you’ve tried focus apps and bounced off, a physical timer can be a game changer. This one uses a clear, silent countdown and a soft chime at the end of each session. It lives on your desk as a visual reminder to protect your focus blocks.",
    pros: [
      "No app or account needed—just turn and start",
      "Gentle alert that won’t startle you or your friends",
      "Battery life lasts for weeks of daily use",
    ],
    cons: [
      "No advanced analytics or time tracking",
      "Easy to forget to log sessions if you track manually",
    ],
    affiliateUrl: "https://www.amazon.com/dp/example-pomodoro-timer?tag=YOUR_TAG_HERE",
  },
];

export function getReviewBySlug(slug: string) {
  return reviews.find((review) => review.slug === slug);
}

export function getReviewsByCategory(category: CategorySlug) {
  return reviews.filter((review) => review.category === category);
}

export function getFeaturedReviews(limit = 3) {
  return reviews.filter((review) => review.featured).slice(0, limit);
}


