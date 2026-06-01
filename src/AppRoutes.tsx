import { Navigate, Route, Routes } from "react-router"

import ProtectedRoute from "./auth/ProtectedRoute"
import Layout from "./layouts/Layout"
import AuthCallBackPage from "./pages/AuthCallBackPage"
import DetailPage from "./pages/DetailPage"
import Home from "./pages/Home"
import OrderStatusPage from "./pages/OrderStatusPage"
import SearchPage from "./pages/SearchPage"
import UserProfilePage from "./pages/UserProfilePage"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout showHero><Home /></Layout>} />
      <Route path="/search/:city" element={<Layout><SearchPage /></Layout>} />
      <Route path="/detail/:restaurantId" element={<Layout><DetailPage /></Layout>} />
      <Route path="/auth-callback" element={<AuthCallBackPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/order-status" element={<Layout><OrderStatusPage /></Layout>} />
        <Route path="/user-profile" element={<Layout><UserProfilePage /></Layout>} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes
