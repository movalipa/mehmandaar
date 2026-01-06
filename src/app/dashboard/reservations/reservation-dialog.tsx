"use client"

import type { UUID } from "node:crypto"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, Loader2 } from "lucide-react"
import { useEffect, useEffectEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import {
  createReservation,
  getGuestsForReservation,
  getRoomsForReservation,
  updateReservation,
} from "@/actions/reservations"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { addDays, formatDateToPersian, getStartOfToday } from "@/lib/utils/date"

const formSchema = z
  .object({
    guestId: z.string().min(1, "انتخاب مهمان الزامی است"),
    roomId: z.string().min(1, "انتخاب اتاق الزامی است"),
    checkIn: z.date({ error: "تاریخ ورود الزامی است" }),
    checkOut: z.date({ error: "تاریخ خروج الزامی است" }),
  })
  .refine(data => data.checkOut > data.checkIn, {
    message: "تاریخ خروج باید بعد از تاریخ ورود باشد",
    path: ["checkOut"],
  })

type FormValues = z.infer<typeof formSchema>

interface Guest {
  id: UUID
  fullName: string
  phone: string | null
}

interface Room {
  id: UUID
  name: string
  singleBeds: number
  doubleBeds: number
}

interface Reservation {
  id: UUID
  checkIn: Date
  checkOut: Date
  guest: { id: UUID } | null
  room: { id: UUID } | null
}

interface ReservationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  reservation: Reservation | null
}

export function ReservationDialog({
  open,
  onOpenChange,
  reservation,
}: ReservationDialogProps) {
  const [loading, setLoading] = useState(false)
  const [guests, setGuests] = useState<Guest[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [loadingData, setLoadingData] = useState(true)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guestId: "",
      roomId: "",
      checkIn: undefined,
      checkOut: undefined,
    },
  })

  useEffect(() => {
    if (open) loadData()
    else
      form.reset({
        guestId: "",
        roomId: "",
        checkIn: undefined,
        checkOut: undefined,
      })
  }, [open, form])

  useEffect(() => {
    if (reservation) {
      form.reset({
        guestId: reservation.guest?.id || "",
        roomId: reservation.room?.id || "",
        checkIn: new Date(reservation.checkIn),
        checkOut: new Date(reservation.checkOut),
      })
    } else {
      form.reset({
        guestId: "",
        roomId: "",
        checkIn: undefined,
        checkOut: undefined,
      })
    }
  }, [reservation, form])

  const loadData = useEffectEvent(async () => {
    try {
      setLoadingData(true)
      const [guestsData, roomsData] = await Promise.all([
        getGuestsForReservation(),
        getRoomsForReservation(),
      ])
      setGuests(guestsData)
      setRooms(roomsData)
    } catch (_) {
      toast.error("خطا در بارگذاری اطلاعات")
    } finally {
      setLoadingData(false)
    }
  })

  async function onSubmit(values: FormValues) {
    try {
      setLoading(true)

      if (reservation) {
        await updateReservation(reservation.id, {
          guestId: values.guestId as UUID,
          roomId: values.roomId as UUID,
          checkIn: values.checkIn,
          checkOut: values.checkOut,
        })
        toast.success("رزرو با موفقیت به‌روزرسانی شد")
      } else {
        await createReservation({
          guestId: values.guestId as UUID,
          roomId: values.roomId as UUID,
          checkIn: values.checkIn,
          checkOut: values.checkOut,
        })
        toast.success("رزرو جدید با موفقیت ایجاد شد")
      }

      onOpenChange(false)
      form.reset()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "خطا در ذخیره رزرو")
    } finally {
      setLoading(false)
    }
  }

  const minCheckInDate = getStartOfToday()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>{reservation ? "ویرایش رزرو" : "رزرو جدید"}</DialogTitle>
          <DialogDescription>
            {reservation
              ? "اطلاعات رزرو را ویرایش کنید"
              : "یک رزرو جدید ایجاد کنید"}
          </DialogDescription>
        </DialogHeader>

        {loadingData ? (
          <div className="space-y-3">
            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="guestId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>مهمان</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="انتخاب مهمان" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {guests.map(guest => (
                          <SelectItem key={guest.id} value={guest.id}>
                            <div className="flex gap-4 items-center">
                              <span>{guest.fullName}</span>
                              {guest.phone && (
                                <span className="text-xs text-muted-foreground">
                                  {guest.phone}
                                </span>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roomId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اتاق</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="انتخاب اتاق" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {rooms.map(room => (
                          <SelectItem key={room.id} value={room.id}>
                            <div className="flex items-center justify-between gap-4">
                              <span>{room.name}</span>
                              <span className="text-xs text-muted-foreground">
                                ظرفیت: {room.singleBeds + room.doubleBeds * 2}{" "}
                                نفر
                              </span>
                              <span className="text-xs text-muted-foreground">
                                تخت دونفره: {room.doubleBeds}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                تخت تک‌نفره: {room.singleBeds}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="checkIn"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>تاریخ ورود</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-right font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                              disabled={loading}
                            >
                              {field.value ? (
                                formatDateToPersian(field.value)
                              ) : (
                                <span>انتخاب تاریخ</span>
                              )}
                              <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={date => date < minCheckInDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="checkOut"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>تاریخ خروج</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-right font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                              disabled={loading}
                            >
                              {field.value ? (
                                formatDateToPersian(field.value)
                              ) : (
                                <span>انتخاب تاریخ</span>
                              )}
                              <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={date => {
                              const checkIn = form.watch("checkIn")
                              if (!checkIn) return date < minCheckInDate
                              const minCheckOut = addDays(checkIn, 1)
                              return date < minCheckOut
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
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
                  {reservation ? "به‌روزرسانی" : "ایجاد رزرو"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  )
}
