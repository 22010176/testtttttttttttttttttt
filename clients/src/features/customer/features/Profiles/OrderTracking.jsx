import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChevronLeft, FileText, Package, Star, Truck } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { XemThongTinChiTietDonHang } from '_c/api/donHang';
import { routePaths } from '_c/routes';
import { Button } from 'antd';

function LayTrangThaiDonHang(traingThai) {
  const a = [
    "LOI",
    "KHACH_HANG_DAT_HANG",
    "NGUOI_BAN_XAC_NHAN",
    "DON_HANG_VAN_CHUYEN",
    "DON_HANG_GIAO_THANH_CONG",
    "HUY_DON_HANG"
  ]
  return a[(traingThai + 1) ?? 0]
}

export default function OrderTracking() {
  const { id } = useParams()

  // const [showAllTracking, setShowAllTracking] = useState(false);
  const [donHang, setDonHang] = useState({});

  const subtotal = useMemo(() => donHang.sanPham?.reduce((acc, i) => acc + i.GiaBan * i.SoLuong, 0), [donHang])
  const total = useMemo(() => subtotal + donHang?.PhiVanChuyen, [donHang]);

  useEffect(function () {
    XemThongTinChiTietDonHang({ id }).then(function (data) {
      setDonHang(data.data)
    })
  }, [id])
  // console.log(donHang)
  // const a = []
  // a.reverse()
  // const trangThai = [...(donHang?.trangThai ?? [])].reverse()
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b p-4 flex items-center justify-between">
          <Link to={routePaths.orders.root} className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <ChevronLeft size={20} />
            <span className="text-sm">TRỞ LẠI</span>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span>MÃ ĐƠN HÀNG. {donHang?.Id}</span>
            <span className="text-blue-500">{LayTrangThaiDonHang(donHang.trangThai?.[(donHang.trangThai?.length - 1)]?.TrangThaiDonHang)}</span>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="bg-white p-8 mb-4">
          <div className="flex items-center gap-10 relative overflow-x-scroll">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-green-500" style={{ zIndex: 0 }}></div>

            {[...(donHang?.trangThai ?? [])].reverse().map((step, index) => {
              const Icon = step?.icon;
              return (

                <div key={index} className="flex flex-col items-center justify-center" style={{ zIndex: 1 }}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step?.TrangThaiDonHang == 3 ? 'bg-green-500' : 'bg-gray-300'}`}>
                    {/* <Icon size={24} className="text-white" /> */}
                    <FontAwesomeIcon icon={faFlag} />
                  </div>
                  <div className="text-center mt-3 mw-100">
                    <div className="text-xs font-medium">{LayTrangThaiDonHang(step.TrangThaiDonHang)}</div>
                    <div className="text-xs text-gray-400 mt-1">{new Date(step.ThoiGianTao).toLocaleString()}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          {/* Left Column - Tracking Info */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            {/* <div className="text-sm text-gray-500 mb-4">return_ineligible_pass_due_date</div> */}

            <div className="flex justify-end gap-4 mb-6">
              <Button variant='solid' color='red'>
                Hủy đơn hàng
              </Button>
              {/* <button className="flex-1 bg-blue-500 text-white py-2.5 rounded hover:bg-blue-600">
                Mua Lại
              </button>
              <button className="flex-1 bg-red-00 text-white py-2.5 rounded hover:bg-blue-600">
                Liên Hệ Người Bán
              </button> */}
            </div>

            {/* Divider */}
            <div className="border-t border-dashed border-gray-300 my-6"></div>

            {/* Address */}
            <div className="mb-6">
              <h3 className="font-medium mb-4">Địa Chỉ Nhận Hàng</h3>
              <div className="space-y-1 text-sm">
                <div className="font-medium">{donHang?.HoTen}</div>
                <div className="text-gray-600">{donHang?.SoDienThoai}</div>
                <div className="text-gray-600">{donHang?.DiaChiCuThe}</div>
              </div>
              {/* <div className="flex items-center justify-end gap-2 mt-4 text-sm">
                <span className="text-gray-600">{orderData.shipping.carrier}</span>
                <span className="text-gray-400">{orderData.shipping.trackingCode}</span>
              </div> */}
            </div>

            {/* Timeline */}
            {/* <div className="space-y-4">
              {orderData.timeline.slice(0, showAllTracking ? undefined : 3).map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${item.highlight ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                    {index < orderData.timeline.length - 1 && (
                      <div className="w-0.5 h-12 bg-gray-200"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{item.time}</span>
                          {item.status && (
                            <span className={`text-sm font-medium ${item.highlight ? 'text-green-600' : 'text-gray-700'
                              }`}>{item.status}</span>
                          )}
                        </div>
                        {item.description && (
                          <div className="text-sm text-gray-600 mt-1">{item.description}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div> */}

            {/* {!showAllTracking && orderData.timeline.length > 3 && (
              <button
                onClick={() => setShowAllTracking(true)}
                className="text-blue-500 text-sm mt-4 hover:text-blue-600"
              >
                Xem thêm
              </button>
            )} */}

            {/* Seller Info */}
            <div className="flex items-center gap-3 mt-6 pt-6 border-t">
              {/* <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">Yêu thích</span> */}
              {/* <span className="font-medium">{orderData.seller.name}</span> */}
              {/* <button className="flex items-center gap-1 text-blue-500 text-sm ml-auto">
                <MessageSquare size={16} />
                <span>Chat</span>
              </button>
              <button className="flex items-center gap-1 text-gray-600 text-sm">
                <Store size={16} />
                <span>Xem Shop</span>
              </button>
              <button className="text-gray-400">
                <Info size={18} /> */}
              {/* </button> */}
            </div>

            {/* Products */}
            <div className="mt-6 space-y-4">
              {donHang?.sanPham?.map((product) => (
                <div key={product.SanPhamId} className="flex gap-3 pb-4 border-b last:border-b-0">
                  <img src={product.Url} alt={product.TenSanPham} className="w-20 h-20 object-cover rounded border" />
                  <div className="flex-1">
                    <div className="text-sm mb-1">{product.TenSanPham}</div>
                    {/* <div className="text-xs text-gray-500">{product.variant}</div> */}
                    <div className="text-sm mt-2">x{product.SoLuong}</div>
                  </div>
                  <div className="text-sm">{product.GiaBan.toLocaleString('vi-VN')}₫</div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-6 pt-6 border-t space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tổng tiền hàng</span>
                <span>{subtotal?.toLocaleString('vi-VN')}₫</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Phí vận chuyển</span>
                <span>{donHang?.PhiVanChuyen?.toLocaleString('vi-VN')}₫</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t">
                <span className="text-gray-600">Thành tiền</span>
                <span className="text-2xl text-blue-600 font-medium">
                  {total.toLocaleString('vi-VN')}₫
                </span>
              </div>
            </div>

            {/* Payment Notice */}
            {/* <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded p-3 flex items-start gap-2">
              <span className="text-yellow-600">⚠</span>
              <span className="text-xs text-gray-700">
                Vui lòng thanh toán <strong>{total.toLocaleString('vi-VN')}₫</strong> khi nhận hàng
              </span>
            </div> */}

            {/* Payment Method */}
            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Phương thức thanh toán</span>
                <span className="text-sm">Thanh toán khi nhận hàng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}