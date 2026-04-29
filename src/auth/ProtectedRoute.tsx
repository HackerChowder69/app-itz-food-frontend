import { Navigate, Outlet, useLocation } from "react-router"

import LoadingButton from "@/components/LoadingButton"
import { useAppAuth } from "@/auth/useAppAuth"

const ProtectedRoute = () => {
  const location = useLocation()
  const { isAuthenticated, isAuthConfigured, isLoading } = useAppAuth()

  // Preserve local mode when Auth0 is not configured yet.
  if (!isAuthConfigured) {
    return <Outlet />
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingButton />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location.pathname }} to="/" />
  }

  return <Outlet />
}

export default ProtectedRoute
