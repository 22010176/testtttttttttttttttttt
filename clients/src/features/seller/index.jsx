import { Route, Routes } from "react-router-dom"

import AnalyticsLayout from "./layouts/AnalyticsLayout"
import AuthLayout from "./layouts/AuthLayout"
import MainLayout from "./layouts/MainLayout"

import { ROUTE_KEYS } from "@/constant/route_keys"
import { routePaths } from "./routes"

import AnalyticsDashboard from "./features/Analytics/AnalyticsDashboard"
import AnalyticsProduct from "./features/Analytics/AnalyticsProduct"
import WorkingPerformance from "./features/Analytics/WorkingPerformance"
import Login from "./features/Auth/Login"
import Register from "./features/Auth/Register"
import Dashboard from "./features/Dashboard"
import BalanceDashboard from "./features/Finance/BalanceDashboard"
import BankDashboard from "./features/Finance/BankDashboard"
import ProfitDashboard from "./features/Finance/ProfitDashboard"
import DiscountDashboard from "./features/Marketing/DiscountDashboard"
import FlashSaleDashboard from "./features/Marketing/FlashSaleDashboard"
import MarketingDashboard from "./features/Marketing/MarketingDashboard"
import PlatformCampaign from "./features/Marketing/PlatformCampaign"
import VoucherDashboard from "./features/Marketing/VoucherDashboard"
import OrderDashboard from "./features/Order/OrderDashboard"
import ReturnOrder from "./features/Order/ReturnOrder"
import AddProduct from "./features/Product/AddProduct"
import ProductDashBoard from "./features/Product/ProductDashboard"
import UpdateProduct from "./features/Product/UpdateProduct"
import ShopDashboard from "./features/Shop/ShopDashboard"


function Seller() {
  return (
    <Routes>
      <Route element={<AuthLayout />} >
        <Route path={routePaths.account.register} element={<Register />} />
        <Route path={routePaths.account.login} element={<Login />} />
      </Route>

      <Route element={<MainLayout />}>
        {/* <Route > */}
        <Route path={routePaths.management.root} element={<Dashboard />} />

        <Route path={routePaths.management.product.root} element={<ProductDashBoard />} />
        <Route path={routePaths.management.product.insert} element={<AddProduct />} />
        <Route path={routePaths.management.product.update} element={<UpdateProduct />} />

        <Route path={routePaths.management.orders.root} element={<OrderDashboard />} />
        <Route path={routePaths.management.orders.return} element={<ReturnOrder />} />

        <Route path={routePaths.management.marketing.root} element={<MarketingDashboard />} />
        <Route path={routePaths.management.marketing.discounts} element={<DiscountDashboard />} />
        <Route path={routePaths.management.marketing.flashSale} element={<FlashSaleDashboard />} />
        <Route path={routePaths.management.marketing.voucher} element={<VoucherDashboard />} />
        <Route path={routePaths.management.marketing.campaigns} element={<PlatformCampaign />} />

        <Route path={ROUTE_KEYS.FINANCE} >
          <Route path={ROUTE_KEYS.PROFIT} element={<ProfitDashboard />} />
          <Route path={ROUTE_KEYS.BALANCE} element={<BalanceDashboard />} />
          <Route path={ROUTE_KEYS.BANK_ACCOUNT} element={<BankDashboard />} />
        </Route>

        <Route path={routePaths.management.store.root} element={<ShopDashboard />} />
        {/* </Route> */}

        <Route path={ROUTE_KEYS.ANALYTICS} element={<AnalyticsLayout />}>
          <Route index element={<AnalyticsDashboard />} />
          <Route path={ROUTE_KEYS.PRODUCTS} element={<AnalyticsProduct />} />
          <Route path={ROUTE_KEYS.PROFIT} element={<AnalyticsDashboard />} />
          <Route path={ROUTE_KEYS.SERVICE} element={<AnalyticsDashboard />} />
          <Route path={ROUTE_KEYS.TRAFFIC} element={<AnalyticsDashboard />} />
          <Route path={ROUTE_KEYS.MANAGEMENT} element={<AnalyticsDashboard />} />
          <Route path={ROUTE_KEYS.NOT_FOUND} element={<AnalyticsDashboard />} />
        </Route>

        <Route path={routePaths.analytics.performance} element={<WorkingPerformance />} />

        {/* Default error page */}
        <Route path={ROUTE_KEYS.NOT_FOUND} element={<Dashboard />} />
      </Route>
    </Routes>
  )
}
export default Seller