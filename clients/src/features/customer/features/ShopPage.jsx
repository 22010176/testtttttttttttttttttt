import { MenuOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Card, Input, Pagination, Rate, Select, Tag } from 'antd';
import { useState } from 'react';

const { Option } = Select;

const products = [
  { id: 1, name: 'Remote Điều Khiển TV Samsung', price: '29.000đ', oldPrice: '50.000đ', image: 'https://via.placeholder.com/150', discount: '-42%', sold: 2847, rating: 4.5 },
  { id: 2, name: 'Cáp HDMI 2.0 4K Dài 1.5m', price: '19.000đ', oldPrice: '35.000đ', image: 'https://via.placeholder.com/150', discount: '-46%', sold: 1523, rating: 4.8 },
  { id: 3, name: 'Pin AAA Alkaline', price: '36.000đ', oldPrice: '50.000đ', image: 'https://via.placeholder.com/150', discount: '-28%', sold: 3421, rating: 4.6 },
  { id: 4, name: 'Remote Điều Khiển Đa Năng', price: '19.000đ', oldPrice: '40.000đ', image: 'https://via.placeholder.com/150', discount: '-53%', sold: 5678, rating: 4.7 },
  { id: 5, name: 'Vỏ Bọc Bảo Quản Remote', price: '12.000đ', oldPrice: '25.000đ', image: 'https://via.placeholder.com/150', discount: '-52%', sold: 891, rating: 4.3 },
  { id: 6, name: 'Mạch Âm Ly Bluetooth 5.0', price: '58.000đ', oldPrice: '120.000đ', image: 'https://via.placeholder.com/150', discount: '-52%', sold: 2341, rating: 4.9 },
  { id: 7, name: 'Remote TCL Smart TV', price: '34.000đ', oldPrice: '70.000đ', image: 'https://via.placeholder.com/150', discount: '-51%', sold: 1234, rating: 4.4 },
  { id: 8, name: 'Loa Bluetooth Mini Speaker', price: '78.000đ', oldPrice: '150.000đ', image: 'https://via.placeholder.com/150', discount: '-48%', sold: 4567, rating: 4.8 },
  { id: 9, name: 'Adapter Nguồn 12V 2A', price: '24.000đ', oldPrice: '45.000đ', image: 'https://via.placeholder.com/150', discount: '-47%', sold: 3210, rating: 4.5 },
  { id: 10, name: 'Remote Sony TV Universal', price: '29.000đ', oldPrice: '60.000đ', image: 'https://via.placeholder.com/150', discount: '-52%', sold: 2890, rating: 4.6 },
  { id: 11, name: 'Module Relay 4 Kênh', price: '42.000đ', oldPrice: '85.000đ', image: 'https://via.placeholder.com/150', discount: '-51%', sold: 1567, rating: 4.7 },
  { id: 12, name: 'Remote LG Smart TV', price: '32.000đ', oldPrice: '65.000đ', image: 'https://via.placeholder.com/150', discount: '-51%', sold: 3456, rating: 4.5 },
];

const categories = [
  { name: 'Thiết Bị Điện Tử', count: 1847 },
  { name: 'Máy Chiếu Console', count: 234 },
  { name: 'Thiết Bị Âm Thanh', count: 892 },
  { name: 'Gia dụng', count: 1456 },
  { name: 'Phụ kiện', count: 3421 },
  { name: 'Lọc và phụ kiện', count: 567 },
  { name: 'Tivi', count: 892 },
  { name: 'Điện gia dụng', count: 1234 },
];

export default function ShopPage() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white-500 text-white">
        <div className="container mx-auto px-4 py-3">
          {/* Store Info Banner */}
          <div className="bg-gradient-to-r from-green-800 to-green-900 rounded-lg p-4 mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-full p-2 w-20 h-20 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-green-600 text-white rounded-full px-2 py-1 text-xs font-bold">IPM</div>
                  <div className="text-red-600 text-xs font-bold mt-1">Shopee Mall</div>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold">IPM Việt Nam Official Store</h2>
                <p className="text-sm text-gray-200">Online 4 phút trước</p>
                <div className="flex gap-3 mt-2">
                  <button className="bg-green-700 hover:bg-green-600 px-6 py-2 rounded flex items-center space-x-2 text-sm">
                    <span>+</span>
                    <span>Theo Dõi</span>
                  </button>
                  <button className="bg-green-700 hover:bg-green-600 px-6 py-2 rounded flex items-center space-x-2 text-sm">
                    <span>💬</span>
                    <span>Chat</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 text-sm">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300">📦 Sản Phẩm:</span>
                  <span className="text-red-400 font-bold">376</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300">👤 Đang Theo:</span>
                  <span className="text-red-400 font-bold">6</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300">💬 Tỉ Lệ Phản Hồi Chat:</span>
                  <span className="text-red-400 font-bold">98% (Trong Vài Giờ) ⓘ</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300">👥 Người Theo Dõi:</span>
                  <span className="text-red-400 font-bold">156k</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300">⭐ Đánh Giá:</span>
                  <span className="text-red-400 font-bold">5.0 (400k Đánh Giá)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300">👤 Tham Gia:</span>
                  <span className="text-red-400 font-bold">5 Năm Trước</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <MenuOutlined className="text-xl" />
              <h1 className="text-xl font-bold">Tất Cả Danh Mục</h1>
            </div>
            <div className="flex items-center space-x-4">
              <ShoppingCartOutlined className="text-2xl" />
              <span>Giỏ hàng</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2">
            <Input
              size="large"
              placeholder="Tìm kiếm sản phẩm..."
              prefix={<SearchOutlined />}
              className="flex-1"
            />
            <button className="bg-white text-orange-500 px-6 py-2 rounded font-semibold hover:bg-gray-100">
              Tìm Kiếm
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex space-x-6 text-gray-700">
              <button className="py-3 px-2 text-orange-500 border-b-2 border-orange-500 font-medium">Liên Quan</button>
              <button className="py-3 px-2 hover:text-orange-500">Mới Nhất</button>
              <button className="py-3 px-2 hover:text-orange-500">Bán Chạy</button>
              <button className="py-3 px-2 hover:text-orange-500">Sản Phẩm</button>
              <Select defaultValue="Giá" className="ml-auto" style={{ width: 120 }}>
                <Option value="low">Giá: Thấp đến Cao</Option>
                <Option value="high">Giá: Cao đến Thấp</Option>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <Card className="mb-4">
              <h3 className="font-bold text-lg mb-4">Tất Cả Danh Mục</h3>
              <div className="space-y-2">
                {categories.map((cat, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1 hover:text-orange-500 cursor-pointer">
                    <span>{cat.name}</span>
                    <span className="text-gray-400 text-sm">({cat.count})</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="mb-4">
              <h3 className="font-bold text-lg mb-4">Địa Điểm</h3>
              <Select defaultValue="hanoi" className="w-full mb-3">
                <Option value="hanoi">Hà Nội</Option>
                <Option value="hcm">TP. Hồ Chí Minh</Option>
                <Option value="danang">Đà Nẵng</Option>
              </Select>
              <Select defaultValue="all" className="w-full">
                <Option value="all">Tất cả Quận/Huyện</Option>
              </Select>
            </Card>

            <Card className="mb-4">
              <h3 className="font-bold text-lg mb-4">Lọc Theo Giá</h3>
              <div className="space-y-2">
                <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded">Dưới 50k</button>
                <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded bg-orange-50 text-orange-500">50k - 100k</button>
                <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded">100k - 200k</button>
                <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded">Trên 200k</button>
              </div>
            </Card>

            <Card>
              <h3 className="font-bold text-lg mb-4">Đánh Giá</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center space-x-2 cursor-pointer hover:text-orange-500">
                    <Rate disabled defaultValue={stars} className="text-sm" />
                    <span className="text-sm">trở lên</span>
                  </div>
                ))}
              </div>
            </Card>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-5 gap-4">
              {products.map((product) => (
                <Card
                  key={product.id}
                  hoverable
                  className="relative"
                  cover={
                    <div className="relative">
                      <img alt={product.name} src={product.image} className="w-full h-40 object-cover" />
                      {product.discount && (
                        <Badge.Ribbon text={product.discount} color="red" />
                      )}
                      <Tag color="orange" className="absolute bottom-2 left-2 text-xs">
                        Mua Ngay
                      </Tag>
                    </div>
                  }
                >
                  <div className="space-y-2">
                    <h4 className="text-sm line-clamp-2 h-10">{product.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-orange-500 font-bold">{product.price}</span>
                      <span className="text-gray-400 text-xs line-through">{product.oldPrice}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <Rate disabled defaultValue={product.rating} className="text-xs" />
                      <span>Đã bán {product.sold}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <Pagination
                current={currentPage}
                total={100}
                pageSize={12}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
              />
            </div>
          </main>
        </div>
      </div>

    </div>
  );
}