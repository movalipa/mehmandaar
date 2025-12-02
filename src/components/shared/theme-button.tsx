"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useIsMounted } from "@/hooks/use-is-mounted"
import { Button, type ButtonProps } from "../ui/button"
import { Skeleton } from "../ui/skeleton"

const ThemeButton = (props: ButtonProps) => {
  const { resolvedTheme, setTheme } = useTheme()
  const isLight = resolvedTheme === "light"

  // this fixes the hydration error
  const isMounted = useIsMounted()
  if (!isMounted) {
    return <Skeleton className="w-9 h-9" />
  }

  return (
    <Button
      size="icon"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      {...props}
    >
      {isLight ? <Sun /> : <Moon />}
    </Button>
  )
}

export default ThemeButton
