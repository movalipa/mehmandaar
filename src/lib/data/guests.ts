import type { UUID } from "node:crypto"
import { and, eq } from "drizzle-orm"
import { db } from "@/db"
import { guests, reservations } from "@/db/schema"

/**
 * دریافت مهمانان فعال (با رزرو checked-in)
 */
export async function getActiveGuests(organizationId: UUID) {
  return await db
    .select({
      id: guests.id,
      fullName: guests.fullName,
      phoneNumber: guests.phone,
      reservationId: reservations.id,
      checkIn: reservations.checkIn,
      checkOut: reservations.checkOut,
    })
    .from(guests)
    .innerJoin(
      reservations,
      and(
        eq(reservations.guestId, guests.id),
        eq(reservations.status, "checked-in"),
        eq(reservations.organizationId, organizationId)
      )
    )
}

/**
 * دریافت اطلاعات یک مهمان
 */
export async function getGuestById(guestId: UUID) {
  const result = await db
    .select()
    .from(guests)
    .where(eq(guests.id, guestId))
    .limit(1)

  return result[0] || null
}
