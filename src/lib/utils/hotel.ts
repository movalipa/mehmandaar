import type { UUID } from "node:crypto"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { hotels, staff } from "@/db/schema"

export async function getHotelById(hotelId: UUID) {
  const [hotel] = await db
    .select()
    .from(hotels)
    .where(eq(hotels.id, hotelId))
    .limit(1)

  return hotel || null
}

export async function getHotelWithStaff(hotelId: UUID) {
  const hotel = await db
    .select({
      id: hotels.id,
      name: hotels.name,
      address: hotels.address,
      createdAt: hotels.createdAt,
      staffCount: db.$count(staff, eq(staff.hotelId, hotelId)),
    })
    .from(hotels)
    .where(eq(hotels.id, hotelId))
    .limit(1)

  return hotel[0] || null
}

export async function updateHotel(
  hotelId: UUID,
  data: {
    name?: string
    address?: string
  }
) {
  const [updated] = await db
    .update(hotels)
    .set({
      ...data,
    })
    .where(eq(hotels.id, hotelId))
    .returning()

  return updated
}
