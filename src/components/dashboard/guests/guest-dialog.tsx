"use client"

import type { UUID } from "node:crypto"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { createGuest, updateGuest } from "@/actions/guests"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Guest } from "@/db/schema"

interface GuestDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  guest: Guest | null
}

export function GuestDialog({ open, onOpenChange, guest }: GuestDialogProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    description: "",
  })

  useEffect(() => {
    if (guest) {
      setFormData({
        fullName: guest.fullName,
        phone: guest.phone || "",
        description: guest.description || "",
      })
    } else {
      setFormData({
        fullName: "",
        phone: "",
        description: "",
      })
    }
  }, [guest])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fullName.trim()) {
      toast.error("نام و نام خانوادگی مهمان الزامی است")
      return
    }

    setLoading(true)

    try {
      if (guest) {
        await updateGuest(guest.id as UUID, {
          fullName: formData.fullName,
          phone: formData.phone || undefined,
          description: formData.description || undefined,
        })
        toast.success("اطلاعات مهمان با موفقیت به‌روزرسانی شد")
      } else {
        await createGuest({
          fullName: formData.fullName,
          phone: formData.phone || undefined,
          description: formData.description || undefined,
        })
        toast.success("مهمان جدید با موفقیت اضافه شد")
      }

      onOpenChange(false)
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "خطایی رخ داده است")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {guest ? "ویرایش مهمان" : "افزودن مهمان جدید"}
            </DialogTitle>
            <DialogDescription>
              {guest
                ? "اطلاعات مهمان را ویرایش کنید"
                : "اطلاعات مهمان جدید را وارد کنید"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">نام و نام خانوادگی *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={e =>
                  setFormData(prev => ({ ...prev, fullName: e.target.value }))
                }
                placeholder="نام کامل مهمان"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">شماره تماس</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={e =>
                  setFormData(prev => ({ ...prev, phone: e.target.value }))
                }
                placeholder="09123456789"
                maxLength={16}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">توضیحات</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="یادداشت‌ها و توضیحات اضافی درباره مهمان..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              انصراف
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              {guest ? "به‌روزرسانی" : "افزودن"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
