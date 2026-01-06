import type { UUID } from "node:crypto"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { rooms } from "@/db/schema"

export async function getRoomsByHotel(hotelId: UUID) {
  return await db
    .select()
    .from(rooms)
    .where(eq(rooms.hotelId, hotelId))
    .orderBy(rooms.name)
}

export async function getRoomById(roomId: UUID) {
  const [room] = await db
    .select()
    .from(rooms)
    .where(eq(rooms.id, roomId))
    .limit(1)

  return room
}
