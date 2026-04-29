import { LogIn, LogOut, ShieldAlert, UserRound } from "lucide-react"
import { Link } from "react-router"

import { useAppAuth } from "@/auth/useAppAuth"
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/buttonVariants"
import { cn } from "@/lib/utils"

function MainNav() {
  const {
    isAuthenticated,
    isAuthConfigured,
    isLoading,
    loginWithRedirect,
    logout,
    user,
  } = useAppAuth()

  if (isLoading) {
    return (
      <div className="hidden md:block">
        <span className="text-sm text-muted-foreground">Validando sesion...</span>
      </div>
    )
  }

  if (!isAuthConfigured) {
    return (
      <div className="hidden items-center gap-2 md:flex">
        <span className="inline-flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
          <ShieldAlert className="h-4 w-4" />
          Auth0 pendiente
        </span>
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <div className="hidden items-center gap-2 md:flex">
        <span className="max-w-40 truncate text-sm text-muted-foreground">
          {user?.email}
        </span>
        <Link
          to="/user-profile"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "border-orange-200 text-slate-700 hover:border-orange-300 hover:bg-orange-50"
          )}
        >
          <UserRound className="h-4 w-4" />
          Mi perfil
        </Link>
        <Button
          variant="outline"
          className="border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600"
          onClick={() => void logout()}
        >
          <LogOut className="h-4 w-4" />
          Salir
        </Button>
      </div>
    )
  }

  return (
    <div className="hidden md:block">
      <Button
        variant="outline"
        className="border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600"
        onClick={() => void loginWithRedirect()}
      >
        <LogIn className="h-4 w-4" />
        Iniciar sesion
      </Button>
    </div>
  )
}

export default MainNav
