import { Outlet, useNavigate } from "react-router-dom"
import { Menu } from "antd"

import { routePaths } from "_s/routes"

function AnalyticsLayout() {
  const navigate = useNavigate()

  function onClick(e) {
    navigate(e.key)
  }

  return (
    <div className="m-5">
      <Menu mode="horizontal" onClick={onClick} items={[
        { key: routePaths.analytics.root, label: "Tổng quan", },
        { key: routePaths.analytics.product, label: "Sản phẩm", },
        { key: routePaths.analytics.profit, label: "Doanh số", },
        { key: routePaths.analytics.service, label: "Dịch vụ", },
        { key: routePaths.analytics.traffic, label: "Truy cập", },
        { key: routePaths.analytics.marketing, label: "Marketing", },
      ]} />
      <Outlet />
    </div>
  )
}

export default AnalyticsLayout