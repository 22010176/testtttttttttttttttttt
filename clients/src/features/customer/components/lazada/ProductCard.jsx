import React from 'react';
import { StarFilled } from '@ant-design/icons';

const ProductCard = ({ name, variants, price, discount, rating, reviews, image, }) => {
  return (
    <div className="w-80 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Product Image Section */}
      <div className="p-4 bg-gray-50 rounded-t-lg">
        <div className="flex justify-center items-center h-32">
          <div className="text-6xl">{image}</div>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
          {name}
        </h3>

        {/* Product Variants */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {variants.map((variant, index) => (
              <span
                key={index}
                className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
              >
                {variant}
              </span>
            ))}
            {variants.length > 6 && (
              <span className="text-xs text-gray-500">...</span>
            )}
          </div>
        </div>

        {/* Price Section */}
        <div className="mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-orange-500">
              ₫{price.toLocaleString('vi-VN')}
            </span>
            <span className="text-xs text-gray-500">
              -{discount}%
            </span>
          </div>
        </div>

        {/* Rating Section */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarFilled key={i} className="text-yellow-400 text-sm" />
            ))}
          </div>
          <span className="text-xs text-gray-600">
            ({reviews.toLocaleString('vi-VN')})
          </span>
        </div>
      </div>

      {/* Optional: Add to Cart Button */}
      <div className="px-4 pb-4">
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
          Thêm vào giỏ
        </button>
      </div>
    </div>
  );
};

// Example usage with different products
const ProductCardExample = () => {
  const products = [
    {
      name: "Bóng đèn LED trụ",
      variants: ["10W", "20W", "30W", "40W", "50W", "65W"],
      price: 22770,
      discount: 12,
      rating: 5,
      reviews: 11837,
      image: "💡"
    },
    {
      name: "Bóng đèn LED âm trần",
      variants: ["5W", "9W", "12W", "15W", "18W"],
      price: 45000,
      discount: 8,
      rating: 4,
      reviews: 5421,
      image: "🔆"
    },
    {
      name: "Bóng đèn LED tube",
      variants: ["18W", "24W", "36W", "48W"],
      price: 85000,
      discount: 15,
      rating: 5,
      reviews: 8934,
      image: "⚡"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-100">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};

export default ProductCard;
export { ProductCardExample };
