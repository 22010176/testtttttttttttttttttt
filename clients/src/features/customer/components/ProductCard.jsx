import { Link } from 'react-router-dom';

import { routePaths } from '../routes';

export default function ProductCard({ Id, TenSanPham, anhbia, GiaBan, ...props }) {
  console.log(props);
  return (
    <Link to={routePaths.product.details.replace(":id", Id)} className="bg-white rounded-sm shadow-sm hover:shadow-lg transition-shadow cursor-pointer border border-gray-100">
      {/* Image Container */}
      <div className="relative">
        {/* Discount Badge */}
        {/* <div className="absolute top-0 right-0 bg-yellow-50 text-orange-500 px-2 py-1 text-xs font-semibold">
          -36%
        </div> */}

        {/* Product Image */}
        <div className="w-full h-48 bg-gray-50 flex items-center justify-center p-4">
          <img src={anhbia} alt="Office Chair" className="w-full h-full object-contain" />
        </div>

        {/* Video Play Button */}
        {/* <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 rounded-full">
          <PlayCircleFilled className="text-white text-2xl" />
        </div> */}

        {/* Voucher Badge */}
        {/* <div className="absolute bottom-2 left-2">
          <div className="bg-yellow-400 text-red-600 px-2 py-0.5 text-xs font-bold rounded-sm flex items-center gap-1">
            <span className="text-[10px]">VOUCHER</span>
            <span className="bg-red-600 text-white px-1 rounded-sm text-[10px]">XTRA</span>
          </div>
        </div> */}
      </div>

      {/* Product Info */}
      <div className="p-2">
        {/* Tags */}
        {/* <div className="flex gap-1 mb-2">
          <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-sm font-semibold">
            Yêu thích+
          </span>
          <span className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-sm">
            Giảm 5k+
          </span>
        </div> */}

        {/* Product Title */}
        <h3 className="text-xs text-gray-800 mb-2 line-clamp-2 h-8">
          {TenSanPham}
        </h3>

        {/* Badges */}
        {/* <div className="flex gap-1 mb-2">
          <span className="border border-orange-500 text-orange-500 text-[10px] px-1.5 py-0.5 rounded-sm">
            Rẻ Vô Địch
          </span>
        </div> */}

        {/* Price and Sales */}
        <div className="">
          <div className="flex items-baseline gap-0.5">
            <span className="text-blue-500 text-base font-semibold">{(+GiaBan).toLocaleString()}</span>
            <span className="text-blue-500 text-xs underline">đ</span>
          </div>
          <span className="text-gray-500 text-[10px]">Đã bán 10k+</span>
        </div>
      </div>
    </Link>
  );
}