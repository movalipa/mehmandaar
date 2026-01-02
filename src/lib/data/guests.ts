import type { UUID } from "node:crypto"
import { and, desc, eq } from "drizzle-orm"
import { db } from "@/db"
import { guests } from "@/db/schema"

export async function getGuestsByHotel(hotelId: UUID) {
  return await db
    .select()
    .from(guests)
    .where(eq(guests.hotelId, hotelId))
    .orderBy(desc(guests.createdAt))
}

export async function getGuestById(guestId: UUID) {
  const [guest] = await db
    .select()
    .from(guests)
    .where(eq(guests.id, guestId))
    .limit(1)

  return guest
}

export async function getGuestByPhone(hotelId: UUID, phone: string) {
  const [guest] = await db
    .select()
    .from(guests)
    .where(and(eq(guests.hotelId, hotelId), eq(guests.phone, phone)))
    .limit(1)

  return guest
}
