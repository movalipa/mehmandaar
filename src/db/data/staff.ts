import type { UUID } from "node:crypto"
import { and, eq } from "drizzle-orm"
import { db } from "@/db"
import { staff } from "@/db/schema"

export async function getAllStaff(hotelId: UUID) {
  return await db
    .select({
      id: staff.id,
      firstName: staff.firstName,
      lastName: staff.lastName,
      phone: staff.phone,
      role: staff.role,
      createdAt: staff.createdAt,
    })
    .from(staff)
    .where(eq(staff.hotelId, hotelId))
    .orderBy(staff.createdAt)
}

export async function getStaffById(staffId: UUID, hotelId: UUID) {
  const result = await db
    .select({
      id: staff.id,
      firstName: staff.firstName,
      lastName: staff.lastName,
      phone: staff.phone,
      role: staff.role,
      createdAt: staff.createdAt,
    })
    .from(staff)
    .where(and(eq(staff.id, staffId), eq(staff.hotelId, hotelId)))
    .limit(1)

  return result[0] || null
}
