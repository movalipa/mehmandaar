import { requireAuth } from "@/actions/auth"
import { ReportsClient } from "@/components/dashboard/reports/reports-client"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getReportsData } from "@/lib/data/reports"

export default async function ReportsPage() {
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

  // چک کردن سطح دسترسی - فقط owner، manager و receptionist
  if (staff.role !== "owner" && staff.role !== "manager") {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>عدم دسترسی</CardTitle>
            <CardDescription>
              شما اجازه دسترسی به این بخش را ندارید. فقط مالک و مدیر می‌توانند
              گزارشات را مشاهده کنند.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  const reportsData = await getReportsData(staff.hotelId)

  return <ReportsClient data={reportsData} userRole={staff.role} />
}
