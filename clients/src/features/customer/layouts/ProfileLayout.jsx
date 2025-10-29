import { GiftOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import { Affix, Avatar, ConfigProvider, Layout, Menu, Typography } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Container from '../components/Container';
import { ROUTE_KEYS, routePaths } from '../routes';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const theme = {
  components: {
    Menu: { subMenuItemBg: "#FFFFFF" },
  },
}
export default function ProfileLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const menuItems = [
    // { key: 'thong-bao', icon: <BellOutlined />, label: 'Thông Báo', },
    {
      key: ROUTE_KEYS.ACCOUNT,
      icon: <UserOutlined />,
      label: 'Tài Khoản Của Tôi',
      children: [
        { key: routePaths.account.profile, label: 'Hồ Sơ' },
        { key: routePaths.account.address, label: 'Địa Chỉ' },
        { key: routePaths.account.change_password, label: 'Đổi Mật Khẩu' },
      ],
    },
    { key: routePaths.orders.root, icon: <ShoppingOutlined />, label: 'Đơn Mua', },

    { key: 'kho-voucher', icon: <GiftOutlined />, label: 'Kho Voucher', },
  ];

  function onClick(e) {
    console.log(e)
    navigate(e.key)
  }
  return (
    <ConfigProvider theme={theme}>
      <Container className="grid grid-cols-5 gap-5">
        <Affix offsetTop={50}>
          <div className="bg-white">
            <div className="flex items-center gap-3 p-3">
              <Avatar size={50} src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
              <p className='font-semibold text-lg'>
                User
              </p>
            </div>
            <Menu mode="inline" items={menuItems} selectedKeys={[pathname]} onClick={onClick} />
          </div>
        </Affix>
        <div className="col-span-4 bg-white">
          <Outlet />
        </div>
      </Container>
    </ConfigProvider>
  );
}