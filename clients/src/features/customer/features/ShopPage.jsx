import { Rate, Select } from 'antd';
import { useState } from 'react';

import Container from '../components/Container';

const { Option } = Select;

const products = [
  { id: 1, name: 'Cà phê phin giấy lọc phê', price: '15.000đ', oldPrice: '25.000đ', image: 'https://via.placeholder.com/200x200/e8f5e9/2e7d32?text=Phin+Giay', discount: '-40%', sold: 1200, tag: 'Mua trước giá tốt hơn' },
  { id: 2, name: 'Ly sứ trắng cao cấp sang trọng 180ml', price: '25.000đ', oldPrice: '45.000đ', image: 'https://via.placeholder.com/200x200/fff8e1/f57c00?text=Ly+Su', discount: '-44%', sold: 850, tag: 'CÓ KHÁCH ĐANG MUA' },
  { id: 3, name: 'Cà phê hạt nguyên chất rang mộc', price: '85.000đ', oldPrice: '150.000đ', image: 'https://via.placeholder.com/200x200/e3f2fd/1976d2?text=Ca+Phe+Hat', discount: '-43%', sold: 2340, tag: 'Mua trước giá tốt hơn' },
  { id: 4, name: 'Cà phê Cold Brew 500ml', price: '45.000đ', oldPrice: '75.000đ', image: 'https://via.placeholder.com/200x200/fce4ec/c2185b?text=Cold+Brew', discount: '-40%', sold: 1580, tag: 'Mua trước giá tốt hơn' },
  { id: 5, name: 'Bộ pha cà phê Pour Over gốm sứ', price: '120.000đ', oldPrice: '200.000đ', image: 'https://via.placeholder.com/200x200/f3e5f5/7b1fa2?text=Pour+Over', discount: '-40%', sold: 680, tag: 'PHIÊN TRUYỀN PHỔ' },
  { id: 6, name: 'Cà phê nguyên chất đắng vị', price: '55.000đ', oldPrice: '95.000đ', image: 'https://via.placeholder.com/200x200/e0f2f1/00796b?text=Dang+Vi', discount: '-42%', sold: 3200, tag: 'Đang có săn Giảm' },
];

export default function CoffeeShop() {
  const [activeTab, setActiveTab] = useState('shop');

  return (
    <>
      {/* Header */}
      <Container>
        {/* Logo and Store Info */}
        <div className="flex items-center gap-5">
          <div className="w-24 h-24 bg-gradient-to-br from-red-800 to-red-900 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-red-600"></div>
              </div>
            </div>
            <div className="absolute bottom-1 left-0 right-0 text-center text-white text-xs font-bold">
              Lưu Việt Coffee
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">Lưu Việt Coffee</h1>
            <p className="text-sm text-gray-500">Online 10 phút trước</p>
            <div className="flex gap-2 mt-2">
              <button className="px-4 py-1 border border-gray-300 rounded hover:border-orange-500 hover:text-orange-500 text-sm">
                ➕ Theo dõi
              </button>
              <button className="px-4 py-1 border border-gray-300 rounded hover:border-orange-500 hover:text-orange-500 text-sm">
                💬 Chat
              </button>
            </div>
          </div>
        </div>

        {/* Store Stats */}
        <div className="grid grid-cols-3 gap-6 text-sm">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-gray-600">📦 Sản Phẩm:</span>
              <span className="text-orange-500">234</span>
            </div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-gray-600">👥 Đang Theo:</span>
              <span className="text-orange-500">37k</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">📊 Tỉ Lệ Phản Hồi Chat:</span>
              <span className="text-orange-500">87% (Trong Vài Giờ) ⓘ</span>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-gray-600">👁️ Người Theo Dõi:</span>
              <span className="text-orange-500">45.2k</span>
            </div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-gray-600">⭐ Đánh Giá:</span>
              <span className="text-orange-500">4.8 ✱ Hết Kiểm Chất Lượng</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">👤 Tham Gia:</span>
              <span className="text-orange-500">3 Năm Trước</span>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-gray-600">📈 Sản Phẩm:</span>
              <span className="text-orange-500">2.8k</span>
            </div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-gray-600">💬 Thời gian phản hồi:</span>
              <span className="text-orange-500">Trong vài giờ</span>
            </div>
          </div>
        </div>
      </Container>


      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            <button
              className={`py-3 px-2 border-b-2 font-medium ${activeTab === 'shop' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-600 hover:text-orange-500'}`}
              onClick={() => setActiveTab('shop')}
            >
              Shop
            </button>
            <button
              className={`py-3 px-2 border-b-2 font-medium ${activeTab === 'allproducts' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-600 hover:text-orange-500'}`}
              onClick={() => setActiveTab('allproducts')}
            >
              Sản phẩm
            </button>
            <button
              className={`py-3 px-2 border-b-2 font-medium ${activeTab === 'topproducts' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-600 hover:text-orange-500'}`}
              onClick={() => setActiveTab('topproducts')}
            >
              Mua top sản phẩm chọn
            </button>
            <button
              className={`py-3 px-2 border-b-2 font-medium ${activeTab === 'categories' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-600 hover:text-orange-500'}`}
              onClick={() => setActiveTab('categories')}
            >
              Danh mục shop
            </button>
            <button
              className={`py-3 px-2 border-b-2 font-medium ${activeTab === 'shopvoucher' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-600 hover:text-orange-500'}`}
              onClick={() => setActiveTab('shopvoucher')}
            >
              Shop ưu đãi hơn
            </button>
            <button
              className={`py-3 px-2 border-b-2 font-medium ${activeTab === 'about' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-600 hover:text-orange-500'}`}
              onClick={() => setActiveTab('about')}
            >
              Câu hỏi về
            </button>
            <button className="py-3 px-2 text-gray-600 hover:text-orange-500">
              Thêm ▼
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Product Filter Tags */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 flex items-center">
            GỢI Ý DÀNH CHO BẠN
            <span className="text-orange-500 text-sm ml-2 font-normal">Dạo 738 của 18</span>
          </h2>
          <div className="flex gap-2 flex-wrap">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-sm hover:bg-orange-600 text-sm">
              Mua trước giá tốt hơn
            </button>
            <button className="px-4 py-2 bg-blue-800 text-white rounded-sm hover:bg-blue-900 text-sm">
              CÓ KHÁCH ĐANG MUA
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-sm hover:bg-orange-600 text-sm">
              Mua trước giá tốt hơn
            </button>
            <button className="px-4 py-2 bg-blue-800 text-white rounded-sm hover:bg-blue-900 text-sm">
              PHIÊN TRUYỀN PHỔ
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-sm hover:bg-orange-600 text-sm">
              Đang có săn Giảm
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-6 gap-3 mb-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="absolute top-0 right-0">
                  <div className="bg-orange-500 text-white px-2 py-1 text-xs font-bold">
                    {product.discount}
                  </div>
                  <div className="bg-yellow-400 text-xs px-2 py-1 font-bold">
                    Giảm ₫5k
                  </div>
                </div>
                <div className="absolute top-2 left-0 bg-orange-500 text-white text-xs px-2 py-1 rounded-r">
                  {product.tag}
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm line-clamp-2 mb-2 h-10 group-hover:text-orange-500">{product.name}</h3>
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-orange-500 font-bold text-base">₫{product.price}</span>
                  <span className="text-gray-400 text-xs line-through">₫{product.oldPrice}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <Rate disabled defaultValue={4.8} className="text-xs" style={{ fontSize: '10px' }} />
                  <span className="text-gray-500">Đã bán {product.sold}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Holiday Banner */}
        <div className="bg-gradient-to-br from-red-700 via-red-600 to-red-800 rounded-lg p-8 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-yellow-400 rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>
          <div className="relative text-center">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-red-600"></div>
              </div>
              <h2 className="text-3xl font-bold text-white">Thông báo</h2>
              <span className="text-5xl">📢</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-6">Lịch nghỉ tết nguyên đán 2025</h3>
            <div className="flex justify-center gap-8 mb-6">
              <div>
                <div className="bg-teal-500 text-white px-6 py-2 rounded-t-lg text-sm font-semibold">
                  Thời gian nghỉ tết
                </div>
                <div className="bg-red-600 text-white px-8 py-6 rounded-b-lg">
                  <div className="text-5xl font-bold mb-2">25/1</div>
                  <div className="text-sm">(26/12 Âm lịch)</div>
                </div>
              </div>
              <div>
                <div className="bg-teal-500 text-white px-6 py-2 rounded-t-lg text-sm font-semibold">
                  Thời gian mở bán lại
                </div>
                <div className="bg-red-600 text-white px-8 py-6 rounded-lg">
                  <div className="text-5xl font-bold mb-2">03/02</div>
                  <div className="text-sm">(06/01 Âm lịch)</div>
                </div>
              </div>
            </div>
            <p className="text-white italic text-sm">Lưu Việt Kinh chúc quý khách công ích doanh</p>
            <p className="text-white italic text-sm">An Khang Thịnh Vượng - Vạn Sự Như Ý</p>
          </div>
        </div>

        {/* Promotional Banners */}
        <div className="space-y-6">
          {/* Live Sale Banner */}
          <div className="bg-gradient-to-r from-black via-gray-900 to-black rounded-lg overflow-hidden relative h-64">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 left-20 w-24 h-24 rounded-full bg-red-500 blur-2xl"></div>
              <div className="absolute bottom-10 right-20 w-32 h-32 rounded-full bg-orange-500 blur-2xl"></div>
            </div>
            <div className="relative h-full flex items-center justify-between px-12">
              <div className="text-left">
                <div className="flex items-center space-x-3 mb-4">
                  <img src="https://via.placeholder.com/60x60/ff0000/ffffff?text=LVC" alt="logo" className="w-12 h-12 rounded" />
                  <div className="text-yellow-400 text-sm font-bold">LƯU VIỆT COFFEE 🌟</div>
                </div>
                <h2 className="text-6xl font-bold text-white mb-4">PHIÊN LIVE TUẦN</h2>
                <div className="flex items-center space-x-4">
                  <div className="bg-red-600 text-white px-6 py-2 rounded-full font-bold">
                    🎁 ĐẶT TRƯỚC
                  </div>
                  <div className="bg-red-600 text-white px-6 py-2 rounded-full font-bold flex items-center space-x-2">
                    <span className="text-3xl font-black">SỐ</span>
                    <span className="text-yellow-400 text-3xl font-black">0</span>
                    <span className="text-3xl font-black">DAY</span>
                  </div>
                  <div className="bg-red-600 text-white px-6 py-2 rounded-full font-bold">
                    🔥 DEAL KHỦNG
                  </div>
                </div>
                <div className="mt-6 text-white text-sm">
                  <span className="bg-red-600 px-3 py-1 rounded mr-2">TRIỂN KHAI</span>
                  <span className="bg-orange-500 px-3 py-1 rounded">MUA NGAY»»»»</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white text-lg mb-2">Trình chiếu</div>
                <div className="text-yellow-400 text-sm font-bold">MUA 21-06H</div>
              </div>
            </div>
          </div>

          {/* Product Showcase Banners */}
          <div className="grid grid-cols-2 gap-6">
            {/* Bottled Coffee */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/600x400/8b4513/ffffff?text=Coffee+Bottles"
                alt="Cold Brew Coffee"
                className="w-full h-96 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-2">SỨ MỆNH TRUYỀN CẢM HỨNG</h3>
                <p className="text-gray-600 mb-4">Cà phê nguyên chất - Hương vị đậm đà</p>
              </div>
            </div>

            {/* Cold Brew Product */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg overflow-hidden p-8">
              <div className="grid grid-cols-2 gap-6 items-center">
                <img
                  src="https://via.placeholder.com/300x300/d4a574/ffffff?text=Cold+Brew"
                  alt="Cold Brew"
                  className="w-full rounded-lg"
                />
                <div>
                  <h3 className="text-4xl font-bold text-gray-800 mb-4">Cà phê Cold Brew</h3>
                  <p className="text-gray-600 mb-4">Khám phá hương vị mới<br />tràn về mọi thứ trong</p>
                  <button className="bg-amber-700 text-white px-6 py-2 rounded hover:bg-amber-800">
                    Mua ngay »»»
                  </button>
                  <div className="mt-8 text-right">
                    <div className="text-6xl font-black text-gray-800 transform rotate-90 origin-center inline-block">
                      NEW
                    </div>
                    <div className="text-4xl font-black text-gray-800">
                      COLD
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Circles */}
          <div>
            <h3 className="text-lg font-bold mb-4">
              DANH MỤC SẢN PHẨM CỦA LƯU
              <span className="text-orange-500 text-sm ml-2 font-normal">Xem 738 cả 18</span>
            </h3>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gray-200 mb-2 overflow-hidden">
                  <img src="https://via.placeholder.com/80x80/8b4513/ffffff?text=🧃" alt="category" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs">Cà phê viên nang</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gray-200 mb-2 overflow-hidden">
                  <img src="https://via.placeholder.com/80x80/6d4c41/ffffff?text=☕" alt="category" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs">Cà phê bột rang</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gray-200 mb-2 overflow-hidden">
                  <img src="https://via.placeholder.com/80x80/5d4037/ffffff?text=🫘" alt="category" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs">Cà phê hạt</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gray-200 mb-2 overflow-hidden">
                  <img src="https://via.placeholder.com/80x80/4e342e/ffffff?text=🫙" alt="category" className="w-full h-full object-cover" />
                </div>
                <p className="text-xs">Sản phẩm combo</p>
              </div>
            </div>
          </div>

          {/* Final Product Showcase */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden relative h-96">
            <img
              src="https://via.placeholder.com/1200x400/000000/ffffff?text=Bottled+Coffee+Collection"
              alt="Bottled Coffee"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className="text-6xl font-serif italic text-white mb-8 drop-shadow-lg">Bottled</h2>
              <h2 className="text-6xl font-serif italic text-white drop-shadow-lg">Coffee</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}