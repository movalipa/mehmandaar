"use server"

import type { UUID } from "node:crypto"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { guests, reservations, rooms } from "@/db/schema"
import { requireAuth } from "./auth"

type ReservationStatus = "reserved" | "checked-in" | "checked-out" | "cancelled"

export async function getGuestsForReservation() {
  const staff = await requireAuth()

  if (!staff.hotelId) {
    throw new Error("هتلی برای این کاربر یافت نشد")
  }

  const guestsList = await db
    .select({
      id: guests.id,
      fullName: guests.fullName,
      phone: guests.phone,
    })
    .from(guests)
    .where(eq(guests.hotelId, staff.hotelId))

  return guestsList
}

export async function getRoomsForReservation() {
  const staff = await requireAuth()

  if (!staff.hotelId) {
    throw new Error("هتلی برای این کاربر یافت نشد")
  }

  const roomsList = await db
    .select({
      id: rooms.id,
      name: rooms.name,
      singleBeds: rooms.singleBeds,
      doubleBeds: rooms.doubleBeds,
    })
    .from(rooms)
    .where(eq(rooms.hotelId, staff.hotelId))

  return roomsList
}

export async function createReservation(data: {
  guestId: UUID
  roomId: UUID
  checkIn: Date
  checkOut: Date
}) {
  const staff = await requireAuth()

  if (!staff.hotelId) {
    throw new Error("هتلی برای این کاربر یافت نشد")
  }

  if (data.checkIn >= data.checkOut) {
    throw new Error("تاریخ خروج باید بعد از تاریخ ورود باشد")
  }

  await db.insert(reservations).values({
    hotelId: staff.hotelId,
    guestId: data.guestId,
    roomId: data.roomId,
    checkIn: data.checkIn,
    checkOut: data.checkOut,
    status: "reserved",
  })

  revalidatePath("/dashboard/reservations")
}

export async function updateReservation(
  reservationId: UUID,
  data: {
    guestId?: UUID
    roomId?: UUID
    checkIn?: Date
    checkOut?: Date
  }
) {
  const staff = await requireAuth()

  if (!staff.hotelId) {
    throw new Error("هتلی برای این کاربر یافت نشد")
  }

  const reservation = await db
    .select()
    .from(reservations)
    .where(
      and(
        eq(reservations.id, reservationId),
        eq(reservations.hotelId, staff.hotelId)
      )
    )
    .limit(1)

  if (!reservation[0]) {
    throw new Error("رزرو یافت نشد یا دسترسی غیرمجاز")
  }

  if (data.checkIn && data.checkOut && data.checkIn >= data.checkOut) {
    throw new Error("تاریخ خروج باید بعد از تاریخ ورود باشد")
  }

  await db
    .update(reservations)
    .set({
      guestId: data.guestId,
      roomId: data.roomId,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
    })
    .where(eq(reservations.id, reservationId))

  revalidatePath("/dashboard/reservations")
}

export async function updateReservationStatus(
  reservationId: UUID,
  status: ReservationStatus
) {
  const staff = await requireAuth()

  if (!staff.hotelId) {
    throw new Error("هتلی برای این کاربر یافت نشد")
  }

  const reservation = await db
    .select()
    .from(reservations)
    .where(
      and(
        eq(reservations.id, reservationId),
        eq(reservations.hotelId, staff.hotelId)
      )
    )
    .limit(1)

  if (!reservation[0]) {
    throw new Error("رزرو یافت نشد یا دسترسی غیرمجاز")
  }

  // biome-ignore lint/suspicious/noExplicitAny: YUP
  const updateData: any = { status }

  if (status === "checked-in" && !reservation[0].checkedInAt) {
    updateData.checkedInAt = new Date()
  }

  if (status === "checked-out" && !reservation[0].checkedOutAt) {
    updateData.checkedOutAt = new Date()
  }

  await db
    .update(reservations)
    .set(updateData)
    .where(eq(reservations.id, reservationId))

  revalidatePath("/dashboard/reservations")
}

export async function deleteReservation(reservationId: UUID) {
  const staff = await requireAuth()

  if (!staff.hotelId) {
    throw new Error("هتلی برای این کاربر یافت نشد")
  }

  const reservation = await db
    .select()
    .from(reservations)
    .where(
      and(
        eq(reservations.id, reservationId),
        eq(reservations.hotelId, staff.hotelId)
      )
    )
    .limit(1)

  if (!reservation[0]) {
    throw new Error("رزرو یافت نشد یا دسترسی غیرمجاز")
  }

  await db.delete(reservations).where(eq(reservations.id, reservationId))

  revalidatePath("/dashboard/reservations")
}
