"use server"

import type { UUID } from "node:crypto"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { guests } from "@/db/schema"
import { requireAuth } from "./auth"

export async function createGuest(data: {
  fullName: string
  phone?: string
  description?: string
}) {
  const staff = await requireAuth()

  if (!staff.hotelId) {
    throw new Error("هتلی برای این کاربر یافت نشد")
  }

  await db.insert(guests).values({
    hotelId: staff.hotelId,
    fullName: data.fullName,
    phone: data.phone || null,
    description: data.description || null,
  })

  revalidatePath("/dashboard/guests")
}

export async function updateGuest(
  guestId: UUID,
  data: {
    fullName: string
    phone?: string
    description?: string
  }
) {
  const staff = await requireAuth()

  if (!staff.hotelId) {
    throw new Error("هتلی برای این کاربر یافت نشد")
  }

  const guest = await db
    .select()
    .from(guests)
    .where(and(eq(guests.id, guestId), eq(guests.hotelId, staff.hotelId)))
    .limit(1)

  if (!guest[0]) {
    throw new Error("مهمان یافت نشد یا دسترسی غیرمجاز")
  }

  await db
    .update(guests)
    .set({
      fullName: data.fullName,
      phone: data.phone || null,
      description: data.description || null,
    })
    .where(eq(guests.id, guestId))

  revalidatePath("/dashboard/guests")
}

export async function deleteGuest(guestId: UUID) {
  const staff = await requireAuth()

  if (!staff.hotelId) {
    throw new Error("هتلی برای این کاربر یافت نشد")
  }

  const guest = await db
    .select()
    .from(guests)
    .where(and(eq(guests.id, guestId), eq(guests.hotelId, staff.hotelId)))
    .limit(1)

  if (!guest[0]) {
    throw new Error("مهمان یافت نشد یا دسترسی غیرمجاز")
  }

  await db.delete(guests).where(eq(guests.id, guestId))

  revalidatePath("/dashboard/guests")
}
