"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button, type ButtonProps } from "../ui/button"

const ThemeButton = (props: ButtonProps) => {
  const { resolvedTheme, setTheme } = useTheme()
  const isLight = resolvedTheme === "light"

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
