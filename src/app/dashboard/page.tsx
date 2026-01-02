import {
  BedDouble,
  Calendar,
  CheckCircle2,
  Clock,
  TrendingUp,
  Users,
} from "lucide-react"
import { requireAuth } from "@/actions/auth"
import { NoHotelState } from "@/components/dashboard/no-hotel-state"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  getDashboardStats,
  getRoomStatusByGroup,
  getTodayStats,
} from "@/lib/data/dashboard"
import { getRecentReservations } from "@/lib/data/reservations"
import { formatDateToPersian } from "@/lib/utils/date"
import { getStatusBadge } from "@/lib/utils/status"

export default async function DashboardPage() {
  const staff = await requireAuth()

  if (!staff.hotelId) {
    return <NoHotelState staffName={`${staff.firstName} ${staff.lastName}`} />
  }
  const [dashboardStats, roomStatus, recentReservations, todayStats] =
    await Promise.all([
      getDashboardStats(staff.hotelId),
      getRoomStatusByGroup(staff.hotelId),
      getRecentReservations(staff.hotelId, 4),
      getTodayStats(staff.hotelId),
    ])

  const stats = [
    {
      title: "کل اتاق‌ها",
      value: dashboardStats.totalRooms.toString(),
      icon: BedDouble,
      description: "تعداد کل اتاق‌های هتل",
      trend: null,
    },
    {
      title: "رزرو امروز",
      value: todayStats.checkIns.toString(),
      icon: Calendar,
      description: "ورود امروز",
      trend: todayStats.checkOuts > 0 ? `${todayStats.checkOuts} خروج` : null,
    },
    {
      title: "اتاق‌های خالی",
      value: roomStatus.available.toString(),
      icon: CheckCircle2,
      description: "آماده پذیرش",
      trend: roomStatus.occupied > 0 ? `${roomStatus.occupied} اشغال` : null,
    },
    {
      title: "مهمانان فعال",
      value: dashboardStats.activeGuests.toString(),
      icon: Users,
      description: "در حال اقامت",
      trend: null,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          خوش آمدید، {staff.firstName}! 👋
        </h2>
        <p className="text-muted-foreground mt-2">
          وضعیت هتل شما در {formatDateToPersian(new Date())}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
              {stat.trend && (
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.trend}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Room Status */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>وضعیت اتاق‌ها</CardTitle>
            <CardDescription>نمای کلی از وضعیت اتاق‌های هتل</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">اتاق‌های خالی</span>
                  <span className="text-sm text-muted-foreground">
                    {roomStatus.available} از {dashboardStats.totalRooms}
                  </span>
                </div>
                <Progress
                  value={
                    (roomStatus.available / dashboardStats.totalRooms) * 100
                  }
                  className="h-2"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">اتاق‌های اشغال</span>
                  <span className="text-sm text-muted-foreground">
                    {roomStatus.occupied} از {dashboardStats.totalRooms}
                  </span>
                </div>
                <Progress
                  value={
                    (roomStatus.occupied / dashboardStats.totalRooms) * 100
                  }
                  className="h-2"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    اتاق‌های در حال تمیزکاری
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {roomStatus.cleaning} از {dashboardStats.totalRooms}
                  </span>
                </div>
                <Progress
                  value={
                    (roomStatus.cleaning / dashboardStats.totalRooms) * 100
                  }
                  className="h-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Activity */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>فعالیت امروز</CardTitle>
            <CardDescription>ورود و خروج امروز</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">ورودی‌های امروز</p>
                    <p className="text-xs text-muted-foreground">
                      مهمانان جدید
                    </p>
                  </div>
                </div>
                <span className="text-2xl font-bold">
                  {todayStats.checkIns}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">خروجی‌های امروز</p>
                    <p className="text-xs text-muted-foreground">
                      مهمانان خارج‌شده
                    </p>
                  </div>
                </div>
                <span className="text-2xl font-bold">
                  {todayStats.checkOuts}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">نرخ اشغال</p>
                    <p className="text-xs text-muted-foreground">درصد پری</p>
                  </div>
                </div>
                <span className="text-2xl font-bold">
                  {Math.round(
                    (roomStatus.occupied / dashboardStats.totalRooms) * 100
                  )}
                  %
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reservations */}
      <Card>
        <CardHeader>
          <CardTitle>آخرین رزرواسیون‌ها</CardTitle>
          <CardDescription>
            {recentReservations.length} رزرو اخیر
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReservations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                هنوز رزرواسیونی ثبت نشده است
              </div>
            ) : (
              recentReservations.map(reservation => {
                const reservationBadge = getStatusBadge(reservation.status)

                return (
                  <div
                    key={reservation.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {reservation.guest?.fullName || "مهمان ناشناس"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          اتاق: {reservation.room?.name || "-"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {formatDateToPersian(new Date(reservation.checkIn))}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          تا{" "}
                          {formatDateToPersian(new Date(reservation.checkOut))}
                        </p>
                      </div>
                      <Badge variant={reservationBadge.variant}>
                        {reservationBadge.label}
                      </Badge>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
