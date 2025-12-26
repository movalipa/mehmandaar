"use server"

import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/actions/auth"
import { db } from "@/db"
import { organizations, organizationUserRoles, roles, users } from "@/db/schema"

export async function createOrganizationAction(formData: FormData) {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("کاربر احراز هویت نشده است")
  }

  if (user.organizationId) {
    throw new Error("کاربر در حال حاضر عضو یک سازمان است")
  }

  const orgName = formData.get("name") as string

  if (!orgName || orgName.length < 3) {
    throw new Error("نام سازمان باید حداقل ۳ کاراکتر باشد")
  }

  try {
    await db.transaction(async tx => {
      // 1. ایجاد سازمان
      const [newOrg] = await tx
        .insert(organizations)
        .values({
          name: orgName,
        })
        .returning()

      // 2. به‌روزرسانی کاربر برای اتصال به سازمان
      await tx
        .update(users)
        .set({ organizationId: newOrg.id })
        .where(eq(users.id, user.id))

      // 3. پیدا کردن یا ایجاد نقش 'owner' (چون جدول نقش‌ها گلوبال است)
      // توجه: در سیستم واقعی بهتر است نقش‌ها از قبل سید (Seed) شده باشند
      tx.query
      let ownerRole = await tx.query.roles.findFirst({
        where: eq(roles.name, "owner"),
      })

      if (!ownerRole) {
        const [newRole] = await tx
          .insert(roles)
          .values({
            name: "owner",
            permissions: { all: "write" }, // دسترسی کامل
          })
          .returning()
        ownerRole = newRole
      }

      // 4. اختصاص نقش به کاربر در جدول واسط
      await tx.insert(organizationUserRoles).values({
        organizationId: newOrg.id,
        userId: user.id,
        roleId: ownerRole.id,
      })
    })
  } catch (error) {
    console.error("Error creating organization:", error)
    throw new Error("خطا در ایجاد سازمان. لطفا مجددا تلاش کنید.")
  }

  revalidatePath("/")
  redirect("/")
}
