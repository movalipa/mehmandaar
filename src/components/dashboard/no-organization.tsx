"use client"

import { Building2, Plus, Users } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { createOrganizationAction } from "@/actions/organization"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function NoOrganizationState({ userName }: { userName: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    try {
      await createOrganizationAction(formData)
      toast.success("سازمان با موفقیت ایجاد شد")
      setOpen(false)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center space-y-8 animate-in fade-in-50 duration-500">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          خوش آمدید، {userName}
        </h1>
        <p className="text-lg text-muted-foreground">
          برای شروع مدیریت هتل‌های خود، ابتدا وضعیت سازمان خود را مشخص کنید.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 max-w-4xl w-full px-4">
        {/* کارت ایجاد سازمان جدید */}
        <Card className="relative overflow-hidden border-primary/20 hover:border-primary/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Building2 className="w-32 h-32" />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Plus className="w-6 h-6 text-primary" />
              ایجاد سازمان جدید
            </CardTitle>
            <CardDescription className="text-base mt-2">
              اگر صاحب کسب‌وکار هستید، یک سازمان جدید ایجاد کنید و مدیریت هتل‌های
              خود را آغاز نمایید.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>مدیریت کامل بر هتل‌ها و اتاق‌ها</li>
              <li>دعوت از پرسنل و مدیریت دسترسی‌ها</li>
              <li>دسترسی به گزارشات مالی و آماری</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="w-full">
                  راه‌اندازی سازمان
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form action={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>ایجاد سازمان جدید</DialogTitle>
                    <DialogDescription>
                      نام سازمان یا مجموعه هتل‌های خود را وارد کنید.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">نام سازمان</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="مثلا: گروه هتل‌های پارسیان"
                        required
                        minLength={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "در حال ساخت..." : "ایجاد سازمان"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        {/* کارت پیوستن به سازمان (دعوت‌نامه) */}
        <Card className="relative overflow-hidden hover:border-primary/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Users className="w-32 h-32" />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Users className="w-6 h-6 text-blue-500" />
              پیوستن به تیم
            </CardTitle>
            <CardDescription className="text-base mt-2">
              آیا کارمند یا مدیر بخشی از یک سازمان هستید؟ از مدیر خود بخواهید
              شما را دعوت کند.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 p-4 rounded-lg text-sm text-muted-foreground text-center">
              در حال حاضر امکان پیوستن مستقیم وجود ندارد. لطفا منتظر دریافت لینک
              دعوت یا پیامک از سمت مدیر سازمان باشید.
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="lg" className="w-full" disabled>
              وارد کردن کد دعوت (به زودی)
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
