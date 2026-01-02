"use server"

import { and, eq, gt, isNull } from "drizzle-orm"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { phoneOtps, type Staff, staff } from "@/db/schema"
import { getSession } from "@/lib/session"

export async function sendOTP(phone: string) {
  try {
    // Generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    // Set expiration to 5 minutes from now
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

    // Save OTP to database
    await db.insert(phoneOtps).values({
      phone,
      code,
      expiresAt,
    })

    // Log to console (instead of sending SMS)
    console.log("📱 OTP Code for", phone, ":", code)
    console.log("⏰ Expires at:", expiresAt)

    return { success: true }
  } catch (error) {
    console.error("Error sending OTP:", error)
    return { success: false, error: "ارسال کد یک‌بارمصرف ناموفق بود" }
  }
}

export async function verifyOTP(phone: string, code: string) {
  try {
    // Find valid OTP
    const otpRecord = await db
      .select()
      .from(phoneOtps)
      .where(
        and(
          eq(phoneOtps.phone, phone),
          eq(phoneOtps.code, code),
          gt(phoneOtps.expiresAt, new Date()),
          isNull(phoneOtps.verifiedAt)
        )
      )
      .limit(1)

    if (otpRecord.length === 0) {
      return {
        success: false,
        error: "کد یک‌بارمصرف نامعتبر یا منقضی شده است",
      }
    }

    // Mark OTP as verified
    await db
      .update(phoneOtps)
      .set({ verifiedAt: new Date() })
      .where(eq(phoneOtps.id, otpRecord[0].id))

    // Check if user exists
    const existingUser = await db
      .select()
      .from(staff)
      .where(eq(staff.phone, phone))
      .limit(1)

    let currentStaff: Staff

    if (existingUser.length === 0) {
      // Create new user
      const newUser = await db
        .insert(staff)
        .values({
          firstName: "New",
          lastName: "User",
          phone,
        })
        .returning()

      currentStaff = newUser[0]
    } else {
      currentStaff = existingUser[0]
    }

    // Create session
    const session = await getSession()
    session.userId = currentStaff.id
    session.phone = currentStaff.phone
    session.isLoggedIn = true
    await session.save()

    console.log("✅ User logged in:", { userId: staff.id, phone: staff.phone })

    return { success: true, userId: staff.id }
  } catch (error) {
    console.error("Error verifying OTP:", error)
    return { success: false, error: "تأیید کد یک‌بارمصرف ناموفق بود" }
  }
}

export async function logout() {
  const session = await getSession()
  session.destroy()
  redirect("/login")
}

export async function getCurrentUser() {
  const session = await getSession()

  if (!session.isLoggedIn || !session.userId) {
    return null
  }

  const [currentStaff] = await db
    .select()
    .from(staff)
    .where(eq(staff.id, session.userId))
    .limit(1)

  return currentStaff || null
}

export async function requireAuth() {
  const currentStaff = await getCurrentUser()

  if (!currentStaff) {
    redirect("/login")
  }

  return currentStaff
}
