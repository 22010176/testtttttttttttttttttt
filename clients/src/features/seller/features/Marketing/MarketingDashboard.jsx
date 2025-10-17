import { CrownOutlined, GiftOutlined, GlobalOutlined, PercentageOutlined, RightOutlined, ShopOutlined, ShoppingOutlined, ThunderboltOutlined, TrophyOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';

export default function MarketingDashboard() {
  const notifications = [
    { icon: '🔥', title: 'Đây doanh số cùng KOL!', description: '🔥 Đây doanh số cùng KOL — MIỄN PHÍ + nhận lợi 960K quý thú cho tính năng Tiệp Thị Liên Kết! Ngân sách tài trợ sẽ hiển trong "Tăng đơn cùng KOL" — kiểm...', time: 'Hôm nay 00:00' },
    { icon: '❓', title: 'Hỏi Xoay Đáp Xoay!', description: '❓Bạn bối rối với những tình huống dở khóc dở cười khi kinh doanh trên sàn và chưa biết phải giải quyết ra sao 🔑Đặt câu hỏi cho những Người bán kinh nghiệ...', time: 'Hôm nay 00:00' },
    { icon: '❤️', title: 'Học hỏi & chia sẻ cùng NBH Shopee', description: '❤️LẬP NGHIỆP VỚI SHOPEE – Cộng đồng NBH Shopee cùng nhau hiện thức hóa giấc mơ kinh doanh: ✅ Cập nhật tin tức mới nhất từ Shopee ✅ Học hỏi bi...', time: 'Hôm nay 00:00' }
  ];

  const marketingTools = [
    { icon: <PercentageOutlined />, title: 'Khuyến Mãi của Shop', badge: 'Gia tăng doanh số bán hàng', badgeColor: 'blue', description: 'Công cụ tăng đơn hàng bằng cách tạo chương trình giảm giá', color: '#ff6b6b' },
    { icon: <ThunderboltOutlined />, title: 'Flash Sale Của Shop', badge: 'Gia tăng doanh số bán hàng', badgeColor: 'blue', description: 'Công cụ quíp tăng doanh số bằng cách tạo khuyến mãi khống trong các khung giờ nhất định', color: '#ff6b6b' },
    { icon: <ShopOutlined />, title: 'Mã Giảm Giá Của Shop', badge: 'Gia tăng doanh số bán hàng', badgeColor: 'blue', description: 'Công cụ tăng đơn hàng bằng cách tạo mã giảm giá tăng cho người mua', color: '#ff6b6b' },
    { icon: <ShopOutlined />, title: 'Dịch Vụ Hiển Thị Shopee', badge: 'Tăng tưởt huy cấp', badgeColor: 'orange', description: 'Tăng mức độ hiển thị sản phẩm, thúc đẩy doanh số bán hàng', color: '#ff6b6b' },
    { icon: <GiftOutlined />, title: 'Tăng Đơn Cùng KOL', badge: 'Tăng tưởt huy cấp', badgeColor: 'orange', description: 'Tận dụng mạng lưới đối tác tiếp thị liên kết đông dân của Shopee để dẫy mành d oanh thu cho Shop', color: '#ff6b6b' },
    { icon: <VideoCameraOutlined />, title: 'Shopee Live', badge: 'Cải thiện mức lương tác', badgeColor: 'cyan', description: 'Kết nối trực tuyến với người mua và trả lời các câu hỏi liên quan đến việc mua hàng một cách dễ dàng', color: '#ff6b6b' },
    { icon: <GlobalOutlined />, title: 'Quảng Cáo Ngoài Sàn', badge: 'Tăng tưởt huy cấp', badgeColor: 'orange', description: 'Quảng bá sản phẩm trên nền tảng Meta và Google: Facebook, Instagram, Goo gle tìm kiếm và Youtube', color: '#ff6b6b' },
    { icon: <TrophyOutlined />, title: 'Xu thưởng dành giá', badge: 'Cải thiện mức lương tác', badgeColor: 'cyan', description: 'Tặng Xu thưởng để khuyến khích người mua để lại đánh giá cho sản phẩm của Shop', color: '#ff6b6b' },
    { icon: <ShoppingOutlined />, title: 'Xu Của Shop', badge: 'Cải thiện mức lương tác', badgeColor: 'cyan', description: 'Dùng Xu của Shop làm phần thưởng thu hút Người mua tham gia các hoạt động của Shop', color: '#ff6b6b' },
    { icon: <CrownOutlined />, title: 'Giải Thưởng Của Shop', badge: 'Cải thiện mức lương tác', badgeColor: 'cyan', description: 'Thu hút Người mua ghé thăm và mua sắm nhiều hơn tai shop của bạn nhờ các Game vui nhộn với giải thưởng hấp dẫn', color: '#ff6b6b' }
  ];

  const campaigns = [
    {
      image: 'https://via.placeholder.com/380x200/ff6b35/ffffff?text=VOUCHER+XTRA',
      title: 'Gởi Voucher Xtra',
      description: 'Vẫn còn thời gian đề cứ',
      tag: 'mkt_mc_campaign_landing_page_filter_option_cost_cashback_vn_only'
    },
    {
      image: 'https://via.placeholder.com/380x200/c41e3a/ffffff?text=SIEU+HOI+THOI+TRANG',
      title: 'Campaign 2025 >50%',
      description: 'Thời gian đăng ký sớm nhất kết thúc trong 23 ngày 2 giờ',
      tag: 'Đang kỷ sản phẩm'
    },
    {
      image: 'https://via.placeholder.com/380x200/c41e3a/ffffff?text=SIEU+HOI+THOI+TRANG',
      title: 'Campaign 2025 >50%',
      description: 'Thời gian đăng ký sớm nhất kết thúc trong 23 ngày 2 giờ',
      tag: 'Đang kỷ sản phẩm'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Notifications Section */}
      <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-normal text-gray-700">Thông báo</h2>
          <a href="#" className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-700">
            Xem thêm <RightOutlined className="text-xs" />
          </a>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {notifications.map((notif, index) => (
            <div key={index} className="border border-gray-200 rounded p-4 hover:shadow-md transition-shadow bg-white">
              <h3 className="font-medium text-sm mb-2">{notif.title}</h3>
              <p className="text-gray-600 text-xs mb-3 leading-relaxed">{notif.description}</p>
              <p className="text-gray-400 text-xs">{notif.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Marketing Tools Section */}
      <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
        <h2 className="text-lg font-normal text-gray-700 mb-6">Công Cụ Marketing</h2>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {marketingTools.map((tool, index) => (
            <div key={index} className="border border-gray-200 rounded p-3 hover:shadow-md transition-shadow bg-white">
              <div className="flex gap-3 mb-3">
                <div className="size-10 rounded-full flex items-center justify-center text-white text-lg bg-blue-400">
                  {tool.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm">{tool.title}</h3>
                  <Tag color={tool.badgeColor}>
                    {tool.badge}
                  </Tag>
                </div>
              </div>
              <p className="text-gray-600 text-xs leading-relaxed">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Campaigns Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-normal text-gray-700">Chương trình Shopee</h2>
          <Link className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-700">
            Xem thêm <RightOutlined className="text-xs" />
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {campaigns.map((campaign, index) => (
            <div key={index} className="border border-gray-200 rounded overflow-hidden hover:shadow-md transition-shadow bg-white">
              <div className="relative">
                <img src={campaign.image} alt={campaign.title} className="w-full h-48 object-cover" />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {campaign.tag}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-sm mb-2">{campaign.title}</h3>
                <p className="text-gray-600 text-xs">{campaign.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}