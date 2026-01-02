"use client"

import { useRouter } from "next/navigation"
import {
  createContext,
  type FormEvent,
  type ReactNode,
  useContext,
  useState,
} from "react"
import { registerUser, sendOTP, verifyOTP } from "@/actions/auth"

export type Step = "phone" | "code" | "register"

export interface AuthContextValue {
  step: Step
  phone: string
  code: string
  firstName: string
  lastName: string
  loading: boolean
  error: string
  setPhone: (phone: string) => void
  setCode: (code: string) => void
  setFirstName: (name: string) => void
  setLastName: (name: string) => void
  handlePhoneSubmit: (e: FormEvent) => Promise<void>
  handleCodeSubmit: (e: FormEvent) => Promise<void>
  handleRegisterSubmit: (e: FormEvent) => Promise<void>
  handleBack: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context)
    throw new Error("Auth components must be used within AuthProvider")
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [step, setStep] = useState<Step>("phone")
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handlePhoneSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (phone.length < 10) {
      setError("لطفا شماره تلفن معتبر وارد کنید")
      setLoading(false)
      return
    }

    const result = await sendOTP(phone)
    setLoading(false)
    result.success
      ? setStep("code")
      : setError(result.error || "ارسال کد با خطا مواجه شد")
  }

  const handleCodeSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (code.length !== 6) {
      setError("لطفا کد ۶ رقمی معتبر وارد کنید")
      setLoading(false)
      return
    }

    const result = await verifyOTP(phone, code)
    setLoading(false)

    if (result.success) {
      if (result.isNewUser) {
        setStep("register")
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } else {
      setError(result.error || "کد تایید نامعتبر است")
    }
  }

  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!firstName.trim() || !lastName.trim()) {
      setError("لطفا نام و نام خانوادگی خود را وارد کنید")
      setLoading(false)
      return
    }

    const result = await registerUser(
      phone,
      code,
      firstName.trim(),
      lastName.trim()
    )

    setLoading(false)

    if (result.success) {
      router.push("/dashboard")
      router.refresh()
    } else {
      setError(result.error || "ثبت‌ نام با خطا مواجه شد")
    }
  }

  const handleBack = () => {
    if (step === "code") {
      setStep("phone")
      setCode("")
    } else if (step === "register") {
      setStep("code")
      setFirstName("")
      setLastName("")
    }
    setError("")
  }

  return (
    <AuthContext.Provider
      value={{
        step,
        phone,
        code,
        firstName,
        lastName,
        loading,
        error,
        setPhone,
        setCode,
        setFirstName,
        setLastName,
        handlePhoneSubmit,
        handleCodeSubmit,
        handleRegisterSubmit,
        handleBack,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
