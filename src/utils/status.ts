export type ReservationStatus =
  | "reserved"
  | "checked-in"
  | "checked-out"
  | "cancelled"

export type StatusBadgeConfig = {
  label: string
  variant: "default" | "secondary" | "destructive" | "outline"
}

/**
 * دریافت تنظیمات بج برای وضعیت رزرو
 */
export function getStatusBadge(status: string | null): StatusBadgeConfig {
  const statusMap: Record<ReservationStatus, StatusBadgeConfig> = {
    reserved: { label: "رزرو شده", variant: "secondary" },
    "checked-in": { label: "چک‌این شده", variant: "default" },
    "checked-out": { label: "چک‌اوت شده", variant: "outline" },
    cancelled: { label: "کنسل شده", variant: "destructive" },
  }

  return (
    statusMap[status as ReservationStatus] || {
      label: "نامشخص",
      variant: "secondary",
    }
  )
}
