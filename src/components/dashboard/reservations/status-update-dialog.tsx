"use client"

import type { UUID } from "node:crypto"
import { BookmarkCheck, CheckCircle2, Loader2, XCircle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { updateReservationStatus } from "@/actions/reservations"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type ReservationStatus = "reserved" | "checked-in" | "checked-out" | "cancelled"

interface Reservation {
  id: UUID
  status: ReservationStatus
  guest: {
    fullName: string
  } | null
  room: {
    name: string
  } | null
}

interface StatusUpdateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reservation: Reservation | null
}

export function StatusUpdateDialog({
  open,
  onOpenChange,
  reservation,
}: StatusUpdateDialogProps) {
  const [loading, setLoading] = useState(false)

  const statusOptions: Array<{
    value: ReservationStatus
    label: string
    icon: typeof BookmarkCheck
    color: string
    description: string
  }> = [
    {
      value: "reserved",
      label: "رزرو شده",
      icon: BookmarkCheck,
      color: "text-blue-600",
      description: "رزرو ثبت شده و در انتظار تایید",
    },
    {
      value: "checked-in",
      label: "چک‌این شده",
      icon: CheckCircle2,
      color: "text-blue-600",
      description: "مهمان وارد هتل شده است",
    },
    {
      value: "checked-out",
      label: "چک‌اوت شده",
      icon: CheckCircle2,
      color: "text-gray-600",
      description: "مهمان از هتل خارج شده است",
    },
    {
      value: "cancelled",
      label: "لغو شده",
      icon: XCircle,
      color: "text-red-600",
      description: "رزرو لغو شده است",
    },
  ]

  async function handleStatusUpdate(newStatus: ReservationStatus) {
    if (!reservation) return

    try {
      setLoading(true)
      await updateReservationStatus(reservation.id, newStatus)
      toast.success("وضعیت رزرو با موفقیت به‌روزرسانی شد")
      onOpenChange(false)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "خطا در به‌روزرسانی وضعیت"
      )
    } finally {
      setLoading(false)
    }
  }

  if (!reservation) return null

  const currentStatus = statusOptions.find(s => s.value === reservation.status)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle>تغییر وضعیت رزرو</DialogTitle>
          <div className="space-y-2 mt-2 opacity-60">
            <div>
              <span className="font-medium">مهمان:</span>{" "}
              {reservation.guest?.fullName || "نامشخص"}
            </div>
            <div>
              <span className="font-medium">اتاق:</span>{" "}
              {reservation.room?.name || "نامشخص"}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">وضعیت فعلی:</span>
              {currentStatus && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <currentStatus.icon className="h-3 w-3" />
                  {currentStatus.label}
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-2 py-4">
          <p className="text-sm font-medium mb-3">انتخاب وضعیت جدید:</p>
          {statusOptions.map(status => {
            const StatusIcon = status.icon
            const isCurrentStatus = status.value === reservation.status

            return (
              <Button
                key={status.value}
                variant={isCurrentStatus ? "secondary" : "outline"}
                className="w-full justify-start h-auto py-3"
                onClick={() => handleStatusUpdate(status.value)}
                disabled={loading || isCurrentStatus}
              >
                <div className="flex items-start gap-3 text-right">
                  <StatusIcon className={`h-5 w-5 mt-0.5 ${status.color}`} />
                  <div className="flex-1">
                    <div className="font-medium">{status.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {status.description}
                    </div>
                  </div>
                  {isCurrentStatus && (
                    <Badge variant="secondary" className="mr-auto">
                      فعلی
                    </Badge>
                  )}
                </div>
              </Button>
            )
          })}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            بستن
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
