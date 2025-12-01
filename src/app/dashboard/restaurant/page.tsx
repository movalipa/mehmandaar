// app/dashboard/restaurant/page.tsx

import {
  ChefHat,
  Clock,
  Plus,
  TrendingUp,
  Users,
  UtensilsCrossed,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RestaurantPage() {
  const stats = [
    {
      label: "سفارشات امروز",
      value: "۴۵",
      change: "+۸ نسبت به دیروز",
      icon: UtensilsCrossed,
    },
    {
      label: "میزهای رزرو شده",
      value: "۱۲/۲۰",
      change: "۶۰٪ ظرفیت",
      icon: Users,
    },
    {
      label: "درآمد امروز",
      value: "۸,۵۰۰,۰۰۰",
      change: "+۱۵٪ نسبت به دیروز",
      icon: TrendingUp,
    },
    {
      label: "زمان آماده‌سازی",
      value: "۱۸ دقیقه",
      change: "میانگین",
      icon: Clock,
    },
  ]

  const tables = [
    {
      number: 1,
      capacity: 4,
      status: "occupied",
      guest: "علی احمدی",
      orderTime: "۱۲:۳۰",
      amount: "۱,۲۰۰,۰۰۰",
    },
    {
      number: 2,
      capacity: 2,
      status: "reserved",
      guest: "سارا محمدی",
      reserveTime: "۱۴:۰۰",
    },
    { number: 3, capacity: 6, status: "available" },
    {
      number: 4,
      capacity: 4,
      status: "occupied",
      guest: "حسین کریمی",
      orderTime: "۱۳:۱۵",
      amount: "۹۵۰,۰۰۰",
    },
    { number: 5, capacity: 2, status: "available" },
    {
      number: 6,
      capacity: 8,
      status: "reserved",
      guest: "مریم رضایی",
      reserveTime: "۱۹:۳۰",
    },
    {
      number: 7,
      capacity: 4,
      status: "occupied",
      guest: "محمد جعفری",
      orderTime: "۱۳:۴۵",
      amount: "۱,۵۰۰,۰۰۰",
    },
    { number: 8, capacity: 2, status: "available" },
  ]

  const activeOrders = [
    {
      id: "O-001",
      table: 1,
      guest: "علی احمدی",
      items: ["کباب کوبیده x2", "چلو جوجه x1", "نوشابه x3"],
      status: "preparing",
      orderTime: "۱۲:۳۰",
      estimatedTime: "۱۵ دقیقه",
    },
    {
      id: "O-002",
      table: 4,
      guest: "حسین کریمی",
      items: ["پیتزا پپرونی x1", "سالاد سزار x2"],
      status: "ready",
      orderTime: "۱۳:۱۵",
      estimatedTime: "آماده",
    },
    {
      id: "O-003",
      table: 7,
      guest: "محمد جعفری",
      items: ["استیک گوشت x2", "سوپ جو x2", "دسر x2"],
      status: "preparing",
      orderTime: "۱۳:۴۵",
      estimatedTime: "۲۰ دقیقه",
    },
  ]

  const popularDishes = [
    { name: "کباب کوبیده", orders: 28, revenue: "۴,۲۰۰,۰۰۰" },
    { name: "چلو جوجه", orders: 22, revenue: "۳,۳۰۰,۰۰۰" },
    { name: "پیتزا پپرونی", orders: 18, revenue: "۲,۷۰۰,۰۰۰" },
    { name: "استیک گوشت", orders: 15, revenue: "۳,۰۰۰,۰۰۰" },
    { name: "سالاد سزار", orders: 12, revenue: "۹۶۰,۰۰۰" },
  ]

  const getTableStatusColor = (status: string) => {
    switch (status) {
      case "occupied":
        return "bg-red-100 border-red-300 text-red-700"
      case "reserved":
        return "bg-yellow-100 border-yellow-300 text-yellow-700"
      case "available":
        return "bg-green-100 border-green-300 text-green-700"
      default:
        return "bg-gray-100 border-gray-300 text-gray-700"
    }
  }

  const getTableStatusLabel = (status: string) => {
    switch (status) {
      case "occupied":
        return "اشغال"
      case "reserved":
        return "رزرو شده"
      case "available":
        return "آزاد"
      default:
        return "نامشخص"
    }
  }

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "preparing":
        return <Badge variant="secondary">در حال آماده‌سازی</Badge>
      case "ready":
        return <Badge className="bg-green-500">آماده</Badge>
      case "delivered":
        return <Badge variant="default">تحویل داده شده</Badge>
      default:
        return <Badge variant="outline">نامشخص</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">مدیریت رستوران</h2>
          <p className="text-muted-foreground">
            مشاهده میزها، سفارشات و منوی غذا
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Users className="h-4 w-4 ml-2" />
            رزرو میز
          </Button>
          <Button>
            <Plus className="h-4 w-4 ml-2" />
            ثبت سفارش جدید
          </Button>
        </div>
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

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>وضعیت میزها</CardTitle>
            <CardDescription>نمای لحظه‌ای میزهای رستوران</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              {tables.map(table => (
                <Card
                  key={table.number}
                  className={`border-2 cursor-pointer hover:shadow-lg transition-all ${getTableStatusColor(table.status)}`}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold mb-2">
                      میز {table.number}
                    </div>
                    <div className="text-sm mb-2">
                      ظرفیت: {table.capacity} نفر
                    </div>
                    <Badge variant="outline" className="mb-2">
                      {getTableStatusLabel(table.status)}
                    </Badge>
                    {table.status === "occupied" && table.guest && (
                      <div className="text-xs space-y-1 mt-2">
                        <div className="font-medium">{table.guest}</div>
                        <div className="text-muted-foreground">
                          {table.orderTime}
                        </div>
                        <div className="font-semibold">
                          {table.amount} تومان
                        </div>
                      </div>
                    )}
                    {table.status === "reserved" && table.guest && (
                      <div className="text-xs space-y-1 mt-2">
                        <div className="font-medium">{table.guest}</div>
                        <div className="text-muted-foreground">
                          رزرو: {table.reserveTime}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>غذاهای پرفروش امروز</CardTitle>
            <CardDescription>محبوب‌ترین غذاها</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {popularDishes.map((dish, index) => (
              <div
                key={dish.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{dish.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {dish.orders} سفارش
                    </div>
                  </div>
                </div>
                <div className="text-sm font-semibold">{dish.revenue}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>سفارشات فعال</CardTitle>
          <CardDescription>
            لیست سفارشاتی که در حال آماده‌سازی هستند
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">همه</TabsTrigger>
              <TabsTrigger value="preparing">در حال آماده‌سازی</TabsTrigger>
              <TabsTrigger value="ready">آماده</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {activeOrders.map(order => (
                <Card
                  key={order.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-primary/10 text-primary">
                          <ChefHat className="h-6 w-6" />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">سفارش {order.id}</h3>
                            {getOrderStatusBadge(order.status)}
                          </div>

                          <div className="text-sm text-muted-foreground">
                            <div>
                              میز {order.table} • {order.guest}
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3" />
                              زمان سفارش: {order.orderTime}
                            </div>
                          </div>

                          <div className="space-y-1 mt-3">
                            <div className="text-sm font-medium">
                              آیتم‌های سفارش:
                            </div>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {order.items.map(item => (
                                <li key={item}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="text-left space-y-2">
                        <div className="text-sm font-medium">زمان تخمینی:</div>
                        <div className="text-2xl font-bold text-primary">
                          {order.estimatedTime}
                        </div>
                        <Button size="sm" className="w-full mt-4">
                          {order.status === "ready" ? "تحویل" : "آماده شد"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="preparing" className="space-y-4">
              {activeOrders
                .filter(order => order.status === "preparing")
                .map(order => (
                  <Card key={order.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">
                            سفارش {order.id} - میز {order.table}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {order.guest}
                          </p>
                        </div>
                        <div className="text-xl font-bold text-primary">
                          {order.estimatedTime}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="ready" className="space-y-4">
              {activeOrders
                .filter(order => order.status === "ready")
                .map(order => (
                  <Card key={order.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">
                            سفارش {order.id} - میز {order.table}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {order.guest}
                          </p>
                        </div>
                        <Button>تحویل به مشتری</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
