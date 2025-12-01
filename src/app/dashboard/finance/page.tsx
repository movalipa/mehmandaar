// app/dashboard/finance/page.tsx

import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  CreditCard,
  DollarSign,
  Download,
  TrendingDown,
  TrendingUp,
  Wallet,
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

export default function FinancePage() {
  const stats = [
    {
      label: "کل درآمد ماه",
      value: "۳۲۵,۰۰۰,۰۰۰",
      change: "+۱۲.۵٪ نسبت به ماه قبل",
      icon: DollarSign,
      trend: "up",
    },
    {
      label: "هزینه‌های ماه",
      value: "۸۵,۰۰۰,۰۰۰",
      change: "+۵.۲٪ نسبت به ماه قبل",
      icon: CreditCard,
      trend: "up",
    },
    {
      label: "سود خالص",
      value: "۲۴۰,۰۰۰,۰۰۰",
      change: "+۱۵.۸٪ نسبت به ماه قبل",
      icon: TrendingUp,
      trend: "up",
    },
    {
      label: "درآمد امروز",
      value: "۱۲,۵۰۰,۰۰۰",
      change: "۱۵ تراکنش انجام شده",
      icon: Wallet,
      trend: "neutral",
    },
  ]

  const recentTransactions = [
    {
      id: "T-001",
      type: "income",
      description: "رزرو اتاق VIP-102",
      guest: "علی احمدی",
      amount: "۸,۵۰۰,۰۰۰",
      method: "کارت بانکی",
      date: "۱۴۰۴/۰۹/۱۰",
      time: "۱۴:۳۰",
      status: "completed",
    },
    {
      id: "T-002",
      type: "income",
      description: "رستوران - میز شماره ۵",
      guest: "سارا محمدی",
      amount: "۱,۲۰۰,۰۰۰",
      method: "نقدی",
      date: "۱۴۰۴/۰۹/۱۰",
      time: "۱۳:۱۵",
      status: "completed",
    },
    {
      id: "T-003",
      type: "expense",
      description: "خرید مواد غذایی",
      guest: "تامین‌کننده ABC",
      amount: "۳,۵۰۰,۰۰۰",
      method: "چک",
      date: "۱۴۰۴/۰۹/۱۰",
      time: "۱۰:۰۰",
      status: "completed",
    },
    {
      id: "T-004",
      type: "income",
      description: "رزرو اتاق D-205",
      guest: "حسین کریمی",
      amount: "۴,۵۰۰,۰۰۰",
      method: "کارت بانکی",
      date: "۱۴۰۴/۰۹/۰۹",
      time: "۱۸:۴۵",
      status: "completed",
    },
    {
      id: "T-005",
      type: "expense",
      description: "تعمیر تاسیسات",
      guest: "شرکت خدمات فنی",
      amount: "۲,۰۰۰,۰۰۰",
      method: "واریز",
      date: "۱۴۰۴/۰۹/۰۹",
      time: "۱۵:۳۰",
      status: "pending",
    },
    {
      id: "T-006",
      type: "income",
      description: "رستوران - میز شماره ۱۲",
      guest: "مریم رضایی",
      amount: "۹۵۰,۰۰۰",
      method: "کارت بانکی",
      date: "۱۴۰۴/۰۹/۰۹",
      time: "۲۰:۰۰",
      status: "completed",
    },
  ]

  const monthlyCategories = [
    { category: "رزرو اتاق‌ها", amount: "۲۸۵,۰۰۰,۰۰۰", percentage: 88 },
    { category: "رستوران", amount: "۲۵,۰۰۰,۰۰۰", percentage: 8 },
    { category: "خدمات اضافی", amount: "۱۵,۰۰۰,۰۰۰", percentage: 4 },
  ]

  const expenses = [
    { category: "حقوق و دستمزد", amount: "۴۵,۰۰۰,۰۰۰", percentage: 53 },
    { category: "مواد غذایی", amount: "۲۰,۰۰۰,۰۰۰", percentage: 24 },
    { category: "تاسیسات و تعمیرات", amount: "۱۲,۰۰۰,۰۰۰", percentage: 14 },
    { category: "سایر", amount: "۸,۰۰۰,۰۰۰", percentage: 9 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">مدیریت مالی</h2>
          <p className="text-muted-foreground">
            مشاهده درآمد، هزینه‌ها و گزارشات مالی
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 ml-2" />
            انتخاب بازه زمانی
          </Button>
          <Button>
            <Download className="h-4 w-4 ml-2" />
            دانلود گزارش
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
              <p
                className={`text-xs flex items-center gap-1 ${
                  stat.trend === "up"
                    ? "text-green-600"
                    : stat.trend === "down"
                      ? "text-red-600"
                      : "text-muted-foreground"
                }`}
              >
                {stat.trend === "up" && <TrendingUp className="h-3 w-3" />}
                {stat.trend === "down" && <TrendingDown className="h-3 w-3" />}
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>تفکیک درآمد ماه</CardTitle>
            <CardDescription>بر اساس نوع خدمات</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {monthlyCategories.map(item => (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.category}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.amount} تومان
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>تفکیک هزینه‌های ماه</CardTitle>
            <CardDescription>بر اساس دسته‌بندی</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {expenses.map(item => (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.category}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.amount} تومان
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>تراکنش‌های اخیر</CardTitle>
          <CardDescription>لیست تمام تراکنش‌های مالی</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">همه</TabsTrigger>
              <TabsTrigger value="income">درآمد</TabsTrigger>
              <TabsTrigger value="expense">هزینه</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {recentTransactions.map(transaction => (
                <Card
                  key={transaction.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-full ${
                            transaction.type === "income"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {transaction.type === "income" ? (
                            <ArrowDownRight className="h-5 w-5" />
                          ) : (
                            <ArrowUpRight className="h-5 w-5" />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">
                              {transaction.description}
                            </h4>
                            <Badge
                              variant={
                                transaction.status === "completed"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {transaction.status === "completed"
                                ? "تکمیل شده"
                                : "در انتظار"}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{transaction.guest}</span>
                            <span>•</span>
                            <span>{transaction.method}</span>
                            <span>•</span>
                            <span>
                              {transaction.date} - {transaction.time}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`text-xl font-bold ${
                          transaction.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}{" "}
                        {transaction.amount} تومان
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="income" className="space-y-4">
              {recentTransactions
                .filter(t => t.type === "income")
                .map(transaction => (
                  <Card key={transaction.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-full bg-green-100 text-green-600">
                            <ArrowDownRight className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold">
                              {transaction.description}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {transaction.guest} • {transaction.date} -{" "}
                              {transaction.time}
                            </p>
                          </div>
                        </div>
                        <div className="text-xl font-bold text-green-600">
                          + {transaction.amount} تومان
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="expense" className="space-y-4">
              {recentTransactions
                .filter(t => t.type === "expense")
                .map(transaction => (
                  <Card key={transaction.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-full bg-red-100 text-red-600">
                            <ArrowUpRight className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold">
                              {transaction.description}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {transaction.guest} • {transaction.date} -{" "}
                              {transaction.time}
                            </p>
                          </div>
                        </div>
                        <div className="text-xl font-bold text-red-600">
                          - {transaction.amount} تومان
                        </div>
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
