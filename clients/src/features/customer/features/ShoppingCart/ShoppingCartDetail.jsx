import { faShop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ROUTE_KEYS } from '@/constant/route_keys';

import { routePaths } from '_c/routes';
import { XemDanhSachDonHang } from '_c/api/donHang';

const CartItem = ({ shop }) => {
  const shopTotal = shop.sanPham.reduce((sum, item) => {
    // const price = parseInt(item.GiaBan.replace(/[^\d]/g, ''));

    return sum + ((item.GiaBan || 1) * (item.SoLuong || 1));
  }, 0);
  return (
    <div className="bg-white rounded-lg p-3">
      {/* Shop Header */}
      <div className="flex items-center justify-between mb-4 border-b py-1">
        <div className="flex items-center gap-3">
          {/* <Checkbox /> */}
          <FontAwesomeIcon icon={faShop} className='text-blue-500 text-2xl' />

          <span className="font-medium">{shop?.TenGianHang}</span>

          {/* {shop.chatEnabled && (
            <Button type="text" size="small" className="text-gray-500">
              💬 Chat Ngay
            </Button>
          )} */}
        </div>
        {/* <div className="flex items-center gap-3">
          {shop.freeShipping && (
            <Tag color="cyan" className="text-xs">
              🚚 Giao hàng Miễn phí Giao: 0đ
            </Tag>
          )}
        </div> */}
        <Link to={routePaths.orders.tracking.replace(ROUTE_KEYS.BY_ID, shop.Id)} className='text-blue-500'>Xem chi tiết</Link>
      </div>

      {/* Cart Items */}
      {shop.sanPham.map((item, j) => (
        <div key={j} className="flex justify-between items-center gap-4 py-3 border-b last:border-b-0">
          <div className="flex gap-10">
            <img src={item.Url} alt={item.name} className="w-16 h-16 object-cover rounded border" />
            <div>

              <p className="text-sm text-gray-800 line-clamp-2">{item.TenSanPham}</p>
              {/* <p className="text-xs text-gray-500">{item.variant}</p> */}
              <p className="w-24 ">x {item.SoLuong.toLocaleString()}</p>
            </div>
          </div>

          {/* <div className="text-right w-24 line-through">
            <p className="text-gray-800">{item.GiaBan.toLocaleString()}</p>
          </div> */}

          <div className="text-right">
            <p className="text-blue-500 font-medium">{item.GiaBan.toLocaleString()}</p>
          </div>
        </div>
      ))}

      <div className='py-3 text-gray-500 text-right'>
        <p className='text-nowrap w-full'>Thành tiền:</p>
        <p className='w-full font-bold text-3xl text-blue-500'>{shopTotal.toLocaleString()}đ</p>
      </div>
    </div>
  );
};

const ShoppingCartDetail = () => {
  const [donHang, setDonHang] = useState([])

  useEffect(function () {
    XemDanhSachDonHang().then(result => {
      const { data } = result
      console.log({ data })
      setDonHang(Object.values(data.reduce((acc, i) => {
        if (acc[i.Id] == null) acc[i.Id] = { ...i, sanPham: [] }
        acc[i.Id].sanPham.push(i)
        return acc
      }, {})))
    })
  }, [])

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <Menu mode="horizontal" items={[
        { key: "1", label: <span className="text-gray-700">Tất cả</span> },
        { key: "2", label: <span className="text-gray-700">Chờ xác nhận</span> },
        { key: "3", label: <span className="text-gray-700">Vận chuyển</span> },
        { key: "5", label: <span className="text-gray-700">Hoàn thành</span> },
        { key: "6", label: <span className="text-gray-700">Đã hủy</span> },
        { key: "7", label: <span className="text-gray-700">Trả hàng/Hoàn tiền</span> },
      ]} />

      {/* Cart Content */}
      <div className="space-y-5 mt-3">
        {/* Cart Items by Shop */}
        {donHang.map((shop, j) => <CartItem key={j} shop={shop} />)}
      </div>
    </div>
  );
};

export default ShoppingCartDetail;