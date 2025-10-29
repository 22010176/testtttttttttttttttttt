import { Pagination, Select } from 'antd';
import { useState } from 'react';

import Container from '../components/Container';
import ProductCard from '../components/ProductCard';
import SectionIsland from '../components/SectionIsland';

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

export default function SearchPage() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Container className="flex gap-10">

      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0">
        <SectionIsland className="mb-4">
          <h3 className="font-bold text-lg mb-4">Tất Cả Danh Mục</h3>
          <div className="space-y-2">
            {categories.map((cat, idx) => (
              <div key={idx} className="flex justify-between items-center py-1 hover:text-orange-500 cursor-pointer">
                <span>{cat.name}</span>
                <span className="text-gray-400 text-sm">({cat.count})</span>
              </div>
            ))}
          </div>
        </SectionIsland>

        {/* <SectionIsland className="mb-4">
          <h3 className="font-bold text-lg mb-4">Địa Điểm</h3>
          <Select defaultValue="hanoi" className="w-full mb-3">
            <Option value="hanoi">Hà Nội</Option>
            <Option value="hcm">TP. Hồ Chí Minh</Option>
            <Option value="danang">Đà Nẵng</Option>
          </Select>
          <Select defaultValue="all" className="w-full">
            <Option value="all">Tất cả Quận/Huyện</Option>
          </Select>
        </SectionIsland> */}

        <SectionIsland className="mb-4">
          <h3 className="font-bold text-lg mb-4">Lọc Theo Giá</h3>
          <div className="space-y-2">
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded">Dưới 50k</button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded bg-orange-50 text-orange-500">50k - 100k</button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded">100k - 200k</button>
            <button className="w-full text-left py-2 px-3 hover:bg-gray-50 rounded">Trên 200k</button>
          </div>
        </SectionIsland>

        {/* <Card>
          <h3 className="font-bold text-lg mb-4">Đánh Giá</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center space-x-2 cursor-pointer hover:text-orange-500">
                <Rate disabled defaultValue={stars} className="text-sm" />
              </div>
            ))}
          </div>
        </Card> */}
      </aside>

      {/* Product Grid */}
      <main className=" space-y-5">
        <div className='flex gap-5 items-center justify-end'>
          <p type="text" disabled>Sắp xếp theo:</p>
          <Select defaultValue="relevance" onChange={(value) => console.log(value)} className="w-48">
            <Option value="relevance">Phù hợp nhất</Option>
            <Option value="newest">Mới nhất</Option>
            <Option value="price_asc">Giá: Thấp đến Cao</Option>
            <Option value="price_desc">Giá: Cao đến Thấp</Option>
            <Option value="best_selling">Bán chạy</Option>
          </Select>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <Pagination total={100} pageSize={12} showSizeChanger={false} />
        </div>
      </main>
    </Container>
  );
}