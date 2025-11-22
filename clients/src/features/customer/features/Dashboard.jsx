import { Button } from 'antd';
import { useEffect, useState } from 'react';

import { XemDanhSachSanPham } from '_c/api/sanPham';
import Container from '_c/components/Container';
import ProductCard from '_c/components/ProductCard';
import SectionIsland from '_c/components/SectionIsland';

export default function DashBoard() {
  const [sanPham, setSanPham] = useState([])
  useEffect(function () {
    document.title = 'Dashboard'
    XemDanhSachSanPham({}).then(data => {
      console.log(data)
      setSanPham(data?.data)
    })
  }, [])

  console.log(sanPham)

  // const categories = [
  //   [
  //     { name: 'Thời Trang Nam', icon: '👔', color: 'bg-blue-100' },
  //     { name: 'Điện Thoại & Phụ Kiện', icon: '📱', color: 'bg-gray-100' },
  //     { name: 'Thiết Bị Điện Tử', icon: '📺', color: 'bg-blue-50' },
  //     { name: 'Máy Tính & Laptop', icon: '💻', color: 'bg-gray-100' },
  //     { name: 'Máy Ảnh & Máy Quay Phim', icon: '📷', color: 'bg-gray-100' },
  //     { name: 'Đồng Hồ', icon: '⌚', color: 'bg-gray-100' },
  //     { name: 'Giày Dép Nam', icon: '👟', color: 'bg-gray-100' },
  //     { name: 'Thiết Bị Điện Gia Dụng', icon: '🔌', color: 'bg-blue-100' },
  //     { name: 'Thể Thao & Du Lịch', icon: '⚽', color: 'bg-gray-100' },
  //     { name: 'Ô Tô & Xe Máy & Xe Đạp', icon: '🛵', color: 'bg-blue-100' },
  //     { name: 'Thời Trang Nữ', icon: '👗', color: 'bg-orange-100' },
  //     { name: 'Mẹ & Bé', icon: '🍼', color: 'bg-blue-50' },
  //     { name: 'Nhà Cửa & Đời Sống', icon: '🏠', color: 'bg-orange-100' },
  //     { name: 'Sắc Đẹp', icon: '💄', color: 'bg-pink-100' },
  //     { name: 'Sức Khỏe', icon: '💊', color: 'bg-blue-100' },
  //     { name: 'Giày Dép Nữ', icon: '👠', color: 'bg-orange-100' },
  //     { name: 'Túi Ví Nữ', icon: '👜', color: 'bg-orange-100' },
  //     { name: 'Phụ Kiện & Trang Sức Nữ', icon: '💍', color: 'bg-orange-100' },
  //     { name: 'Bách Hóa Online', icon: '🍫', color: 'bg-yellow-50' },
  //     { name: 'Nhà Sách Online', icon: '📚', color: 'bg-red-100' },
  //   ],
  // ];

  return (
    <Container className="space-y-10">
      {/* Categories */}
      {/* <SectionIsland className="space-y-5 bg-white">
        <h2 className="text-lg font-normal uppercase">DANH MỤC</h2>
        <div className="grid grid-cols-10 gap-5">
          {categories[0].map((category, index) => (
            <Link to={routePaths.search} key={index} className="border border-gray-200 rounded hover:shadow-lg hover:border-blue-500 transition-all cursor-pointer group">
              <div className="flex flex-col items-center justify-center h-full p-3">
                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <p className="text-xs text-center text-gray-700 leading-tight ">
                  {category.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </SectionIsland> */}

      {/* Suggest */}
      <SectionIsland className="space-y-5 bg-white">
        <h2 className="text-lg font-normal uppercase">GỢI Ý</h2>
        <div className='grid grid-cols-6 gap-5'>
          {sanPham.length > 0 ? sanPham?.map((product, j) => <ProductCard key={j} {...product} />) : (

            <div className=' text-center  col-span-6 mb-10'>

              <h1 className='text-2xl font-semibold'>
                Không tìm thấy sản phẩm được đăng bán.
              </h1>
            </div>
          )}

          {/* <div className='col-span-6 flex justify-center'>
            <Button className='w-100' size='large' variant='solid' color='blue'>Xem thêm</Button>

          </div> */}
        </div>
      </SectionIsland>
    </Container>
  );
}