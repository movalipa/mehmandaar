"use client"

import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
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
import { createRoom, updateRoom } from "@/db/actions/rooms"
import type { Room } from "@/db/schema"

interface RoomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  room?: Room | null
}

export function RoomDialog({ open, onOpenChange, room }: RoomDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    singleBeds: 0,
    doubleBeds: 0,
  })

  useEffect(() => {
    if (room) {
      setFormData({
        name: room.name,
        singleBeds: room.singleBeds,
        doubleBeds: room.doubleBeds,
      })
    } else {
      setFormData({
        name: "",
        singleBeds: 0,
        doubleBeds: 0,
      })
    }
  }, [room])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (room) {
        await updateRoom(room.id, formData)
        toast.success("اتاق با موفقیت ویرایش شد")
      } else {
        await createRoom(formData)
        toast.success("اتاق با موفقیت ایجاد شد")
      }
      onOpenChange(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "خطایی رخ داد")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-110">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {room ? "ویرایش اتاق" : "افزودن اتاق جدید"}
            </DialogTitle>
            <DialogDescription>
              {room
                ? "اطلاعات اتاق را ویرایش کنید"
                : "اطلاعات اتاق جدید را وارد کنید"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">نام اتاق</Label>
              <Input
                id="name"
                placeholder="مثال: ۲۰۱"
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="singleBeds">تعداد تخت یک نفره</Label>
              <Input
                id="singleBeds"
                type="number"
                min="0"
                value={formData.singleBeds}
                onChange={e =>
                  setFormData({
                    ...formData,
                    singleBeds: parseInt(e.target.value, 10) || 0,
                  })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="doubleBeds">تعداد تخت دو نفره</Label>
              <Input
                id="doubleBeds"
                type="number"
                min="0"
                value={formData.doubleBeds}
                onChange={e =>
                  setFormData({
                    ...formData,
                    doubleBeds: parseInt(e.target.value, 10) || 0,
                  })
                }
                required
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
              {loading ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  در حال پردازش...
                </>
              ) : room ? (
                "ویرایش"
              ) : (
                "ایجاد"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
