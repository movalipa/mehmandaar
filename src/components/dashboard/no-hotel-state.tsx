import { Hotel } from "lucide-react"
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
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
            <Hotel className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">خوش آمدید، {staffName}!</CardTitle>
          <CardDescription className="text-base mt-2">
            برای شروع کار، ابتدا باید به یک هتل اختصاص داده شوید.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              لطفاً با مدیر سیستم تماس بگیرید تا حساب کاربری شما را به هتل مورد
              نظر متصل کند.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="outline" asChild className="w-full">
              <Link href="/dashboard/profile">مشاهده پروفایل</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
