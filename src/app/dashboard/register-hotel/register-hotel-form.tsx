"use client"

import { Building2, CheckCircle2, Loader2, MapPin, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
import { Textarea } from "@/components/ui/textarea"
import { registerHotel } from "@/db/actions/hotel"

interface RegisterHotelFormProps {
  staffName: string
}

export function RegisterHotelForm({ staffName }: RegisterHotelFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    address: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const result = await registerHotel(formData)

      if (result.success) {
        router.push("/dashboard")
        router.refresh()
      } else {
        setError(result.error || "خطا در ثبت هتل")
      }
    } catch (_) {
      setError("خطای غیرمنتظره. لطفاً دوباره تلاش کنید")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-2 border-primary/20 shadow-xl">
      <CardHeader>
        <CardTitle>اطلاعات هتل</CardTitle>
        <CardDescription>
          لطفاً اطلاعات هتل خود را با دقت وارد کنید
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              نام هتل
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="مثال: هتل بین‌المللی پارسیان"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
              minLength={3}
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">حداقل ۳ کاراکتر</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              آدرس
              <span className="text-xs text-muted-foreground">(اختیاری)</span>
            </Label>
            <Textarea
              id="address"
              placeholder="آدرس کامل هتل را وارد کنید..."
              value={formData.address}
              onChange={e =>
                setFormData({ ...formData, address: e.target.value })
              }
              disabled={isLoading}
              rows={3}
              className="resize-none"
            />
          </div>

          {error && (
            <Alert
              variant="destructive"
              className="animate-in fade-in slide-in-from-top-2"
            >
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <div className="space-y-0.5">
                <p className="text-sm font-medium">مدیر هتل</p>
                <p className="text-xs text-muted-foreground">
                  {staffName} - شما به عنوان مدیر این هتل ثبت خواهید شد
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              بازگشت
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading || !formData.name.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  در حال ثبت...
                </>
              ) : (
                <>
                  ثبت هتل
                  <Plus className=" h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
