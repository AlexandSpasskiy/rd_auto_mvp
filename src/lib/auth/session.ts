import "server-only";

import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export interface SessionData {
  userId: number;
  username: string;
  role: "admin";
  isLoggedIn: boolean;
}

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (secret && secret.length >= 32) {
    return secret;
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "SESSION_SECRET must be set to a random string of at least 32 characters in production",
    );
  }
  return "dev-only-session-secret-min-32-chars!!";
}

export const sessionOptions: SessionOptions = {
  password: getSessionSecret(),
  cookieName: "autoservice_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    path: "/",
  },
};

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session.isLoggedIn || session.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return session;
}
