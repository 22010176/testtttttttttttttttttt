import { LikeOutlined, MoreOutlined, PlayCircleFilled, RightOutlined, ShopOutlined, ShoppingCartOutlined, StarFilled } from '@ant-design/icons';
import { Button, InputNumber, notification } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { keys } from '@/constant/localStorageKey';
import { ThemGioHang } from '../api/gioHang';
import { XemChiTietSanPham } from '../api/sanPham';
import Container from '../components/Container';
import { routePaths } from '../routes';

export default function ProductDetail() {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [media, setMedia] = useState([]);

  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(function () {
    document.title = 'Product Details'
    // Fetch product details and media
    XemChiTietSanPham({ id }).then(data => {
      console.log(data)
      setProduct(data.data.sanpham);
      setMedia(data.data.media || []);
      setSelectedImage(0);
    });
  }, [id])

  const tabs = [
    { key: 'all', label: 'Tất Cả' },
    { key: '5star', label: '5 Sao (1,3k)' },
    { key: '4star', label: '4 Sao (92)' },
    { key: '3star', label: '3 Sao (27)' },
    { key: '2star', label: '2 Sao (6)' },
    { key: '1star', label: '1 Sao (8)' },
    { key: 'withComments', label: 'Có Bình Luận (405)' },
    { key: 'withMedia', label: 'Có Hình Ảnh / Video (217)' }
  ];

  return (
    <div className="">
      {contextHolder}
      {/* Main Content */}
      <Container>
        <div className="bg-white rounded-sm p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Images */}
            <div>
              {/* Main Image */}
              <div className="bg-gray-50 rounded mb-4 flex items-center justify-center p-8 relative">
                <div className="w-full aspect-square flex items-center justify-center">
                  {media.length > 0 ? (
                    <img
                      src={media[selectedImage].Url}
                      alt={`Product Image ${selectedImage + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <div className="text-gray-400 text-6xl">📦</div>
                  )}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {media.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 border-2 rounded ${selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                      } hover:border-blue-300 transition-colors`}
                  >
                    {/* <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                      {index + 1}
                    </div> */}
                    <img src={img.Url} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover rounded" />
                  </button>
                ))}
              </div>

              {/* Share & Like */}
              {/* <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Chia sẻ:</span>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:opacity-80">
                      <span className="text-white text-xs">M</span>
                    </button>
                    <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:opacity-80">
                      <span className="text-white text-xs">F</span>
                    </button>
                    <button className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center hover:opacity-80">
                      <span className="text-white text-xs">P</span>
                    </button>
                    <button className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:opacity-80">
                      <span className="text-white text-xs">X</span>
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setLiked(!liked)}
                  className="flex items-center gap-2 text-sm hover:text-orange-500"
                >
                  {liked ? (
                    <HeartFilled className="text-red-500" />
                  ) : (
                    <HeartOutlined />
                  )}
                  <span>Đã thích (86)</span>
                </button>
              </div> */}
            </div>

            {/* Right Column - Product Info */}
            <div>
              <h1 className="text-xl font-normal mb-4">{product?.TenSanPham}</h1>

              {/* Rating & Sales */}
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-blue-500 border-b border-blue-500">4.9</span>
                  <div className="flex text-blue-500">
                    {[...Array(5)].map((_, i) => (
                      <StarFilled key={i} className="text-sm" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 border-b border-gray-400">1,5k</span>
                  <span className="text-gray-500 text-sm">Đánh Giá</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Đã Bán 10k+</span>
                </div>
              </div>

              {/* Price */}
              <div className="bg-gray-50 p-4 rounded mb-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl text-orangbluee-500 font-light">{(+product?.GiaBan).toLocaleString()}đ</span>
                  {/* <span className="text-gray-400 line-through text-sm">16.000đ - 19.000đ</span>
                  <span className="bg-blue-500 text-white text-xs px-1 rounded">-8%</span> */}
                </div>
              </div>

              {/* Shipping Info */}
              {/* <div className="mb-6">
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-gray-600 w-32">Vận Chuyển</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-400">🚚</span>
                      <span className="font-medium">Nhận trong 18 Th10</span>
                      <RightOutlined className="text-gray-400 text-xs" />
                    </div>
                    <div className="text-sm mb-1">Phí ship 0đ</div>
                    <div className="text-xs text-gray-500">Tặng Voucher 15.000đ nếu đơn giao sau thời gian trên</div>
                  </div>
                </div>
              </div> */}

              {/* Buyer Protection */}
              {/* <div className="mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-gray-600 w-32">Ân Tâm Mua<br />Sắm Cùng<br />Shopee</span>
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">🛡️</span>
                    <span>Bảo hiểm bảo vệ người tiêu dùng</span>
                    <button className="text-gray-400">
                      <RightOutlined className="text-xs" />
                    </button>
                  </div>
                </div>
              </div> */}

              {/* Flavor Selection */}
              {/* <div className="mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-gray-600 w-32">Mẫu</span>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2">
                      {flavors.map((flavor) => (
                        <button
                          key={flavor.id}
                          onClick={() => flavor.active && setSelectedFlavor(flavor.name)}
                          disabled={!flavor.active}
                          className={`px-4 py-2 border rounded text-sm ${selectedFlavor === flavor.name
                            ? 'border-blue-500 text-blue-500'
                            : flavor.active
                              ? 'border-gray-300 hover:border-blue-300'
                              : 'border-gray-200 text-gray-300 cursor-not-allowed'
                            }`}
                        >
                          {flavor.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Quantity */}
              <div className="mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 w-32">Số Lượng</span>
                  <div className="flex items-center gap-4">
                    <InputNumber defaultValue={1} controls={false} />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button variant='outlined' color='blue' size='large' icon={<ShoppingCartOutlined />}
                  onClick={async function () {
                    if (localStorage.getItem(keys.userToken) == null) {
                      navigate(routePaths.account.login)
                    }
                    try {
                      const result = await ThemGioHang({
                        sanPhamId: id,
                        soLuong: 1
                      })

                      if (result.success) {
                        api.success({ description: "Thêm giỏ hàng thành công!" })
                        console.log(result)
                      }
                      else {

                        throw new Error("dd")
                      }
                    } catch (error) {
                      navigate(routePaths.account.login)
                    }
                  }}>
                  Thêm Vào Giỏ Hàng
                </Button>
                {/* <button className="flex-1 bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition-colors">
                  Mua Ngay
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </Container >

      {/* Shop Header */}
      < Container className="bg-white my-4" >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌿</span>
              </div>
              <div>
                <h2 className="font-semibold">{product?.HoTen}</h2>
                <p className="text-sm text-gray-500">Online 11 Phút Trước</p>
              </div>
              <div className="flex gap-2 ml-4">
                {/* <button className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-orange-50 transition-colors">
                  <MessageOutlined />
                  <span>Chat Ngay</span>
                </button> */}
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  <ShopOutlined />
                  <span>Xem Shop</span>
                </button>
              </div>
            </div>

            {/* <div className="grid grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-sm text-gray-500 mb-1">Đánh Giá</div>
                <div className="text-orange-500 font-semibold">47,2k</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Sản Phẩm</div>
                <div className="text-orange-500 font-semibold">1,3k</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Tỉ Lệ Phản Hồi</div>
                <div className="text-orange-500 font-semibold">46%</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Thời Gian Phản Hồi</div>
                <div className="text-orange-500 font-semibold">trong vài giờ</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Tham Gia</div>
                <div className="text-orange-500 font-semibold">5 năm trước</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Người Theo Dõi</div>
                <div className="text-orange-500 font-semibold">15,4k</div>
              </div>
            </div> */}
          </div>
        </div>
      </Container >

      {/* Product Details Section */}
      < Container >
        <div className="bg-white rounded-sm p-6 mb-4">
          <h2 className="text-lg font-semibold mb-4">CHI TIẾT SẢN PHẨM</h2>

          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-5 gap-4">
              <span className="text-gray-500">Danh Mục</span>
              <div className="col-span-4 flex items-center gap-2 text-blue-600">
                <a href="#" className="hover:underline">Shopee</a>
                <RightOutlined className="text-xs text-gray-400" />
                <a href="#" className="hover:underline">Sức Khỏe</a>
                <RightOutlined className="text-xs text-gray-400" />
                <a href="#" className="hover:underline">Thực phẩm chức năng</a>
                <RightOutlined className="text-xs text-gray-400" />
                <a href="#" className="hover:underline">Hỗ trợ sức khỏe</a>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4">
              <span className="text-gray-500">Kho</span>
              <span className="col-span-4">CÒN HÀNG</span>
            </div>

            <div className="grid grid-cols-5 gap-4">
              <span className="text-gray-500">Xuất xứ</span>
              <span className="col-span-4">Việt Nam</span>
            </div>

            <div className="grid grid-cols-5 gap-4">
              <span className="text-gray-500">Ngày hết hạn</span>
              <span className="col-span-4">27-08-2027</span>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="bg-white rounded-sm p-6 mb-4">
          <h2 className="text-lg font-semibold mb-4">MÔ TẢ SẢN PHẨM</h2>

          <div className="text-sm text-gray-700 space-y-2">
            <p>Bổ sung vitamin C tự nhiên vị chanh leo, vị cam, dứa, dâu</p>
            <p>Thành nhiệt giải khát</p>
            <p>Tăng sức bền thành mạch máu</p>
            <p>Giảm cháy máu chân răng do thiếu vitamin C hiệu quả</p>
            <p>Vị chanh leo thơm ngon</p>
            <p>Dạng sủi tiện sử dụng</p>
            <p>Sử dụng hàng ngày</p>
            <p>An toàn cho trẻ từ 2 tuổi</p>
            <p className="italic">Sản phẩm này không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh".</p>
          </div>
        </div>

        {/* Product Reviews */}
        <div className="bg-white rounded-sm p-6">
          <h2 className="text-lg font-semibold mb-6">ĐÁNH GIÁ SẢN PHẨM</h2>

          {/* Rating Summary */}
          <div className="flex items-center gap-8 mb-6 pb-6 border-b">
            <div className="text-center">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl text-orange-500 font-light">4.9</span>
                <span className="text-sm text-gray-500">trên 5</span>
              </div>
              <div className="flex text-orange-500 mt-2">
                {[...Array(5)].map((_, i) => (
                  <StarFilled key={i} className="text-xl" />
                ))}
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded border text-sm ${activeTab === tab.key
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'border-gray-300 hover:border-orange-300'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Review Item */}
          <div className="space-y-4">
            <div className="pb-4 border-b">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-400">👤</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">n*****7</span>
                  </div>

                  <div className="flex text-orange-500 text-sm mb-2">
                    {[...Array(5)].map((_, i) => (
                      <StarFilled key={i} />
                    ))}
                  </div>

                  <div className="text-xs text-gray-500 mb-2">
                    2024-08-15 08:12 | Phân loại hàng: vị cam
                  </div>

                  <div className="text-sm mb-2">
                    <span className="text-gray-600">Công dụng: </span>
                    <span>cho người cần bổ xung vitamin C</span>
                  </div>

                  <div className="text-sm mb-2">
                    <span className="text-gray-600">Đối tượng sử dụng: </span>
                    <span>trên 10 tuổi</span>
                  </div>

                  <p className="text-sm mb-3">
                    Giao hàng nhanh , dùng với mỗ tá sản phẩm, chất lượng bình thường
                  </p>

                  {/* Review Images */}
                  <div className="flex gap-2 mb-3">
                    <div className="relative w-20 h-20 bg-gray-100 rounded overflow-hidden">
                      <PlayCircleFilled className="absolute inset-0 m-auto text-white text-2xl z-10" />
                      <div className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-xs px-1 rounded">
                        0:12
                      </div>
                      <div className="w-full h-full bg-gradient-to-b from-gray-300 to-gray-400" />
                    </div>
                    <div className="w-20 h-20 bg-gradient-to-b from-orange-300 to-orange-400 rounded" />
                    <div className="w-20 h-20 bg-gradient-to-b from-red-300 to-red-400 rounded" />
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <button className="flex items-center gap-1 hover:text-orange-500">
                      <LikeOutlined />
                      <span>4</span>
                    </button>
                    <button className="hover:text-orange-500">
                      <MoreOutlined />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container >
    </div >
  );
}