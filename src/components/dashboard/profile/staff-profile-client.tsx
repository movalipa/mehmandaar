// components/dashboard/profile/staff-profile-client.tsx
"use client"

import type { UUID } from "node:crypto"
import { Loader2, Phone, Save, User, UserCircle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { updateProfile } from "@/actions/profile"
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
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

type StaffRole = "owner" | "manager" | "receptionist" | "staff"

interface Staff {
  id: UUID
  hotelId: UUID | null
  firstName: string
  lastName: string
  phone: string
  role: StaffRole
  createdAt: Date
}

interface StaffProfileClientProps {
  staff: Staff
}

const roleLabels: Record<StaffRole, string> = {
  owner: "مالک",
  manager: "مدیر",
  receptionist: "پذیرش",
  staff: "کارمند",
}

const roleColors: Record<
  StaffRole,
  "default" | "secondary" | "destructive" | "outline"
> = {
  owner: "destructive",
  manager: "default",
  receptionist: "secondary",
  staff: "outline",
}

export function StaffProfileClient({ staff }: StaffProfileClientProps) {
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: staff.firstName,
    lastName: staff.lastName,
    phone: staff.phone,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const result = await updateProfile(formData)

    if (result.success) {
      toast.success("اطلاعات پروفایل با موفقیت به‌روزرسانی شد.")
    } else {
      toast.error(result.error || "خطا در به‌روزرسانی اطلاعات")
    }

    setIsLoading(false)
  }

  const hasChanges =
    formData.firstName !== staff.firstName ||
    formData.lastName !== staff.lastName ||
    formData.phone !== staff.phone

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">پروفایل کاربری</h2>
        <p className="text-muted-foreground">
          مشاهده و ویرایش اطلاعات حساب کاربری خود
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>اطلاعات شخصی</CardTitle>
            <CardDescription>
              نام، نام خانوادگی و شماره تماس خود را ویرایش کنید
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  <User className="h-4 w-4 inline ml-2" />
                  نام
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={e =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="نام خود را وارد کنید"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">
                  <User className="h-4 w-4 inline ml-2" />
                  نام خانوادگی
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={e =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="نام خانوادگی خود را وارد کنید"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  <Phone className="h-4 w-4 inline ml-2" />
                  شماره تلفن
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={e =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="09123456789"
                  required
                  disabled={isLoading}
                  dir="ltr"
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

        <Card>
          <CardHeader>
            <CardTitle>اطلاعات حساب</CardTitle>
            <CardDescription>جزئیات حساب کاربری شما</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
              <div className="p-3 rounded-full bg-primary text-primary-foreground">
                <UserCircle className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-lg">
                  {staff.firstName} {staff.lastName}
                </p>
                <p className="text-sm text-muted-foreground">{staff.phone}</p>
              </div>
              <Badge variant={roleColors[staff.role]}>
                {roleLabels[staff.role]}
              </Badge>
            </div>

            <Separator />

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">شناسه کاربری:</span>
                <span className="font-mono text-xs">{staff.id}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">نقش:</span>
                <span className="font-medium">{roleLabels[staff.role]}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">تاریخ عضویت:</span>
                <span>
                  {new Date(staff.createdAt).toLocaleDateString("fa-IR")}
                </span>
              </div>
              {staff.hotelId && (
                <>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">شناسه هتل:</span>
                    <span className="font-mono text-xs">{staff.hotelId}</span>
                  </div>
                </>
              )}
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                برای تغییر نقش یا دسترسی‌های خود، با مدیر یا مالک هتل تماس
                بگیرید.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
