import type { Metadata } from "next"

import { danaFont } from "@/fonts/font"
import "@/app/globals.css"

import { ThemeProvider } from "@/components/providers/theme-provider"

export const metadata: Metadata = {
  title: "مهماندار",
  description: "مهماندار | مدیریت هتل و مهمانسرا",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${danaFont.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
