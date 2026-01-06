"use client"

import type { UUID } from "node:crypto"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useEffectEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getReservationsForTimeline } from "@/db/actions/reservations"
import { TimelineGrid } from "./timeline-grid"

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

interface TimelineClientProps {
  rooms: Room[]
}

type ViewMode = "day" | "week" | "month"

export function TimelineClient({ rooms }: TimelineClientProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("week")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [reservations, setReservations] = useState<TimelineReservation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const getDateRange = () => {
    const start = new Date(currentDate)
    const end = new Date(currentDate)

    switch (viewMode) {
      case "day":
        start.setHours(0, 0, 0, 0)
        end.setHours(23, 59, 59, 999)
        break
      case "week":
        start.setDate(start.getDate() - start.getDay())
        start.setHours(0, 0, 0, 0)
        end.setDate(start.getDate() + 6)
        end.setHours(23, 59, 59, 999)
        break
      case "month":
        start.setDate(1)
        start.setHours(0, 0, 0, 0)
        end.setMonth(end.getMonth() + 1)
        end.setDate(0)
        end.setHours(23, 59, 59, 999)
        break
    }

    return { start, end }
  }

  const getDateRangeEvent = useEffectEvent(getDateRange)

  useEffect(() => {
    const fetchReservations = async () => {
      setIsLoading(true)
      try {
        const { start, end } = getDateRangeEvent()
        const data = await getReservationsForTimeline(start, end)
        setReservations(data)
      } catch (error) {
        console.error("Error fetching reservations:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReservations()
  }, [])

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)

    switch (viewMode) {
      case "day":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
        break
      case "week":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
        break
      case "month":
        newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
        break
    }

    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const getViewTitle = () => {
    const { start, end } = getDateRange()

    switch (viewMode) {
      case "day":
        return start.toLocaleDateString("fa-IR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      case "week":
        return `${start.toLocaleDateString("fa-IR", {
          day: "numeric",
          month: "short",
        })} - ${end.toLocaleDateString("fa-IR", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}`
      case "month":
        return start.toLocaleDateString("fa-IR", {
          year: "numeric",
          month: "long",
        })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">تایم‌لاین رزروها</h2>
          <p className="text-muted-foreground">نمای زمانی اتاق‌ها و رزروها</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{getViewTitle()}</CardTitle>
              <CardDescription>
                {rooms.length} اتاق • {reservations.length} رزرو
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select
                value={viewMode}
                onValueChange={(value: ViewMode) => setViewMode(value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">روزانه</SelectItem>
                  <SelectItem value="week">هفتگی</SelectItem>
                  <SelectItem value="month">ماهانه</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" onClick={goToToday}>
                <Calendar className="h-4 w-4" />
                امروز
              </Button>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateDate("prev")}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigateDate("next")}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  در حال بارگذاری...
                </p>
              </div>
            </div>
          ) : (
            <TimelineGrid
              rooms={rooms}
              reservations={reservations}
              dateRange={getDateRange()}
              viewMode={viewMode}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
