import { Route, Routes } from "react-router-dom"

import AnalyticsLayout from "./layouts/AnalyticsLayout"
import AuthLayout from "./layouts/AuthLayout"
import MainLayout from "./layouts/MainLayout"

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
import { ROUTE_KEYS, routePaths } from "./routes"

function Seller() {
  return (
    <Routes>
      <Route path={ROUTE_KEYS.ACCOUNT} element={<AuthLayout />} >
        <Route path={ROUTE_KEYS.REGISTER} element={<Register />} />
        <Route path={ROUTE_KEYS.LOGIN} element={<Login />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path={ROUTE_KEYS.MANAGEMENT}>
          <Route index element={<Dashboard />} />

          <Route path={ROUTE_KEYS.PRODUCTS}>
            <Route index element={<ProductDashBoard />} />
            <Route path={ROUTE_KEYS.INSERT} element={<AddProduct />} />
          </Route>

          <Route path={ROUTE_KEYS.ORDERS} >
            <Route index element={<OrderDashboard />} />
            <Route path={ROUTE_KEYS.RETURN} element={<ReturnOrder />} />
          </Route>

          <Route path={ROUTE_KEYS.MARKETING} >
            <Route index element={<MarketingDashboard />} />
            <Route path={ROUTE_KEYS.DISCOUNTS} element={<DiscountDashboard />} />
            <Route path={ROUTE_KEYS.FLASH_SALE} element={<FlashSaleDashboard />} />
            <Route path={ROUTE_KEYS.VOUCHER} element={<VoucherDashboard />} />
            <Route path={ROUTE_KEYS.CAMPAIGNS} element={<PlatformCampaign />} />
          </Route>

          <Route path={ROUTE_KEYS.FINANCE} >
            <Route path={ROUTE_KEYS.PROFIT} element={<ProfitDashboard />} />
            <Route path={ROUTE_KEYS.BALANCE} element={<BalanceDashboard />} />
            <Route path={ROUTE_KEYS.BANK_ACCOUNT} element={<BankDashboard />} />
          </Route>

        </Route>

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