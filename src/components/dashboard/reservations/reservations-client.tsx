"use client"

import type { UUID } from "node:crypto"
import {
  BookmarkCheck,
  Calendar,
  CheckCircle2,
  Clock,
  Edit,
  Plus,
  Search,
  Trash2,
  XCircle,
} from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DeleteReservationDialog } from "./delete-reservation-dialog"
import { ReservationDialog } from "./reservation-dialog"
import { StatusUpdateDialog } from "./status-update-dialog"

type ReservationStatus = "reserved" | "checked-in" | "checked-out" | "cancelled"

interface Reservation {
  id: UUID
  checkIn: Date
  checkOut: Date
  status: ReservationStatus
  createdAt: Date
  checkedInAt: Date | null
  checkedOutAt: Date | null
  guest: {
    id: UUID
    fullName: string
    phone: string | null
  } | null
  room: {
    id: UUID
    name: string
    singleBeds: number
    doubleBeds: number
  } | null
}

interface ReservationsClientProps {
  reservations: Reservation[]
  stats: {
    total: number
    reserved: number
    checkedIn: number
    checkedOut: number
    cancelled: number
    checkInToday: number
    checkOutToday: number
  }
  hotelId: UUID
}

export function ReservationsClient({
  reservations,
  stats,
  hotelId,
}: ReservationsClientProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | ReservationStatus>(
    "all"
  )

  const getStatusConfig = (status: ReservationStatus) => {
    const configs = {
      reserved: {
        label: "رزرو شده",
        variant: "secondary" as const,
        icon: BookmarkCheck,
        color: "text-blue-600",
      },
      confirmed: {
        label: "تایید شده",
        variant: "default" as const,
        icon: CheckCircle2,
        color: "text-green-600",
      },
      "checked-in": {
        label: "چک‌این شده",
        variant: "default" as const,
        icon: CheckCircle2,
        color: "text-blue-600",
      },
      "checked-out": {
        label: "چک‌اوت شده",
        variant: "outline" as const,
        icon: CheckCircle2,
        color: "text-gray-600",
      },
      cancelled: {
        label: "لغو شده",
        variant: "destructive" as const,
        icon: XCircle,
        color: "text-red-600",
      },
    }
    return configs[status]
  }

  const statsConfig = [
    {
      label: "کل رزروها",
      value: stats.total.toString(),
      description: `${stats.reserved} رزرو جدید`,
      icon: Calendar,
    },
    {
      label: "رزرو شده",
      value: stats.reserved.toString(),
      description: "نیاز به تایید",
      icon: BookmarkCheck,
    },
    {
      label: "چک‌این امروز",
      value: stats.checkInToday.toString(),
      description: `${stats.checkedIn} در حال اقامت`,
      icon: CheckCircle2,
    },
    {
      label: "چک‌اوت امروز",
      value: stats.checkOutToday.toString(),
      description: `${stats.checkedOut} تکمیل شده`,
      icon: Clock,
    },
  ]

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch =
      reservation.guest?.fullName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      reservation.guest?.phone?.includes(searchQuery) ||
      reservation.room?.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === "all" || reservation.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleEdit = (reservation: Reservation) => {
    setSelectedReservation(reservation)
    setDialogOpen(true)
  }

  const handleDelete = (reservation: Reservation) => {
    setSelectedReservation(reservation)
    setDeleteDialogOpen(true)
  }

  const handleStatusChange = (reservation: Reservation) => {
    setSelectedReservation(reservation)
    setStatusDialogOpen(true)
  }

  const handleAddNew = () => {
    setSelectedReservation(null)
    setDialogOpen(true)
  }

  const calculateNights = (checkIn: Date, checkOut: Date) => {
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              مدیریت رزرواسیون‌ها
            </h2>
            <p className="text-muted-foreground">
              مشاهده و مدیریت تمام رزرواسیون‌های هتل
            </p>
          </div>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4" />
            رزرو جدید
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {statsConfig.map(stat => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>لیست رزرواسیون‌ها</CardTitle>
                <CardDescription>
                  {filteredReservations.length} رزرو یافت شد
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="جستجو..."
                    className="pr-8 w-62.5"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs
              dir="rtl"
              value={statusFilter}
              onValueChange={value => setStatusFilter(value as any)}
              className="space-y-4"
            >
              <TabsList>
                <TabsTrigger value="all">همه ({stats.total})</TabsTrigger>
                <TabsTrigger value="reserved">
                  رزرو شده ({stats.reserved})
                </TabsTrigger>
                <TabsTrigger value="checked-in">
                  چک‌این ({stats.checkedIn})
                </TabsTrigger>
                <TabsTrigger value="checked-out">
                  چک‌اوت ({stats.checkedOut})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={statusFilter} className="space-y-4">
                {filteredReservations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      {searchQuery
                        ? "هیچ رزروی یافت نشد"
                        : "هیچ رزروی ثبت نشده"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {searchQuery
                        ? "جستجوی خود را تغییر دهید"
                        : "برای شروع، اولین رزرو را ایجاد کنید"}
                    </p>
                    {!searchQuery && (
                      <Button onClick={handleAddNew}>
                        <Plus className="h-4 w-4" />
                        افزودن اولین رزرو
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="rounded-md border" dir="rtl">
                    <div className="grid grid-cols-7 gap-4 p-4 font-medium text-sm border-b bg-muted/50">
                      <div>مهمان</div>
                      <div>اتاق</div>
                      <div>تاریخ ورود</div>
                      <div>تاریخ خروج</div>
                      <div>مدت</div>
                      <div>وضعیت</div>
                      <div className="text-left">عملیات</div>
                    </div>
                    {filteredReservations.map(reservation => {
                      const statusConfig = getStatusConfig(reservation.status)
                      const StatusIcon = statusConfig.icon
                      const nights = calculateNights(
                        reservation.checkIn,
                        reservation.checkOut
                      )

                      return (
                        <div
                          key={reservation.id}
                          className="grid grid-cols-7 gap-4 p-4 items-center hover:bg-muted/50 transition-colors border-b last:border-0"
                        >
                          <div>
                            <p className="font-medium">
                              {reservation.guest?.fullName || "نامشخص"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {reservation.guest?.phone || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium">
                              {reservation.room?.name || "نامشخص"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {reservation.room &&
                                `${reservation.room.singleBeds + reservation.room.doubleBeds * 2} نفر`}
                            </p>
                          </div>
                          <div className="text-sm">
                            {new Date(reservation.checkIn).toLocaleDateString(
                              "fa-IR"
                            )}
                          </div>
                          <div className="text-sm">
                            {new Date(reservation.checkOut).toLocaleDateString(
                              "fa-IR"
                            )}
                          </div>
                          <div>
                            <Badge variant="outline">{nights} شب</Badge>
                          </div>
                          <div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleStatusChange(reservation)}
                              className="p-0 h-auto"
                            >
                              <Badge
                                variant={statusConfig.variant}
                                className="flex items-center gap-1 cursor-pointer"
                              >
                                <StatusIcon className="h-3 w-3" />
                                {statusConfig.label}
                              </Badge>
                            </Button>
                          </div>
                          <div className="flex items-center gap-2 justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(reservation)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(reservation)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <ReservationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        reservation={selectedReservation}
        hotelId={hotelId}
      />

      <StatusUpdateDialog
        open={statusDialogOpen}
        onOpenChange={setStatusDialogOpen}
        reservation={selectedReservation}
      />

      <DeleteReservationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        reservation={selectedReservation}
      />
    </>
  )
}
