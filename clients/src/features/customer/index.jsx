import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"

import { routePaths } from "./routes"

import MainLayout from "./layouts/MainLayout"
import ProfileLayout from "./layouts/ProfileLayout"

import DashBoard from "./features/Dashboard"
import ProductDetail from "./features/ProductDetails"
import AddressManagement from "./features/Profiles/AddressManagement"
import OrderTracking from "./features/Profiles/OrderTracking"
import ProfilePage from "./features/Profiles/ProfileDashboard"
import SearchPage from "./features/SearchPage"
import ShopeeCheckout from "./features/ShoppingCart/Checkout"
import ShoppingCart from "./features/ShoppingCart/ShoppingCart"
import ShopeeCarts from "./features/ShoppingCart/ShoppingCarts"
import ShopPage from "./features/ShopPage"

function Customer() {
  useEffect(function () {
    document.title = import.meta.env.VITE_MODE
  }, [])

  return (
    <Routes>
      <Route element={<MainLayout />} >
        <Route index element={<DashBoard />} />
        <Route path={routePaths.search} element={<SearchPage />} />

        <Route path={routePaths.product.details} element={<ProductDetail />} />

        <Route path={routePaths.orders.carts} element={<ShopeeCarts />} />
        <Route path={routePaths.orders.checkout} element={<ShopeeCheckout />} />

        <Route path={routePaths.shop} element={<ShopPage />} />

        <Route element={<ProfileLayout />}>
          <Route path={routePaths.account.root} element={<ProfilePage />} />
          <Route path={routePaths.account.profile} element={<ProfilePage />} />
          <Route path={routePaths.account.infomation} element={<ProfilePage />} />
          <Route path={routePaths.account.address} element={<AddressManagement />} />
          <Route path={routePaths.account.change_password} element={<ProfilePage />} />

          <Route path={routePaths.orders.root} element={<ShoppingCart />} />
          <Route path={routePaths.orders.tracking} element={<OrderTracking />} />
        </Route>



      </Route>
    </Routes>
  )
}
export default Customer