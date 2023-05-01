import { Inter } from "next/font/google"
import localFont from "next/font/local"
import clsx from "clsx"
import { Metadata } from "next"
import { AnalyticsWrapper } from "./components/analytics"
import "./globals.css"

const satoshi = localFont({
  src: "../public/_static/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "400 600",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const TITLE = "Chirp"
const DESCRIPTION = "Embed Tweets in your Figma or FigJam files"

export const metadata: Metadata = {
  category: "technology",
  generator: "Next.js",
  keywords: ["twitter", "tweet", "figma", "figjam", "embed"],
  authors: [
    {
      name: "pondorasti",
      url: "https://alexandru.so",
    },
  ],
  creator: "pondorasti",
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    siteName: TITLE,
    title: TITLE,
    description: DESCRIPTION,
    url: "https://chirp.alexandru.so",
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@pondorasti",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={clsx(satoshi.variable, inter.variable)}>
      <body
        className="bg-gray-100 antialiased overscroll-none h-screen w-screen relative overflow-hidden"
        suppressHydrationWarning
      >
        {children}
        <AnalyticsWrapper />
      </body>
    </html>
  )
}
