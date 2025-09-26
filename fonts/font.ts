import localFont from "next/font/local"

export const danaFont = localFont({
  src: [
    {
      path: "./DanaVF.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./DanaVF.woff",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-dana",
  display: "swap",
})
