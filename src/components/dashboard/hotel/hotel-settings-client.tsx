// components/dashboard/settings/hotel-settings-client.tsx
"use client"

import type { UUID } from "node:crypto"
import { AlertTriangle, Building2, Loader2, MapPin, Save } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { deleteHotel, updateHotel } from "@/actions/hotel"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface Hotel {
  id: UUID
  name: string
  address: string | null
  createdAt: Date
}

interface HotelSettingsClientProps {
  hotel: Hotel
}

export function HotelSettingsClient({ hotel }: HotelSettingsClientProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState("")

  const [formData, setFormData] = useState({
    name: hotel.name,
    address: hotel.address || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const result = await updateHotel(hotel.id, formData)

    if (result.success) {
      toast.success("اطلاعات هتل با موفقیت به‌روزرسانی شد.")
    } else {
      toast.error(result.error || "خطا در به‌روزرسانی اطلاعات")
    }

    setIsLoading(false)
  }

  const handleDelete = async () => {
    if (deleteConfirmText !== hotel.name) {
      toast.error("نام هتل را به درستی وارد کنید.")
      return
    }

    setIsDeleting(true)

    const result = await deleteHotel(hotel.id)

    if (result && !result.success) {
      toast.error(result.error || "خطا در حذف هتل")
      setIsDeleting(false)
    }
    // اگر موفق باشد، به صفحه اصلی ریدایرکت می‌شود
  }

  const hasChanges =
    formData.name !== hotel.name || formData.address !== (hotel.address || "")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">تنظیمات هتل</h2>
        <p className="text-muted-foreground">
          مدیریت اطلاعات و تنظیمات هتل خود
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>اطلاعات هتل</CardTitle>
          <CardDescription>نام و آدرس هتل خود را ویرایش کنید</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">
                <Building2 className="h-4 w-4 inline ml-2" />
                نام هتل
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="نام هتل را وارد کنید"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">
                <MapPin className="h-4 w-4 inline ml-2" />
                آدرس
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={e =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="آدرس هتل را وارد کنید"
                disabled={isLoading}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading || !hasChanges}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    در حال ذخیره...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    ذخیره تغییرات
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">منطقه خطرناک</CardTitle>
          <CardDescription>
            حذف دائمی هتل و تمام اطلاعات مرتبط با آن
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium">هشدار مهم</p>
              <p className="text-sm text-muted-foreground">
                با حذف هتل، تمام اطلاعات زیر به طور دائمی حذف خواهند شد:
              </p>
              <ul className="text-sm text-muted-foreground list-disc list-inside mr-4 space-y-1">
                <li>تمام رزروها و اطلاعات مهمانان</li>
                <li>اطلاعات اتاق‌ها</li>
                <li>حساب‌های کاربری کارکنان</li>
                <li>تمام گزارشات و آمار</li>
              </ul>
              <p className="text-sm font-semibold text-destructive mt-2">
                این عملیات قابل بازگشت نیست!
              </p>
            </div>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                <AlertTriangle className="h-4 w-4" />
                حذف دائمی هتل
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>آیا کاملاً مطمئن هستید؟</AlertDialogTitle>
                <AlertDialogDescription className="space-y-4">
                  <p>
                    این عملیات تمام داده‌های هتل شما را به طور دائمی حذف می‌کند و
                    قابل بازگشت نیست.
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-delete">
                      برای تأیید، نام هتل را وارد کنید:{" "}
                      <span className="font-bold">{hotel.name}</span>
                    </Label>
                    <Input
                      id="confirm-delete"
                      value={deleteConfirmText}
                      onChange={e => setDeleteConfirmText(e.target.value)}
                      placeholder="نام هتل را وارد کنید"
                      disabled={isDeleting}
                    />
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isDeleting}>
                  انصراف
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting || deleteConfirmText !== hotel.name}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      در حال حذف...
                    </>
                  ) : (
                    "حذف دائمی"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>اطلاعات سیستم</CardTitle>
          <CardDescription>جزئیات حساب هتل شما</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">شناسه هتل:</span>
            <span className="font-mono">{hotel.id}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-muted-foreground">تاریخ ایجاد:</span>
            <span>{new Date(hotel.createdAt).toLocaleDateString("fa-IR")}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
