import { eq } from "drizzle-orm"
import { HotelSettingsClient } from "@/app/dashboard/hotel-settings/hotel-settings-client"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { db } from "@/db"
import { requireAuth } from "@/db/actions/auth"
import { hotels } from "@/db/schema"

export default async function HotelSettingsPage() {
  const staff = await requireAuth()

  if (!staff.hotelId) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>خطا</CardTitle>
            <CardDescription>
              هیچ هتلی به حساب کاربری شما اختصاص نداده شده است.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (staff.role !== "owner") {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>عدم دسترسی</CardTitle>
            <CardDescription>
              فقط مالک هتل می‌تواند به تنظیمات دسترسی داشته باشد.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  const [hotel] = await db
    .select()
    .from(hotels)
    .where(eq(hotels.id, staff.hotelId))
    .limit(1)

  if (!hotel) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>خطا</CardTitle>
            <CardDescription>هتل مورد نظر یافت نشد.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return <HotelSettingsClient hotel={hotel} />
}
