// app/dashboard/guests/page.tsx

import {
  Calendar,
  Filter,
  Mail,
  MapPin,
  Phone,
  Search,
  Star,
  Users,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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

export default function GuestsPage() {
  const guests = [
    {
      id: "G-001",
      name: "علی احمدی",
      phone: "09121234567",
      email: "ali.ahmadi@email.com",
      city: "تهران",
      visits: 5,
      totalSpent: "۴۲,۵۰۰,۰۰۰",
      lastVisit: "۱۴۰۴/۰۹/۰۸",
      status: "active",
      vip: true,
      rating: 5,
    },
    {
      id: "G-002",
      name: "سارا محمدی",
      phone: "09129876543",
      email: "sara.mohammadi@email.com",
      city: "اصفهان",
      visits: 3,
      totalSpent: "۲۸,۰۰۰,۰۰۰",
      lastVisit: "۱۴۰۴/۰۹/۰۹",
      status: "active",
      vip: false,
      rating: 4,
    },
    {
      id: "G-003",
      name: "حسین کریمی",
      phone: "09131234567",
      email: "hosein.karimi@email.com",
      city: "شیراز",
      visits: 8,
      totalSpent: "۶۵,۰۰۰,۰۰۰",
      lastVisit: "۱۴۰۴/۰۹/۰۸",
      status: "active",
      vip: true,
      rating: 5,
    },
    {
      id: "G-004",
      name: "مریم رضایی",
      phone: "09141234567",
      email: "maryam.rezaei@email.com",
      city: "مشهد",
      visits: 2,
      totalSpent: "۱۸,۰۰۰,۰۰۰",
      lastVisit: "۱۴۰۴/۰۹/۱۰",
      status: "active",
      vip: false,
      rating: 5,
    },
    {
      id: "G-005",
      name: "محمد جعفری",
      phone: "09151234567",
      email: "mohammad.jafari@email.com",
      city: "تبریز",
      visits: 1,
      totalSpent: "۶,۰۰۰,۰۰۰",
      lastVisit: "۱۴۰۴/۰۹/۰۷",
      status: "inactive",
      vip: false,
      rating: 4,
    },
    {
      id: "G-006",
      name: "فاطمه حسینی",
      phone: "09161234567",
      email: "fatemeh.hosseini@email.com",
      city: "کرج",
      visits: 4,
      totalSpent: "۳۲,۰۰۰,۰۰۰",
      lastVisit: "۱۴۰۴/۰۸/۲۵",
      status: "active",
      vip: true,
      rating: 5,
    },
  ]

  const stats = [
    { label: "کل مهمانان", value: "۳۴۵", change: "+۲۸ این ماه", icon: Users },
    { label: "مهمانان VIP", value: "۴۸", change: "۱۴٪ کل مهمانان", icon: Star },
    { label: "مهمانان فعال", value: "۹۲", change: "در حال اقامت", icon: Users },
    { label: "میانگین رضایت", value: "۴.۶", change: "از ۵ امتیاز", icon: Star },
  ]

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">مدیریت مهمانان</h2>
          <p className="text-muted-foreground">
            مشاهده و مدیریت اطلاعات مهمانان هتل
          </p>
        </div>
        <Button>
          <Users className="h-4 w-4 ml-2" />
          افزودن مهمان
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
              <CardTitle>لیست مهمانان</CardTitle>
              <CardDescription>
                مدیریت اطلاعات و تاریخچه مهمانان
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="جستجو مهمان..."
                  className="pr-8 w-[250px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {guests.map(guest => (
              <Card
                key={guest.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(guest.name)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{guest.name}</h3>
                          {guest.vip && (
                            <Badge variant="default" className="bg-amber-500">
                              <Star className="h-3 w-3 ml-1" />
                              VIP
                            </Badge>
                          )}
                          <Badge
                            variant={
                              guest.status === "active"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {guest.status === "active" ? "فعال" : "غیرفعال"}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {guest.phone}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {guest.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {guest.city}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {guest.visits}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          تعداد بازدید
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {guest.totalSpent}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          مجموع هزینه (تومان)
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-xl font-bold">
                            {guest.rating}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          امتیاز رضایت
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">{guest.lastVisit}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          آخرین بازدید
                        </div>
                      </div>

                      <Button variant="outline" size="sm">
                        مشاهده جزئیات
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
