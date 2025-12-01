"use client"

import {
  AlertCircle,
  Inbox,
  MessageSquare,
  Search,
  Send,
  Star,
} from "lucide-react"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MessagesPage() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const messages = [
    {
      id: 1,
      sender: "علی حسینی",
      avatar: "",
      title: "درخواست رزرو گروهی",
      text: "سلام، لطفاً درباره رزرو ۱۲ نفر راهنمایی کنید...",
      time: "۲ ساعت پیش",
      unread: true,
      important: true,
      category: "support",
    },
    {
      id: 2,
      sender: "واحد پذیرش",
      title: "گزارش وضعیت اتاق 304",
      avatar: "",
      text: "اتاق 304 آماده تحویل است.",
      time: "۴ ساعت پیش",
      unread: false,
      important: false,
      category: "general",
    },
    {
      id: 3,
      sender: "مریم کرمانی",
      title: "تشکر بابت خدمات",
      avatar: "",
      text: "همه چیز عالی بود، حتماً دوباره می‌آییم.",
      time: "دیروز",
      unread: false,
      important: false,
      category: "general",
    },
    {
      id: 4,
      sender: "مدیریت سیستم",
      title: "هشدار ظرفیت دیتابیس",
      avatar: "",
      text: "حجم دیتابیس به ۹۰٪ نزدیک شده است.",
      time: "۳ روز پیش",
      unread: true,
      important: true,
      category: "system",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">پیام‌ها</h2>
        <Button onClick={() => setOpen(true)}>
          <Send className="h-4 w-4 ml-2" />
          پیام جدید
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">خوانده‌نشده</p>
            <h3 className="text-xl font-semibold">۲</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">امروز</p>
            <h3 className="text-xl font-semibold">۳</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">کل پیام‌ها</p>
            <h3 className="text-xl font-semibold">۱۴۹</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">پیام‌های مهم</p>
            <h3 className="text-xl font-semibold">۵</h3>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>لیست پیام‌ها</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all">همه</TabsTrigger>
              <TabsTrigger value="unread">خوانده‌نشده</TabsTrigger>
              <TabsTrigger value="important">مهم</TabsTrigger>
              <TabsTrigger value="support">پشتیبانی</TabsTrigger>
            </TabsList>

            <div className="flex justify-end">
              <div className="relative w-64">
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="جستجوی پیام..." className="pr-8" />
              </div>
            </div>

            <TabsContent value="all" className="grid lg:grid-cols-2 gap-4">
              {messages.map(msg => (
                <Card
                  key={msg.id}
                  className={`cursor-pointer hover:shadow-md transition ${msg.unread ? "border-primary" : ""}`}
                  onClick={() => setSelected(msg)}
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {msg.sender.slice(0, 1)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{msg.sender}</p>
                          <p className="text-sm text-muted-foreground">
                            {msg.title}
                          </p>
                        </div>
                      </div>

                      {msg.important && (
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {msg.text}
                    </p>

                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-xs text-muted-foreground">
                        {msg.time}
                      </span>

                      {msg.unread && <Badge>جدید</Badge>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {selected && (
        <Card className="p-6 space-y-4">
          <h3 className="text-xl font-bold">جزئیات پیام</h3>
          <p className="text-muted-foreground">{selected.time}</p>
          <h4 className="font-semibold">{selected.title}</h4>
          <p>{selected.text}</p>

          <Button variant="outline" onClick={() => setSelected(null)}>
            بازگشت
          </Button>
        </Card>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ارسال پیام جدید</DialogTitle>
          </DialogHeader>
          <Input placeholder="موضوع پیام" />
          <Input placeholder="متن پیام..." className="h-24" />
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>ارسال</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
