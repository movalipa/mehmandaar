"use server"

import { and, eq, gt, isNull } from "drizzle-orm"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { phoneOtpsTable, type User, usersTable } from "@/db/schema"
import { getSession } from "@/lib/session"

export async function sendOTP(phone: string) {
  try {
    // Generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    // Set expiration to 5 minutes from now
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

    // Save OTP to database
    await db.insert(phoneOtpsTable).values({
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
      .from(phoneOtpsTable)
      .where(
        and(
          eq(phoneOtpsTable.phone, phone),
          eq(phoneOtpsTable.code, code),
          gt(phoneOtpsTable.expiresAt, new Date()),
          isNull(phoneOtpsTable.verifiedAt)
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
      .update(phoneOtpsTable)
      .set({ verifiedAt: new Date() })
      .where(eq(phoneOtpsTable.id, otpRecord[0].id))

    // Check if user exists
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.phone, phone))
      .limit(1)

    let user: User

    if (existingUser.length === 0) {
      // Create new user
      const newUser = await db
        .insert(usersTable)
        .values({
          phone,
          name: "User", // Default name, can be updated later
          age: 0, // Default age, can be updated later
        })
        .returning()

      user = newUser[0]
    } else {
      user = existingUser[0]
    }

    // Create session
    const session = await getSession()
    session.userId = user.id
    session.phone = user.phone
    session.isLoggedIn = true
    await session.save()

    console.log("✅ User logged in:", { userId: user.id, phone: user.phone })

    return { success: true, userId: user.id }
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

  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, session.userId))
      .limit(1)

    return user[0] || null
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}
