import { GiftOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, ConfigProvider, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { keys } from '@/constant/localStorageKey';
import { ROUTE_KEYS } from '@/constant/route_keys';

import { XemThongTinTaiKhoan } from '../api/taiKhoan';
import Container from '../components/Container';
import { routePaths } from '../routes';


const theme = {
  components: {
    Menu: { subMenuItemBg: "#FFFFFF" },
  },
}

export default function ProfileLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [taiKhoan, setTaiKhoan] = useState()
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

  useEffect(function () {
    XemThongTinTaiKhoan().then(i => {
      if (i.data == null) {
        navigate(routePaths.login)
        localStorage.removeItem(keys.userToken)
        return
      }
      setTaiKhoan(i.data)
    })
  }, [])

  function onClick(e) {
    console.log(e)
    navigate(e.key)
  }
  return (
    <ConfigProvider theme={theme}>
      <Container className="grid grid-cols-5 gap-5">

        <div>
          <div className="bg-white">
            <div className="flex items-center gap-3 p-3">
              <Avatar size={50} src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
              <p className='font-semibold text-lg'>
                {taiKhoan?.HoTen}
              </p>
            </div>
            <Menu mode="inline" items={menuItems} selectedKeys={[pathname]} onClick={onClick} />
          </div>
        </div>

        <div className="col-span-4">
          <Outlet />
        </div>
      </Container>
    </ConfigProvider>
  );
}