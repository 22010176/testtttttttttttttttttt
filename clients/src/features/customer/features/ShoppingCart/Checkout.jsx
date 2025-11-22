import { Button } from 'antd';
import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { XemDanhSachDiaChi } from '_c/api/diaChi';
import { LayDanhSachDonHangCanDuyet, XacNhanDuyetDonHang, XacNhanHuyDuyetDonHang } from '_c/api/donHang';
import Container from '_c/components/Container';
import { routePaths } from '_c/routes';

export default function Checkout() {
  const navidate = useNavigate()
  const [diaChi, setDiaChi] = useState({})
  const [donHang, setDonHang] = useState([])

  useEffect(() => {
    XemDanhSachDiaChi().then(result => {
      setDiaChi(result?.data[0])
    })
    LayDanhSachDonHangCanDuyet().then(result => {
      const data = result.data
      console.log(data)
      // if (data.length == 0) navidate(routePaths.orders.carts)
      setDonHang(Object.values(data.reduce((acc, item) => {
        if (acc[item.GianHangId] == null) acc[item.GianHangId] = {
          Id: item.TenGianHang,
          TenGianHang: item.TenGianHang,
          SanPham: []
        }
        acc[item.GianHangId].SanPham.push(item)
        return acc
      }, {})))
    })
  }, [])

  console.log(donHang)

  const calculateOrderTotal = (order) => {
    const productsTotal = order.SanPham?.reduce?.((sum, p) => sum + (p.GiaBan * p.SoLuong), 0);
    return productsTotal;
  };

  const calculateGrandTotal = () => {
    // const itemsTotal = donHang.reduce((sum, order) => sum + calculateOrderTotal(order), 0);
    // const shippingTotal = orders.reduce((sum, order) => sum + order.shippingFee, 0);
    return itemsTotal + 0;
  };

  const itemsTotal = donHang.reduce((sum, order) => sum + calculateOrderTotal(order), 0);
  // const shippingTotal = orders.reduce((sum, order) => sum + order.shippingFee, 0);

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
              {diaChi.HoTen} - {diaChi.SoDienThoai}
              {/* <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-0.5 rounded">Mặc Định</span> */}
            </div>
            <div className="text-gray-600 text-sm mt-1">
              {diaChi.DiaChiCuThe}
            </div>
          </div>
          {/* <button className="text-blue-500 text-sm hover:text-blue-600">Thay Đổi</button> */}
        </div>
      </div>

      {/* Products Header */}
      {/* <div className="bg-white rounded-t-lg shadow-sm p-4">
        <div className="grid grid-cols-12 gap-4 text-sm text-gray-600">
          <div className="col-span-5">Sản phẩm</div>
          <div className="col-span-2 text-center">Đơn giá</div>
          <div className="col-span-2 text-center">Số lượng</div>
          <div className="col-span-3 text-right">Thành tiền</div>
        </div>
      </div> */}

      {/* Orders */}
      {donHang.map?.((order, orderIndex) => (
        <div key={orderIndex} className="bg-white shadow-sm mb-3">
          {/* Shop Header */}
          <div className="border-b p-4">
            <div className="flex items-center gap-2">
              {/* <span className={`text-xs ${orderIndex === 0 ? 'bg-red-500' : 'bg-red-600'} text-white px-2 py-0.5 rounded`}>
                {orderIndex === 0 ? 'MUA' : 'Yêu thích'}
              </span> */}
              <span className="font-medium">{order.TenGianHang}</span>
              {/* {order.hasChat && (
                <>
                  <MessageSquare size={16} className="text-blue-500 ml-2" />
                  <span className="text-blue-500 text-sm">Chat ngay</span>
                </>
              )} */}
            </div>
          </div>

          {/* Products */}
          {order.SanPham.map((product, i) => (
            <div key={i} className="border-b p-4">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-5 flex gap-3">
                  {/* {!product.isInsurance && ( */}
                  <img src={product.Url} alt={product.TenSanPham} className="w-16 h-16 object-cover rounded" />
                  {/* )} */}
                  {/* {product.isInsurance && (
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                    </div>
                  )} */}
                  <div className="flex-1">
                    <div className="text-sm">{product.TenSanPham}</div>
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
                  {product.GiaBan.toLocaleString('vi-VN')}₫
                </div>
                <div className="col-span-2 text-center text-sm">{product.SoLuong}</div>
                <div className="col-span-3 text-right text-sm">
                  {(product.GiaBan * product.SoLuong).toLocaleString('vi-VN')}₫
                </div>
              </div>
            </div>
          ))}

          {/* Order Options */}
          <div className="p-4 space-y-3">
            {/* Note */}
            {/* <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 w-24">Lời nhắn:</span>
              <Input />
            </div> */}

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
            <div className="flex justify-end items-center gap-3">
              <span className="text-sm text-gray-600">Tổng số tiền ({order.SanPham.length} sản phẩm):</span>
              <span className="text-xl text-blue-600 font-medium">
                {(calculateOrderTotal(order) + 15000).toLocaleString('vi-VN')}₫
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
            {/* <button className="text-blue-500 text-sm hover:text-blue-600">THAY ĐỔI</button> */}
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
            {/* <span>{shippingTotal.toLocaleString('vi-VN')}₫</span> */}
          </div>
          <div className="flex justify-between items-center pt-3 border-t">
            <span className="text-gray-600">Tổng thanh toán</span>
            <span className="text-2xl text-blue-600 font-medium">
              {calculateGrandTotal().toLocaleString('vi-VN')}₫
            </span>
          </div>
        </div>

        <div className="p-4 border-t bg-gray-50 flex items-center justify-end gap-5">
          {/* <div className="text-xs text-gray-600">
            Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo{' '}
            <a href="#" className="text-blue-500 hover:underline">Điều khoản Shopee</a>
          </div> */}
          <Button variant='solid' color='red' onClick={async function () {
            console.log(await XacNhanHuyDuyetDonHang())
            navidate(routePaths.root)
          }}>
            Hủy
          </Button>
          <Button variant='solid' color='blue' onClick={async function () {
            await XacNhanDuyetDonHang()
            // await XacNhanHuyDuyetDonHang()
            navidate(routePaths.orders.root)
          }}>
            Đặt hàng
          </Button>
        </div>
      </div>
    </Container>
  );
}