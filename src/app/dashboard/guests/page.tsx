// app/dashboard/guests/page.tsx

import { GuestsClient } from "@/app/dashboard/guests/guests-client"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { requireAuth } from "@/db/actions/auth"
import { getGuestsByHotel } from "@/db/data/guests"

export default async function GuestsPage() {
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

  const guests = await getGuestsByHotel(staff.hotelId)

  const stats = {
    totalGuests: guests.length,
    withPhone: guests.filter(g => g.phone).length,
    withDescription: guests.filter(g => g.description).length,
    recentGuests: guests.filter(
      g =>
        new Date(g.createdAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000
    ).length,
  }

  return <GuestsClient guests={guests} stats={stats} />
}
