"use client"

import type { UUID } from "node:crypto"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteStaff } from "@/db/actions/staff"

type StaffRole = "owner" | "manager" | "receptionist" | "staff"

interface StaffMember {
  id: UUID
  firstName: string
  lastName: string
  role: StaffRole
}

interface DeleteStaffDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  staff: StaffMember | null
}

export function DeleteStaffDialog({
  open,
  onOpenChange,
  staff,
}: DeleteStaffDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!staff) return

    setIsDeleting(true)
    try {
      await deleteStaff(staff.id)
      toast.success("کارمند با موفقیت حذف شد")
      onOpenChange(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "خطایی رخ داد")
    } finally {
      setIsDeleting(false)
    }
  }

  if (!staff) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>آیا مطمئن هستید؟</AlertDialogTitle>
          <AlertDialogDescription>
            این عمل قابل بازگشت نیست. کارمند{" "}
            <span className="font-bold">
              {staff.firstName} {staff.lastName}
            </span>{" "}
            به طور کامل حذف خواهد شد.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>انصراف</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive hover:bg-destructive/90"
          >
            {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
            حذف کارمند
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
