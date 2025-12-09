import type { UUID } from "node:crypto"
import { eq, sql } from "drizzle-orm"
import { db } from "@/db"
import { guests, reservations, rooms } from "@/db/schema"

export type ReservationWithDetails = {
  id: number
  checkIn: Date | null
  checkOut: Date | null
  status: string | null
  createdAt: Date | null
  guestName: string | null
  roomName: string | null
}

/**
 * دریافت رزروهای اخیر با جزئیات
 */
export async function getRecentReservations(
  organizationId: UUID,
  limit: number = 4
) {
  const result = await db
    .select({
      id: reservations.id,
      checkIn: reservations.checkIn,
      checkOut: reservations.checkOut,
      status: reservations.status,
      createdAt: reservations.createdAt,
      guestName: guests.fullName,
      roomName: rooms.name,
    })
    .from(reservations)
    .leftJoin(guests, eq(reservations.guestId, guests.id))
    .leftJoin(rooms, eq(reservations.roomId, rooms.id))
    .where(eq(reservations.organizationId, organizationId))
    .orderBy(sql`${reservations.createdAt} DESC`)
    .limit(limit)

  return result
}

/**
 * دریافت تعداد رزروها بر اساس وضعیت
 */
export async function getReservationCountByStatus(
  organizationId: number,
  status: "reserved" | "checked-in" | "checked-out" | "cancelled"
) {
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(reservations)
    .where(
      sql`${reservations.organizationId} = ${organizationId} AND ${reservations.status} = ${status}`
    )

  return result[0]?.count || 0
}
