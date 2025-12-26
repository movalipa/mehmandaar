import {
  AlertCircle,
  BedDouble,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react"
import { getCurrentUser } from "@/actions/auth"
// ایمپورت کامپوننت جدید
import { NoOrganizationState } from "@/components/dashboard/no-organization"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  getDashboardStats,
  getRoomStatusByGroup,
  getTodayStats,
} from "@/lib/data/dashboard"
import { getRecentReservations } from "@/lib/data/reservations"
import { formatDateToPersian } from "@/lib/utils/date"
import { getStatusBadge } from "@/lib/utils/status"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  // اگر کاربر لاگین نکرده باشد، معمولا میدلور (Middleware) ریدایرکت می‌کند، اما محض احتیاط:
  if (!user) return null

  // ============================================================
  // تغییر اصلی اینجاست: نمایش صفحه شروع به جای پیام خطا
  // ============================================================
  if (!user.organizationId) {
    return <NoOrganizationState userName={user.firstName} />
  }

  // ادامه کدهای قبلی برای زمانی که کاربر سازمان دارد...
  const [dashboardStats, roomStatus, recentReservations, todayStats] =
    await Promise.all([
      getDashboardStats(user.organizationId),
      getRoomStatusByGroup(user.organizationId),
      getRecentReservations(user.organizationId, 4),
      getTodayStats(user.organizationId),
    ])

  const stats = [
    // ... (بقیه کدهای قبلی شما بدون تغییر)
    {
      title: "کل اتاق‌ها",
      value: dashboardStats.totalRooms.toString(),
      // ...
    },
    // ...
  ]

  return (
    <div className="space-y-6">
      {/* ... (کدهای JSX قبلی شما برای نمایش داشبورد) */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          خوش آمدید، {user?.firstName}! 👋
        </h2>
        {/* ... */}
      </div>
      {/* ... */}
    </div>
  )
}
