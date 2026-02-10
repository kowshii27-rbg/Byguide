import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { createPost, deletePost, login } from "./actions";

export const metadata = {
  title: "ByGuide Admin – Create Post"
};

const ADMIN_SESSION_COOKIE = "byguide_admin";

interface AdminPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const cookieStore = cookies();
  const isAuthed = cookieStore.get(ADMIN_SESSION_COOKIE)?.value === "true";
  const hasError = searchParams?.error === "1";

  if (!isAuthed) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-sm items-center justify-center px-4">
        <section className="w-full space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <header className="space-y-2 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Admin login
            </p>
            <h1 className="text-lg font-semibold tracking-tight text-zinc-900">
              Sign in to ByGuide
            </h1>
            <p className="text-xs text-zinc-600">
              Enter your private admin credentials to create and edit reviews.
            </p>
            {hasError && (
              <p className="mt-2 rounded-md bg-rose-50 px-3 py-2 text-[11px] font-medium text-rose-700">
                Incorrect username or password. Please try again.
              </p>
            )}
          </header>

          <form action={login} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="username"
                className="text-xs font-medium text-zinc-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/5"
                placeholder="Admin username"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-xs font-medium text-zinc-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/5"
                placeholder="Admin password"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Sign in
            </button>
          </form>
        </section>
      </main>
    );
  }

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-2xl space-y-8">
      <header className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
          Admin
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
          Create a new product review
        </h1>
        <p className="text-sm text-zinc-600">
          Add a new ByGuide review without touching code. Fill out the details
          below and it will appear on the home page and under{" "}
          <span className="font-semibold text-zinc-900">/blog</span>.
        </p>
      </header>

      <section className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-900">
            Create new post
          </h2>
          <span className="text-xs text-zinc-500">
            All fields are required.
          </span>
        </div>

        <form action={createPost} className="space-y-5">
          <div className="space-y-1.5">
            <label
              htmlFor="title"
              className="text-xs font-medium text-zinc-700"
            >
              Product name (title)
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/5"
              placeholder="e.g. Compact Student Desk Setup"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="content"
              className="text-xs font-medium text-zinc-700"
            >
              Blog review text
            </label>
            <textarea
              id="content"
              name="content"
              required
              rows={8}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/5"
              placeholder="Write your full review here. You can describe who it's for, what you liked, what could be better, and any setup tips."
            />
            <p className="text-xs text-zinc-500">
              This is the main body of the blog post shown on the{" "}
              <span className="font-medium text-zinc-800">/blog/[slug]</span>{" "}
              page.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label
                htmlFor="rating"
                className="text-xs font-medium text-zinc-700"
              >
                Rating (1–5)
              </label>
              <input
                id="rating"
                name="rating"
                type="number"
                min={1}
                max={5}
                step={0.1}
                required
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/5"
                placeholder="4.5"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="category"
                className="text-xs font-medium text-zinc-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                defaultValue="desk-setup"
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/5"
              >
                <option value="desk-setup">Desk Setup</option>
                <option value="tech">Tech</option>
                <option value="productivity">Productivity</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="affiliateUrl"
              className="text-xs font-medium text-zinc-700"
            >
              Amazon affiliate link
            </label>
            <input
              id="affiliateUrl"
              name="affiliateUrl"
              type="url"
              required
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/5"
              placeholder="https://www.amazon.com/dp/EXAMPLE?tag=YOUR_TAG"
            />
            <p className="text-xs text-zinc-500">
              Use your full Amazon affiliate URL including your{" "}
              <span className="font-mono text-[11px]">?tag=</span> parameter.
            </p>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="imageUrl"
              className="text-xs font-medium text-zinc-700"
            >
              Image URL
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              required
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/5"
              placeholder="https://images.example.com/byguide/product.jpg"
            />
            <p className="text-xs text-zinc-500">
              Use a hosted image URL (e.g. your CDN or image hosting). This
              will be shown on the blog detail page.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Publish review
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-900">
            Existing posts
          </h2>
          <span className="text-xs text-zinc-500">
            Remove posts you no longer want live.
          </span>
        </div>

        {posts.length === 0 ? (
          <p className="text-sm text-zinc-500">
            You haven&apos;t published any posts yet.
          </p>
        ) : (
          <ul className="space-y-3 text-sm">
            {posts.map((post) => (
              <li
                key={post.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-zinc-900">
                    {post.title}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-zinc-500">
                    /blog/{post.slug}
                  </p>
                </div>
                <form action={deletePost}>
                  <input type="hidden" name="id" value={post.id} />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-50"
                  >
                    Delete
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

