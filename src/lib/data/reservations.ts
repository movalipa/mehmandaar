import type { UUID } from "node:crypto"
import { and, eq, gte } from "drizzle-orm"
import { setBrushSettings } from "recharts/types/state/brushSlice"
import { db } from "@/db"
import { guests, reservations, rooms } from "@/db/schema"

export async function getAllReservations(hotelId: UUID) {
  return await db
    .select({
      id: reservations.id,
      checkIn: reservations.checkIn,
      checkOut: reservations.checkOut,
      status: reservations.status,
      createdAt: reservations.createdAt,
      checkedInAt: reservations.checkedInAt,
      checkedOutAt: reservations.checkedOutAt,
      guest: {
        id: guests.id,
        fullName: guests.fullName,
        phone: guests.phone,
      },
      room: {
        id: rooms.id,
        name: rooms.name,
        singleBeds: rooms.singleBeds,
        doubleBeds: rooms.doubleBeds,
      },
    })
    .from(reservations)
    .leftJoin(guests, eq(reservations.guestId, guests.id))
    .leftJoin(rooms, eq(reservations.roomId, rooms.id))
    .where(eq(reservations.hotelId, hotelId))
    .orderBy(reservations.createdAt)
}

export async function getReservationById(reservationId: UUID, hotelId: UUID) {
  const result = await db
    .select({
      id: reservations.id,
      checkIn: reservations.checkIn,
      checkOut: reservations.checkOut,
      status: reservations.status,
      createdAt: reservations.createdAt,
      checkedInAt: reservations.checkedInAt,
      checkedOutAt: reservations.checkedOutAt,
      guest: {
        id: guests.id,
        fullName: guests.fullName,
        phone: guests.phone,
      },
      room: {
        id: rooms.id,
        name: rooms.name,
        singleBeds: rooms.singleBeds,
        doubleBeds: rooms.doubleBeds,
      },
    })
    .from(reservations)
    .leftJoin(guests, eq(reservations.guestId, guests.id))
    .leftJoin(rooms, eq(reservations.roomId, rooms.id))
    .where(
      and(eq(reservations.id, reservationId), eq(reservations.hotelId, hotelId))
    )
    .limit(1)

  return result[0] || null
}

export async function getRecentReservations(hotelId: UUID, days: number = 30) {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  return await db
    .select({
      id: reservations.id,
      checkIn: reservations.checkIn,
      checkOut: reservations.checkOut,
      status: reservations.status,
      createdAt: reservations.createdAt,
      checkedInAt: reservations.checkedInAt,
      checkedOutAt: reservations.checkedOutAt,
      guest: {
        id: guests.id,
        fullName: guests.fullName,
        phone: guests.phone,
      },
      room: {
        id: rooms.id,
        name: rooms.name,
        singleBeds: rooms.singleBeds,
        doubleBeds: rooms.doubleBeds,
      },
    })
    .from(reservations)
    .leftJoin(guests, eq(guests.id, reservations.guestId))
    .leftJoin(rooms, eq(rooms.id, reservations.roomId))
    .where(
      and(
        eq(reservations.hotelId, hotelId),
        gte(reservations.createdAt, startDate)
      )
    )
    .orderBy(reservations.createdAt)
}
