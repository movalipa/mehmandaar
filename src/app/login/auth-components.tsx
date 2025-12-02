"use client"

import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Hotel } from "lucide-react"
import { Activity, type ReactNode } from "react"
import ThemeButton from "@/components/shared/theme-button"
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "./auth-context"

// Container
export function AuthContainer({ children }: { children: ReactNode }) {
  return (
    <div className="animate-in zoom-in-95 fade-in min-h-screen flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <ThemeButton />
      </div>
      <Card className="w-full max-w-sm">{children}</Card>
    </div>
  )
}

// Header
export function AuthHeader() {
  const { step } = useAuth()

  return (
    <CardHeader className="text-center gap-2 mb-4">
      <div className="w-16 h-16 border-2 rounded-full flex items-center justify-center mx-auto mb-2">
        <Hotel size={32} />
      </div>
      <CardTitle className="text-3xl">مهماندار</CardTitle>
      <CardDescription>
        {step === "phone"
          ? "شماره تلفن خود را وارد کنید"
          : "کد تایید ارسال شده را وارد کنید"}
      </CardDescription>
    </CardHeader>
  )
}

// Error
export function ErrorMessage() {
  const { error } = useAuth()
  if (!error) return null

  return (
    <Alert variant="destructive">
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  )
}

// Phone Form
export function PhoneForm() {
  const { phone, setPhone, loading, handlePhoneSubmit } = useAuth()

  return (
    <form onSubmit={handlePhoneSubmit} className="space-y-4" dir="rtl">
      <Input
        id="phone"
        type="tel"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
        disabled={loading}
        required
        dir="ltr"
      />

      <ErrorMessage />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "در حال ارسال" : "ارسال کد"}
        {loading && <Spinner />}
      </Button>
    </form>
  )
}

// Code Form
export function CodeForm() {
  const { phone, code, setCode, loading, handleCodeSubmit, handleBack } =
    useAuth()

  return (
    <form onSubmit={handleCodeSubmit} className="space-y-4" dir="rtl">
      <div className="space-y-1">
        <div className="flex justify-center" dir="ltr">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={setCode}
            disabled={loading}
            inputMode="numeric"
            pattern={REGEXP_ONLY_DIGITS}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          کد به شماره {phone} ارسال شد
        </p>
      </div>

      <ErrorMessage />

      <div className="space-y-2">
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "در حال تایید" : "تایید کد"}
          {loading && <Spinner />}
        </Button>

        <Button
          type="button"
          variant="secondary"
          className="w-full"
          onClick={handleBack}
          disabled={loading}
        >
          بازگشت
        </Button>
      </div>
    </form>
  )
}

// Forms Container
export function AuthForms() {
  const { step } = useAuth()

  return (
    <CardContent>
      <Activity mode={step === "phone" ? "visible" : "hidden"}>
        <PhoneForm />
      </Activity>
      <Activity mode={step === "code" ? "visible" : "hidden"}>
        <CodeForm />
      </Activity>
    </CardContent>
  )
}
