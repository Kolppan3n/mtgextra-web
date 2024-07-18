import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "./components/Navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MTGExtra - Planechase, Archenemy and more",
  description: "Spice up you MTG multiplayer experience with these funky formats",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`${inter.className} dark h-screen w-screen relative overflow-hidden lg:static lg:flex lg:flex-grow lg:flex-col`}
      >
        <Navbar className="absolute top-0 left-0 right-0 z-10 lg:static" />
        <div className="absolute w-full h-full flex items-center justify-center lg:static">{children}</div>
      </body>
    </html>
  )
}

export default RootLayout
