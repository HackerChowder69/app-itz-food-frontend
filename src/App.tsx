import { BrowserRouter } from "react-router"

import Auth0ProviderWithNavigate from "@/auth/Auth0ProviderWithNavigate"
import AppRoutes from "./AppRoutes"

export function App() {
  return (
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <AppRoutes />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  )
}

export default App
