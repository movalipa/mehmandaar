import { StaffClient } from "@/app/dashboard/staff/staff-client"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { requireAuth } from "@/db/actions/auth"
import { getAllStaff } from "@/db/data/staff"

export default async function StaffPage() {
  const currentStaff = await requireAuth()

  if (!currentStaff.hotelId) {
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

  if (currentStaff.role !== "owner" && currentStaff.role !== "manager") {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>عدم دسترسی</CardTitle>
            <CardDescription>
              شما اجازه دسترسی به این بخش را ندارید. فقط مالک و مدیر می‌توانند
              کارکنان را مدیریت کنند.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  const staffList = await getAllStaff(currentStaff.hotelId)

  const stats = {
    total: staffList.length,
    owner: staffList.filter(s => s.role === "owner").length,
    manager: staffList.filter(s => s.role === "manager").length,
    receptionist: staffList.filter(s => s.role === "receptionist").length,
    staff: staffList.filter(s => s.role === "staff").length,
  }

  return (
    <StaffClient
      staffList={staffList}
      stats={stats}
      currentUserRole={currentStaff.role}
    />
  )
}
