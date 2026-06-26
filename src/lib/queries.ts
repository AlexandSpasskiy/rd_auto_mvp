import "server-only";

import { desc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { bookings, reviews } from "@/lib/db/schema";

export function getPublicReviews() {
  const db = getDb();
  return db
    .select()
    .from(reviews)
    .where(eq(reviews.isVisible, true))
    .orderBy(desc(reviews.reviewDate))
    .all();
}

export function getAllReviews() {
  const db = getDb();
  return db.select().from(reviews).orderBy(desc(reviews.reviewDate)).all();
}

export function getAllBookings() {
  const db = getDb();
  return db.select().from(bookings).orderBy(desc(bookings.createdAt)).all();
}

export function getBookingStats() {
  const all = getAllBookings();
  return {
    total: all.length,
    new: all.filter((b) => b.status === "new").length,
    inProgress: all.filter((b) => b.status === "in_progress").length,
    completed: all.filter((b) => b.status === "completed").length,
  };
}
