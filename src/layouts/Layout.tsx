import type { ReactNode } from "react"

import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Hero from "@/components/Hero"

type Props = {
  children: ReactNode
  showHero?: boolean
}

function Layout({ children, showHero = false }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="mx-auto w-full max-w-[960px] flex-1 px-4 py-8">
        {showHero ? <Hero /> : null}
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
