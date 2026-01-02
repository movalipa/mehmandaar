import { ArrowLeft, Building2, Hotel, Plus, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface NoHotelStateProps {
  staffName: string
}

export function NoHotelState({ staffName }: NoHotelStateProps) {
  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
            <div className="relative p-6 bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl border-2 border-primary/20">
              <Hotel className="h-16 w-16 text-primary mx-auto" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-700 dark:text-gray-300">
              خوش آمدید، <span className="text-blue-400">{staffName}</span>
            </h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              <p className="text-lg">آماده‌اید سفر خود را آغاز کنید؟</p>
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                <Plus className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl mt-4">
                هتل خود را ثبت کنید
              </CardTitle>
              <CardDescription className="text-base">
                اولین قدم برای شروع مدیریت حرفه‌ای
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <p>ثبت اطلاعات کامل هتل خود</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <p>مدیریت اتاق‌ها و امکانات</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  <p>شروع پذیرش مهمان</p>
                </div>
              </div>
              <Button
                className="w-full group-hover:bg-primary/90"
                size="lg"
                asChild
              >
                <Link href="/dashboard/register-hotel">
                  ثبت هتل جدید
                  <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all duration-300 group">
            <CardHeader>
              <div className="p-3 bg-muted rounded-lg w-fit group-hover:bg-muted/80 transition-colors">
                <Building2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl mt-4">
                عضویت در تیم موجود
              </CardTitle>
              <CardDescription className="text-base">
                منتظر تخصیص به هتل هستید؟
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg border border-dashed">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  اگر قرار است به عنوان عضو تیم به هتلی اضافه شوید، لطفاً با مدیر
                  سیستم تماس بگیرید تا حساب کاربری شما را فعال کند.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" asChild>
                  <Link href="/dashboard/profile">مشاهده پروفایل</Link>
                </Button>
                <Button variant="outline" className="flex-1" disabled>
                  <Link href="/support">پشتیبانی</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
