import { ArrowUpOutlined, InfoCircleOutlined, RightOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Tooltip } from 'antd';
import { useState } from 'react';

function Dashboard() {
  const [dateRange] = useState('Hôm nay 00:00 GMT+7 13:00(Dữ liệu thay đổi so với hôm qua)');

  const todoItems = [
    { title: 'Chờ Lấy Hàng', count: 0 },
    { title: 'Đã Xử Lý', count: 0 },
    { title: 'Đơn Trả hàng/Hoàn tiền/Huỷ', count: 0 },
    { title: 'Sản Phẩm Bị Tạm Khóa', count: 0 }
  ];

  const salesMetrics = [
    { label: 'Doanh số', value: '₫0', change: '0,00%', isPositive: false },
    { label: 'Lượt truy cập', value: '0', change: '100,00%', isPositive: false },
    { label: 'Product Clicks', value: '0', change: '0,00%', isPositive: false },
    { label: 'Đơn hàng', value: '0', change: '0,00%', isPositive: false },
    { label: 'Order Conversion Rate', value: '0,00%', change: '0,00%', isPositive: false }
  ];

  const campaigns = [
    { title: 'Gửi Voucher Xtra', subtitle: 'Chưa kết thúc', tag: 'Voucher Xtra', action: 'Tham gia', image: '🎁' },
    { title: 'Campaign 2025 >50%', subtitle: '1 Th4 2025 - 31 Th5 2025', tag: 'Đăng ký sản phẩm', action: 'Tham gia', image: '🎊' }
  ];

  return (

    <div className="flex gap-4 flex-col p-5">
      {/* To-Do List Section */}
      <Card className="shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Danh sách cần làm</h2>
        <div className="grid grid-cols-4 gap-4">
          {todoItems.map((item, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="text-2xl font-bold text-blue-600 mb-2">{item.count}</div>
              <div className="text-sm text-gray-600">{item.title}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Sales Analytics Section */}
      <Card className="shadow-sm"
        title={
          <div className="flex justify-between items-center">
            <div>
              <span className="text-lg font-semibold">Phân Tích Bán Hàng</span>
              <span className="text-xs text-gray-500 ml-3">{dateRange}</span>
            </div>
            <Button type="link" className="text-blue-600">
              Xem thêm <RightOutlined />
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-5 gap-6">
          {salesMetrics.map((metric, index) => (
            <div key={index}>
              <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
                {metric.label}
                <Tooltip title={`Thông tin về ${metric.label}`}>
                  <InfoCircleOutlined className="text-gray-400 text-xs" />
                </Tooltip>
              </div>
              <div className="text-2xl font-semibold mb-1">{metric.value}</div>
              <div className={`text-sm flex items-center gap-1 ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change !== '100,00%' && (
                  <span className={metric.isPositive ? '' : 'rotate-180'}>
                    <ArrowUpOutlined />
                  </span>
                )}
                {metric.change === '100,00%' && '▼ '}
                {metric.change}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Seller Section */}
      <Card className="shadow-sm" title={<span className="text-lg font-semibold">Người Bán</span>}>
        <Alert
          message="Tôi đã hóa doanh số bán hàng của bạn với Dịch vụ Hiển thị Shopee!"
          description="Tìm hiểu thêm về Dịch vụ Hiển thị Shopee để tạo chiến dịch một cách hiệu quả và tối ưu chi phí."
          type="error"
          showIcon
          className="mb-4"
          action={
            <Button size="small" danger ghost>
              Tìm hiểu thêm
            </Button>
          }
        />
      </Card>

      {/* Campaigns Section */}
      <Card className="shadow-sm"
        title={
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Chiến dịch</span>
            <Button type="link" className="text-blue-600">
              Thêm <RightOutlined />
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          {campaigns.map((campaign, index) => (
            <div key={index} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-32 bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center text-6xl">
                {campaign.image}
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{campaign.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{campaign.subtitle}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">{campaign.tag}</span>
                  <Button size="small" danger ghost>
                    {campaign.action}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;