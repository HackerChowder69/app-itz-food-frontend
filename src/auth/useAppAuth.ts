import { createContext, useContext } from "react"

import type { AppState, RedirectLoginOptions } from "@auth0/auth0-react"

import { authSetupMessage } from "@/config/env"

export type AuthUser = {
  email?: string
  name?: string
  sub?: string
}

export type AppAuthContextValue = {
  error?: string
  getAccessTokenSilently: () => Promise<string>
  isAuthenticated: boolean
  isAuthConfigured: boolean
  isLoading: boolean
  loginWithRedirect: (
    options?: RedirectLoginOptions<AppState>
  ) => Promise<void>
  logout: () => Promise<void>
  user?: AuthUser
}

export const disabledAuthValue: AppAuthContextValue = {
  getAccessTokenSilently: async () => {
    throw new Error(authSetupMessage)
  },
  error: undefined,
  isAuthenticated: false,
  isAuthConfigured: false,
  isLoading: false,
  loginWithRedirect: async () => {
    throw new Error(authSetupMessage)
  },
  logout: async () => {
    throw new Error(authSetupMessage)
  },
  user: undefined,
}

export const AppAuthContext =
  createContext<AppAuthContextValue>(disabledAuthValue)

export const useAppAuth = () => useContext(AppAuthContext)
