"use server"

import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { staff } from "@/db/schema"
import { requireAuth } from "./auth"

export async function updateProfile(data: {
  firstName: string
  lastName: string
  phone: string
}) {
  const currentStaff = await requireAuth()

  if (!data.firstName.trim() || !data.lastName.trim()) {
    return { success: false, error: "نام و نام خانوادگی الزامی است." }
  }

  if (!data.phone.trim()) {
    return { success: false, error: "شماره تلفن الزامی است." }
  }

  const phoneRegex = /^(\+98|0)?9\d{9}$/
  if (!phoneRegex.test(data.phone.replace(/\s/g, ""))) {
    return {
      success: false,
      error: "فرمت شماره تلفن نامعتبر است. (مثال: 09123456789)",
    }
  }

  try {
    if (data.phone !== currentStaff.phone) {
      const existingStaff = await db
        .select()
        .from(staff)
        .where(eq(staff.phone, data.phone))
        .limit(1)

      if (existingStaff.length > 0) {
        return {
          success: false,
          error: "این شماره تلفن قبلاً ثبت شده است.",
        }
      }
    }

    await db
      .update(staff)
      .set({
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        phone: data.phone.trim(),
      })
      .where(eq(staff.id, currentStaff.id))

    revalidatePath("/dashboard/profile")
    return { success: true }
  } catch (error) {
    console.error("Error updating profile:", error)
    return { success: false, error: "خطا در به‌روزرسانی اطلاعات پروفایل" }
  }
}
