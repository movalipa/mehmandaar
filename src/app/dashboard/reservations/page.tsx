import { requireAuth } from "@/actions/auth"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getAllReservations } from "@/lib/data/reservations"
import { ReservationsClient } from "./reservations-client"

export default async function ReservationsPage() {
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

  const reservations = await getAllReservations(staff.hotelId)

  // محاسبه آمار
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const stats = {
    total: reservations.length,
    reserved: reservations.filter(r => r.status === "reserved").length,
    checkedIn: reservations.filter(r => r.status === "checked-in").length,
    checkedOut: reservations.filter(r => r.status === "checked-out").length,
    cancelled: reservations.filter(r => r.status === "cancelled").length,
    checkInToday: reservations.filter(r => {
      const checkIn = new Date(r.checkIn)
      checkIn.setHours(0, 0, 0, 0)
      return checkIn.getTime() === today.getTime() && r.status !== "cancelled"
    }).length,
    checkOutToday: reservations.filter(r => {
      const checkOut = new Date(r.checkOut)
      checkOut.setHours(0, 0, 0, 0)
      return checkOut.getTime() === today.getTime() && r.status !== "cancelled"
    }).length,
  }

  return (
    <ReservationsClient
      reservations={reservations}
      stats={stats}
      hotelId={staff.hotelId}
    />
  )
}
