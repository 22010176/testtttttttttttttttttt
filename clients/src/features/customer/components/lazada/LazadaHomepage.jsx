import React, { useState, useEffect } from 'react';
import { StarFilled, ClockCircleOutlined, ShoppingCartOutlined, BellOutlined, UserOutlined, GiftOutlined, TruckOutlined, QrcodeOutlined } from '@ant-design/icons';
import ProductCard from './ProductCard';

const LazadaHomepage = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 62, minutes: 50, seconds: 43 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Flash Sale Products
  const flashSaleProducts = [
    {
      name: "Dầu gội chống gàu Selsun 100ml",
      originalPrice: 83000,
      price: 71000,
      discount: 14,
      image: "🧴"
    },
    {
      name: "Whiskas Adult Cat Food with Sea Fish Flavor - 3k...",
      originalPrice: 286000,
      price: 253650,
      discount: 11,
      image: "🐱"
    },
    {
      name: "EJK738 - Lock&Lock Electric Kettle 1.7L, 220V...",
      originalPrice: 837000,
      price: 497000,
      discount: 41,
      image: "⚡"
    },
    {
      name: "Lotus Rice Sushi Japonica Rice 2kg/4,7lbs -...",
      originalPrice: 85000,
      price: 63000,
      discount: 26,
      image: "🍚"
    },
    {
      name: "Combo Dầu Gội Và Dầu Xả TRESemmé Keratin...",
      originalPrice: 462000,
      price: 309000,
      discount: 33,
      image: "🧼"
    },
    {
      name: "[Can Receive Old/New Packaging] Powdered...",
      originalPrice: 772740,
      price: 614752,
      discount: 20,
      image: "🥛"
    }
  ];

  // LazMall Shops
  const lazMallShops = [
    { name: "Thảo Nguyên Shop", image: "🌸", product: "Air Freshener" },
    { name: "Thien Huong Food - Since 1964", image: "🍜", product: "Instant Noodles" },
    { name: "Anello", image: "🎒", product: "Black Backpack" },
    { name: "DosReal", image: "👟", product: "Patterned Shoes" },
    { name: "Kymdan", image: "🛏️", product: "Mattress Protector" },
    { name: "DK Harvest", image: "🥜", product: "Granola Jar" }
  ];

  // Categories
  const categories = [
    { name: "Portable Speakers & Boomboxes", icon: "🔊" },
    { name: "Wireless Earbuds", icon: "🎧" },
    { name: "Smartwatch & Fitness Trackers", icon: "⌚" },
    { name: "Microphones", icon: "🎤" },
    { name: "Mobiles", icon: "📱" },
    { name: "Phone Cables & Converters", icon: "🔌" },
    { name: "T-Shirts & Tanks", icon: "👕" },
    { name: "Power Banks", icon: "🔋" },
    { name: "IP Security Cameras", icon: "📹" },
    { name: "Fairy Lights", icon: "✨" },
    { name: "Mobile Phone Cases", icon: "📱" },
    { name: "Men's Jeans", icon: "👖" },
    { name: "Serum & Essence", icon: "💧" },
    { name: "Air Purifier Replacement...", icon: "🌬️" },
    { name: "Aromatherapy Fragrance", icon: "🕯️" },
    { name: "Plants & Seeds", icon: "🌱" }
  ];

  // Just For You Products
  const justForYouProducts = [
    {
      name: "Sáp thơm phòng Ami hộp 200g",
      price: 29900,
      originalPrice: 45000,
      discount: 34,
      rating: 5,
      reviews: 162,
      image: "🕯️",
      isLazMall: false
    },
    {
      name: "TOPITEM Pin 18650 Lishen Xám Mới Chính Hãng -...",
      price: 27423,
      originalPrice: 34000,
      discount: 19,
      rating: 5,
      reviews: 474,
      image: "🔋",
      isLazMall: false
    },
    {
      name: "LazMall Red Brick Whole Grain Bread 500Gr",
      price: 55000,
      originalPrice: 85000,
      discount: 35,
      rating: 5,
      reviews: 629,
      image: "🍞",
      isLazMall: true
    },
    {
      name: "LazMall SmartDevil Privacy Tempered Glass...",
      price: 71214,
      originalPrice: 165000,
      discount: 57,
      rating: 5,
      reviews: 49,
      image: "📱",
      isLazMall: true
    },
    {
      name: "Công tắc điều khiển từ xa Rf 100m-500m-...",
      price: 68000,
      originalPrice: 120000,
      discount: 43,
      rating: 5,
      reviews: 437,
      image: "🔌",
      isLazMall: false
    },
    {
      name: "LazMall (Only August 20-21) Elmich El8345 304...",
      price: 136000,
      originalPrice: 410000,
      discount: 67,
      rating: 5,
      reviews: 2757,
      image: "⚡",
      isLazMall: true
    },
    {
      name: "LazMall Bộ 12 hộp Creamer đặc có đường...",
      price: 188568,
      originalPrice: 233000,
      discount: 19,
      rating: 5,
      reviews: 5608,
      image: "🥛",
      isLazMall: true
    },
    {
      name: "Bóng đèn LED trụ 10W 20W 30W 40W 50W 65W...",
      price: 22770,
      originalPrice: 26000,
      discount: 12,
      rating: 5,
      reviews: 11837,
      image: "💡",
      variants: ["10W", "20W", "30W", "40W", "50W", "65W"],
      isLazMall: false
    },
    {
      name: "LazMall Lon sữa bột Pediasure B/A hương va...",
      price: 1019000,
      originalPrice: 1456000,
      discount: 30,
      rating: 5,
      reviews: 27046,
      image: "🥛",
      isLazMall: true
    },
    {
      name: "LazMall Xịt Vải DOWNY Khử Mùi Và Chống Khuẩ...",
      price: 102000,
      originalPrice: 120000,
      discount: 14,
      rating: 5,
      reviews: 3213,
      image: "🧴",
      isLazMall: true
    },
    {
      name: "LazMall Men's Short Sleeve Waffle round Nec...",
      price: 53000,
      originalPrice: 136000,
      discount: 61,
      rating: 5,
      reviews: 872,
      image: "👕",
      isLazMall: true
    }
  ];

  return (
    <div className="w-full bg-gray-50">
      {/* Hero Banner Section */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Left Side - Promotional Content */}
            <div className="flex-1">
              <div className="mb-4">
                <h1 className="text-purple-600 text-2xl font-bold mb-2">SALE CUỐI THÁNG</h1>
                <p className="text-purple-600 text-lg">25-29 MỖI THÁNG</p>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center">
                  <TruckOutlined className="mr-2" />
                  FREESHIP TOÀN SÀN
                </div>
              </div>
              
              <h2 className="text-purple-600 text-3xl font-bold mb-4">LÀM ĐẸP CHÍNH HÃNG</h2>
              
              <div className="bg-white p-4 rounded-lg mb-4">
                <div className="text-purple-600 text-xl font-bold mb-2">GIẢM ĐẾN 50%</div>
                <div className="text-orange-500 text-lg font-semibold">MUA TẶNG 1+1</div>
              </div>
              
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold">
                MUA NGAY &gt;
              </button>
              
              <p className="text-xs text-gray-500 mt-2">
                Nhấn thỏa điều kiện, xem chi tiết tại trong Trợ giúp Help Center
              </p>
            </div>

            {/* Right Side - App Download Panel */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">Laz</div>
                <h3 className="font-bold mb-2">TRY LAZADA APP</h3>
                <p className="text-sm text-gray-600 mb-2">4.7 Rated</p>
                <p className="text-sm text-gray-600 mb-4">Get the Lazada App to enjoy</p>
                
                <div className="space-y-2 mb-4">
                  <div className="text-sm font-semibold text-green-600">FREE SHIPPING</div>
                  <div className="text-sm font-semibold text-purple-600">EXCLUSIVE VOUCHERS</div>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg mb-4 flex justify-center">
                  <QrcodeOutlined className="text-4xl text-gray-600" />
                </div>
                
                <div className="space-y-2">
                  <button className="w-full bg-black text-white py-2 px-4 rounded text-sm">App Store</button>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded text-sm">Google Play</button>
                </div>
                
                <p className="text-xs text-gray-500 mt-2">
                  Download the App now by scanning the QR code
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LazMall & Top Up Section */}
      <div className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">
                LazMall
              </div>
              <span className="text-sm">100% Hàng Chính Hãng</span>
              <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                👟
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Top Up</span>
              <span className="text-sm text-gray-600">Cheap Mobile & 4G TopUp!</span>
              <span className="text-lg">⬆️</span>
            </div>
          </div>
        </div>
      </div>

      {/* LazFlash Banner */}
      <div className="bg-pink-500 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">SALE CUỐI THÁNG 25-29 MỖI THÁNG</h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold">LAZFLASH 1 TRIỆU TRỢ GIÁ</span>
              <BellOutlined className="text-xl" />
              <span className="text-xl">→</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flash Sale Section */}
      <div className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-bold">Flash Sale</h2>
              <div className="flex items-center space-x-2 text-orange-500">
                <ClockCircleOutlined />
                <span>On Sale Now</span>
                <span className="text-gray-600">Ending in</span>
                <div className="flex space-x-1">
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                    {timeLeft.hours.toString().padStart(2, '0')}
                  </span>
                  <span className="text-red-500">:</span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                    {timeLeft.minutes.toString().padStart(2, '0')}
                  </span>
                  <span className="text-red-500">:</span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                    {timeLeft.seconds.toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-semibold">
              SHOP ALL PRODUCTS
            </button>
          </div>

          <div className="flex space-x-4 overflow-x-auto pb-4">
            {flashSaleProducts.map((product, index) => (
              <div key={index} className="flex-shrink-0 w-48 bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-center mb-3">
                  <div className="text-4xl mb-2">{product.image}</div>
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                    {product.name}
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-orange-500">
                      ₫{product.price.toLocaleString('vi-VN')}
                    </span>
                    <span className="text-xs text-gray-500 line-through">
                      ₫{product.originalPrice.toLocaleString('vi-VN')}
                    </span>
                  </div>
                  <div className="text-xs text-red-500 font-semibold">
                    -{product.discount}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LazMall Shops Section */}
      <div className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">LazMall</h2>
            <button className="text-orange-500 hover:text-orange-600 text-sm font-semibold">
              Shop More &gt;
            </button>
          </div>

          <div className="flex space-x-4 overflow-x-auto pb-4">
            {lazMallShops.map((shop, index) => (
              <div key={index} className="flex-shrink-0 w-32 text-center">
                <div className="bg-gray-100 rounded-lg p-4 mb-2">
                  <div className="text-3xl mb-2">{shop.image}</div>
                </div>
                <h3 className="text-sm font-medium text-gray-900">{shop.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-bold mb-6">Categories</h2>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {categories.map((category, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-100 rounded-lg p-4 mb-2 hover:bg-gray-200 transition-colors cursor-pointer">
                  <div className="text-2xl mb-1">{category.icon}</div>
                </div>
                <p className="text-xs text-gray-700">{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Just For You Section */}
      <div className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-bold mb-6">Just For You</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {justForYouProducts.map((product, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                <div className="text-center mb-3">
                  <div className="text-3xl mb-2">{product.image}</div>
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                    {product.name}
                  </h3>
                  {product.isLazMall && (
                    <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold mb-2 inline-block">
                      LazMall
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-orange-500">
                      ₫{product.price.toLocaleString('vi-VN')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through">
                        ₫{product.originalPrice.toLocaleString('vi-VN')}
                      </span>
                    )}
                  </div>
                  {product.discount && (
                    <div className="text-xs text-red-500 font-semibold">
                      -{product.discount}%
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarFilled key={i} className="text-yellow-400 text-xs" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">
                      ({product.reviews.toLocaleString('vi-VN')})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold">
              LOAD MORE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LazadaHomepage;
