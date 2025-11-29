"use client"

import { useRouter } from "next/navigation"
import {
  createContext,
  type FormEvent,
  type ReactNode,
  useContext,
  useState,
} from "react"
import { sendOTP, verifyOTP } from "@/actions/auth"

// Types
export type Step = "phone" | "code"

export interface AuthContextValue {
  step: Step
  phone: string
  code: string
  loading: boolean
  error: string
  setPhone: (phone: string) => void
  setCode: (code: string) => void
  handlePhoneSubmit: (e: FormEvent) => Promise<void>
  handleCodeSubmit: (e: FormEvent) => Promise<void>
  handleBack: () => void
}

// Context
const AuthContext = createContext<AuthContextValue | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context)
    throw new Error("Auth components must be used within AuthProvider")
  return context
}

// Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [step, setStep] = useState<Step>("phone")
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
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
      router.push("/dashboard")
      router.refresh()
    } else {
      setError(result.error || "کد تایید نامعتبر است")
    }
  }

  const handleBack = () => {
    setStep("phone")
    setCode("")
    setError("")
  }

  return (
    <AuthContext.Provider
      value={{
        step,
        phone,
        code,
        loading,
        error,
        setPhone,
        setCode,
        handlePhoneSubmit,
        handleCodeSubmit,
        handleBack,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
