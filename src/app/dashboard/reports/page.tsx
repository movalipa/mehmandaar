// app/dashboard/reports/page.tsx

import {
  BarChart3,
  Bed,
  Calendar,
  DollarSign,
  Download,
  FileText,
  LineChart,
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

export default function ReportsPage() {
  const monthlyStats = [
    {
      label: "نرخ اشغال میانگین",
      value: "۷۸٪",
      change: "+۵٪ نسبت به ماه قبل",
      icon: Bed,
    },
    {
      label: "تعداد کل مهمانان",
      value: "۳۴۵",
      change: "+۲۸ نسبت به ماه قبل",
      icon: Users,
    },
    {
      label: "درآمد کل",
      value: "۳۲۵,۰۰۰,۰۰۰",
      change: "+۱۲.۵٪ نسبت به ماه قبل",
      icon: DollarSign,
    },
    {
      label: "میانگین اقامت",
      value: "۳.۲ شب",
      change: "+۰.۳ نسبت به ماه قبل",
      icon: Calendar,
    },
  ]

  const roomTypePerformance = [
    { type: "VIP", occupancy: 85, revenue: "۱۲۰,۰۰۰,۰۰۰", bookings: 45 },
    { type: "دو تخته", occupancy: 78, revenue: "۱۵۰,۰۰۰,۰۰۰", bookings: 125 },
    { type: "یک تخته", occupancy: 72, revenue: "۵۵,۰۰۰,۰۰۰", bookings: 82 },
  ]

  const revenueBySource = [
    { source: "رزرو مستقیم", amount: "۱۸۰,۰۰۰,۰۰۰", percentage: 55 },
    { source: "آژانس‌های مسافرتی", amount: "۹۰,۰۰۰,۰۰۰", percentage: 28 },
    { source: "سایت‌های رزرو آنلاین", amount: "۵۵,۰۰۰,۰۰۰", percentage: 17 },
  ]

  const topCustomers = [
    {
      name: "علی احمدی",
      visits: 8,
      spent: "۶۵,۰۰۰,۰۰۰",
      lastVisit: "۱۴۰۴/۰۹/۰۸",
    },
    {
      name: "حسین کریمی",
      visits: 5,
      spent: "۴۲,۵۰۰,۰۰۰",
      lastVisit: "۱۴۰۴/۰۹/۰۹",
    },
    {
      name: "فاطمه حسینی",
      visits: 4,
      spent: "۳۲,۰۰۰,۰۰۰",
      lastVisit: "۱۴۰۴/۰۸/۲۵",
    },
    {
      name: "سارا محمدی",
      visits: 3,
      spent: "۲۸,۰۰۰,۰۰۰",
      lastVisit: "۱۴۰۴/۰۹/۱۰",
    },
  ]

  const weeklyOccupancy = [
    { day: "شنبه", occupancy: 72 },
    { day: "یکشنبه", occupancy: 68 },
    { day: "دوشنبه", occupancy: 65 },
    { day: "سه‌شنبه", occupancy: 70 },
    { day: "چهارشنبه", occupancy: 85 },
    { day: "پنجشنبه", occupancy: 92 },
    { day: "جمعه", occupancy: 88 },
  ]

  const availableReports = [
    {
      title: "گزارش عملکرد ماهانه",
      description: "تحلیل جامع عملکرد هتل در ماه جاری",
      date: "۱۴۰۴/۰۹/۰۱ تا ۱۴۰۴/۰۹/۳۰",
      size: "۲.۳ مگابایت",
      type: "PDF",
    },
    {
      title: "گزارش مالی فصلی",
      description: "خلاصه درآمد و هزینه‌های سه ماهه",
      date: "۱۴۰۴/۰۷/۰۱ تا ۱۴۰۴/۰۹/۳۰",
      size: "۱.۸ مگابایت",
      type: "Excel",
    },
    {
      title: "تحلیل رضایت مشتری",
      description: "نظرسنجی و امتیازات مهمانان",
      date: "۱۴۰۴/۰۹/۰۱ تا ۱۴۰۴/۰۹/۳۰",
      size: "۱.۲ مگابایت",
      type: "PDF",
    },
    {
      title: "گزارش اشغال اتاق‌ها",
      description: "آمار تفصیلی نرخ اشغال به تفکیک نوع اتاق",
      date: "۱۴۰۴/۰۹/۰۱ تا ۱۴۰۴/۰۹/۳۰",
      size: "۹۵۰ کیلوبایت",
      type: "PDF",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">گزارشات و تحلیل</h2>
          <p className="text-muted-foreground">
            مشاهده آمار عملکرد و دانلود گزارشات
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 ml-2" />
            انتخاب بازه زمانی
          </Button>
          <Button>
            <Download className="h-4 w-4 ml-2" />
            دانلود همه گزارشات
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {monthlyStats.map(stat => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart3 className="h-4 w-4 ml-2" />
            نمای کلی
          </TabsTrigger>
          <TabsTrigger value="rooms">
            <PieChart className="h-4 w-4 ml-2" />
            عملکرد اتاق‌ها
          </TabsTrigger>
          <TabsTrigger value="revenue">
            <LineChart className="h-4 w-4 ml-2" />
            تحلیل درآمد
          </TabsTrigger>
          <TabsTrigger value="customers">
            <Users className="h-4 w-4 ml-2" />
            مشتریان برتر
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>نرخ اشغال هفتگی</CardTitle>
                <CardDescription>میانگین اشغال در هفته جاری</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {weeklyOccupancy.map(day => (
                  <div key={day.day} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{day.day}</span>
                      <span className="text-sm text-muted-foreground">
                        {day.occupancy}٪
                      </span>
                    </div>
                    <Progress value={day.occupancy} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>منابع درآمد</CardTitle>
                <CardDescription>تفکیک درآمد بر اساس منبع رزرو</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {revenueBySource.map(source => (
                  <div key={source.source} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {source.source}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {source.amount} تومان
                      </span>
                    </div>
                    <Progress value={source.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rooms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>عملکرد انواع اتاق</CardTitle>
              <CardDescription>مقایسه نرخ اشغال و درآمد</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {roomTypePerformance.map(room => (
                  <Card key={room.type} className="border-2">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">
                          اتاق {room.type}
                        </h3>
                        <Badge variant="default">{room.bookings} رزرو</Badge>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">
                              نرخ اشغال
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {room.occupancy}٪
                            </span>
                          </div>
                          <Progress value={room.occupancy} className="h-3" />
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-sm font-medium">درآمد ماه</span>
                          <span className="text-lg font-bold text-primary">
                            {room.revenue} تومان
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>تحلیل درآمد</CardTitle>
              <CardDescription>بررسی جزئیات درآمد ماهانه</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-sm text-muted-foreground mb-2">
                      درآمد رزرو اتاق
                    </div>
                    <div className="text-3xl font-bold">۲۸۵,۰۰۰,۰۰۰</div>
                    <div className="text-xs text-green-600 mt-1">
                      ۸۸٪ از کل درآمد
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-sm text-muted-foreground mb-2">
                      درآمد رستوران
                    </div>
                    <div className="text-3xl font-bold">۲۵,۰۰۰,۰۰۰</div>
                    <div className="text-xs text-green-600 mt-1">
                      ۸٪ از کل درآمد
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-sm text-muted-foreground mb-2">
                      خدمات اضافی
                    </div>
                    <div className="text-3xl font-bold">۱۵,۰۰۰,۰۰۰</div>
                    <div className="text-xs text-green-600 mt-1">
                      ۴٪ از کل درآمد
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>مشتریان برتر ماه</CardTitle>
              <CardDescription>
                پرهزینه‌ترین مهمانان بر اساس مجموع خرید
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCustomers.map((customer, index) => (
                  <Card
                    key={customer.name}
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
                              {customer.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {customer.visits} بازدید • آخرین ویزیت:{" "}
                              {customer.lastVisit}
                            </p>
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="text-sm text-muted-foreground mb-1">
                            مجموع هزینه
                          </div>
                          <div className="text-2xl font-bold text-primary">
                            {customer.spent}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            تومان
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>گزارشات آماده دانلود</CardTitle>
          <CardDescription>دانلود گزارشات جامع و تحلیلی</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {availableReports.map(report => (
            <Card
              key={report.title}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{report.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {report.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>{report.date}</span>
                        <span>•</span>
                        <span>{report.size}</span>
                        <Badge variant="outline">{report.type}</Badge>
                      </div>
                    </div>
                  </div>
                  <Button>
                    <Download className="h-4 w-4 ml-2" />
                    دانلود
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
