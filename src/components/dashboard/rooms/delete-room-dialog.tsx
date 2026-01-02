"use client"

import { Loader2, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { deleteRoom } from "@/actions/rooms"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import type { Room } from "@/db/schema"

interface DeleteRoomDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  room: Room | null
}

export function DeleteRoomDialog({
  open,
  onOpenChange,
  room,
}: DeleteRoomDialogProps) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!room) return

    setLoading(true)
    try {
      await deleteRoom(room.id)
      toast.success("اتاق با موفقیت حذف شد")
      onOpenChange(false)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "خطایی در حذف اتاق رخ داد"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>آیا مطمئن هستید؟</AlertDialogTitle>
          <AlertDialogDescription>
            این عملیات قابل بازگشت نیست. اتاق {room?.name} به طور کامل حذف خواهد
            شد.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>انصراف</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                در حال حذف...
              </>
            ) : (
              <>
                حذف
                <Trash2 className="h-4 w-4" />
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
