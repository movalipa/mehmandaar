"use server"

import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { hotels, staff } from "@/db/schema"
import { requireAuth } from "./auth"

export async function registerHotel(formData: {
  name: string
  address?: string
}) {
  try {
    const currentStaff = await requireAuth()

    if (currentStaff.hotelId) {
      return {
        success: false,
        error: "شما قبلاً به هتلی تخصیص داده شده‌اید",
      }
    }

    if (!formData.name || formData.name.trim().length < 3) {
      return {
        success: false,
        error: "نام هتل باید حداقل ۳ کاراکتر باشد",
      }
    }

    const [newHotel] = await db
      .insert(hotels)
      .values({
        name: formData.name.trim(),
        address: formData.address?.trim() || null,
      })
      .returning()

    await db
      .update(staff)
      .set({
        hotelId: newHotel.id,
        role: "manager", // به عنوان مدیر هتل
      })
      .where(eq(staff.id, currentStaff.id))

    revalidatePath("/dashboard")

    return {
      success: true,
      hotelId: newHotel.id,
    }
  } catch (error) {
    console.error("Error registering hotel:", error)
    return {
      success: false,
      error: "خطا در ثبت هتل. لطفاً دوباره تلاش کنید",
    }
  }
}
