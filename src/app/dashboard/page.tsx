// app/dashboard/page.tsx

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

export default async function DashboardPage() {
  const user = await getCurrentUser()

  // داده‌های نمونه - در پروژه واقعی از API دریافت می‌شود
  const stats = [
    {
      title: "کل اتاق‌ها",
      value: "۱۲۰",
      change: "+۵ اتاق جدید",
      icon: BedDouble,
      trend: "مثبت",
      details: "۸۵ اتاق فعال",
    },
    {
      title: "مهمانان فعال",
      value: "۹۲",
      change: "+۱۲٪ نسبت به دیروز",
      icon: Users,
      trend: "مثبت",
      details: "از ۱۲۰ ظرفیت",
    },
    {
      title: "درآمد امروز",
      value: "۴۵,۸۰۰,۰۰۰",
      change: "+۸٪ نسبت به دیروز",
      icon: DollarSign,
      trend: "مثبت",
      details: "تومان",
    },
    {
      title: "نرخ اشغال",
      value: "۷۶٪",
      change: "+۴٪ این هفته",
      icon: TrendingUp,
      trend: "مثبت",
      details: "۹۲ از ۱۲۰ اتاق",
    },
  ]

  const recentReservations = [
    {
      id: "RES-001",
      guest: "علی احمدی",
      room: "۲۰۱",
      checkIn: "۱۴۰۴/۰۹/۰۸",
      checkOut: "۱۴۰۴/۰۹/۱۲",
      status: "confirmed",
      amount: "۸,۵۰۰,۰۰۰",
    },
    {
      id: "RES-002",
      guest: "سارا محمدی",
      room: "۳۰۵",
      checkIn: "۱۴۰۴/۰۹/۰۹",
      checkOut: "۱۴۰۴/۰۹/۱۵",
      status: "pending",
      amount: "۱۲,۰۰۰,۰۰۰",
    },
    {
      id: "RES-003",
      guest: "حسین کریمی",
      room: "۱۰۸",
      checkIn: "۱۴۰۴/۰۹/۰۸",
      checkOut: "۱۴۰۴/۰۹/۱۰",
      status: "checked-in",
      amount: "۵,۲۰۰,۰۰۰",
    },
    {
      id: "RES-004",
      guest: "مریم رضایی",
      room: "۴۱۲",
      checkIn: "۱۴۰۴/۰۹/۱۰",
      checkOut: "۱۴۰۴/۰۹/۱۴",
      status: "confirmed",
      amount: "۹,۸۰۰,۰۰۰",
    },
  ]

  const roomStatus = [
    { type: "سوئیت VIP", total: 20, occupied: 18, available: 2 },
    { type: "سوئیت دو تخته", total: 40, occupied: 32, available: 8 },
    { type: "اتاق یک تخته", total: 35, occupied: 28, available: 7 },
    { type: "اتاق خانوادگی", total: 25, occupied: 14, available: 11 },
  ]

  const getStatusBadge = (status: string) => {
    const statusMap = {
      confirmed: { label: "تایید شده", variant: "default" as const },
      pending: { label: "در انتظار", variant: "secondary" as const },
      "checked-in": { label: "چک‌این شده", variant: "default" as const },
    }
    return (
      statusMap[status as keyof typeof statusMap] || {
        label: status,
        variant: "secondary" as const,
      }
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          خوش آمدید، {user?.firstName}! 👋
        </h2>
        <p className="text-muted-foreground">
          خلاصه‌ای از وضعیت هتل در تاریخ ۱۴۰۴/۰۹/۰۸
        </p>
      </div>

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
                <Badge
                  variant={stat.trend === "مثبت" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {stat.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>رزرواسیون‌های اخیر</CardTitle>
            <CardDescription>
              آخرین رزرواسیون‌های ثبت شده در سیستم
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReservations.map(reservation => (
                <div
                  key={reservation.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{reservation.guest}</p>
                      <p className="text-xs text-muted-foreground">
                        اتاق {reservation.room} • {reservation.checkIn} تا{" "}
                        {reservation.checkOut}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-left">
                      <p className="text-sm font-medium">
                        {reservation.amount} تومان
                      </p>
                      <Badge
                        variant={getStatusBadge(reservation.status).variant}
                        className="text-xs mt-1"
                      >
                        {getStatusBadge(reservation.status).label}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>وضعیت اتاق‌ها</CardTitle>
            <CardDescription>تفکیک اتاق‌ها بر اساس نوع و وضعیت</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {roomStatus.map(room => (
                <div key={room.type} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{room.type}</span>
                    <span className="text-muted-foreground">
                      {room.occupied}/{room.total}
                    </span>
                  </div>
                  <Progress
                    value={(room.occupied / room.total) * 100}
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>اشغال شده: {room.occupied}</span>
                    <span>آزاد: {room.available}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">امروز</TabsTrigger>
          <TabsTrigger value="week">این هفته</TabsTrigger>
          <TabsTrigger value="month">این ماه</TabsTrigger>
        </TabsList>
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
                <div className="text-2xl font-bold">۱۸ مهمان</div>
                <p className="text-xs text-muted-foreground">
                  از ۲۳ رزرو امروز
                </p>
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
                <div className="text-2xl font-bold">۱۵ مهمان</div>
                <p className="text-xs text-muted-foreground">۱۲ تکمیل شده</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  درخواست‌های ویژه
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">۷ درخواست</div>
                <p className="text-xs text-muted-foreground">نیاز به بررسی</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
