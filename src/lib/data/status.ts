import type { reservationStatusEnum } from "@/db/schema"

type ReservationStatus = (typeof reservationStatusEnum.enumValues)[number]

export function getStatusBadge(status: ReservationStatus) {
  const statusConfig = {
    reserved: {
      label: "رزرو شده",
      variant: "secondary" as const,
    },
    "checked-in": {
      label: "ورود انجام شده",
      variant: "default" as const,
    },
    "checked-out": {
      label: "خروج انجام شده",
      variant: "outline" as const,
    },
    cancelled: {
      label: "لغو شده",
      variant: "destructive" as const,
    },
  }

  return statusConfig[status]
}

export function getStatusLabel(status: ReservationStatus): string {
  const labels = {
    reserved: "رزرو شده",
    "checked-in": "ورود انجام شده",
    "checked-out": "خروج انجام شده",
    cancelled: "لغو شده",
  }

  return labels[status]
}
