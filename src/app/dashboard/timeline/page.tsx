// app/dashboard/timeline/page.tsx

import { requireAuth } from "@/actions/auth"
import { getRoomsForReservation } from "@/actions/reservations"
import { TimelineClient } from "@/components/dashboard/timeline/timeline-client"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function TimelinePage() {
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

  const rooms = await getRoomsForReservation()

  return <TimelineClient rooms={rooms} />
}
