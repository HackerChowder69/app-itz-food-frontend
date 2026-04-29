import type { ReactNode } from "react"

import { Auth0Provider, useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router"

import { AppAuthContext, disabledAuthValue } from "@/auth/useAppAuth"
import {
  auth0Config,
  isAuthConfigured,
} from "@/config/env"

type Props = {
  children: ReactNode
}

function AuthContextBridge({ children }: Props) {
  const {
    getAccessTokenSilently,
    error,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
    user,
  } = useAuth0()

  return (
    <AppAuthContext.Provider
      value={{
        error: error?.message,
        getAccessTokenSilently: () => getAccessTokenSilently(),
        isAuthenticated,
        isAuthConfigured: true,
        isLoading,
        loginWithRedirect: () => loginWithRedirect(),
        logout: async () => {
          await logout({
            logoutParams: {
              returnTo: window.location.origin,
            },
          })
        },
        user: user
          ? {
              email: user.email,
              name: user.name,
              sub: user.sub,
            }
          : undefined,
      }}
    >
      {children}
    </AppAuthContext.Provider>
  )
}

export default function Auth0ProviderWithNavigate({ children }: Props) {
  const navigate = useNavigate()

  if (!isAuthConfigured) {
    return (
      <AppAuthContext.Provider value={disabledAuthValue}>
        {children}
      </AppAuthContext.Provider>
    )
  }

  const onRedirectCallBack = () => {
    navigate("/auth-callback")
  }

  return (
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={{
        audience: auth0Config.audience,
        redirect_uri: auth0Config.redirectUri,
      }}
      onRedirectCallback={onRedirectCallBack}
    >
      <AuthContextBridge>{children}</AuthContextBridge>
    </Auth0Provider>
  )
}
