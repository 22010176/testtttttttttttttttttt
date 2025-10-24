import { ChevronLeft, FileText, Info, MessageSquare, Package, Star, Store, Truck } from 'lucide-react';
import { useState } from 'react';

export default function OrderTracking() {
  const [showAllTracking, setShowAllTracking] = useState(false);

  const orderData = {
    orderCode: '25042667dddNSR0PV',
    status: 'ĐƠN HÀNG ĐÃ HOÀN THÀNH',
    trackingSteps: [
      {
        icon: FileText,
        title: 'Đơn Hàng Đã Đặt',
        time: '00:20 25-04-2025',
        active: true,
        completed: true
      },
      {
        icon: Package,
        title: 'Đã Xác Nhận Thông Tin Thanh Toán',
        time: '00:58 25-04-2025',
        active: true,
        completed: true
      },
      {
        icon: Truck,
        title: 'Đã Giao Cho ĐVVC',
        time: '12:45 25-04-2025',
        active: true,
        completed: true
      },
      {
        icon: Package,
        title: 'Đã Nhận Được Hàng',
        time: '09:49 30-04-2025',
        active: true,
        completed: true
      },
      {
        icon: Star,
        title: 'Đơn Hàng Đã Hoàn Thành',
        time: '23:59 30-05-2025',
        active: true,
        completed: true
      }
    ],
    address: {
      name: 'Đỗ Thành Nam',
      phone: '(+84) 1234567890',
      address: '344444, aaaaaaaaaai'
    },
    shipping: {
      carrier: 'SPX Express',
      trackingCode: 'SPXVN0535281374364'
    },
    timeline: [
      {
        time: '14:38 26-04-2025',
        status: 'Đã giao',
        description: 'Giao hàng thành công',
        highlight: true
      },
      {
        time: '07:30 26-04-2025',
        status: 'Đang vận chuyển',
        description: 'Đơn hàng sẽ sớm được giao, vui lòng chú ý điện thoại'
      },
      {
        time: '07:30 26-04-2025',
        status: 'Đã sắp xếp tài xế giao hàng'
      },
      {
        time: '23:34 25-04-2025',
        description: 'Đơn hàng đã đến trạm giao hàng tại khu vực của bạn và sẽ được giao trong vòng 24 giờ tiếp theo'
      },
      // {
      //   time: '20:55 25-04-2025',
      //   description: 'Đơn hàng đã rời kho phân loại tới 20-HNI Đống Đa Hub'
      // },
      // {
      //   time: '17:25 25-04-2025',
      //   description: 'Đơn hàng đã đến kho phân loại Phường Phú Chắn, Thành Phố Từ Sơn, Bắc Ninh'
      // }
    ],
    products: [
      {
        id: 1,
        name: 'Thanh Jump Cái Đơn Tháng 1*40P 2.54mm, 1 hàng 40 chân, khoảng cách giữa 2 chân là 2.54mm',
        variant: 'Phân loại hàng: Dực Tháng 1*40P',
        quantity: 2,
        price: 2000,
        image: '/api/placeholder/80/80'
      },
      {
        id: 2,
        name: 'Gói 10 Con - Led Các Loại - Led Đục, Siêu Sáng, Phủ Màu, Phi 3, Phi 5, 3mm, 5mm Màu đỏ, xanh lá, xanh dương, vàng, trắng',
        variant: 'Phân loại hàng: Led Siêu Sáng 5mm Xanh Dương',
        quantity: 1,
        price: 2989,
        image: '/api/placeholder/80/80'
      },
      {
        id: 3,
        name: 'Gói 20 Con Điện Trở vach 1/4W sai số 5% 250V 1R - 10M (220R, 330R, 470R, 1K, 2K, 4K7, 5K6, 10K, 20K, 33K, 47K.. 1M, 10M)',
        variant: 'Phân loại hàng: 330R',
        quantity: 2,
        price: 3980,
        image: '/api/placeholder/80/80'
      },
      {
        id: 4,
        name: 'Gói 20 Con Điện Trở vach 1/4W sai số 5% 250V 1R - 10M (220R, 330R, 470R, 1K, 2K, 4K7, 5K6, 10K, 20K, 33K, 47K.. 1M, 10M)',
        variant: 'Phân loại hàng: 1K',
        quantity: 2,
        price: 3980,
        image: '/api/placeholder/80/80'
      },
      {
        id: 5,
        name: 'Màn hình LCD 1602 2004 5V xanh lá/xanh dương Có Đèn Nền - Kèm I2C',
        variant: 'Phân loại hàng: Xanh Lá 5V',
        quantity: 1,
        price: 24999,
        image: '/api/placeholder/80/80'
      }
    ],
    seller: {
      name: 'Linh Kiện Điện Tử ViNa',
      isFavorite: true,
      hasChat: true,
      hasShop: true
    }
  };

  const subtotal = orderData.products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const shipping = 16500;
  const total = 54448;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b p-4 flex items-center justify-between">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <ChevronLeft size={20} />
            <span className="text-sm">TRỞ LẠI</span>
          </button>
          <div className="flex items-center gap-4 text-sm">
            <span>MÃ ĐƠN HÀNG. {orderData.orderCode}</span>
            <span className="text-blue-500">{orderData.status}</span>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="bg-white p-8 mb-4">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-green-500" style={{ zIndex: 0 }}></div>

            {orderData.trackingSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col items-center relative" style={{ zIndex: 1 }}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="text-center mt-3 max-w-[120px]">
                    <div className="text-xs font-medium">{step.title}</div>
                    <div className="text-xs text-gray-400 mt-1">{step.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          {/* Left Column - Tracking Info */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="text-sm text-gray-500 mb-4">return_ineligible_pass_due_date</div>

            <div className="flex gap-4 mb-6">
              <button className="flex-1 bg-blue-500 text-white py-2.5 rounded hover:bg-blue-600">
                Mua Lại
              </button>
              <button className="flex-1 border border-gray-300 py-2.5 rounded hover:bg-gray-50">
                Liên Hệ Người Bán
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-dashed border-gray-300 my-6"></div>

            {/* Address */}
            <div className="mb-6">
              <h3 className="font-medium mb-4">Địa Chỉ Nhận Hàng</h3>
              <div className="space-y-1 text-sm">
                <div className="font-medium">{orderData.address.name}</div>
                <div className="text-gray-600">{orderData.address.phone}</div>
                <div className="text-gray-600">{orderData.address.address}</div>
              </div>
              <div className="flex items-center justify-end gap-2 mt-4 text-sm">
                <span className="text-gray-600">{orderData.shipping.carrier}</span>
                <span className="text-gray-400">{orderData.shipping.trackingCode}</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
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
            </div>

            {!showAllTracking && orderData.timeline.length > 3 && (
              <button
                onClick={() => setShowAllTracking(true)}
                className="text-blue-500 text-sm mt-4 hover:text-blue-600"
              >
                Xem thêm
              </button>
            )}

            {/* Seller Info */}
            <div className="flex items-center gap-3 mt-6 pt-6 border-t">
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">Yêu thích</span>
              <span className="font-medium">{orderData.seller.name}</span>
              <button className="flex items-center gap-1 text-blue-500 text-sm ml-auto">
                <MessageSquare size={16} />
                <span>Chat</span>
              </button>
              <button className="flex items-center gap-1 text-gray-600 text-sm">
                <Store size={16} />
                <span>Xem Shop</span>
              </button>
              <button className="text-gray-400">
                <Info size={18} />
              </button>
            </div>

            {/* Products */}
            <div className="mt-6 space-y-4">
              {orderData.products.map((product) => (
                <div key={product.id} className="flex gap-3 pb-4 border-b last:border-b-0">
                  <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <div className="text-sm mb-1">{product.name}</div>
                    <div className="text-xs text-gray-500">{product.variant}</div>
                    <div className="text-sm mt-2">x{product.quantity}</div>
                  </div>
                  <div className="text-sm">{product.price.toLocaleString('vi-VN')}₫</div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-6 pt-6 border-t space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tổng tiền hàng</span>
                <span>{subtotal.toLocaleString('vi-VN')}₫</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Phí vận chuyển</span>
                <span>{shipping.toLocaleString('vi-VN')}₫</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t">
                <span className="text-gray-600">Thành tiền</span>
                <span className="text-2xl text-blue-600 font-medium">
                  {total.toLocaleString('vi-VN')}₫
                </span>
              </div>
            </div>

            {/* Payment Notice */}
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded p-3 flex items-start gap-2">
              <span className="text-yellow-600">⚠</span>
              <span className="text-xs text-gray-700">
                Vui lòng thanh toán <strong>{total.toLocaleString('vi-VN')}₫</strong> khi nhận hàng
              </span>
            </div>

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
    </div>
  );
}