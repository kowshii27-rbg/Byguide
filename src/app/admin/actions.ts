"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const ADMIN_SESSION_COOKIE = "byguide_admin";

export async function login(formData: FormData) {
  const username = (formData.get("username") || "").toString().trim();
  const password = (formData.get("password") || "").toString().trim();

  const validUser = process.env.ADMIN_USERNAME || "byguide";
  const validPass = process.env.ADMIN_PASSWORD || "change-me-please";

  if (username === validUser && password === validPass) {
    cookies().set(ADMIN_SESSION_COOKIE, "true", {
      httpOnly: true,
      path: "/admin",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 hours
    });

    redirect("/admin");
  }

  redirect("/admin?error=1");
}

export async function createPost(formData: FormData) {
  const title = (formData.get("title") || "").toString().trim();
  const content = (formData.get("content") || "").toString().trim();
  const ratingRaw = (formData.get("rating") || "").toString();
  const affiliateUrl = (formData.get("affiliateUrl") || "").toString().trim();
  const imageUrl = (formData.get("imageUrl") || "").toString().trim();
  const category = (formData.get("category") || "").toString().trim() || "tech";

  if (!title || !content || !affiliateUrl || !imageUrl || !ratingRaw) {
    throw new Error("All fields are required.");
  }

  const ratingValue = Number(ratingRaw);

  if (Number.isNaN(ratingValue)) {
    throw new Error("Rating must be a number between 1 and 5.");
  }

  const rating = Math.min(5, Math.max(1, ratingValue));

  const baseSlug = slugify(title);
  let slug = baseSlug || `post-${Date.now()}`;

  if (baseSlug) {
    const existing = await prisma.post.findMany({
      where: {
        slug: {
          startsWith: baseSlug,
        },
      },
      select: { slug: true },
    });

    if (existing.some((item) => item.slug === baseSlug)) {
      let maxSuffix = 1;

      const suffixRegex = new RegExp(`^${baseSlug}-(\\d+)$`);

      for (const item of existing) {
        const match = item.slug.match(suffixRegex);
        if (match) {
          const num = Number(match[1]);
          if (!Number.isNaN(num) && num >= maxSuffix) {
            maxSuffix = num + 1;
          }
        }
      }

      slug = `${baseSlug}-${maxSuffix}`;
    }
  }

  const excerpt =
    content.length > 200 ? `${content.slice(0, 197).trimEnd()}...` : content;

  await prisma.post.create({
    data: {
      title,
      slug,
      content,
      excerpt,
      rating,
      affiliateUrl,
      imageUrl,
      category
    }
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");

  redirect(`/blog/${slug}`);
}

export async function deletePost(formData: FormData) {
  const idRaw = formData.get("id");
  const id = typeof idRaw === "string" ? Number(idRaw) : NaN;

  if (Number.isNaN(id)) {
    throw new Error("Invalid post id.");
  }

  await prisma.post.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/blog");

  redirect("/admin");
}


