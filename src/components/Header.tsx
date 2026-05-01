import { Link } from "react-router"

import MainNav from "@/components/MainNav"
import MobileNav from "@/components/MobileNav"

function Header() {
  return (
    <header className="bg-white">
      <div className="mx-auto flex w-full max-w-[960px] items-center justify-between border-b-2 border-orange-500 px-4 py-5">
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
