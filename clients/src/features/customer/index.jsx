import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"

import DashBoard from "./features/Dashboard"
import MainLayout from "./layouts/MainLayout"
import { ROUTE_KEYS, routePaths } from "./routes"
import ProductDetail from "./features/ProductDetails"
import ProfileLayout from "./features/ProfileDashboard"

function Customer() {
  useEffect(function () {
    document.title = import.meta.env.VITE_MODE
  }, [])

  return (
    <Routes>
      <Route element={<MainLayout />} >
        <Route index element={<DashBoard />} />
        <Route path={routePaths.product.details} element={<ProductDetail />} />
        <Route path={routePaths.account.infomation} element={<ProfileLayout />} />
      </Route>
    </Routes>
  )
}
export default Customer