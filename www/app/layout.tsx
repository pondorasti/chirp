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
  themeColor: "#fff",
  category: "technology",
  generator: "Next.js",
  keywords: ["twitter", "tweet", "figma", "figjam", "embed"],
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://chirp.alexandru.so",
    siteName: TITLE,
    // images: [ todo
    //   {
    //     url: "https://nextjs.org/og-alt.png",
    //     width: 1800,
    //     height: 1600,
    //     alt: "My custom alt",
    //   },
    // ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    site: "@pondorasti",
    creator: "@pondorasti",
    // images: ["https://nextjs.org/og.png"], // todo
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={clsx(satoshi.variable, inter.variable)}>
      <body className="bg-gray-100 antialiased overscroll-none h-screen w-screen relative overflow-hidden">
        {children}
        <AnalyticsWrapper />
      </body>
    </html>
  )
}
