"use client"

import Link from "next/link"
import { useMediaQuery } from "../hooks/use-media-query"
import { MenuIcon } from "lucide-react"
import { FC } from "react"
import { cn } from "../utils"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./Sheet"

interface NavbarProps {
  className?: string
}

const Navbar: FC<NavbarProps> = ({ className }) => {
  const isMobile = useMediaQuery("(max-width: 1024px)")
  const links = [
    { href: "/archenemy", name: "Archenemy" },
    { href: "/bounty", name: "Bounty" },
    { href: "/planechase", name: "Planechase" },
    { href: "/usurper", name: "Usurper" },
  ]

  return isMobile ? (
    <div className={cn("flex justify-center", className)}>
      <Sheet>
        <SheetTrigger>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Gamemodes</SheetTitle>
            <SheetDescription>Lista kaikista pelimuodoista joita voi pelata.</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col">
            {links.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-stone-white text-xl my-1 sm:mx-4 sm:my-0">
                {link.name}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  ) : (
    <nav
      className={cn(
        "flex justify-center h-[80px] p-4 bg-gradient-to-t from-transparent to-background_old-dark",
        className
      )}
    >
      <div className="flex flex-row items-center">
        {links.map((link) => (
          <Link key={link.name} href={link.href} className="hover:text-stone-white text-xl my-1 sm:mx-4 sm:my-0">
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
