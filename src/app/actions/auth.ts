"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { users } from "@/lib/db/schema";
import {
  checkRateLimit,
  getRateLimitRemainingMs,
  resetRateLimit,
} from "@/lib/auth/rate-limit";
import { getSession } from "@/lib/auth/session";
import { loginSchema } from "@/lib/validation";

export type AuthActionState = {
  error?: string;
};

async function getClientIp(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "unknown"
  );
}

export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const ip = await getClientIp();
  const rateKey = `login:${ip}`;

  if (!checkRateLimit(rateKey)) {
    const remaining = Math.ceil(getRateLimitRemainingMs(rateKey) / 1000);
    return {
      error: `Слишком много попыток. Повторите через ${remaining} сек.`,
    };
  }

  const parsed = loginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Неверный логин или пароль" };
  }

  const db = getDb();
  const user = db
    .select()
    .from(users)
    .where(eq(users.username, parsed.data.username))
    .get();

  const validPassword =
    user && bcrypt.compareSync(parsed.data.password, user.passwordHash);

  if (!user || !validPassword) {
    return { error: "Неверный логин или пароль" };
  }

  resetRateLimit(rateKey);

  const session = await getSession();
  session.userId = user.id;
  session.username = user.username;
  session.role = user.role;
  session.isLoggedIn = true;
  await session.save();

  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  const session = await getSession();
  session.destroy();
  redirect("/admin/login");
}
