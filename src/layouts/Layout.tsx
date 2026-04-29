import type { ReactNode } from "react"

import Header from "@/components/Header"
import Hero from "@/components/Hero"

type Props = {
  children: ReactNode
  showHero?: boolean
}

function Layout({ children, showHero = false }: Props) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {showHero ? <Hero /> : null}
        {children}
      </main>
    </div>
  )
}

export default Layout
