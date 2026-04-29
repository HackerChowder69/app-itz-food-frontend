import { Navigate, Route, Routes } from "react-router"

import ProtectedRoute from "./auth/ProtectedRoute"
import Layout from "./layouts/Layout"
import AuthCallBackPage from "./pages/AuthCallBackPage"
import Home from "./pages/Home"
import UserProfilePage from "./pages/UserProfilePage"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout showHero><Home /></Layout>} />
      <Route path="/auth-callback" element={<AuthCallBackPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/user-profile" element={<Layout><UserProfilePage /></Layout>} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes
