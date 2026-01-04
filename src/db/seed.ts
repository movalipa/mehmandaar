// db/seed.ts
// Test data seeding for hotel management system
// Run by `pnpm db:seed`

import { db } from "@/db"
import {
  guests,
  hotels,
  phoneOtps,
  reservations,
  rooms,
  staff,
} from "@/db/schema"

async function main() {
  console.warn("🌱 START SEEDING DATABASE")
  console.time("⏱️  Seeding completed in")

  try {
    // =============================
    // 1. Insert Hotels
    // =============================
    console.log("📍 Inserting hotels...")
    const hotelsData = await db
      .insert(hotels)
      .values([
        {
          id: "550e8400-e29b-41d4-a716-446655440001",
          name: "هتل پارسیان آزادی",
          address: "تهران، خیابان آزادی، نرسیده به میدان آزادی",
          createdAt: new Date("2023-01-15"),
        },
        {
          id: "550e8400-e29b-41d4-a716-446655440002",
          name: "هتل اسپیناس پالاس",
          address: "تهران، خیابان ولیعصر، بالاتر از میدان ونک",
          createdAt: new Date("2023-03-20"),
        },
        {
          id: "550e8400-e29b-41d4-a716-446655440003",
          name: "هتل درویشی",
          address: "مشهد، خیابان امام رضا، نزدیک حرم مطهر",
          createdAt: new Date("2022-11-10"),
        },
      ])
      .returning()
    console.log(`✅ ${hotelsData.length} hotels inserted`)

    // =============================
    // 2. Insert Staff
    // =============================
    console.log("👥 Inserting staff...")
    const staffData = await db
      .insert(staff)
      .values([
        // هتل پارسیان آزادی
        {
          id: "650e8400-e29b-41d4-a716-446655440001",
          hotelId: "550e8400-e29b-41d4-a716-446655440001",
          firstName: "علی",
          lastName: "محمدی",
          phone: "09121234567",
          role: "owner",
          createdAt: new Date("2023-01-15"),
        },
        {
          id: "650e8400-e29b-41d4-a716-446655440002",
          hotelId: "550e8400-e29b-41d4-a716-446655440001",
          firstName: "زهرا",
          lastName: "احمدی",
          phone: "09123456789",
          role: "manager",
          createdAt: new Date("2023-02-01"),
        },
        {
          id: "650e8400-e29b-41d4-a716-446655440003",
          hotelId: "550e8400-e29b-41d4-a716-446655440001",
          firstName: "حسین",
          lastName: "کریمی",
          phone: "09127654321",
          role: "receptionist",
          createdAt: new Date("2023-03-10"),
        },
        // هتل اسپیناس پالاس
        {
          id: "650e8400-e29b-41d4-a716-446655440004",
          hotelId: "550e8400-e29b-41d4-a716-446655440002",
          firstName: "مریم",
          lastName: "رضایی",
          phone: "09131234567",
          role: "owner",
          createdAt: new Date("2023-03-20"),
        },
        {
          id: "650e8400-e29b-41d4-a716-446655440005",
          hotelId: "550e8400-e29b-41d4-a716-446655440002",
          firstName: "محمد",
          lastName: "حسینی",
          phone: "09139876543",
          role: "receptionist",
          createdAt: new Date("2023-04-05"),
        },
        // هتل درویشی
        {
          id: "650e8400-e29b-41d4-a716-446655440006",
          hotelId: "550e8400-e29b-41d4-a716-446655440003",
          firstName: "فاطمه",
          lastName: "موسوی",
          phone: "09151234567",
          role: "owner",
          createdAt: new Date("2022-11-10"),
        },
      ])
      .returning()
    console.log(`✅ ${staffData.length} staff members inserted`)

    // =============================
    // 3. Insert Rooms
    // =============================
    console.log("🚪 Inserting rooms...")
    const roomsData = await db
      .insert(rooms)
      .values([
        // هتل پارسیان آزادی
        {
          id: "750e8400-e29b-41d4-a716-446655440001",
          hotelId: "550e8400-e29b-41d4-a716-446655440001",
          name: "101",
          singleBeds: 2,
          doubleBeds: 0,
          createdAt: new Date("2023-01-20"),
        },
        {
          id: "750e8400-e29b-41d4-a716-446655440002",
          hotelId: "550e8400-e29b-41d4-a716-446655440001",
          name: "102",
          singleBeds: 0,
          doubleBeds: 1,
          createdAt: new Date("2023-01-20"),
        },
        {
          id: "750e8400-e29b-41d4-a716-446655440003",
          hotelId: "550e8400-e29b-41d4-a716-446655440001",
          name: "201",
          singleBeds: 1,
          doubleBeds: 1,
          createdAt: new Date("2023-01-20"),
        },
        {
          id: "750e8400-e29b-41d4-a716-446655440004",
          hotelId: "550e8400-e29b-41d4-a716-446655440001",
          name: "سوئیت رویال",
          singleBeds: 2,
          doubleBeds: 2,
          createdAt: new Date("2023-01-20"),
        },
        // هتل اسپیناس پالاس
        {
          id: "750e8400-e29b-41d4-a716-446655440005",
          hotelId: "550e8400-e29b-41d4-a716-446655440002",
          name: "301",
          singleBeds: 2,
          doubleBeds: 0,
          createdAt: new Date("2023-03-25"),
        },
        {
          id: "750e8400-e29b-41d4-a716-446655440006",
          hotelId: "550e8400-e29b-41d4-a716-446655440002",
          name: "302",
          singleBeds: 0,
          doubleBeds: 1,
          createdAt: new Date("2023-03-25"),
        },
        {
          id: "750e8400-e29b-41d4-a716-446655440007",
          hotelId: "550e8400-e29b-41d4-a716-446655440002",
          name: "سوئیت پرزیدنت",
          singleBeds: 1,
          doubleBeds: 2,
          createdAt: new Date("2023-03-25"),
        },
        // هتل درویشی
        {
          id: "750e8400-e29b-41d4-a716-446655440008",
          hotelId: "550e8400-e29b-41d4-a716-446655440003",
          name: "401",
          singleBeds: 3,
          doubleBeds: 0,
          createdAt: new Date("2022-11-15"),
        },
        {
          id: "750e8400-e29b-41d4-a716-446655440009",
          hotelId: "550e8400-e29b-41d4-a716-446655440003",
          name: "402",
          singleBeds: 0,
          doubleBeds: 2,
          createdAt: new Date("2022-11-15"),
        },
      ])
      .returning()
    console.log(`✅ ${roomsData.length} rooms inserted`)

    // =============================
    // 4. Insert Guests
    // =============================
    console.log("🧳 Inserting guests...")
    const guestsData = await db
      .insert(guests)
      .values([
        {
          id: "850e8400-e29b-41d4-a716-446655440001",
          hotelId: "550e8400-e29b-41d4-a716-446655440001",
          fullName: "رضا اکبری",
          phone: "09121112222",
          createdAt: new Date("2025-12-01"),
          description: "مهمان VIP - ترجیح می‌دهد اتاق طبقه بالا باشد",
        },
        {
          id: "850e8400-e29b-41d4-a716-446655440002",
          hotelId: "550e8400-e29b-41d4-a716-446655440001",
          fullName: "سارا نوری",
          phone: "09123334444",
          createdAt: new Date("2025-12-10"),
          description: null,
        },
        {
          id: "850e8400-e29b-41d4-a716-446655440003",
          hotelId: "550e8400-e29b-41d4-a716-446655440001",
          fullName: "امیر حسینی پور",
          phone: "09125556666",
          createdAt: new Date("2025-12-15"),
          description: "آلرژی به گردو و بادام دارد",
        },
        {
          id: "850e8400-e29b-41d4-a716-446655440004",
          hotelId: "550e8400-e29b-41d4-a716-446655440002",
          fullName: "نگار صفری",
          phone: "09137778888",
          createdAt: new Date("2025-11-20"),
          description: "مشتری دائمی - تخفیف 15%",
        },
        {
          id: "850e8400-e29b-41d4-a716-446655440005",
          hotelId: "550e8400-e29b-41d4-a716-446655440002",
          fullName: "پویا محمدزاده",
          phone: "09139990000",
          createdAt: new Date("2025-12-20"),
          description: null,
        },
        {
          id: "850e8400-e29b-41d4-a716-446655440006",
          hotelId: "550e8400-e29b-41d4-a716-446655440003",
          fullName: "مهدی رضوی",
          phone: "09151112222",
          createdAt: new Date("2025-10-05"),
          description: "زائر - نیاز به اتاق نزدیک به حرم",
        },
      ])
      .returning()
    console.log(`✅ ${guestsData.length} guests inserted`)

    // =============================
    // 5. Insert Reservations
    // =============================
    console.log("📅 Inserting reservations...")
    const reservationsData = await db
      .insert(reservations)
      .values([
        // رزرو چک‌اوت شده (گذشته)
        {
          id: "950e8400-e29b-41d4-a716-446655440001",
          hotelId: "550e8400-e29b-41d4-a716-446655440001",
          guestId: "850e8400-e29b-41d4-a716-446655440001",
          roomId: "750e8400-e29b-41d4-a716-446655440004",
          checkIn: new Date("2025-12-01"),
          checkOut: new Date("2025-12-05"),
          createdAt: new Date("2025-11-20"),
          checkedInAt: new Date("2025-12-01T14:30:00"),
          checkedOutAt: new Date("2025-12-05T11:00:00"),
          status: "checked-out",
        },
        // رزروهای فعال (چک‌این شده)
        {
          id: "950e8400-e29b-41d4-a716-446655440002",
          hotelId: "550e8400-e29b-41d4-a716-446655440001",
          guestId: "850e8400-e29b-41d4-a716-446655440002",
          roomId: "750e8400-e29b-41d4-a716-446655440002",
          checkIn: new Date("2026-01-02"),
          checkOut: new Date("2026-01-08"),
          createdAt: new Date("2025-12-10"),
          checkedInAt: new Date("2026-01-02T15:00:00"),
          checkedOutAt: null,
          status: "checked-in",
        },
        {
          id: "950e8400-e29b-41d4-a716-446655440003",
          hotelId: "550e8400-e29b-41d4-a716-446655440002",
          guestId: "850e8400-e29b-41d4-a716-446655440004",
          roomId: "750e8400-e29b-41d4-a716-446655440006",
          checkIn: new Date("2026-01-01"),
          checkOut: new Date("2026-01-10"),
          createdAt: new Date("2025-11-20"),
          checkedInAt: new Date("2026-01-01T14:00:00"),
          checkedOutAt: null,
          status: "checked-in",
        },
        // رزروهای آینده
        {
          id: "950e8400-e29b-41d4-a716-446655440004",
          hotelId: "550e8400-e29b-41d4-a716-446655440001",
          guestId: "850e8400-e29b-41d4-a716-446655440003",
          roomId: "750e8400-e29b-41d4-a716-446655440001",
          checkIn: new Date("2026-01-10"),
          checkOut: new Date("2026-01-15"),
          createdAt: new Date("2025-12-15"),
          checkedInAt: null,
          checkedOutAt: null,
          status: "reserved",
        },
        {
          id: "950e8400-e29b-41d4-a716-446655440005",
          hotelId: "550e8400-e29b-41d4-a716-446655440002",
          guestId: "850e8400-e29b-41d4-a716-446655440005",
          roomId: "750e8400-e29b-41d4-a716-446655440007",
          checkIn: new Date("2026-01-20"),
          checkOut: new Date("2026-01-25"),
          createdAt: new Date("2025-12-20"),
          checkedInAt: null,
          checkedOutAt: null,
          status: "reserved",
        },
        // رزرو کنسل شده
        {
          id: "950e8400-e29b-41d4-a716-446655440006",
          hotelId: "550e8400-e29b-41d4-a716-446655440001",
          guestId: "850e8400-e29b-41d4-a716-446655440002",
          roomId: "750e8400-e29b-41d4-a716-446655440003",
          checkIn: new Date("2026-01-05"),
          checkOut: new Date("2026-01-07"),
          createdAt: new Date("2025-12-25"),
          checkedInAt: null,
          checkedOutAt: null,
          status: "cancelled",
        },
        // رزرو برای تست همپوشانی
        {
          id: "950e8400-e29b-41d4-a716-446655440007",
          hotelId: "550e8400-e29b-41d4-a716-446655440003",
          guestId: "850e8400-e29b-41d4-a716-446655440006",
          roomId: "750e8400-e29b-41d4-a716-446655440008",
          checkIn: new Date("2026-01-15"),
          checkOut: new Date("2026-01-20"),
          createdAt: new Date("2025-11-01"),
          checkedInAt: null,
          checkedOutAt: null,
          status: "reserved",
        },
      ])
      .returning()
    console.log(`✅ ${reservationsData.length} reservations inserted`)

    // =============================
    // 6. Insert Phone OTPs
    // =============================
    console.log("🔐 Inserting phone OTPs...")
    const otpsData = await db
      .insert(phoneOtps)
      .values([
        {
          phone: "09121234567",
          code: "123456",
          expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 دقیقه از الان
          verifiedAt: null,
        },
        {
          phone: "09123456789",
          code: "654321",
          expiresAt: new Date(Date.now() + 5 * 60 * 1000),
          verifiedAt: new Date(), // تایید شده
        },
      ])
      .returning()
    console.log(`✅ ${otpsData.length} OTPs inserted`)

    console.log(`\n${"=".repeat(50)}`)
    console.log("📊 SUMMARY:")
    console.log("=".repeat(50))
    console.log(`Hotels:       ${hotelsData.length}`)
    console.log(`Staff:        ${staffData.length}`)
    console.log(`Rooms:        ${roomsData.length}`)
    console.log(`Guests:       ${guestsData.length}`)
    console.log(`Reservations: ${reservationsData.length}`)
    console.log(`OTPs:         ${otpsData.length}`)
    console.log("=".repeat(50))
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    throw error
  }

  console.timeEnd("⏱️  Seeding completed in")
  console.warn("🎉 END SEEDING DATABASE")
}

main()
  .catch(err => {
    console.error("Fatal error:", err)
    process.exit(1)
  })
  .finally(() => {
    process.exit(0)
  })
