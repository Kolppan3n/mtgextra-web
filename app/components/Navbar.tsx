import Link from "next/link"

export default function Navbar() {
  const links = [
    { href: "/archenemy", name: "Archenemy" },
    { href: "/bounty", name: "Bounty" },
    { href: "/planechase", name: "Planechase" },
    { href: "/usurper", name: "Usurper" },
  ]

  return (
    <nav className="flex justify-center h-[80px] p-4 bg-gradient-to-t from-transparent to-background_old-dark">
      <div className="flex flex-row items-center mt-2 lg:mt-0">
        {links.map((link) => (
          <Link key={link.name} href={link.href} className="hover:text-stone-white text-xl my-1 sm:mx-4 sm:my-0">
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}
