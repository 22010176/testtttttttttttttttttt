import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"

import { routePaths } from "./routes"

import MainLayout from "./layouts/MainLayout"
import ProfileLayout from "./layouts/ProfileLayout"

import Login from "./features/Auth/Login"
import Register from "./features/Auth/Register"
import DashBoard from "./features/Dashboard"
import ProductDetail from "./features/ProductDetails"
import AddressManagement from "./features/Profiles/AddressManagement"
import OrderTracking from "./features/Profiles/OrderTracking"
import ProfilePage from "./features/Profiles/ProfileDashboard"
import SearchPage from "./features/SearchPage"
import ShopPage from "./features/ShopPage"
import Checkout from "./features/ShoppingCart/Checkout"
import ShoppingCartDetail from "./features/ShoppingCart/ShoppingCartDetail"
import Carts from "./features/ShoppingCart/ShoppingCarts"
import { LockLayout } from "./layouts/LockLayout"

function Customer() {
  useEffect(function () {
    document.title = import.meta.env.VITE_MODE
  }, [])

  return (
    <Routes>
      <Route element={<MainLayout />} >
        <Route index element={<DashBoard />} />
        <Route path={routePaths.search} element={<SearchPage />} />
        <Route path={routePaths.account.register} element={<Register />} />
        <Route path={routePaths.account.login} element={<Login />} />

        <Route path={routePaths.product.details} element={<ProductDetail />} />

        <Route element={<LockLayout />}>
          <Route path={routePaths.orders.carts} element={<Carts />} />
          <Route path={routePaths.orders.checkout} element={<Checkout />} />
        </Route>

        <Route path={routePaths.shop} element={<ShopPage />} />

        <Route element={<LockLayout />}>
          <Route element={<ProfileLayout />}>
            <Route path={routePaths.account.root} element={<ProfilePage />} />
            <Route path={routePaths.account.profile} element={<ProfilePage />} />
            <Route path={routePaths.account.infomation} element={<ProfilePage />} />
            <Route path={routePaths.account.address} element={<AddressManagement />} />
            <Route path={routePaths.account.change_password} element={<ProfilePage />} />

            <Route path={routePaths.orders.root} element={<ShoppingCartDetail />} />
            <Route path={routePaths.orders.tracking} element={<OrderTracking />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}
export default Customer