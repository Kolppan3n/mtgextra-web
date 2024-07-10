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
      <body className={`${inter.className} dark h-screen w-screen relative md:static md:flex md:flex-col`}>
        <Navbar className="absolute top-0 left-0 right-0 z-100 md:static" />
        <div className="absolute z-0 top-0 bottom-0 right-0 left-0 w-full h-screen flex items-center justify-center md:h-full md:static pointer-events-none">
          {children}
        </div>
      </body>
    </html>
  )
}

export default RootLayout
