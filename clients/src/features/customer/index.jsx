import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"

import { ROUTE_KEYS, routePaths } from "./routes"

import MainLayout from "./layouts/MainLayout"
import ProfileLayout from "./layouts/ProfileLayout"

import DashBoard from "./features/Dashboard"
import ProductDetail from "./features/ProductDetails"
import AddressManagement from "./features/Profiles/AddressManagement"
import OrderTracking from "./features/Profiles/OrderTracking"
import ProfilePage from "./features/Profiles/ProfileDashboard"
import ShopeeCheckout from "./features/ShoppingCart/Checkout"
import ShoppingCart from "./features/ShoppingCart/ShoppingCart"
import ShopeeCarts from "./features/ShoppingCart/ShoppingCarts"

function Customer() {
  useEffect(function () {
    document.title = import.meta.env.VITE_MODE
  }, [])

  return (
    <Routes>
      <Route element={<MainLayout />} >
        <Route index element={<DashBoard />} />

        <Route path={routePaths.product.details} element={<ProductDetail />} />

        <Route path={routePaths.account.root}>
          <Route element={<ProfileLayout />}>
            <Route path={ROUTE_KEYS.INFOMATION} element={<ProfilePage />} />
            <Route path={ROUTE_KEYS.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTE_KEYS.ADDRESS} element={<AddressManagement />} />
            <Route path={`${ROUTE_KEYS.TRACKING}/${ROUTE_KEYS.BY_ID}`} element={<OrderTracking />} />
            <Route path={ROUTE_KEYS.NOT_FOUND} element={<ProfilePage />} />
          </Route>
        </Route>

        <Route path={routePaths.orders.root} element={<ProfileLayout />}>
          <Route index element={<ShoppingCart />} />
        </Route>

        <Route path={routePaths.orders.carts} element={<ShopeeCarts />} />
        <Route path={routePaths.orders.checkout} element={<ShopeeCheckout />} />
      </Route>
    </Routes>
  )
}
export default Customer