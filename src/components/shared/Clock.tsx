"use client"

import { useEffect, useState } from "react"

export default function Clock() {
  const [time, setTime] = useState<string>("")

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("fa-IR", {
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })

    const updateTime = () => {
      setTime(formatter.format(new Date()))
    }

    updateTime() // set immediately
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center gap-1 text-sm font-medium">
      {time}
    </div>
  )
}
