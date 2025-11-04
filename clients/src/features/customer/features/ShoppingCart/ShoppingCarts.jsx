import { Button, Checkbox, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { XemDanhSachGioHang } from '_c/api/gioHang';
import Container from '_c/components/Container';
import { routePaths } from '_c/routes';

function ProductRow({ className, children, ...props }) {
  return (
    <div {...props} className={[className, 'grid grid-cols-10 gap-5 py-2 px-5'].join(' ')}>
      {children}
    </div>
  )
}

const ShopeeCarts = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      shopName: 'Linh Kiện Điện Tử Viña',
      shopBadge: 'Yêu thích',
      shopIcon: '🛍️',
      voucher: true,
      freeShipping: 'Giảm 500.000₫ phí vận chuyển đơn tối thiểu 0₫; Giảm 501.000₫ phí vận chuyển đơn tối thiểu 500.000₫',
      items: [
        {
          id: 101,
          name: 'Gói 50 Con - Led Các Loại - Led Đúc, Siêu Sáng Ph1 Màu, Ph 3...',
          variant: 'Led Sáu Sáng 6mm 50 CON Xanh Dương',
          price: 18400,
          originalPrice: 18400,
          quantity: 1,
          image: '/api/placeholder/80/80',
          tag: 'Yêu thích'
        },
        {
          id: 102,
          name: 'Thanh Jump Cái Đơn 1 Hàng 1*40P 2.54mm, 1 Hàng 40 chân, Không...',
          variant: '7 Jump Đực Thẳng',
          price: 13700,
          originalPrice: 13700,
          quantity: 1,
          image: '/api/placeholder/80/80'
        },
        {
          id: 103,
          name: 'Màn hình LCD 1602 2004 5V xanh lá/xanh dương I2C Đen Nền - Kem...',
          variant: 'Xanh Lá 5V',
          price: 38298,
          originalPrice: 38298,
          quantity: 1,
          image: '/api/placeholder/80/80',
          tag: 'Yêu thích'
        },
        {
          id: 104,
          name: 'Gói 20 Con Điốt Tử vạch 1/4W sài đá 5% 250V 1N - 10Đ (220R, 330...',
          variant: '1K',
          price: 8189,
          originalPrice: 8189,
          quantity: 1,
          image: '/api/placeholder/80/80',
          tag: 'Yêu thích'
        },
        {
          id: 105,
          name: 'Gói 20 Con Điốt Tử vạch 1/4W sài đá 5% 250V 1N - 10Đ (220R, 330...',
          variant: '330R',
          price: 8189,
          originalPrice: 8189,
          quantity: 1,
          image: '/api/placeholder/80/80',
          tag: 'Yêu thích',
        }
      ]
    },
    {
      id: 2,
      shopName: 'Linh Kiện Điện Tử Meta',
      shopBadge: 'Yêu thích',
      shopIcon: '🛍️',
      voucher: true,
      freeShipping: 'Giảm 500.000₫ phí vận chuyển đơn tối thiểu 0₫; Giảm 1.000.000₫ phí vận chuyển đơn tối thiểu 500.000₫',
      items: [
        {
          id: 201,
          name: '[Gói 50 Con] Led Siêu Sáng Phi 5 Màu Đỏ, Xanh Lá, Xanh Dương,...',
          variant: 'TRẮNG',
          price: 18400,
          originalPrice: 18400,
          quantity: 1,
          image: '/api/placeholder/80/80',
          tag: 'Yêu thích'
        }
      ]
    },
    {
      id: 3,
      shopName: 'Anhari Manga Shop',
      shopBadge: 'Mall',
      shopIcon: '🛍️',
      dealTitle: 'Mua Kèm Deal Sốc với mức giá ưu đãi',
      items: [
        {
          id: 301,
          name: 'Sách Grimgar - Lẻ tập 1 - 16 - Ao Anh Và Trở Tận 1 2 3 4 5 6 7 8 9 6...',
          variant: 'Tập 7',
          price: 95500,
          originalPrice: 95500,
          quantity: 1,
          stock: 5,
          image: '/api/placeholder/80/80',
          deal: true
        }
      ]
    },
    {
      id: 4,
      shopName: 'Light Novel Shop',
      dealTitle: 'Mua Kèm Deal Sốc với mức giá ưu đãi',
      freeShipping: 'Giảm 500.000₫ phí vận chuyển đơn tối thiểu 0₫; Giảm 1.000.000₫ phí vận chuyển đơn tối thiểu 500.000₫',
      items: [
        {
          id: 401,
          name: 'Sách Dược Sư 1 2 3 4 5 6 7 8 9 10 11 12 13 14 - Manga...',
          variant: 'Light Novel 7',
          price: 129500,
          originalPrice: 388500,
          quantity: 3,
          stock: 3,
          image: '/api/placeholder/80/80',
          deal: true
        }
      ]
    },
    {
      id: 5,
      shopName: 'Linh Kiện Điện Tử LKI',
      shopBadge: 'Yêu thích',
      shopIcon: '🛍️',
      voucher: true,
      freeShipping: 'Giảm 500.000₫ phí vận chuyển đơn tối thiểu 0₫; Giảm 1.000.000₫ phí vận chuyển đơn tối thiểu 500.000₫',
      items: [
        {
          id: 501,
          name: 'KIT Arduino Uno R3 Atmega 328P Chip Cắm Có Kèm Dây Cáp',
          variant: 'R3 Chip Dán',
          price: 76998,
          originalPrice: 307992,
          quantity: 4,
          image: '/api/placeholder/80/80',
          tag: 'Yêu thích'
        }
      ]
    }
  ]);

  const [gioHang, setGioHang] = useState([])

  useEffect(function () {
    XemDanhSachGioHang({}).then(function (data) {
      setGioHang(Object.values(data.data.reduce((acc, i) => {
        if (acc[i.GianHangId] == null) acc[i.GianHangId] = { ...i, sanPham: [] }
        acc[i.GianHangId].sanPham.push(i)

        return acc
      }, {})))
    })
  }, [])

  const getTotalItems = () => {
    let count = 0;
    cartItems.forEach(shop => {
      count += shop.items.length;
    });
    return count;
  };

  return (
    <Container>
      {/* Header */}
      {gioHang.map((shop, j) => (
        <div key={j} className="mb-5 bg-white shadow">
          {/* Shop Header */}
          <ProductRow className="border-b-1 gap-5 items-center text-left bg-blue-500">
            <Checkbox />
            <span className="font-medium text-white col-span-5">{shop.TenGianHang}</span>
            <span className="text-white">Đơn Giá</span>
            <span className="text-white">Số Lượng</span>
            <span className="text-white">Số Tiền</span>
            <span className="text-white">Thao Tác</span>
          </ProductRow>

          {shop.sanPham.map((item, i) => (
            // <div className="px-5 py-4  hover:bg-gray-50">
            <ProductRow key={i} className="items-center border-b-1">
              <Checkbox />
              {/* Product Image */}
              <img src={item.hinhanhsanpham} alt={item.TenSanPham} className="size-20 bg-black object-cover rounded" />

              {/* Product Info */}
              <h3 className="text-sm mb-2 line-clamp-2 col-span-4">{item.TenSanPham}</h3>

              {/* Price */}
              <div>
                {/* {item.originalPrice > item.price && (
                  <div className="text-xs text-gray-400 line-through">
                    {item.GiaBan.toLocaleString()}₫
                  </div>
                )} */}
                <div className="text-sm">
                  {item.GiaBan.toLocaleString()}₫
                </div>
              </div>

              {/* Quantity */}
              <InputNumber variant='underlined' controls={false} defaultValue={1} />


              {/* Total */}
              <div className="">
                {item.originalPrice > item.price && (
                  <div className="text-xs text-gray-400 line-through mb-1">
                    {(item.GiaBan * 1).toLocaleString()}₫
                  </div>
                )}
                <div className="text-red-500 font-medium">
                  {(item.GiaBan * 1).toLocaleString()}₫
                </div>
                {/* {item.stock && (
                          <div className="text-xs text-gray-500 mt-1">
                            Còn {item.stock} sản phẩm
                          </div>
                        )} */}
              </div>

              {/* Actions */}
              <div className="">
                <Button type="link" danger className="text-xs">
                  Xóa
                </Button>
                {/* <div className="text-xs text-blue-500 cursor-pointer mt-1">
                          Tìm sản phẩm tương tự
                        </div> */}
              </div>
            </ProductRow>

            // </div>
          ))}
          {/* </div> */}

          {/* Shop Footer */}
          {/* {shop.freeShipping && (
              <div className="bg-blue-50 px-5 py-3 rounded-b-lg flex items-center text-xs">
                <GiftOutlined className="text-blue-500 mr-2" />
                <span className="text-gray-700">{shop.freeShipping}</span>
                <Button type="link" size="small" className="text-blue-500 ml-2">
                  Tìm hiểu thêm
                </Button>
              </div>
            )} */}
        </div>
      ))}

      {/* Voucher Section */}
      {/* <div className="bg-white rounded-lg px-5 py-4 mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <PercentageOutlined className="text-red-500" />
          <span>Shopee Voucher</span>
        </div>
        <Button type="link" className="text-blue-500">
          Chọn hoặc nhập mã
        </Button>
      </div> */}


      {/* Footer Checkout */}
      < div className="bg-white border-t shadow-lg" >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Checkbox>
                Chọn Tất Cả ({getTotalItems()})
              </Checkbox>
              <Button type="link" danger>Xóa</Button>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-xs text-gray-500 mb-1">
                  Bạn chưa chọn sản phẩm <span className="ml-2">💡</span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-sm mr-2">Tổng cộng (0 Sản phẩm):</span>
                  <span className="text-2xl text-red-500 font-medium">0₫</span>
                </div>
              </div>
              <Link to={routePaths.orders.checkout}>
                <Button type="primary" >
                  Mua Hàng
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div >
    </Container >
  );
};

export default ShopeeCarts;