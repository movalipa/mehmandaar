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

  if (!user?.organizationId) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Card className="p-6">
          <p className="text-destructive">خطا: کاربر به سازمانی متصل نیست</p>
        </Card>
      </div>
    )
  }

  // دریافت تمام داده‌های مورد نیاز به صورت موازی
  const [dashboardStats, roomStatus, recentReservations, todayStats] =
    await Promise.all([
      getDashboardStats(user.organizationId),
      getRoomStatusByGroup(user.organizationId),
      getRecentReservations(user.organizationId, 4),
      getTodayStats(user.organizationId),
    ])

  const stats = [
    {
      title: "کل اتاق‌ها",
      value: dashboardStats.totalRooms.toString(),
      change: `${dashboardStats.hotelsCount} هتل`,
      icon: BedDouble,
      trend: "neutral" as const,
      details: `${dashboardStats.activeGuests} اتاق اشغال شده`,
    },
    {
      title: "مهمانان فعال",
      value: dashboardStats.activeGuests.toString(),
      change: `از ${dashboardStats.totalRooms} ظرفیت`,
      icon: Users,
      trend: "positive" as const,
      details: "رزروهای چک‌این شده",
    },
    {
      title: "درآمد امروز",
      value: "۰",
      change: "نیاز به پیاده‌سازی مالی",
      icon: DollarSign,
      trend: "neutral" as const,
      details: "تومان",
    },
    {
      title: "نرخ اشغال",
      value: `${dashboardStats.occupancyRate}٪`,
      change: `${dashboardStats.activeGuests} از ${dashboardStats.totalRooms}`,
      icon: TrendingUp,
      trend:
        dashboardStats.occupancyRate > 70
          ? ("positive" as const)
          : ("neutral" as const),
      details: "اتاق‌های اشغال شده",
    },
  ]

  return (
    <div className="space-y-6">
      {/* هدر صفحه */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          خوش آمدید، {user?.firstName}! 👋
        </h2>
        <p className="text-muted-foreground">خلاصه‌ای از وضعیت هتل‌های شما</p>
      </div>

      {/* کارت‌های آمار اصلی */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.details}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* بخش رزروها و وضعیت اتاق‌ها */}
      <div className="grid gap-4 md:grid-cols-7">
        {/* رزروهای اخیر */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>رزرواسیون‌های اخیر</CardTitle>
            <CardDescription>
              آخرین رزرواسیون‌های ثبت شده در سیستم
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReservations.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  هیچ رزرواسیونی یافت نشد
                </p>
              ) : (
                recentReservations.map(reservation => {
                  const statusConfig = getStatusBadge(reservation.status)
                  return (
                    <div
                      key={reservation.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {reservation.guestName || "مهمان نامشخص"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            اتاق {reservation.roomName || "نامشخص"} •{" "}
                            {formatDateToPersian(reservation.checkIn)} تا{" "}
                            {formatDateToPersian(reservation.checkOut)}
                          </p>
                        </div>
                      </div>
                      <Badge variant={statusConfig.variant} className="text-xs">
                        {statusConfig.label}
                      </Badge>
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* وضعیت اتاق‌ها */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>وضعیت اتاق‌ها</CardTitle>
            <CardDescription>تفکیک اتاق‌ها بر اساس گروه</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {roomStatus.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  هیچ اتاقی یافت نشد
                </p>
              ) : (
                roomStatus.map(room => (
                  <div key={room.groupId || "no-group"} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{room.type}</span>
                      <span className="text-muted-foreground">
                        {room.occupied}/{room.total}
                      </span>
                    </div>
                    <Progress
                      value={
                        room.total > 0 ? (room.occupied / room.total) * 100 : 0
                      }
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>اشغال شده: {room.occupied}</span>
                      <span>آزاد: {room.available}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* تب‌های آمار زمانی */}
      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">امروز</TabsTrigger>
          <TabsTrigger value="week">این هفته</TabsTrigger>
          <TabsTrigger value="month">این ماه</TabsTrigger>
        </TabsList>

        {/* آمار امروز */}
        <TabsContent value="today" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  چک‌این امروز
                </CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {todayStats.completedCheckIns} مهمان
                </div>
                <p className="text-xs text-muted-foreground">
                  از {todayStats.scheduledCheckIns} رزرو امروز
                </p>
                <Progress
                  value={
                    todayStats.scheduledCheckIns > 0
                      ? (todayStats.completedCheckIns /
                          todayStats.scheduledCheckIns) *
                        100
                      : 0
                  }
                  className="h-1 mt-2"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  چک‌اوت امروز
                </CardTitle>
                <Clock className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {todayStats.scheduledCheckOuts} مهمان
                </div>
                <p className="text-xs text-muted-foreground">
                  {todayStats.completedCheckOuts} تکمیل شده
                </p>
                <Progress
                  value={
                    todayStats.scheduledCheckOuts > 0
                      ? (todayStats.completedCheckOuts /
                          todayStats.scheduledCheckOuts) *
                        100
                      : 0
                  }
                  className="h-1 mt-2"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  رزروهای فعال
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardStats.activeGuests}
                </div>
                <p className="text-xs text-muted-foreground">
                  در حال حاضر چک‌این شده
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* آمار هفتگی */}
        <TabsContent value="week" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground py-8">
                آمار هفتگی در حال توسعه است
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* آمار ماهانه */}
        <TabsContent value="month" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground py-8">
                آمار ماهانه در حال توسعه است
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
