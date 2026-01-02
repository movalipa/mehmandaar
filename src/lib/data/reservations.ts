import type { UUID } from "node:crypto"
import { desc, eq } from "drizzle-orm"
import { db } from "@/db"
import { guests, reservations, rooms } from "@/db/schema"

export async function getRecentReservations(hotelId: UUID, limit = 10) {
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
    .where(eq(reservations.hotelId, hotelId))
    .leftJoin(guests, eq(reservations.guestId, guests.id))
    .leftJoin(rooms, eq(reservations.roomId, rooms.id))
    .orderBy(desc(reservations.createdAt))
    .limit(limit)
}

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
    .where(eq(reservations.hotelId, hotelId))
    .leftJoin(guests, eq(reservations.guestId, guests.id))
    .leftJoin(rooms, eq(reservations.roomId, rooms.id))
    .orderBy(desc(reservations.createdAt))
}

export async function getReservationById(reservationId: UUID) {
  const [reservation] = await db
    .select({
      id: reservations.id,
      hotelId: reservations.hotelId,
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
        description: guests.description,
      },
      room: {
        id: rooms.id,
        name: rooms.name,
        singleBeds: rooms.singleBeds,
        doubleBeds: rooms.doubleBeds,
      },
    })
    .from(reservations)
    .where(eq(reservations.id, reservationId))
    .leftJoin(guests, eq(reservations.guestId, guests.id))
    .leftJoin(rooms, eq(reservations.roomId, rooms.id))
    .limit(1)

  return reservation
}
