import { Link } from "react-router"

import MainNav from "@/components/MainNav"
import MobileNav from "@/components/MobileNav"

function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link
          to="/"
          className="text-2xl font-bold text-orange-500"
        >
          AppITZFood.com
        </Link>
        <div className="flex items-center gap-2">
          <MainNav />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
