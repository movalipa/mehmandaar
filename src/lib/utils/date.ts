/**
 * فرمت کردن تاریخ به شمسی
 */
export function formatDateToPersian(date: Date | null): string {
  if (!date) return "نامشخص"
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date))
}

/**
 * دریافت تاریخ امروز (ابتدای روز)
 */
export function getStartOfToday(): Date {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

/**
 * دریافت تاریخ فردا (ابتدای روز)
 */
export function getStartOfTomorrow(): Date {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  return tomorrow
}
