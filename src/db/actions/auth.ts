"use server"

import { and, eq, gt, isNull } from "drizzle-orm"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { phoneOtps, staff } from "@/db/schema"
import { getSession } from "@/utils/session"

export async function sendOTP(phone: string) {
  try {
    // const code = Math.floor(100000 + Math.random() * 900000).toString()
    const code = "123456"
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

    await db.insert(phoneOtps).values({
      phone,
      code,
      expiresAt,
    })

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

    const existingUser = await db
      .select()
      .from(staff)
      .where(eq(staff.phone, phone))
      .limit(1)

    if (existingUser.length === 0) {
      return {
        success: true,
        isNewUser: true,
      }
    }

    await db
      .update(phoneOtps)
      .set({ verifiedAt: new Date() })
      .where(eq(phoneOtps.id, otpRecord[0].id))

    const currentStaff = existingUser[0]

    const session = await getSession()
    session.userId = currentStaff.id
    session.phone = currentStaff.phone
    session.isLoggedIn = true
    await session.save()

    console.log("✅ User logged in:", {
      userId: currentStaff.id,
      phone: currentStaff.phone,
    })

    return { success: true, isNewUser: false, userId: currentStaff.id }
  } catch (error) {
    console.error("Error verifying OTP:", error)
    return { success: false, error: "تأیید کد یک‌بارمصرف ناموفق بود" }
  }
}

export async function registerUser(
  phone: string,
  code: string,
  firstName: string,
  lastName: string
) {
  try {
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

    const existingUser = await db
      .select()
      .from(staff)
      .where(eq(staff.phone, phone))
      .limit(1)

    if (existingUser.length > 0) {
      return {
        success: false,
        error: "این شماره قبلاً ثبت شده است",
      }
    }

    const newUser = await db
      .insert(staff)
      .values({
        firstName,
        lastName,
        phone,
      })
      .returning()

    const currentStaff = newUser[0]

    await db
      .update(phoneOtps)
      .set({ verifiedAt: new Date() })
      .where(eq(phoneOtps.id, otpRecord[0].id))

    const session = await getSession()
    session.userId = currentStaff.id
    session.phone = currentStaff.phone
    session.isLoggedIn = true
    await session.save()

    console.log("✅ New user registered:", {
      userId: currentStaff.id,
      phone: currentStaff.phone,
    })

    return { success: true, userId: currentStaff.id }
  } catch (error) {
    console.error("Error registering user:", error)
    return { success: false, error: "ثبت‌نام کاربر ناموفق بود" }
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
