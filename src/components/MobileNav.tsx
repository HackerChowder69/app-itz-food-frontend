import { useState } from "react"

import { Menu, ShieldAlert } from "lucide-react"
import { useNavigate } from "react-router"

import { useAppAuth } from "@/auth/useAppAuth"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

function MobileNav() {
  const navigate = useNavigate()
  const { isAuthenticated, isAuthConfigured, loginWithRedirect, logout, user } =
    useAppAuth()
  const [open, setOpen] = useState(false)

  const goToProfile = () => {
    setOpen(false)
    navigate("/user-profile")
  }

  const goToOrders = () => {
    setOpen(false)
    navigate("/order-status")
  }

  const handleLogin = async () => {
    setOpen(false)
    await loginWithRedirect()
  }

  const handleLogout = async () => {
    setOpen(false)
    await logout()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="md:hidden" aria-label="Abrir menu">
        <Menu className="h-6 w-6 text-orange-500" />
      </SheetTrigger>
      <SheetContent side="right" className="py-3">
        <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
        <Separator className="my-3" />
        <SheetDescription className="text-sm text-muted-foreground">
          Acceso rapido
        </SheetDescription>
        <div className="space-y-3 pt-3">
          {!isAuthConfigured ? (
            <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <p className="flex items-center gap-2 font-medium">
                <ShieldAlert className="h-4 w-4" />
                Auth0 pendiente
              </p>
              <p className="mt-1 text-xs text-amber-700">
                La navegacion ya corre, pero falta conectar las credenciales.
              </p>
            </div>
          ) : isAuthenticated ? (
            <>
              <div className="rounded-md border bg-slate-50 px-4 py-3 text-sm text-slate-700">
                <p className="font-medium text-slate-900">Sesion activa</p>
                <p className="truncate text-xs text-slate-500">{user?.email}</p>
              </div>
              <button
                type="button"
                onClick={goToOrders}
                className="flex h-10 items-center justify-center rounded-md border border-orange-200 bg-white text-sm font-medium text-slate-800 transition hover:bg-orange-50"
              >
                Mis ordenes
              </button>
              <button
                type="button"
                onClick={goToProfile}
                className="flex h-10 items-center justify-center rounded-md border border-orange-200 bg-white text-sm font-medium text-slate-800 transition hover:bg-orange-50"
              >
                Mi perfil
              </button>
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600"
                onClick={() => void handleLogout()}
              >
                Cerrar sesion
              </Button>
            </>
          ) : (
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600"
              onClick={() => void handleLogin()}
            >
              Iniciar sesion
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
