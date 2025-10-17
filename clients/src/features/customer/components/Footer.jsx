import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import Container from './Container';

export default function Footer() {
  return (
    <div className=' border-t-3 border-blue-500'>
      <Container className="py-5 flex justify-between" >
        <div>
          <h3 className="font-bold text-gray-800 mb-4 text-sm">DỊCH VỤ KHÁCH HÀNG</h3>
          <ul className="space-y-2">
            {[
              "Trung Tâm Trợ Giúp Shopee",
              "Shopee Blog",
              "Shopee Mall",
              "Hướng Dẫn Mua Hàng/Đặt Hàng",
              "Hướng Dẫn Bán Hàng",
              "Ví ShopeePay",
              "Shopee Xu",
              "Đơn Hàng",
              "Trả Hàng/Hoàn Tiền",
              "Liên Hệ Shopee",
              "Chính Sách Bảo Hành",
            ].map((i, j) => <li key={j}><Link to="#" className="text-gray-600 hover:text-blue-500 text-xs">{i}</Link></li>)}

          </ul>
        </div>

        {/* SHOPEE VIỆT NAM */}
        <div>
          <h3 className="font-bold text-gray-800 mb-4 text-sm">SHOPEE VIỆT NAM</h3>
          <ul className="space-y-2">
            {[
              "Về Shopee",
              "Tuyển Dụng",
              "Điều Khoản Shopee",
              "Chính Sách Bảo Mật",
              "Shopee Mall",
              "Kênh Người Bán",
              "Flash Sale",
              "Tiếp Thị Liên Kết",
              "Liên Hệ Truyền Thông",
            ].map((i, j) => <li key={j}><Link to="#" className="text-gray-600 hover:text-blue-500 text-xs">{i}</Link></li>)}
          </ul>
        </div>

        {/* THANH TOÁN & ĐƠN VỊ VẬN CHUYỂN */}
        <div>
          <h3 className="font-bold text-gray-800 mb-4 text-sm">THANH TOÁN</h3>
          <div className="grid grid-cols-3 gap-2 mb-6">
            <div className="bg-white border rounded p-1 flex items-center justify-center h-8">
              <span className="text-blue-800 font-bold text-xs">VISA</span>
            </div>
            <div className="bg-white border rounded p-1 flex items-center justify-center h-8">
              <span className="text-blue-500 font-bold text-xs">MC</span>
            </div>
            <div className="bg-white border rounded p-1 flex items-center justify-center h-8">
              <span className="text-blue-600 font-bold text-xs">JCB</span>
            </div>
            <div className="bg-white border rounded p-1 flex items-center justify-center h-8">
              <span className="text-blue-600 font-bold text-xs">AMEX</span>
            </div>
            <div className="bg-white border rounded p-1 flex items-center justify-center h-8">
              <span className="text-blue-500 font-bold text-xs">COD</span>
            </div>
            <div className="bg-white border rounded p-1 flex items-center justify-center h-8">
              <span className="text-blue-500 font-bold text-xs">SHO</span>
            </div>
            <div className="bg-white border rounded p-1 flex items-center justify-center h-8">
              <span className="text-blue-500 font-bold text-xs">SP</span>
            </div>
            <div className="bg-white border rounded p-1 flex items-center justify-center h-8">
              <span className="text-red-600 font-bold text-xs">SPL</span>
            </div>
          </div>

          <h3 className="font-bold text-gray-800 mb-4 text-sm">ĐƠN VỊ VẬN CHUYỂN</h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white border rounded p-1 flex items-center justify-center h-8">
              <span className="text-red-600 font-bold text-xs">SPX</span>
            </div>
            <div className="bg-white border rounded p-1 flex items-center justify-center h-8">
              <span className="text-blue-500 font-bold text-xs">GHN</span>
            </div>
            <div className="bg-white border rounded p-1 flex items-center justify-center h-8">
              <span className="text-red-600 font-bold text-xs">VTP</span>
            </div>
            <div className="bg-white border rounded p-1 flex items-center justify-center h-8">
              <span className="text-yellow-500 font-bold text-xs">VNP</span>
            </div>
            <div className="bg-white border rounded p-1 flex items-center justify-center h-8">
              <span className="text-red-600 font-bold text-xs">J&T</span>
            </div>
            <div className="bg-white border rounded p-1 flex items-center justify-center h-8">
              <span className="text-green-600 font-bold text-xs">GEX</span>
            </div>
            <div className="bg-white border rounded p-1 flex items-center justify-center h-8">
              <span className="text-red-600 font-bold text-xs">NJV</span>
            </div>
            <div className="bg-white border rounded p-1 flex items-center justify-center h-8">
              <span className="text-blue-600 font-bold text-xs">BE</span>
            </div>
            <div className="bg-white border rounded p-1 flex items-center justify-center h-8">
              <span className="text-blue-500 font-bold text-xs">AHM</span>
            </div>
          </div>
        </div>

        {/* THEO DÕI */}
        <div>
          <h3 className="font-bold text-gray-800 mb-4 text-sm">THEO DÕI SHOPEE</h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="flex items-center text-gray-600 hover:text-blue-500 space-x-2">
                <FontAwesomeIcon icon={faFacebook} />
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-gray-600 hover:text-blue-500 space-x-2">
                <FontAwesomeIcon icon={faInstagram} />
                <span>Instagram</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-gray-600 hover:text-blue-500 space-x-2">
                <FontAwesomeIcon icon={faLinkedin} />
                <span>LinkedIn</span>
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}