"use client"

import {
  Download,
  FileArchive,
  FileCheck,
  FileSpreadsheet,
  FileText,
  Search,
  Share2,
  Trash2,
  Upload,
} from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DocumentsPage() {
  const [open, setOpen] = useState(false)

  const documents = [
    {
      name: "قرارداد شماره 245",
      type: "contract",
      icon: FileText,
      size: "1.2MB",
      date: "۱۴۰۴/۰۹/۰۵",
      status: "new",
    },
    {
      name: "فاکتور رستوران",
      type: "invoice",
      icon: FileSpreadsheet,
      size: "540KB",
      date: "۱۴۰۴/۰۹/۰۳",
      status: "archived",
    },
    {
      name: "گزارش عملکرد آبان",
      type: "report",
      icon: FileCheck,
      size: "3.4MB",
      date: "۱۴۰۴/۰۸/۳۰",
      status: "important",
    },
    {
      name: "مستندات تعمیرات",
      type: "other",
      icon: FileArchive,
      size: "800KB",
      date: "۱۴۰۴/۰۹/۰۱",
      status: "new",
    },
  ]

  const statusBadge = {
    new: "جدید",
    archived: "آرشیو",
    important: "مهم",
  }

  const statusVariant = {
    new: "default",
    archived: "secondary",
    important: "destructive",
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">اسناد</h2>
        <Button onClick={() => setOpen(true)}>
          <Upload className="h-4 w-4 ml-2" />
          آپلود سند
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">تعداد اسناد</p>
            <h3 className="text-xl font-semibold">320</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">فایل‌های امروز</p>
            <h3 className="text-xl font-semibold">12</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">حجم ذخیره‌شده</p>
            <h3 className="text-xl font-semibold">1.8GB</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">تعداد پوشه‌ها</p>
            <h3 className="text-xl font-semibold">42</h3>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>لیست اسناد</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="all">همه</TabsTrigger>
              <TabsTrigger value="contract">قراردادها</TabsTrigger>
              <TabsTrigger value="invoice">فاکتورها</TabsTrigger>
              <TabsTrigger value="report">گزارشات</TabsTrigger>
              <TabsTrigger value="other">سایر</TabsTrigger>
            </TabsList>

            <div className="flex justify-end">
              <div className="relative w-64">
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="جستجوی سند..." className="pr-8" />
              </div>
            </div>

            <TabsContent
              value="all"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {documents.map((doc, i) => {
                const Icon = doc.icon
                return (
                  <Card key={i} className="hover:shadow-md transition">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <Icon className="h-6 w-6" />
                        <Badge variant={statusVariant[doc.status]}>
                          {statusBadge[doc.status]}
                        </Badge>
                      </div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.date} — {doc.size}
                      </p>

                      <div className="flex justify-between pt-2 border-t">
                        <Button variant="outline" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>آپلود سند جدید</DialogTitle>
          </DialogHeader>
          <Input type="file" className="border p-2" />
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>ثبت</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
