import "./globals.css"
import localFont from "@next/font/local"
import { Inter } from "@next/font/google"
import { AnalyticsWrapper } from "./components/analytics"
import clsx from "clsx"

const satoshi = localFont({
  src: "./Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "400 600",
  display: "swap",
})

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={clsx(satoshi.variable, inter.variable)}>
      <head>
        <title>Chirp</title>
        <meta name="description" content="Embed Tweets in your Figma or FigJam files" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-100">
        {children}
        <AnalyticsWrapper />
      </body>
    </html>
  )
}
