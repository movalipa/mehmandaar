"use client"

import type { UUID } from "node:crypto"
import { AlertTriangle, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteReservation } from "@/db/actions/reservations"

interface Reservation {
  id: UUID
  guest: {
    fullName: string
  } | null
  room: {
    name: string
  } | null
  checkIn: Date
  checkOut: Date
}

interface DeleteReservationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reservation: Reservation | null
}

export function DeleteReservationDialog({
  open,
  onOpenChange,
  reservation,
}: DeleteReservationDialogProps) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!reservation) return

    try {
      setLoading(true)
      await deleteReservation(reservation.id)
      toast.success("رزرو با موفقیت حذف شد")
      onOpenChange(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "خطا در حذف رزرو")
    } finally {
      setLoading(false)
    }
  }

  if (!reservation) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <AlertDialogTitle>حذف رزرو</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-right space-y-2">
            <p>
              آیا از حذف این رزرو اطمینان دارید؟ این عملیات قابل بازگشت نیست.
            </p>
            <div className="bg-muted p-3 rounded-md space-y-1 text-sm">
              <div>
                <span className="font-medium">مهمان:</span>{" "}
                {reservation.guest?.fullName || "نامشخص"}
              </div>
              <div>
                <span className="font-medium">اتاق:</span>{" "}
                {reservation.room?.name || "نامشخص"}
              </div>
              <div>
                <span className="font-medium">تاریخ ورود:</span>{" "}
                {new Date(reservation.checkIn).toLocaleDateString("fa-IR")}
              </div>
              <div>
                <span className="font-medium">تاریخ خروج:</span>{" "}
                {new Date(reservation.checkOut).toLocaleDateString("fa-IR")}
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            انصراف
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            حذف رزرو
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
