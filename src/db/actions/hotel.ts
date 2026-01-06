"use server"

import type { UUID } from "node:crypto"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
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

export async function updateHotel(
  hotelId: UUID,
  data: {
    name: string
    address: string
  }
) {
  const currentStaff = await requireAuth()

  // فقط owner می‌تواند تنظیمات هتل را تغییر دهد
  if (currentStaff.role !== "owner") {
    return {
      success: false,
      error: "فقط مالک می‌تواند تنظیمات هتل را تغییر دهد.",
    }
  }

  if (currentStaff.hotelId !== hotelId) {
    return { success: false, error: "شما به این هتل دسترسی ندارید." }
  }

  if (!data.name.trim()) {
    return { success: false, error: "نام هتل الزامی است." }
  }

  try {
    await db
      .update(hotels)
      .set({
        name: data.name.trim(),
        address: data.address.trim(),
      })
      .where(eq(hotels.id, hotelId))

    revalidatePath("/dashboard/settings")
    return { success: true }
  } catch (error) {
    console.error("Error updating hotel:", error)
    return { success: false, error: "خطا در به‌روزرسانی اطلاعات هتل" }
  }
}

export async function deleteHotel(hotelId: UUID) {
  const currentStaff = await requireAuth()

  // فقط owner می‌تواند هتل را حذف کند
  if (currentStaff.role !== "owner") {
    return { success: false, error: "فقط مالک می‌تواند هتل را حذف کند." }
  }

  if (currentStaff.hotelId !== hotelId) {
    return { success: false, error: "شما به این هتل دسترسی ندارید." }
  }

  try {
    // حذف هتل - به دلیل cascade تمام داده‌های مرتبط حذف می‌شوند
    await db.delete(hotels).where(eq(hotels.id, hotelId))

    // ریدایرکت به صفحه اصلی یا لاگین
    redirect("/")
  } catch (error) {
    console.error("Error deleting hotel:", error)
    return { success: false, error: "خطا در حذف هتل" }
  }
}
