"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/session";
import { bookingSchema, bookingStatusSchema } from "@/lib/validation";

export type BookingActionState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function createBooking(
  _prevState: BookingActionState,
  formData: FormData,
): Promise<BookingActionState> {
  const parsed = bookingSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    carBrand: formData.get("carBrand"),
    problem: formData.get("problem"),
    preferredDate: formData.get("preferredDate"),
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

  const preferred = new Date(parsed.data.preferredDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (preferred < today) {
    return {
      error: "Дата записи не может быть в прошлом",
      fieldErrors: { preferredDate: ["Выберите будущую дату"] },
    };
  }

  const db = getDb();
  db.insert(bookings)
    .values({
      ...parsed.data,
      status: "new",
      createdAt: new Date().toISOString(),
    })
    .run();

  revalidatePath("/admin");

  return { success: true };
}

export async function updateBookingStatus(formData: FormData): Promise<void> {
  await requireAdmin();

  const parsed = bookingStatusSchema.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
  });

  if (!parsed.success) return;

  const db = getDb();
  db.update(bookings)
    .set({ status: parsed.data.status })
    .where(eq(bookings.id, parsed.data.id))
    .run();

  revalidatePath("/admin");
}

