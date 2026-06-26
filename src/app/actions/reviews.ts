"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { reviews } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import {
  reviewIdSchema,
  reviewSchema,
  reviewVisibilitySchema,
} from "@/lib/validation";

export type ReviewActionState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function createReview(
  _prevState: ReviewActionState,
  formData: FormData,
): Promise<ReviewActionState> {
  await requireAdmin();

  const parsed = reviewSchema.safeParse({
    authorName: formData.get("authorName"),
    rating: formData.get("rating"),
    text: formData.get("text"),
    reviewDate: formData.get("reviewDate"),
  });

  if (!parsed.success) {
    return {
      error: "Проверьте правильность заполнения формы",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const db = getDb();
  db.insert(reviews)
    .values({
      ...parsed.data,
      source: "2gis",
      isVisible: true,
      createdAt: new Date().toISOString(),
    })
    .run();

  revalidatePath("/");
  revalidatePath("/admin/reviews");

  return { success: true };
}

export async function toggleReviewVisibility(
  formData: FormData,
): Promise<void> {
  await requireAdmin();

  const parsed = reviewVisibilitySchema.safeParse({
    id: formData.get("id"),
    isVisible: formData.get("isVisible") === "true",
  });

  if (!parsed.success) return;

  const db = getDb();
  db.update(reviews)
    .set({ isVisible: parsed.data.isVisible })
    .where(eq(reviews.id, parsed.data.id))
    .run();

  revalidatePath("/");
  revalidatePath("/admin/reviews");
}

export async function deleteReview(formData: FormData): Promise<void> {
  await requireAdmin();

  const parsed = reviewIdSchema.safeParse({ id: formData.get("id") });
  if (!parsed.success) return;

  const db = getDb();
  db.delete(reviews).where(eq(reviews.id, parsed.data.id)).run();

  revalidatePath("/");
  revalidatePath("/admin/reviews");
}
