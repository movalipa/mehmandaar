import type { UUID } from "node:crypto"
import { and, eq, gte, lte, sql } from "drizzle-orm"
import { db } from "@/db"
import { guests, reservations, rooms } from "@/db/schema"

export async function getReportsData(hotelId: UUID) {
  const today = new Date()
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0)

  // گرفتن تمام رزروهای ماه جاری
  const monthlyReservations = await db
    .select({
      id: reservations.id,
      checkIn: reservations.checkIn,
      checkOut: reservations.checkOut,
      status: reservations.status,
      createdAt: reservations.createdAt,
      guest: {
        id: guests.id,
        fullName: guests.fullName,
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
      and(
        eq(reservations.hotelId, hotelId),
        gte(reservations.checkIn, firstDayOfMonth),
        lte(reservations.checkIn, lastDayOfMonth)
      )
    )

  // محاسبه آمار پایه
  const totalReservations = monthlyReservations.length
  const checkedIn = monthlyReservations.filter(
    r => r.status === "checked-in"
  ).length
  const checkedOut = monthlyReservations.filter(
    r => r.status === "checked-out"
  ).length
  const cancelled = monthlyReservations.filter(
    r => r.status === "cancelled"
  ).length

  // محاسبه میانگین مدت اقامت
  const completedStays = monthlyReservations.filter(
    r => r.status === "checked-out"
  )
  const totalNights = completedStays.reduce((sum, r) => {
    const nights = Math.ceil(
      (new Date(r.checkOut).getTime() - new Date(r.checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
    )
    return sum + nights
  }, 0)
  const averageStay =
    completedStays.length > 0 ? totalNights / completedStays.length : 0

  // گرفتن تمام اتاق‌ها برای محاسبه نرخ اشغال
  const allRooms = await db
    .select()
    .from(rooms)
    .where(eq(rooms.hotelId, hotelId))

  const totalRooms = allRooms.length
  const occupancyRate =
    totalRooms > 0 ? Math.round((checkedIn / totalRooms) * 100) : 0

  // گرفتن مهمانان برتر (بر اساس تعداد رزرو)
  const guestReservations = await db
    .select({
      guestId: reservations.guestId,
      guestName: guests.fullName,
      guestPhone: guests.phone,
      reservationCount: sql<number>`count(*)::int`,
      lastVisit: sql<Date>`max(${reservations.checkIn})`,
    })
    .from(reservations)
    .leftJoin(guests, eq(reservations.guestId, guests.id))
    .where(eq(reservations.hotelId, hotelId))
    .groupBy(reservations.guestId, guests.fullName, guests.phone)
    .orderBy(sql`count(*) desc`)
    .limit(10)

  // عملکرد انواع اتاق
  const roomPerformance = await db
    .select({
      roomId: rooms.id,
      roomName: rooms.name,
      singleBeds: rooms.singleBeds,
      doubleBeds: rooms.doubleBeds,
      bookingCount: sql<number>`count(${reservations.id})::int`,
    })
    .from(rooms)
    .leftJoin(
      reservations,
      and(
        eq(rooms.id, reservations.roomId),
        gte(reservations.checkIn, firstDayOfMonth),
        lte(reservations.checkIn, lastDayOfMonth)
      )
    )
    .where(eq(rooms.hotelId, hotelId))
    .groupBy(rooms.id, rooms.name, rooms.singleBeds, rooms.doubleBeds)
    .orderBy(sql`count(${reservations.id}) desc`)

  // آمار هفتگی (7 روز گذشته)
  const weeklyStats = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    date.setHours(0, 0, 0, 0)

    const nextDate = new Date(date)
    nextDate.setDate(nextDate.getDate() + 1)

    const dayReservations = await db
      .select({ id: reservations.id })
      .from(reservations)
      .where(
        and(
          eq(reservations.hotelId, hotelId),
          lte(reservations.checkIn, date),
          gte(reservations.checkOut, date),
          sql`${reservations.status} IN ('reserved', 'checked-in')`
        )
      )

    const dayOccupancy =
      totalRooms > 0
        ? Math.round((dayReservations.length / totalRooms) * 100)
        : 0

    weeklyStats.push({
      date: date,
      occupancy: dayOccupancy,
      reservations: dayReservations.length,
    })
  }

  return {
    monthlyStats: {
      totalReservations,
      totalGuests: monthlyReservations.filter(r => r.guest).length,
      checkedIn,
      checkedOut,
      cancelled,
      occupancyRate,
      averageStay: averageStay.toFixed(1),
    },
    topGuests: guestReservations,
    roomPerformance,
    weeklyStats,
    allRooms: totalRooms,
  }
}
