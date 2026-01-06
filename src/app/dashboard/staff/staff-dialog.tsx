"use client"

import type { UUID } from "node:crypto"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createStaff, updateStaff } from "@/db/actions/staff"

type StaffRole = "owner" | "manager" | "receptionist" | "staff"

interface StaffMember {
  id: UUID
  firstName: string
  lastName: string
  phone: string
  role: StaffRole
}

interface StaffDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  staff: StaffMember | null
  currentUserRole: StaffRole
}

const formSchema = z.object({
  firstName: z.string().min(2, "نام باید حداقل ۲ کاراکتر باشد"),
  lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ کاراکتر باشد"),
  phone: z.string().regex(/^09\d{9}$/, "شماره تلفن معتبر نیست"),
  role: z.enum(["owner", "manager", "receptionist", "staff"]),
})

type FormValues = z.infer<typeof formSchema>

export function StaffDialog({
  open,
  onOpenChange,
  staff,
  currentUserRole,
}: StaffDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      role: "staff",
    },
  })

  useEffect(() => {
    if (staff) {
      form.reset({
        firstName: staff.firstName,
        lastName: staff.lastName,
        phone: staff.phone,
        role: staff.role,
      })
    } else {
      form.reset({
        firstName: "",
        lastName: "",
        phone: "",
        role: "staff",
      })
    }
  }, [staff, form])

  const onSubmit = async (data: FormValues) => {
    try {
      if (staff) {
        await updateStaff(staff.id, data)
        toast.success("کارمند با موفقیت ویرایش شد")
      } else {
        await createStaff(data)
        toast.success("کارمند با موفقیت اضافه شد")
      }
      onOpenChange(false)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "خطایی رخ داد")
    }
  }

  const availableRoles =
    currentUserRole === "owner"
      ? ["owner", "manager", "receptionist", "staff"]
      : ["manager", "receptionist", "staff"]

  const roleLabels: Record<StaffRole, string> = {
    owner: "مالک",
    manager: "مدیر",
    receptionist: "پذیرش",
    staff: "کارمند",
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>
            {staff ? "ویرایش کارمند" : "افزودن کارمند جدید"}
          </DialogTitle>
          <DialogDescription>
            {staff
              ? "اطلاعات کارمند را ویرایش کنید"
              : "اطلاعات کارمند جدید را وارد کنید"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام</FormLabel>
                  <FormControl>
                    <Input placeholder="علی" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام خانوادگی</FormLabel>
                  <FormControl>
                    <Input placeholder="محمدی" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شماره تماس</FormLabel>
                  <FormControl>
                    <Input placeholder="09123456789" dir="ltr" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نقش</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="نقش را انتخاب کنید" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableRoles.map(role => (
                        <SelectItem key={role} value={role}>
                          {roleLabels[role as StaffRole]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    سطح دسترسی کارمند را انتخاب کنید
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                انصراف
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {staff ? "ذخیره تغییرات" : "افزودن کارمند"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
