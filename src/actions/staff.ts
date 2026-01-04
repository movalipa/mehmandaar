"use server"

import type { UUID } from "node:crypto"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { staff } from "@/db/schema"
import { requireAuth } from "./auth"

type StaffRole = "owner" | "manager" | "receptionist" | "staff"

export async function createStaff(data: {
  firstName: string
  lastName: string
  phone: string
  role: StaffRole
}) {
  const currentStaff = await requireAuth()

  if (!currentStaff.hotelId) {
    throw new Error("هتلی برای این کاربر یافت نشد")
  }

  // چک کردن سطح دسترسی
  if (currentStaff.role !== "owner" && currentStaff.role !== "manager") {
    throw new Error("شما اجازه افزودن کارمند ندارید")
  }

  // مدیر نمی‌تواند owner اضافه کند
  if (currentStaff.role === "manager" && data.role === "owner") {
    throw new Error("مدیر نمی‌تواند مالک جدید اضافه کند")
  }

  // چک کردن یکتا بودن شماره تلفن
  const existingStaff = await db
    .select()
    .from(staff)
    .where(eq(staff.phone, data.phone))
    .limit(1)

  if (existingStaff[0]) {
    throw new Error("این شماره تلفن قبلاً ثبت شده است")
  }

  await db.insert(staff).values({
    hotelId: currentStaff.hotelId,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    role: data.role,
  })

  revalidatePath("/dashboard/staff")
}

export async function updateStaff(
  staffId: UUID,
  data: {
    firstName?: string
    lastName?: string
    phone?: string
    role?: StaffRole
  }
) {
  const currentStaff = await requireAuth()

  if (!currentStaff.hotelId) {
    throw new Error("هتلی برای این کاربر یافت نشد")
  }

  // چک کردن سطح دسترسی
  if (currentStaff.role !== "owner" && currentStaff.role !== "manager") {
    throw new Error("شما اجازه ویرایش کارمند ندارید")
  }

  const targetStaff = await db
    .select()
    .from(staff)
    .where(and(eq(staff.id, staffId), eq(staff.hotelId, currentStaff.hotelId)))
    .limit(1)

  if (!targetStaff[0]) {
    throw new Error("کارمند یافت نشد یا دسترسی غیرمجاز")
  }

  // مدیر نمی‌تواند owner را ویرایش کند
  if (currentStaff.role === "manager" && targetStaff[0].role === "owner") {
    throw new Error("مدیر نمی‌تواند مالک را ویرایش کند")
  }

  // مدیر نمی‌تواند کسی را owner کند
  if (currentStaff.role === "manager" && data.role === "owner") {
    throw new Error("مدیر نمی‌تواند کسی را مالک کند")
  }

  // مدیر نمیتواند خودش رو عوض کنه
  if (targetStaff[0].role === "owner") {
    throw new Error("مالک نمی‌تواند دسترسی خودش را تغییر دهد")
  }

  // اگر شماره تلفن تغییر کرده، یکتا بودن را چک کن
  if (data.phone && data.phone !== targetStaff[0].phone) {
    const existingStaff = await db
      .select()
      .from(staff)
      .where(eq(staff.phone, data.phone))
      .limit(1)

    if (existingStaff[0]) {
      throw new Error("این شماره تلفن قبلاً ثبت شده است")
    }
  }

  await db
    .update(staff)
    .set({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      role: data.role,
    })
    .where(eq(staff.id, staffId))

  revalidatePath("/dashboard/staff")
}

export async function deleteStaff(staffId: UUID) {
  const currentStaff = await requireAuth()

  if (!currentStaff.hotelId) {
    throw new Error("هتلی برای این کاربر یافت نشد")
  }

  // چک کردن سطح دسترسی
  if (currentStaff.role !== "owner" && currentStaff.role !== "manager") {
    throw new Error("شما اجازه حذف کارمند ندارید")
  }

  const targetStaff = await db
    .select()
    .from(staff)
    .where(and(eq(staff.id, staffId), eq(staff.hotelId, currentStaff.hotelId)))
    .limit(1)

  if (!targetStaff[0]) {
    throw new Error("کارمند یافت نشد یا دسترسی غیرمجاز")
  }

  // مدیر نمی‌تواند owner را حذف کند
  if (currentStaff.role === "manager" && targetStaff[0].role === "owner") {
    throw new Error("مدیر نمی‌تواند مالک را حذف کند")
  }

  // جلوگیری از حذف خودش
  if (staffId === currentStaff.id) {
    throw new Error("شما نمی‌توانید خودتان را حذف کنید")
  }

  await db.delete(staff).where(eq(staff.id, staffId))

  revalidatePath("/dashboard/staff")
}
