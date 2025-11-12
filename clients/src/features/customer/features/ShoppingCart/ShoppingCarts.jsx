import { Button, Checkbox, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { XemDanhSachGioHang, XoaGioHang } from '_c/api/gioHang';
import Container from '_c/components/Container';
import { routePaths } from '_c/routes';

function ProductRow({ className, children, ...props }) {
  return (
    <div {...props} className={[className, 'grid grid-cols-12 gap-5 py-2 px-5'].join(' ')}>
      {children}
    </div>
  )
}

const ShopeeCarts = () => {
  const [gioHang, setGioHang] = useState([])

  async function updateGioHang() {
    XemDanhSachGioHang({}).then(function (data) {
      setGioHang(Object.values(data.data.reduce((acc, i) => {
        if (acc[i.GianHangId] == null) acc[i.GianHangId] = { ...i, sanPham: [] }
        acc[i.GianHangId].sanPham.push(i)

        return acc
      }, {})))
    })
  }

  useEffect(function () {
    updateGioHang()
  }, [])

  const getTotalItems = () => gioHang.reduce((acc, i) => acc += i.sanPham.length, 0);

  return (
    <Container className="min-h-70">
      {/* Header */}
      {gioHang.map((shop, j) => (
        <div key={j} className="mb-5 bg-white shadow">
          {/* Shop Header */}
          <ProductRow className="border-b-1 gap-5 items-center text-left bg-blue-500">
            <Checkbox />
            <span className="font-medium text-white col-span-5  ">{shop.TenGianHang}</span>
            <span className="text-white  col-span-2">Đơn Giá</span>
            <span className="text-white">Số Lượng</span>
            <span className="text-white  col-span-2">Số Tiền</span>
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
              <div className=' col-span-2'>
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
              <div className="col-span-2">
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
                <Button type="link" danger className="text-xs"
                  onClick={async function () {
                    console.log(item)
                    const result = await XoaGioHang({ id: item.Id })
                    console.log(result)
                    await updateGioHang()
                  }}>
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