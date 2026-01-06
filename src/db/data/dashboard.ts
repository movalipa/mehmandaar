import type { UUID } from "node:crypto"
import { and, count, eq, gte, lte } from "drizzle-orm"
import { db } from "@/db"
import { guests, reservations, rooms } from "@/db/schema"

export interface DashboardStats {
  totalRooms: number
  totalGuests: number
  activeReservations: number
  activeGuests: number
}

export async function getDashboardStats(
  hotelId: UUID
): Promise<DashboardStats> {
  const [roomsCount, guestsCount, activeReservationsCount] = await Promise.all([
    db
      .select({ count: count() })
      .from(rooms)
      .where(eq(rooms.hotelId, hotelId))
      .then(result => result[0]?.count ?? 0),

    db
      .select({ count: count() })
      .from(guests)
      .where(eq(guests.hotelId, hotelId))
      .then(result => result[0]?.count ?? 0),

    db
      .select({ count: count() })
      .from(reservations)
      .where(
        and(
          eq(reservations.hotelId, hotelId),
          eq(reservations.status, "checked-in")
        )
      )
      .then(result => result[0]?.count ?? 0),
  ])

  return {
    totalRooms: roomsCount,
    totalGuests: guestsCount,
    activeReservations: activeReservationsCount,
    activeGuests: activeReservationsCount, // فرض: هر رزرو یک مهمان
  }
}

export interface RoomStatusGroup {
  available: number
  occupied: number
  cleaning: number
}

export async function getRoomStatusByGroup(
  hotelId: UUID
): Promise<RoomStatusGroup> {
  const now = new Date()

  const occupiedRooms = await db
    .select({ roomId: reservations.roomId })
    .from(reservations)
    .where(
      and(
        eq(reservations.hotelId, hotelId),
        eq(reservations.status, "checked-in"),
        lte(reservations.checkIn, now),
        gte(reservations.checkOut, now)
      )
    )
    .then(results => new Set(results.map(r => r.roomId)))

  const allRooms = await db
    .select({ id: rooms.id })
    .from(rooms)
    .where(eq(rooms.hotelId, hotelId))

  const totalRooms = allRooms.length
  const occupied = occupiedRooms.size

  const cleaning = Math.floor(totalRooms * 0.1)
  const available = totalRooms - occupied - cleaning

  return {
    available: Math.max(0, available),
    occupied,
    cleaning,
  }
}

export interface TodayStats {
  checkIns: number
  checkOuts: number
}

export async function getTodayStats(hotelId: UUID): Promise<TodayStats> {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const [checkInsCount, checkOutsCount] = await Promise.all([
    // ورودی‌های امروز
    db
      .select({ count: count() })
      .from(reservations)
      .where(
        and(
          eq(reservations.hotelId, hotelId),
          gte(reservations.checkIn, today),
          lte(reservations.checkIn, tomorrow)
        )
      )
      .then(result => result[0]?.count ?? 0),

    // خروجی‌های امروز
    db
      .select({ count: count() })
      .from(reservations)
      .where(
        and(
          eq(reservations.hotelId, hotelId),
          gte(reservations.checkOut, today),
          lte(reservations.checkOut, tomorrow)
        )
      )
      .then(result => result[0]?.count ?? 0),
  ])

  return {
    checkIns: checkInsCount,
    checkOuts: checkOutsCount,
  }
}
