// app/dashboard/rooms/page.tsx

import {
  AirVent,
  BedDouble,
  Coffee,
  Plus,
  Settings,
  Tv,
  Users,
  Wifi,
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

export default function RoomsPage() {
  const rooms = [
    {
      number: "۲۰۱",
      type: "سوئیت VIP",
      floor: 2,
      status: "occupied",
      guest: "علی احمدی",
      checkOut: "۱۴۰۴/۰۹/۱۲",
      price: "۲,۵۰۰,۰۰۰",
      capacity: 2,
      amenities: ["wifi", "tv", "minibar", "ac"],
    },
    {
      number: "۲۰۲",
      type: "سوئیت VIP",
      floor: 2,
      status: "available",
      price: "۲,۵۰۰,۰۰۰",
      capacity: 2,
      amenities: ["wifi", "tv", "minibar", "ac"],
    },
    {
      number: "۲۰۳",
      type: "سوئیت VIP",
      floor: 2,
      status: "cleaning",
      price: "۲,۵۰۰,۰۰۰",
      capacity: 2,
      amenities: ["wifi", "tv", "minibar", "ac"],
    },
    {
      number: "۳۰۵",
      type: "سوئیت دو تخته",
      floor: 3,
      status: "occupied",
      guest: "سارا محمدی",
      checkOut: "۱۴۰۴/۰۹/۱۵",
      price: "۱,۸۰۰,۰۰۰",
      capacity: 2,
      amenities: ["wifi", "tv", "ac"],
    },
    {
      number: "۳۰۶",
      type: "سوئیت دو تخته",
      floor: 3,
      status: "available",
      price: "۱,۸۰۰,۰۰۰",
      capacity: 2,
      amenities: ["wifi", "tv", "ac"],
    },
    {
      number: "۱۰۸",
      type: "اتاق یک تخته",
      floor: 1,
      status: "maintenance",
      price: "۱,۲۰۰,۰۰۰",
      capacity: 1,
      amenities: ["wifi", "tv"],
    },
    {
      number: "۴۱۲",
      type: "اتاق خانوادگی",
      floor: 4,
      status: "available",
      price: "۲,۰۰۰,۰۰۰",
      capacity: 4,
      amenities: ["wifi", "tv", "ac"],
    },
    {
      number: "۴۱۳",
      type: "اتاق خانوادگی",
      floor: 4,
      status: "occupied",
      guest: "مریم رضایی",
      checkOut: "۱۴۰۴/۰۹/۱۴",
      price: "۲,۰۰۰,۰۰۰",
      capacity: 4,
      amenities: ["wifi", "tv", "ac"],
    },
  ]

  const getStatusConfig = (status: string) => {
    const configs = {
      available: {
        label: "آزاد",
        variant: "default" as const,
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/20",
      },
      occupied: {
        label: "اشغال",
        variant: "destructive" as const,
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/20",
      },
      cleaning: {
        label: "در حال نظافت",
        variant: "secondary" as const,
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/20",
      },
      maintenance: {
        label: "تعمیرات",
        variant: "outline" as const,
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-500/20",
      },
    }
    return configs[status as keyof typeof configs]
  }

  const roomTypes = [
    {
      type: "سوئیت VIP",
      total: 20,
      occupied: 18,
      available: 2,
      price: "۲,۵۰۰,۰۰۰",
    },
    {
      type: "سوئیت دو تخته",
      total: 40,
      occupied: 32,
      available: 8,
      price: "۱,۸۰۰,۰۰۰",
    },
    {
      type: "اتاق یک تخته",
      total: 35,
      occupied: 28,
      available: 7,
      price: "۱,۲۰۰,۰۰۰",
    },
    {
      type: "اتاق خانوادگی",
      total: 25,
      occupied: 14,
      available: 11,
      price: "۲,۰۰۰,۰۰۰",
    },
  ]

  const stats = [
    { label: "کل اتاق‌ها", value: "۱۲۰", icon: BedDouble },
    { label: "اتاق‌های آزاد", value: "۲۸", icon: BedDouble },
    { label: "اتاق‌های اشغال", value: "۹۲", icon: Users },
    { label: "نرخ اشغال", value: "۷۶٪", icon: BedDouble },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">مدیریت اتاق‌ها</h2>
          <p className="text-muted-foreground">
            مشاهده و مدیریت تمام اتاق‌های هتل
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          افزودن اتاق
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
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>آمار اتاق‌ها بر اساس نوع</CardTitle>
            <CardDescription>وضعیت اشغال هر نوع اتاق</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {roomTypes.map(room => (
              <div key={room.type} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-medium">{room.type}</span>
                    <span className="text-muted-foreground mr-2">
                      ({room.price} تومان/شب)
                    </span>
                  </div>
                  <span className="text-muted-foreground">
                    {room.occupied}/{room.total}
                  </span>
                </div>
                <Progress
                  value={(room.occupied / room.total) * 100}
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>اشغال: {room.occupied}</span>
                  <span>آزاد: {room.available}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>امکانات اتاق‌ها</CardTitle>
            <CardDescription>لیست امکانات موجود در اتاق‌ها</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Wifi, label: "اینترنت وای‌فای", count: "۱۲۰ اتاق" },
                { icon: Tv, label: "تلویزیون", count: "۱۲۰ اتاق" },
                { icon: Coffee, label: "مینی‌بار", count: "۶۰ اتاق" },
                { icon: AirVent, label: "کولر گازی", count: "۱۰۰ اتاق" },
              ].map(amenity => (
                <div
                  key={amenity.label}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <amenity.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{amenity.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {amenity.count}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>لیست اتاق‌ها</CardTitle>
          <CardDescription>وضعیت تمام اتاق‌های هتل</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {rooms.map(room => {
              const statusConfig = getStatusConfig(room.status)

              return (
                <Card
                  key={room.number}
                  className={`${statusConfig.bgColor} ${statusConfig.borderColor} border-2`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        اتاق {room.number}
                      </CardTitle>
                      <Badge variant={statusConfig.variant}>
                        {statusConfig.label}
                      </Badge>
                    </div>
                    <CardDescription>{room.type}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">طبقه:</span>
                      <span className="font-medium">{room.floor}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">ظرفیت:</span>
                      <span className="font-medium">{room.capacity} نفر</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">قیمت:</span>
                      <span className="font-medium">{room.price} تومان</span>
                    </div>
                    {room.guest && (
                      <>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">مهمان:</span>
                          <span className="font-medium">{room.guest}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">خروج:</span>
                          <span className="font-medium">{room.checkOut}</span>
                        </div>
                      </>
                    )}
                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Settings className="h-3 w-3 ml-2" />
                        مدیریت
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
