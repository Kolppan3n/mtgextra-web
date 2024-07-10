"use client"

import Link from "next/link"
import { useMediaQuery } from "../hooks/use-media-query"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "./Drawer"
import { MenuIcon } from "lucide-react"
import { FC } from "react"
import { cn } from "../utils"

interface NavbarProps {
  className?: string
}

const Navbar: FC<NavbarProps> = ({ className }) => {
  const isMobile = !useMediaQuery("(min-width: 768px)")
  const links = [
    { href: "/archenemy", name: "Archenemy" },
    { href: "/bounty", name: "Bounty" },
    { href: "/planechase", name: "Planechase" },
    { href: "/usurper", name: "Usurper" },
  ]

  return isMobile ? (
    <Drawer direction="right">
      <DrawerTrigger>
        <MenuIcon />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Game Modes</DrawerTitle>
        </DrawerHeader>
        {links.map((link) => (
          <Link key={link.name} href={link.href} className="hover:text-stone-white text-xl my-1 sm:mx-4 sm:my-0">
            {link.name}
          </Link>
        ))}
      </DrawerContent>
    </Drawer>
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
