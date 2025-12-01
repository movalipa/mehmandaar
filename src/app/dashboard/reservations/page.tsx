// app/dashboard/reservations/page.tsx

import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  Plus,
  Search,
  XCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ReservationsPage() {
  const reservations = [
    {
      id: "RES-001",
      guest: "علی احمدی",
      phone: "09121234567",
      room: "۲۰۱",
      roomType: "سوئیت VIP",
      checkIn: "۱۴۰۴/۰۹/۰۸",
      checkOut: "۱۴۰۴/۰۹/۱۲",
      status: "confirmed",
      amount: "۸,۵۰۰,۰۰۰",
      nights: 4,
      guests: 2,
    },
    {
      id: "RES-002",
      guest: "سارا محمدی",
      phone: "09129876543",
      room: "۳۰۵",
      roomType: "سوئیت دو تخته",
      checkIn: "۱۴۰۴/۰۹/۰۹",
      checkOut: "۱۴۰۴/۰۹/۱۵",
      status: "pending",
      amount: "۱۲,۰۰۰,۰۰۰",
      nights: 6,
      guests: 2,
    },
    {
      id: "RES-003",
      guest: "حسین کریمی",
      phone: "09131234567",
      room: "۱۰۸",
      roomType: "اتاق یک تخته",
      checkIn: "۱۴۰۴/۰۹/۰۸",
      checkOut: "۱۴۰۴/۰۹/۱۰",
      status: "checked-in",
      amount: "۵,۲۰۰,۰۰۰",
      nights: 2,
      guests: 1,
    },
    {
      id: "RES-004",
      guest: "مریم رضایی",
      phone: "09141234567",
      room: "۴۱۲",
      roomType: "اتاق خانوادگی",
      checkIn: "۱۴۰۴/۰۹/۱۰",
      checkOut: "۱۴۰۴/۰۹/۱۴",
      status: "confirmed",
      amount: "۹,۸۰۰,۰۰۰",
      nights: 4,
      guests: 4,
    },
    {
      id: "RES-005",
      guest: "محمد جعفری",
      phone: "09151234567",
      room: "۲۰۳",
      roomType: "سوئیت VIP",
      checkIn: "۱۴۰۴/۰۹/۰۷",
      checkOut: "۱۴۰۴/۰۹/۰۹",
      status: "checked-out",
      amount: "۶,۰۰۰,۰۰۰",
      nights: 2,
      guests: 2,
    },
    {
      id: "RES-006",
      guest: "فاطمه حسینی",
      phone: "09161234567",
      room: "۱۱۵",
      roomType: "سوئیت دو تخته",
      checkIn: "۱۴۰۴/۰۹/۱۱",
      checkOut: "۱۴۰۴/۰۹/۱۳",
      status: "cancelled",
      amount: "۴,۲۰۰,۰۰۰",
      nights: 2,
      guests: 2,
    },
  ]

  const getStatusConfig = (status: string) => {
    const configs = {
      confirmed: {
        label: "تایید شده",
        variant: "default" as const,
        icon: CheckCircle2,
        color: "text-green-600",
      },
      pending: {
        label: "در انتظار",
        variant: "secondary" as const,
        icon: Clock,
        color: "text-yellow-600",
      },
      "checked-in": {
        label: "چک‌این شده",
        variant: "default" as const,
        icon: CheckCircle2,
        color: "text-blue-600",
      },
      "checked-out": {
        label: "چک‌اوت شده",
        variant: "outline" as const,
        icon: CheckCircle2,
        color: "text-gray-600",
      },
      cancelled: {
        label: "لغو شده",
        variant: "destructive" as const,
        icon: XCircle,
        color: "text-red-600",
      },
    }
    return configs[status as keyof typeof configs]
  }

  const stats = [
    { label: "کل رزروها", value: "۱۲۶", change: "+۸ امروز", icon: Calendar },
    {
      label: "در انتظار تایید",
      value: "۱۵",
      change: "نیاز به بررسی",
      icon: AlertCircle,
    },
    {
      label: "چک‌این امروز",
      value: "۱۸",
      change: "از ۲۳ رزرو",
      icon: CheckCircle2,
    },
    { label: "چک‌اوت امروز", value: "۱۵", change: "۱۲ انجام شده", icon: Clock },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            مدیریت رزرواسیون‌ها
          </h2>
          <p className="text-muted-foreground">
            مشاهده و مدیریت تمام رزرواسیون‌های هتل
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          رزرو جدید
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map(stat => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>لیست رزرواسیون‌ها</CardTitle>
              <CardDescription>
                مدیریت و پیگیری رزرواسیون‌های فعال
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="جستجو..." className="pr-8 w-[250px]" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">همه</TabsTrigger>
              <TabsTrigger value="confirmed">تایید شده</TabsTrigger>
              <TabsTrigger value="pending">در انتظار</TabsTrigger>
              <TabsTrigger value="checked-in">چک‌این شده</TabsTrigger>
              <TabsTrigger value="checked-out">چک‌اوت شده</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-7 gap-4 p-4 font-medium text-sm border-b bg-muted/50">
                  <div>شماره رزرو</div>
                  <div>نام مهمان</div>
                  <div>اتاق</div>
                  <div>تاریخ ورود</div>
                  <div>تاریخ خروج</div>
                  <div>مبلغ</div>
                  <div>وضعیت</div>
                </div>
                {reservations.map(reservation => {
                  const statusConfig = getStatusConfig(reservation.status)
                  const StatusIcon = statusConfig.icon

                  return (
                    <div
                      key={reservation.id}
                      className="grid grid-cols-7 gap-4 p-4 items-center hover:bg-muted/50 transition-colors border-b last:border-0"
                    >
                      <div>
                        <p className="font-medium">{reservation.id}</p>
                        <p className="text-xs text-muted-foreground">
                          {reservation.phone}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">{reservation.guest}</p>
                        <p className="text-xs text-muted-foreground">
                          {reservation.guests} مهمان • {reservation.nights} شب
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">اتاق {reservation.room}</p>
                        <p className="text-xs text-muted-foreground">
                          {reservation.roomType}
                        </p>
                      </div>
                      <div className="text-sm">{reservation.checkIn}</div>
                      <div className="text-sm">{reservation.checkOut}</div>
                      <div>
                        <p className="font-medium">{reservation.amount}</p>
                        <p className="text-xs text-muted-foreground">تومان</p>
                      </div>
                      <div>
                        <Badge
                          variant={statusConfig.variant}
                          className="flex items-center gap-1 w-fit"
                        >
                          <StatusIcon className="h-3 w-3" />
                          {statusConfig.label}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
