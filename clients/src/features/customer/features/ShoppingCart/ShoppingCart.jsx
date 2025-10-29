import { faShop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ROUTE_KEYS, routePaths } from '_c/routes';


const CartItem = ({ shop }) => {
  const shopTotal = shop.items.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, ''));
    return sum + (price * item.quantity);
  }, 0);

  return (
    <div className="bg-white rounded-lg p-3">
      {/* Shop Header */}
      <div className="flex items-center justify-between mb-4 border-b py-1">
        <div className="flex items-center gap-3">
          {/* <Checkbox /> */}
          <FontAwesomeIcon icon={faShop} className='text-blue-500 text-2xl' />

          <span className="font-medium">{shop.shopName}</span>

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
        <Link to={routePaths.orders.tracking.replace(ROUTE_KEYS.BY_ID, 'd')} className='text-blue-500'>Xem chi tiết</Link>
      </div>

      {/* Cart Items */}
      {shop.items.map((item) => (
        <div key={item.id} className="flex items-center gap-4 py-3 border-b last:border-b-0">
          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded border" />
          <div className="flex-1">
            <p className="text-sm text-gray-800 mb-1 line-clamp-2">{item.name}</p>
            <p className="text-xs text-gray-500">{item.variant}</p>
            <p className="w-24 ">x {item.quantity}</p>
          </div>

          <div className="text-right w-24 line-through">
            <p className="text-gray-800">{item.price}</p>
          </div>

          <div className="text-right w-24">
            <p className="text-blue-500 font-medium">{item.price}</p>
          </div>
        </div>
      ))}

      <div className='py-3 text-gray-500 text-right'>
        <p className='text-nowrap w-full'>Thành tiền:</p>
        <p className='w-full font-bold text-3xl text-blue-500'>{3333}đ</p>
      </div>
    </div>
  );
};

const ShoppingCart = () => {
  const [cartItems] = useState([
    {
      id: 1,
      shopName: 'Linh Kiện Giấy Tờ Vina',
      shopBadge: 'Mall',
      chatEnabled: true,
      freeShipping: true,
      vouchers: 'GIẢM 15%',
      items: [
        {
          id: 101,
          name: 'Thiết Lập Cơ Bản Thảng | "KM" 7 Sốsm: 1 nâng tối chân, khống cảnh giờ 2 chỉ vì Sốm 2 đủbm',
          image: 'https://via.placeholder.com/60',
          variant: 'Chỉ Một Hàng: Chính Hàng Chính',
          price: '5.968đ',
          quantity: 1
        },
        {
          id: 102,
          name: 'Dụi Sờ Cứm - Lưỡi Câu Loại - Lưỡi Đục, Bấm Sáng, Phấy Máu, Pik 3, Pik 6, 3mm, 5mm Máo út, vatir tử, vatir Chống Hàng Sáng',
          image: 'https://via.placeholder.com/60',
          variant: 'Dụi Sờ Cứm - Lưỡi Câu Loại - Lưỡi...',
          price: '6.888đ',
          quantity: 1
        }
      ]
    },
    {
      id: 2,
      shopName: 'Sách Nông Nhật',
      shopBadge: 'Yêu Thích',
      chatEnabled: true,
      freeShipping: true,
      vouchers: 'GIẢM 10%',
      items: [
        {
          id: 201,
          name: 'Luyện Thi Năng Khả Số Sỏm Kaoteen Hosatula',
          image: 'https://via.placeholder.com/60',
          variant: 'Luyện Thi Năng Khả Số Sỏm K...',
          price: '154.000đ',
          quantity: 1
        },
        {
          id: 202,
          name: 'Sách Nông Nhật - Luyện Thi Năng Nhật Phen scorrn',
          image: 'https://via.placeholder.com/60',
          variant: 'Sách Nông Nhật - Luyện Thi Nă...',
          price: '110.000đ',
          quantity: 1
        },
        {
          id: 203,
          name: 'Sách Nông Nhật - Luyện Thi Năng Nhật Đục Hiếu Katankio Jikku',
          image: 'https://via.placeholder.com/60',
          variant: 'Sách Nông Nhật - Luyện Thi Nă...',
          price: '175.000đ',
          quantity: 1
        }
      ]
    },
    {
      id: 3,
      shopName: 'Sách Nông Nhật',
      shopBadge: 'Yêu Thích',
      chatEnabled: true,
      freeShipping: true,
      vouchers: 'GIẢM 10%',
      items: [
        {
          id: 301,
          name: 'Sách Nông Nhật - Luyện Thi Năng Nhật Phen scorrn',
          image: 'https://via.placeholder.com/60',
          variant: 'Sách Nông Nhật - Luyện Thi Nă...',
          price: '110.000đ',
          quantity: 1
        },
        {
          id: 302,
          name: 'Sách Nông Nhật - Luyện Thi Năng Nhật Đục Hiếu Katankio Jikku',
          image: 'https://via.placeholder.com/60',
          variant: 'Sách Nông Nhật - Luyện Thi Nă...',
          price: '175.000đ',
          quantity: 1
        },
        {
          id: 303,
          name: 'Luyện Thi Năng Khả Số Sỏm Kaoteen Hosatula',
          image: 'https://via.placeholder.com/60',
          variant: 'Luyện Thi Năng Khả Số Sỏm K...',
          price: '154.000đ',
          quantity: 1
        }
      ]
    },
    {
      id: 4,
      shopName: 'Văn Phòng Phẩm Kim Phát',
      shopBadge: 'Mall',
      chatEnabled: true,
      freeShipping: false,
      vouchers: 'GIẢM 10%',
      items: [
        {
          id: 401,
          name: 'Bút dễ nước mực gel Blaxke PCZD39 Ngổ 3-5 Nhiễu Mực Ờ Cầy',
          image: 'https://via.placeholder.com/60',
          variant: 'Xanh Đậy Nông điệm',
          price: '6.800đ',
          quantity: 1
        },
        {
          id: 402,
          name: 'Bút dễ nước mực gel Blaxke PCZD39 Ngổ 3-5 Nhiễu Mực Ờ Cầy',
          image: 'https://via.placeholder.com/60',
          variant: 'Xanh Đậy Nông điệm',
          price: '6.800đ',
          quantity: 1
        }
      ]
    }
  ]);


  const grandTotal = cartItems.reduce((sum, shop) => {
    return sum + shop.items.reduce((shopSum, item) => {
      const price = parseInt(item.price.replace(/[^\d]/g, ''));
      return shopSum + (price * item.quantity);
    }, 0);
  }, 0);

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
        {cartItems.map((shop) => <CartItem key={shop.id} shop={shop} />)}
      </div>
    </div>
  );
};

export default ShoppingCart;