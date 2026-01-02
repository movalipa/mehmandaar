import { requireAuth } from "@/actions/auth"
import { RoomsClient } from "@/components/dashboard/rooms/rooms-client"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getRoomsByHotel } from "@/lib/data/rooms"

export default async function RoomsPage() {
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

  const rooms = await getRoomsByHotel(staff.hotelId)

  const stats = {
    totalRooms: rooms.length,
    singleBeds: rooms.reduce((sum, room) => sum + room.singleBeds, 0),
    doubleBeds: rooms.reduce((sum, room) => sum + room.doubleBeds, 0),
    totalCapacity: rooms.reduce(
      (sum, room) => sum + room.singleBeds + room.doubleBeds * 2,
      0
    ),
  }

  return <RoomsClient rooms={rooms} stats={stats} />
}
