import { faBox, faChartLine, faFileInvoice, faHome, faPeopleGroup, faSplotch, faSquarePollVertical, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ConfigProvider, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTE_KEYS } from '@/constant/route_keys';
import { routePaths } from '../routes';

const theme = {
  components: {
    Menu: { darkItemSelectedBg: "#000c17", },
  },
}
const items = [
  { key: routePaths.management.root, icon: <FontAwesomeIcon icon={faHome} />, label: "Trang Chủ" },
  {
    key: ROUTE_KEYS.PRODUCTS, icon: <FontAwesomeIcon icon={faBox} />, label: 'Quản Lý Sản Phẩm',
    children: [
      { key: routePaths.management.product.root, label: "Tất Cả Sản Phẩm" },
      { key: routePaths.management.product.insert, label: "Thêm Sản Phẩm" },
    ]
  },
  {
    key: ROUTE_KEYS.ORDERS, icon: <FontAwesomeIcon icon={faFileInvoice} />, label: 'Quản Lý đơn hàng',
    children: [
      { key: routePaths.management.orders.root, label: "Tất Cả" },
      { key: routePaths.management.orders.return, label: "Đơn Hủy/Hoàn Tiền" },
    ]
  },
  {
    key: ROUTE_KEYS.MARKETING, icon: <FontAwesomeIcon icon={faChartLine} />, label: 'Quản Lý Marketing',
    children: [
      { key: routePaths.management.marketing.root, label: "Tất Cả" },
      { key: routePaths.management.marketing.discounts, label: "Khuyến Mãi Của Shop" },
      { key: routePaths.management.marketing.flashSale, label: "Flash Sale Của Shop" },
      { key: routePaths.management.marketing.voucher, label: "Mã Giảm Giá Của Shop" },
      { key: routePaths.management.marketing.campaigns, label: "Chương Trình Nhà Bán" },
    ]
  },
  {
    key: ROUTE_KEYS.FINANCE, icon: <FontAwesomeIcon icon={faWallet} />, label: 'Quản Lý tài chính',
    children: [
      { key: routePaths.management.finance.profit, label: "Doanh thu" },
      { key: routePaths.management.finance.bankAccount, label: "Tài Khoản Ngân Hàng" },
      { key: routePaths.management.finance.balance, label: "Số Dư Tài Khoản" },
    ]
  },
  {
    key: ROUTE_KEYS.ANALYTICS, icon: <FontAwesomeIcon icon={faSquarePollVertical} />, label: 'Phân tích dữ liệu',
    children: [
      { key: routePaths.analytics.root, label: "Phân Tích Bán Hàng" },
      { key: routePaths.analytics.performance, label: "Hiệu Quả Hoạt Động" },
    ]
  },
  {
    key: 'f', icon: <FontAwesomeIcon icon={faSplotch} />, label: 'Quản Lý cửa hàng',
    children: [
      { key: "f1", label: "Hồ Sơ Shop" },
      { key: "f2", label: "Trang Trí Shop" },
      { key: "g3", label: "Quản Lý Khiếu Nại" },
    ]
  },
  {
    key: 'g', icon: <FontAwesomeIcon icon={faPeopleGroup} />, label: 'Chăm sóc khách hàng',
    children: [
      { key: "g1", label: "Quản Lý Chat" },
      { key: "g2", label: "Quản Lý Đánh Giá" },

    ]
  },
]
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  function onClick(e) {
    navigate(e.key)
  }
  return (
    <ConfigProvider theme={theme}>
      <Menu className='h-full overflow-y-scroll' selectedKeys={[location.pathname]} mode="inline" theme="dark" items={items} onClick={onClick} />
    </ConfigProvider>
  );
};
export default Sidebar;