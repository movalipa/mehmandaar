"use client"

import type { UUID } from "node:crypto"
import {
  BarChart3,
  Bed,
  Calendar,
  Download,
  PieChart,
  TrendingUp,
  Users,
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
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type StaffRole = "owner" | "manager" | "receptionist" | "staff"

interface ReportsData {
  monthlyStats: {
    totalReservations: number
    totalGuests: number
    checkedIn: number
    checkedOut: number
    cancelled: number
    occupancyRate: number
    averageStay: string
  }
  topGuests: Array<{
    guestId: UUID | null
    guestName: string | null
    guestPhone: string | null
    reservationCount: number
    lastVisit: Date
  }>
  roomPerformance: Array<{
    roomId: UUID
    roomName: string
    singleBeds: number
    doubleBeds: number
    bookingCount: number
  }>
  weeklyStats: Array<{
    date: Date
    occupancy: number
    reservations: number
  }>
  allRooms: number
}

interface ReportsClientProps {
  data: ReportsData
  userRole: StaffRole
}

export function ReportsClient({ data, userRole }: ReportsClientProps) {
  const canDownloadReports = userRole === "owner" || userRole === "manager"
  const canViewFinancial = userRole === "owner" || userRole === "manager"

  const monthlyStatsConfig = [
    {
      label: "نرخ اشغال",
      value: `${data.monthlyStats.occupancyRate}٪`,
      description: `${data.monthlyStats.checkedIn} اتاق فعال`,
      icon: Bed,
      show: true,
    },
    {
      label: "کل مهمانان",
      value: data.monthlyStats.totalGuests.toString(),
      description: `${data.monthlyStats.totalReservations} رزرو`,
      icon: Users,
      show: true,
    },
    {
      label: "میانگین اقامت",
      value: `${data.monthlyStats.averageStay} شب`,
      description: "میانگین هر رزرو",
      icon: Calendar,
      show: true,
    },
    {
      label: "تکمیل شده",
      value: data.monthlyStats.checkedOut.toString(),
      description: `${data.monthlyStats.cancelled} لغو شده`,
      icon: TrendingUp,
      show: true,
    },
  ]

  const weekDays = [
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه",
    "شنبه",
  ]

  const getDayName = (date: Date) => {
    return weekDays[date.getDay()]
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">گزارشات و تحلیل</h2>
          <p className="text-muted-foreground">
            مشاهده آمار عملکرد{" "}
            {!canViewFinancial && "(دسترسی محدود - فقط آمار عملیاتی)"}
          </p>
        </div>
        {canDownloadReports && (
          <div className="flex gap-2">
            <Button variant="outline" disabled>
              <Calendar className="h-4 w-4" />
              انتخاب بازه زمانی
            </Button>
            <Button disabled>
              <Download className="h-4 w-4" />
              دانلود گزارش
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {monthlyStatsConfig
          .filter(stat => stat.show)
          .map(stat => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
      </div>

      <Tabs dir="rtl" defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart3 className="h-4 w-4" />
            نمای کلی
          </TabsTrigger>
          <TabsTrigger value="rooms">
            <PieChart className="h-4 w-4" />
            عملکرد اتاق‌ها
          </TabsTrigger>
          <TabsTrigger value="customers">
            <Users className="h-4 w-4" />
            مشتریان برتر
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>نرخ اشغال هفتگی</CardTitle>
                <CardDescription>میانگین اشغال در 7 روز گذشته</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.weeklyStats.map(day => (
                  <div key={day.date.toISOString()} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {getDayName(day.date)} -{" "}
                        {new Date(day.date).toLocaleDateString("fa-IR", {
                          month: "numeric",
                          day: "numeric",
                        })}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {day.occupancy}٪ ({day.reservations} اتاق)
                      </span>
                    </div>
                    <Progress value={day.occupancy} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>خلاصه عملکرد</CardTitle>
                <CardDescription>آمار کلی ماه جاری</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                      <Bed className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">کل اتاق‌ها</p>
                      <p className="text-xs text-muted-foreground">ظرفیت هتل</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold">{data.allRooms}</span>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-100 text-green-600">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">رزروهای فعال</p>
                      <p className="text-xs text-muted-foreground">
                        در حال اقامت
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold">
                    {data.monthlyStats.checkedIn}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">کل رزروها</p>
                      <p className="text-xs text-muted-foreground">این ماه</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold">
                    {data.monthlyStats.totalReservations}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rooms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>عملکرد اتاق‌ها</CardTitle>
              <CardDescription>تعداد رزرو هر اتاق در ماه جاری</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.roomPerformance.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    هیچ داده‌ای برای نمایش وجود ندارد
                  </div>
                ) : (
                  data.roomPerformance.map(room => {
                    const maxBookings = Math.max(
                      ...data.roomPerformance.map(r => r.bookingCount)
                    )
                    const percentage =
                      maxBookings > 0
                        ? (room.bookingCount / maxBookings) * 100
                        : 0

                    return (
                      <Card key={room.roomId} className="border-2">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-semibold">
                                {room.roomName}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                ظرفیت: {room.singleBeds + room.doubleBeds * 2}{" "}
                                نفر
                              </p>
                            </div>
                            <Badge variant="default">
                              {room.bookingCount} رزرو
                            </Badge>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">
                                میزان استفاده
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {percentage.toFixed(0)}٪
                              </span>
                            </div>
                            <Progress value={percentage} className="h-3" />
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card dir="rtl">
            <CardHeader>
              <CardTitle>مهمانان برتر</CardTitle>
              <CardDescription>
                پربازدیدترین مهمانان بر اساس تعداد رزرو
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.topGuests.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    هیچ داده‌ای برای نمایش وجود ندارد
                  </div>
                ) : (
                  data.topGuests.slice(0, 10).map((guest, index) => (
                    <Card
                      key={guest.guestId || index}
                      className="border-2 hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg">
                                {guest.guestName || "نامشخص"}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {guest.guestPhone || "بدون شماره"} •{" "}
                                {guest.reservationCount} بازدید
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                آخرین ویزیت:{" "}
                                {new Date(guest.lastVisit).toLocaleDateString(
                                  "fa-IR"
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {canDownloadReports && (
        <Card>
          <CardHeader>
            <CardTitle>گزارشات آماده دانلود</CardTitle>
            <CardDescription>
              دانلود گزارشات جامع و تحلیلی (به زودی)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              قابلیت دانلود گزارشات به زودی اضافه خواهد شد
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
