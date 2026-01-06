"use server"

import type { UUID } from "node:crypto"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { type NewRoom, rooms } from "@/db/schema"
import { requireAuth } from "./auth"

export async function createRoom(data: {
  name: string
  singleBeds: number
  doubleBeds: number
}) {
  const staff = await requireAuth()

  if (!staff.hotelId) {
    throw new Error("هتلی به کاربر اختصاص نداده شده است")
  }

  const newRoom: NewRoom = {
    hotelId: staff.hotelId,
    name: data.name,
    singleBeds: data.singleBeds,
    doubleBeds: data.doubleBeds,
  }

  const [room] = await db.insert(rooms).values(newRoom).returning()

  revalidatePath("/dashboard/rooms")
  return room
}

export async function updateRoom(
  roomId: UUID,
  data: {
    name: string
    singleBeds: number
    doubleBeds: number
  }
) {
  const staff = await requireAuth()

  if (!staff.hotelId) {
    throw new Error("هتلی به کاربر اختصاص نداده شده است")
  }

  const existingRoom = await db
    .select()
    .from(rooms)
    .where(eq(rooms.id, roomId))
    .limit(1)

  if (!existingRoom.length || existingRoom[0].hotelId !== staff.hotelId) {
    throw new Error("اتاق یافت نشد یا دسترسی غیرمجاز است")
  }

  const [updatedRoom] = await db
    .update(rooms)
    .set({
      name: data.name,
      singleBeds: data.singleBeds,
      doubleBeds: data.doubleBeds,
    })
    .where(eq(rooms.id, roomId))
    .returning()

  revalidatePath("/dashboard/rooms")
  return updatedRoom
}

export async function deleteRoom(roomId: UUID) {
  const staff = await requireAuth()

  if (!staff.hotelId) {
    throw new Error("هتلی به کاربر اختصاص نداده شده است")
  }

  const existingRoom = await db
    .select()
    .from(rooms)
    .where(eq(rooms.id, roomId))
    .limit(1)

  if (!existingRoom.length || existingRoom[0].hotelId !== staff.hotelId) {
    throw new Error("اتاق یافت نشد یا دسترسی غیرمجاز است")
  }

  await db.delete(rooms).where(eq(rooms.id, roomId))

  revalidatePath("/dashboard/rooms")
  return { success: true }
}
