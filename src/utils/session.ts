import type { UUID } from "node:crypto"
import { getIronSession, type SessionOptions } from "iron-session"
import { cookies } from "next/headers"
import { env } from "~/env"

export interface SessionData {
  userId?: UUID
  phone?: string
  isLoggedIn: boolean
}

export const sessionOptions: SessionOptions = {
  password: env.SESSION_SECRET,
  cookieName: "auth-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  },
  ttl: 60 * 60 * 24 * 7, // // 7 days
}

export async function getSession() {
  const cookieStore = await cookies()
  return getIronSession<SessionData>(cookieStore, sessionOptions)
}
