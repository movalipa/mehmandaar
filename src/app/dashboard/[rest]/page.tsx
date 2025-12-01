import { AlertCircle, ArrowRight, Home } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-destructive/10 p-4">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-2xl">صفحه پیدا نشد</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-muted-foreground">
            متأسفانه صفحه‌ای که به دنبال آن هستید در داشبورد وجود ندارد.
          </p>

          <div className="pt-4 space-y-2">
            <Button asChild className="w-full">
              <Link href="/dashboard">
                <Home className="h-4 w-4 ml-2" />
                بازگشت به داشبورد
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard/reservations">
                <ArrowRight className="h-4 w-4 ml-2" />
                رزرواسیون‌ها
              </Link>
            </Button>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">دسترسی سریع:</p>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              <Link href="/dashboard/rooms">
                <Button variant="link" size="sm">
                  اتاق‌ها
                </Button>
              </Link>
              <Link href="/dashboard/guests">
                <Button variant="link" size="sm">
                  مهمانان
                </Button>
              </Link>
              <Link href="/dashboard/finance">
                <Button variant="link" size="sm">
                  مالی
                </Button>
              </Link>
              <Link href="/dashboard/reports">
                <Button variant="link" size="sm">
                  گزارشات
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
