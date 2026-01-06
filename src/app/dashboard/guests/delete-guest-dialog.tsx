"use client"

import type { UUID } from "node:crypto"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { deleteGuest } from "@/actions/guests"
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
import type { Guest } from "@/db/schema"

interface DeleteGuestDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  guest: Guest | null
}

export function DeleteGuestDialog({
  open,
  onOpenChange,
  guest,
}: DeleteGuestDialogProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!guest) return

    setLoading(true)

    try {
      await deleteGuest(guest.id as UUID)
      toast.success("مهمان با موفقیت حذف شد")
      onOpenChange(false)
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "خطایی رخ داده است")
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
            مهمان <strong>{guest?.fullName}</strong> به طور کامل حذف خواهد شد.
            این عملیات قابل بازگشت نیست.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>انصراف</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            حذف مهمان
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
