import { Button, Input } from 'antd';
import { MapPin } from 'lucide-react';
import { useState } from 'react';

import Container from '_c/components/Container';

export default function Checkout() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      shopName: 'Anbert Manga Shop',
      hasChat: true,
      products: [
        {
          id: 1,
          name: 'Sách Gringor - Lẻ tập 1 - 16 - Ao Ánh Và Tro T...',
          variant: 'Phần hai: Tập 7',
          price: 95500,
          quantity: 1,
          image: '/api/placeholder/60/60'
        }
      ],
      note: '',
      shipping: 'Nhanh',
      shippingTime: 'Nhận từ 18 Th10 - 21 Th10',
      shippingFee: 12800,
      voucher: 'Nhận Voucher xị tới 15.000₫ nếu đơn hàng được giao đến bạn sau ngày 21 Tháng 10 2025.'
    },
    {
      id: 2,
      shopName: 'Linh Kiện Điện Tử LiKi',
      hasChat: true,
      hasVoucher: true,
      products: [
        {
          id: 2,
          name: 'KIT Arduino Uno R3 Atmega 328P Chip Cắm C...',
          variant: 'Phần bán: R3 Chip Dán',
          price: 76998,
          quantity: 4,
          image: '/api/placeholder/60/60'
        }
      ],
      note: '',
      shipping: 'Nhanh',
      shippingTime: 'Nhận từ 18 Th10 - 21 Th10',
      shippingFee: 16500,
      voucher: 'Nhận Voucher xị tới 15.000₫ nếu đơn hàng được giao đến bạn sau ngày 21 Tháng 10 2025.'
    },
    {
      id: 3,
      shopName: 'Linh Kiện Điện Tử Meta',
      hasChat: true,
      hasVoucher: true,
      products: [
        {
          id: 3,
          name: '[Gói 50 Con] Led Siêu Sáng Phi 5 Màu Đỏ, Xan...',
          variant: 'Phần bán: TRẮNG',
          price: 18400,
          quantity: 1,
          image: '/api/placeholder/60/60'
        },
        // {
        //   id: 4,
        //   name: 'Bảo hiểm báo vỡ người tiêu dùng',
        //   description: 'Giúp bảo vệ sản khối của người toàn, shiết hại gây ra bởi sản phẩm được bảo hiểm trong quá trình xử dụng.',
        //   price: 799,
        //   quantity: 1,
        //   isInsurance: true
        // }
      ],
      note: '',
      shipping: 'Nhanh',
      shippingTime: 'Nhận từ 19 Th10 - 22 Th10',
      shippingFee: 16500,
      voucher: 'Nhận Voucher xị tới 15.000₫ nếu đơn hàng được giao đến bạn sau ngày 22 Tháng 10 2025.'
    }
  ]);

  const calculateOrderTotal = (order) => {
    const productsTotal = order.products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    return productsTotal;
  };

  const calculateGrandTotal = () => {
    const itemsTotal = orders.reduce((sum, order) => sum + calculateOrderTotal(order), 0);
    const shippingTotal = orders.reduce((sum, order) => sum + order.shippingFee, 0);
    return itemsTotal + shippingTotal;
  };

  const itemsTotal = orders.reduce((sum, order) => sum + calculateOrderTotal(order), 0);
  const shippingTotal = orders.reduce((sum, order) => sum + order.shippingFee, 0);

  return (
    <Container className="">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-center gap-2 text-blue-600 mb-3">
          <MapPin size={20} />
          <span className="font-medium">Địa Chỉ Nhận Hàng</span>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <div className="font-medium">
              Đỗ Đức Minh (+84) 986 941 608
              <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-0.5 rounded">Mặc Định</span>
            </div>
            <div className="text-gray-600 text-sm mt-1">
              119 Đông Các, Phường Ô Chợ Dừa, Quận Đống Đa, Hà Nội
            </div>
          </div>
          <button className="text-blue-500 text-sm hover:text-blue-600">Thay Đổi</button>
        </div>
      </div>

      {/* Products Header */}
      <div className="bg-white rounded-t-lg shadow-sm p-4">
        <div className="grid grid-cols-12 gap-4 text-sm text-gray-600">
          <div className="col-span-5">Sản phẩm</div>
          <div className="col-span-2 text-center">Đơn giá</div>
          <div className="col-span-2 text-center">Số lượng</div>
          <div className="col-span-3 text-right">Thành tiền</div>
        </div>
      </div>

      {/* Orders */}
      {orders.map((order, orderIndex) => (
        <div key={order.id} className="bg-white shadow-sm mb-3">
          {/* Shop Header */}
          <div className="border-b p-4">
            <div className="flex items-center gap-2">
              {/* <span className={`text-xs ${orderIndex === 0 ? 'bg-red-500' : 'bg-red-600'} text-white px-2 py-0.5 rounded`}>
                {orderIndex === 0 ? 'MUA' : 'Yêu thích'}
              </span> */}
              <span className="font-medium">{order.shopName}</span>
              {/* {order.hasChat && (
                <>
                  <MessageSquare size={16} className="text-blue-500 ml-2" />
                  <span className="text-blue-500 text-sm">Chat ngay</span>
                </>
              )} */}
            </div>
          </div>

          {/* Products */}
          {order.products.map((product) => (
            <div key={product.id} className="border-b p-4">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-5 flex gap-3">
                  {!product.isInsurance && (
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                  )}
                  {/* {product.isInsurance && (
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                    </div>
                  )} */}
                  <div className="flex-1">
                    <div className="text-sm">{product.name}</div>
                    {/* {product.variant && (
                      <div className="text-xs text-gray-500 mt-1">{product.variant}</div>
                    )} */}
                    {/* {product.description && (
                      <div className="text-xs text-gray-500 mt-1">{product.description}</div>
                    )} */}
                    {/* {product.isInsurance && (
                      <a href="#" className="text-xs text-blue-500 hover:underline">Tìm hiểu thêm</a>
                    )} */}
                  </div>
                </div>
                <div className="col-span-2 text-center text-sm">
                  {product.price.toLocaleString('vi-VN')}₫
                </div>
                <div className="col-span-2 text-center text-sm">{product.quantity}</div>
                <div className="col-span-3 text-right text-sm">
                  {(product.price * product.quantity).toLocaleString('vi-VN')}₫
                </div>
              </div>
            </div>
          ))}

          {/* Order Options */}
          <div className="p-4 space-y-3">
            {/* Note */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 w-24">Lời nhắn:</span>
              <Input />
            </div>

            {/* Voucher */}
            {/* {order.hasVoucher && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-orange-500" />
                  <span className="text-sm">Voucher của Shop</span>
                </div>
                <button className="text-blue-500 text-sm hover:text-blue-600">Chọn Voucher</button>
              </div>
            )} */}

            {/* Shipping */}
            {/* <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Phương thức vận chuyển:</span>
                <span className="text-sm font-medium">{order.shipping}</span>
                <div className="flex items-center gap-1 text-xs text-blue-500">
                  <Package size={14} />
                  <span>{order.shippingTime}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-blue-500 text-sm hover:text-blue-600">Thay Đổi</button>
                <span className="text-sm">{order.shippingFee.toLocaleString('vi-VN')}₫</span>
              </div>
            </div> */}

            {/* Voucher Info */}
            {/* <div className="text-xs text-gray-500">
              {order.voucher}
            </div> */}

            {/* Verified */}
            {/* <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Được đồng kiểm</span>
              <span className="text-gray-400">ⓘ</span>
            </div> */}

            {/* Order Total */}
            <div className="flex justify-end items-center gap-3 pt-3 border-t">
              <span className="text-sm text-gray-600">Tổng số tiền ({order.products.length} sản phẩm):</span>
              <span className="text-xl text-blue-600 font-medium">
                {(calculateOrderTotal(order) + order.shippingFee).toLocaleString('vi-VN')}₫
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Shopee Voucher */}
      {/* <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-orange-500" />
            <span className="font-medium">Shopee Voucher</span>
          </div>
          <button className="text-blue-500 text-sm hover:text-blue-600">Chọn Voucher</button>
        </div>
      </div> */}

      {/* Shopee Xu */}
      {/* <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs">
              ⓢ
            </div>
            <span className="font-medium">Shopee Xu</span>
            <span className="text-sm text-gray-500">-Không thể sử dụng Xu</span>
          </div>
          <span className="text-sm text-gray-400">-[49] ₫</span>
        </div>
      </div> */}

      {/* Payment Summary */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Phương thức thanh toán</span>
            <button className="text-blue-500 text-sm hover:text-blue-600">THAY ĐỔI</button>
          </div>
          <div className="text-sm">Thanh toán khi nhận hàng</div>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tổng tiền hàng</span>
            <span>{itemsTotal.toLocaleString('vi-VN')}₫</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tổng tiền phí vận chuyển</span>
            <span>{shippingTotal.toLocaleString('vi-VN')}₫</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t">
            <span className="text-gray-600">Tổng thanh toán</span>
            <span className="text-2xl text-blue-600 font-medium">
              {calculateGrandTotal().toLocaleString('vi-VN')}₫
            </span>
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50 flex items-center justify-end">
          {/* <div className="text-xs text-gray-600">
            Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo{' '}
            <a href="#" className="text-blue-500 hover:underline">Điều khoản Shopee</a>
          </div> */}
          <Button variant='solid' color='blue'>
            Đặt hàng
          </Button>
        </div>
      </div>
    </Container>
  );
}