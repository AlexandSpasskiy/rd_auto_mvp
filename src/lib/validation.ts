import { z } from "zod";

const phoneRegex = /^[\d\s+\-()]{10,20}$/;

export const bookingSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Имя должно содержать минимум 2 символа")
      .max(100, "Имя слишком длинное"),
    phone: z
      .string()
      .trim()
      .regex(phoneRegex, "Введите корректный номер телефона"),
    carBrand: z
      .string()
      .trim()
      .min(1, "Укажите марку автомобиля")
      .max(100, "Слишком длинное название"),
    problem: z
      .string()
      .trim()
      .min(5, "Опишите проблему подробнее")
      .max(2000, "Описание слишком длинное"),
    preferredDate: z
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Укажите корректную дату"),
  })
  .strict();

export const loginSchema = z
  .object({
    username: z.string().trim().min(1, "Введите логин").max(50),
    password: z.string().min(1, "Введите пароль").max(128),
  })
  .strict();

export const reviewSchema = z
  .object({
    authorName: z
      .string()
      .trim()
      .min(2, "Имя автора слишком короткое")
      .max(100),
    rating: z.coerce.number().int().min(1).max(5),
    text: z
      .string()
      .trim()
      .min(10, "Текст отзыва слишком короткий")
      .max(2000),
    reviewDate: z
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Укажите корректную дату"),
  })
  .strict();

export const bookingStatusSchema = z
  .object({
    id: z.coerce.number().int().positive(),
    status: z.enum(["new", "in_progress", "completed"]),
  })
  .strict();

export const reviewIdSchema = z
  .object({
    id: z.coerce.number().int().positive(),
  })
  .strict();

export const reviewVisibilitySchema = z
  .object({
    id: z.coerce.number().int().positive(),
    isVisible: z.coerce.boolean(),
  })
  .strict();

export type BookingInput = z.infer<typeof bookingSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
