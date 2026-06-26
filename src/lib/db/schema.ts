import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const bookings = sqliteTable("bookings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  carBrand: text("car_brand").notNull(),
  problem: text("problem").notNull(),
  preferredDate: text("preferred_date").notNull(),
  status: text("status", { enum: ["new", "in_progress", "completed"] })
    .notNull()
    .default("new"),
  createdAt: text("created_at").notNull(),
});

export const reviews = sqliteTable("reviews", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  authorName: text("author_name").notNull(),
  rating: integer("rating").notNull(),
  text: text("text").notNull(),
  source: text("source").notNull().default("2gis"),
  reviewDate: text("review_date").notNull(),
  isVisible: integer("is_visible", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull(),
});

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role", { enum: ["admin"] }).notNull().default("admin"),
});

export type Booking = typeof bookings.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type User = typeof users.$inferSelect;

export type BookingStatus = "new" | "in_progress" | "completed";
