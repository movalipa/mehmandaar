import { Building2, Sparkles } from "lucide-react"
import { redirect } from "next/navigation"
import { requireAuth } from "@/actions/auth"
import { RegisterHotelForm } from "@/app/dashboard/register-hotel/register-hotel-form"

export default async function RegisterHotelPage() {
  const staff = await requireAuth()

  if (staff.hotelId) {
    redirect("/dashboard")
  }

  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="max-w-xl w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center space-y-3">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
            <div className="relative p-4 bg-linear-to-br from-primary/10 to-primary/5 rounded-xl border-2 border-primary/20">
              <Building2 className="h-12 w-12 text-primary mx-auto" />
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-l from-primary to-primary/60 bg-clip-text text-transparent">
              ثبت هتل جدید
            </h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <p className="text-sm">شروع سفر موفقیت در مدیریت هتل</p>
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            </div>
          </div>
        </div>

        <RegisterHotelForm staffName={staff.firstName} />
      </div>
    </div>
  )
}
