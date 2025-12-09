import type { UUID } from "node:crypto"
import { and, count, eq, gte, lte, sql } from "drizzle-orm"
import { db } from "@/db"
import { hotels, reservations, roomGroup, rooms } from "@/db/schema"

/**
 * دریافت آمار کلی داشبورد برای یک سازمان
 */
export async function getDashboardStats(organizationId: UUID) {
  // دریافت هتل‌های سازمان
  const organizationHotels = await db
    .select({ id: hotels.id })
    .from(hotels)
    .where(eq(hotels.organizationId, organizationId))

  const hotelIds = organizationHotels.map(h => h.id)

  if (hotelIds.length === 0) {
    return {
      totalRooms: 0,
      activeGuests: 0,
      occupancyRate: 0,
      hotelsCount: 0,
    }
  }

  // دریافت تعداد کل اتاق‌ها
  const totalRoomsResult = await db
    .select({ count: count() })
    .from(rooms)
    .where(sql`${rooms.hotelId} = ANY(${hotelIds})`)

  const totalRooms = totalRoomsResult[0]?.count || 0

  // دریافت تعداد مهمانان فعال (checked-in)
  const activeGuestsResult = await db
    .select({ count: count() })
    .from(reservations)
    .where(
      and(
        eq(reservations.organizationId, organizationId),
        eq(reservations.status, "checked-in")
      )
    )

  const activeGuests = activeGuestsResult[0]?.count || 0

  // محاسبه نرخ اشغال
  const occupancyRate =
    totalRooms > 0 ? Math.round((activeGuests / totalRooms) * 100) : 0

  return {
    totalRooms,
    activeGuests,
    occupancyRate,
    hotelsCount: hotelIds.length,
  }
}

/**
 * دریافت آمار اتاق‌ها بر اساس گروه
 */
export async function getRoomStatusByGroup(organizationId: UUID) {
  // دریافت هتل‌های سازمان
  const organizationHotels = await db
    .select({ id: hotels.id })
    .from(hotels)
    .where(eq(hotels.organizationId, organizationId))

  const hotelIds = organizationHotels.map(h => h.id)

  if (hotelIds.length === 0) {
    return []
  }

  // دریافت آمار اتاق‌ها بر اساس گروه
  const roomGroupStats = await db
    .select({
      groupName: roomGroup.name,
      groupId: roomGroup.id,
      totalRooms: count(rooms.id),
    })
    .from(rooms)
    .leftJoin(roomGroup, eq(rooms.groupId, roomGroup.id))
    .where(sql`${rooms.hotelId} = ANY(${hotelIds})`)
    .groupBy(roomGroup.id, roomGroup.name)

  // محاسبه اتاق‌های اشغال شده برای هر گروه
  const roomsWithReservations = await db
    .select({
      roomId: rooms.id,
      groupId: rooms.groupId,
    })
    .from(rooms)
    .innerJoin(
      reservations,
      and(
        eq(reservations.roomId, rooms.id),
        eq(reservations.status, "checked-in")
      )
    )
    .where(sql`${rooms.hotelId} = ANY(${hotelIds})`)

  return roomGroupStats.map(group => {
    const occupiedCount = roomsWithReservations.filter(
      r => r.groupId === group.groupId
    ).length

    return {
      type: group.groupName || "بدون گروه",
      groupId: group.groupId,
      total: group.totalRooms,
      occupied: occupiedCount,
      available: group.totalRooms - occupiedCount,
    }
  })
}

/**
 * دریافت آمار چک‌این و چک‌اوت امروز
 */
export async function getTodayStats(organizationId: UUID) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  // چک‌این‌های برنامه‌ریزی شده امروز
  const todayCheckInsResult = await db
    .select({ count: count() })
    .from(reservations)
    .where(
      and(
        eq(reservations.organizationId, organizationId),
        gte(reservations.checkIn, today),
        lte(reservations.checkIn, tomorrow)
      )
    )

  // چک‌اوت‌های برنامه‌ریزی شده امروز
  const todayCheckOutsResult = await db
    .select({ count: count() })
    .from(reservations)
    .where(
      and(
        eq(reservations.organizationId, organizationId),
        gte(reservations.checkOut, today),
        lte(reservations.checkOut, tomorrow)
      )
    )

  // چک‌این‌های انجام شده امروز
  const todayCheckedInResult = await db
    .select({ count: count() })
    .from(reservations)
    .where(
      and(
        eq(reservations.organizationId, organizationId),
        gte(reservations.checkIn, today),
        lte(reservations.checkIn, tomorrow),
        eq(reservations.status, "checked-in")
      )
    )

  // چک‌اوت‌های انجام شده امروز
  const todayCheckedOutResult = await db
    .select({ count: count() })
    .from(reservations)
    .where(
      and(
        eq(reservations.organizationId, organizationId),
        gte(reservations.checkOut, today),
        lte(reservations.checkOut, tomorrow),
        eq(reservations.status, "checked-out")
      )
    )

  return {
    scheduledCheckIns: todayCheckInsResult[0]?.count || 0,
    scheduledCheckOuts: todayCheckOutsResult[0]?.count || 0,
    completedCheckIns: todayCheckedInResult[0]?.count || 0,
    completedCheckOuts: todayCheckedOutResult[0]?.count || 0,
  }
}
