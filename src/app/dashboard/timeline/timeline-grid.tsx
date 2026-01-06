"use client"

import type { UUID } from "node:crypto"
import { useMemo } from "react"
import { cn } from "@/utils/utils"

type ReservationStatus = "reserved" | "checked-in" | "checked-out" | "cancelled"

interface Room {
  id: UUID
  name: string
  singleBeds: number
  doubleBeds: number
}

interface TimelineReservation {
  id: UUID
  checkIn: Date
  checkOut: Date
  status: ReservationStatus
  guest: {
    id: UUID
    fullName: string
    phone: string | null
  } | null
  room: {
    id: UUID
    name: string
  } | null
}

interface TimelineGridProps {
  rooms: Room[]
  reservations: TimelineReservation[]
  dateRange: { start: Date; end: Date }
  viewMode: "day" | "week" | "month"
}

export function TimelineGrid({
  rooms,
  reservations,
  dateRange,
  viewMode,
}: TimelineGridProps) {
  const dates = useMemo(() => {
    const days: Date[] = []
    const current = new Date(dateRange.start)

    while (current <= dateRange.end) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }

    return days
  }, [dateRange])

  const getStatusColor = (status: ReservationStatus) => {
    switch (status) {
      case "reserved":
        return "bg-blue-500"
      case "checked-in":
        return "bg-green-500"
      case "checked-out":
        return "bg-gray-400"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-300"
    }
  }

  const calculatePosition = (checkIn: Date, checkOut: Date) => {
    const gridStart = dateRange.start.getTime()
    const gridEnd = dateRange.end.getTime()
    const totalDuration = gridEnd - gridStart

    const reservationStart = Math.max(new Date(checkIn).getTime(), gridStart)
    const reservationEnd = Math.min(new Date(checkOut).getTime(), gridEnd)

    const right = ((reservationStart - gridStart) / totalDuration) * 100
    const width = ((reservationEnd - reservationStart) / totalDuration) * 100

    return { right: `${right}%`, width: `${width}%` }
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const cellWidth = viewMode === "day" ? "100px" : "80px"
  const minCellHeight = "60px"

  return (
    <div
      className="overflow-auto"
      style={{ maxHeight: "calc(100vh - 300px)" }}
      dir="rtl"
    >
      <div className="min-w-max">
        <div className="flex sticky top-0 bg-background z-20 border-b">
          <div className="w-40 p-3 border-r font-semibold bg-muted/50 shrink-0">
            اتاق
          </div>
          <div className="flex flex-1">
            {dates.map(date => {
              const isToday = date.getTime() === today.getTime()
              return (
                <div
                  key={date.toString()}
                  className={cn(
                    "p-3 border-r text-center shrink-0",
                    isToday && "bg-primary/10"
                  )}
                  style={{ minWidth: cellWidth }}
                >
                  <div className="text-xs font-medium">
                    {date.toLocaleDateString("fa-IR", { weekday: "short" })}
                  </div>
                  <div
                    className={cn(
                      "text-sm",
                      isToday && "font-bold text-primary"
                    )}
                  >
                    {date.toLocaleDateString("fa-IR", {
                      day: "numeric",
                      month: viewMode === "month" ? undefined : "short",
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {rooms.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            هیچ اتاقی یافت نشد
          </div>
        ) : (
          rooms.map(room => {
            const roomReservations = reservations.filter(
              r => r.room?.id === room.id
            )

            return (
              <div key={room.id} className="flex border-b hover:bg-muted/30">
                <div
                  className="w-40 p-3 border-r shrink-0 sticky right-0 bg-background z-10"
                  style={{ minHeight: minCellHeight }}
                >
                  <div className="font-medium">{room.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {room.singleBeds + room.doubleBeds * 2} نفر
                  </div>
                </div>

                <div
                  className="flex-1 relative"
                  style={{ minHeight: minCellHeight }}
                >
                  <div className="flex absolute inset-0">
                    {dates.map(date => {
                      const isToday = date.getTime() === today.getTime()
                      return (
                        <div
                          key={date.toString()}
                          className={cn(
                            "border-r shrink-0",
                            isToday && "bg-primary/5"
                          )}
                          style={{ minWidth: cellWidth }}
                        />
                      )
                    })}
                  </div>

                  <div className="absolute inset-0 p-1">
                    {roomReservations.map(reservation => {
                      const position = calculatePosition(
                        reservation.checkIn,
                        reservation.checkOut
                      )

                      return (
                        <div
                          key={reservation.id}
                          className={cn(
                            "absolute top-1 bottom-1 rounded px-2 py-1 text-white text-xs overflow-hidden cursor-pointer hover:opacity-90 transition-opacity",
                            getStatusColor(reservation.status)
                          )}
                          style={{
                            right: position.right,
                            width: position.width,
                            minWidth: "60px",
                          }}
                          title={`${reservation.guest?.fullName || "نامشخص"} - ${new Date(reservation.checkIn).toLocaleDateString("fa-IR")} تا ${new Date(reservation.checkOut).toLocaleDateString("fa-IR")}`}
                        >
                          <div className="font-medium truncate">
                            {reservation.guest?.fullName || "نامشخص"}
                          </div>
                          {parseFloat(position.width) > 15 && (
                            <div className="text-[10px] opacity-90">
                              {new Date(reservation.checkIn).toLocaleDateString(
                                "fa-IR",
                                { month: "numeric", day: "numeric" }
                              )}{" "}
                              -{" "}
                              {new Date(
                                reservation.checkOut
                              ).toLocaleDateString("fa-IR", {
                                month: "numeric",
                                day: "numeric",
                              })}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      <div className="mt-4 flex items-center gap-4 text-sm">
        <span className="text-muted-foreground">وضعیت:</span>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-blue-500" />
          <span>رزرو شده</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span>چک‌این شده</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-gray-400" />
          <span>چک‌اوت شده</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span>لغو شده</span>
        </div>
      </div>
    </div>
  )
}
