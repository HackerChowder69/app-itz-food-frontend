import { LogIn, LogOut, ShieldAlert, UserRound } from "lucide-react"
import { Link } from "react-router"

import { useAppAuth } from "@/auth/useAppAuth"

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
        <span className="text-sm text-slate-600">Validando sesion...</span>
      </div>
    )
  }

  if (!isAuthConfigured) {
    return (
      <div className="hidden items-center gap-2 md:flex">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700">
          <ShieldAlert className="h-4 w-4" />
          Auth0 pendiente
        </span>
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <div className="hidden items-center gap-4 md:flex">
        <span className="inline-flex max-w-64 items-center gap-2 truncate text-sm font-semibold text-slate-900">
          <UserRound className="h-4 w-4 text-orange-500" />
          {user?.email}
        </span>
        <Link
          to="/order-status"
          className="text-sm font-semibold text-slate-700 hover:text-orange-500"
        >
          Mis ordenes
        </Link>
        <Link
          to="/user-profile"
          className="text-sm font-semibold text-slate-700 hover:text-orange-500"
        >
          Mi perfil
        </Link>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-sm font-semibold text-orange-500 hover:text-orange-600"
          onClick={() => void logout()}
        >
          <LogOut className="h-4 w-4" />
          Salir
        </button>
      </div>
    )
  }

  return (
    <div className="hidden md:block">
      <button
        type="button"
        className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600"
        onClick={() => void loginWithRedirect()}
      >
        <LogIn className="h-4 w-4" />
        Iniciar sesion
      </button>
    </div>
  )
}

export default MainNav
