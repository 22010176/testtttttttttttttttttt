import React from 'react';
import { StarFilled } from '@ant-design/icons';

const ProductListing = () => {
  const products = [
    {
      id: 1,
      name: 'Downy Fabric Spray - Red Berry',
      color: 'red',
      nozzleColor: 'black',
      image: '🍓', // Placeholder for red berry icon
      price: 102000,
      discount: 14,
      rating: 5,
      reviews: 3213
    },
    {
      id: 2,
      name: 'Downy Fabric Spray - Lavender',
      color: 'purple',
      nozzleColor: 'black',
      image: '💜', // Placeholder for lavender icon
      price: 102000,
      discount: 14,
      rating: 5,
      reviews: 3213
    },
    {
      id: 3,
      name: 'Downy Fabric Spray - Tulip',
      color: 'blue',
      nozzleColor: 'blue',
      image: '🌷', // Placeholder for tulip icon
      price: 102000,
      discount: 14,
      rating: 5,
      reviews: 3213
    }
  ];

  const getProductColors = (color, nozzleColor) => {
    const colorMap = {
      red: {
        bottle: 'bg-red-500',
        nozzle: nozzleColor === 'black' ? 'bg-black' : 'bg-black'
      },
      purple: {
        bottle: 'bg-purple-800',
        nozzle: nozzleColor === 'black' ? 'bg-black' : 'bg-black'
      },
      blue: {
        bottle: 'bg-blue-100',
        nozzle: nozzleColor === 'blue' ? 'bg-blue-400' : 'bg-black'
      }
    };
    return colorMap[color] || { bottle: 'bg-gray-300', nozzle: 'bg-gray-600' };
  };

  return (
    <div className="w-80 bg-white">
      {/* Promotional Banner */}
      <div className="relative bg-gradient-to-r from-purple-100 to-pink-100 py-4">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Banner with P&G Logo */}
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                SALE
              </div>
            </div>
            <div className="text-xs font-semibold text-gray-600">
              P&G
            </div>
          </div>

          {/* Sale Period Banner */}
          <div className="bg-purple-600 text-white px-4 py-2 rounded-lg mb-2">
            <div className="text-center">
              <span className="font-semibold">QUY NHAT 25 - 29.09</span>
            </div>
          </div>

          {/* Volume Info */}
          <div className="text-center text-sm text-gray-700">
            1 CHAI | 370ML
          </div>
        </div>
      </div>

      {/* Product Display Section */}
      <div className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center relative">
            {/* Background Decorations */}
            <div className="absolute top-4 left-10 text-blue-300 text-2xl opacity-60">🦋</div>
            <div className="absolute bottom-4 right-10 text-orange-400 text-2xl opacity-60">🦋</div>

            {/* Products Display */}
            <div className="flex items-end space-x-8 relative z-10">
              {products.map((product, index) => {
                const colors = getProductColors(product.color, product.nozzleColor);
                return (
                  <div key={product.id} className="flex flex-col items-center">
                    {/* Product Bottle */}
                    <div className="relative mb-2">
                      <div className={`w-16 h-32 ${colors.bottle} rounded-t-full rounded-b-lg shadow-lg relative`}>
                        {/* Nozzle */}
                        <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 ${colors.nozzle} rounded-full`}></div>

                        {/* Product Label */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xs font-bold">
                          Downy
                        </div>

                        {/* Product Icon */}
                        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-lg">
                          {product.image}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Promotional Overlays */}
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 space-y-3">
              {/* LazCoins */}
              <div className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg transform -rotate-2">
                <div className="text-sm font-bold">LAZCOINS 20%</div>
              </div>

              {/* Voucher */}
              <div className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg transform rotate-1">
                <div className="text-sm font-bold">VOUCHER LAZADA 14%</div>
                <div className="text-xs">VOUCHER MAX</div>
              </div>

              {/* Free Shipping */}
              <div className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg transform -rotate-1">
                <div className="text-sm font-bold">FREESHIP TOÀN QUỐC</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-start space-x-4">
            {/* LazMall Badge */}
            <div className="bg-red-500 text-white px-3 py-1 rounded text-xs font-bold">
              LazMall
            </div>

            {/* Product Info */}
            <div className="flex-1">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                Xịt Vải DOWNY Khử Mùi Và Chống Khuẩ...
              </h2>

              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl font-bold text-orange-500">₫102,000</span>
                <span className="text-gray-500 text-sm">-14%</span>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarFilled key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">(3213)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
