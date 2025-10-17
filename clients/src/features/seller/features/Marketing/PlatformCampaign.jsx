import { Button, Form, Radio, Select, Tabs } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const { Option } = Select;

export default function PlatformCampaign() {

  const campaigns = [
    {
      id: 1,
      type: 'Voucher Xtra',
      title: 'Gói Voucher Xtra',
      image: '/api/placeholder/200/200',
      timeline: 'Thời gian chương trình: 17:48 24 Th05 2024 - Vô thời hạn',
      status: 'Vẫn còn thời gian để cứ',
      statusColor: 'text-red-500',
      registered: 1,
      pending: 0,
      completed: 0,
      bgColor: 'bg-gradient-to-br from-orange-400 to-red-500',
      icon: '🎟️'
    },
    {
      id: 2,
      type: 'Đăng ký sản phẩm',
      title: 'Campaign 2025 >50%',
      image: '/api/placeholder/200/200',
      timeline: 'Thời gian chương trình: 00:00 1 Th04 2025 - 23:59 31 Th03 2026',
      status: 'Thời gian đăng ký từ kết thúc đến 23 ngày',
      statusColor: 'text-red-500',
      registered: 1,
      pending: 0,
      completed: 0,
      bgColor: 'bg-gradient-to-br from-blue-600 to-purple-600',
      icon: '🎉'
    }
  ];

  return (
    <div className="m-5 p-5 bg-white rounded shadow">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-lg font-semibold text-gray-800 mb-2">
          Đăng ký tham gia Chương Trình Khuyến Mãi Cùng Shopee
        </h1>
        <p className="text-gray-600">
          Đăng ký tham gia thế nào?{' '}
          <Link to="#">Xem thêm</Link>
        </p>
      </div>

      {/* <div className="bg-white rounded-lg shadow-sm"> */}
      {/* Tabs */}
      <Tabs items={[
        { key: 'eligible', label: 'Chương trình có thể tham gia', count: 2 },
        { key: 'draft', label: 'Thử Mới', count: 0 },
        { key: 'pending', label: 'Chờ xác nhận', count: 0 },
        { key: 'registered', label: 'Chương trình đã đăng ký', count: 0 },
      ]} tabBarExtraContent={<Select defaultValue="default" className='w-40' options={[
        { value: 'default', label: 'Thứ tự mặc định' },
        { value: 'newest', label: 'Mới nhất' },
        { value: 'oldest', label: 'Cũ nhất' },
      ]} />} />

      {/* Filters */}
      <Form>
        <Form.Item label="Chương trình">
          <Radio.Group optionType='button' size='small'
            options={[
              { label: 'Tất cả', value: 'all' },
              { label: 'Freeship Xtra Plus', value: 'freeship' },
              { label: 'Voucher Xtra', value: 'voucher' },
              { label: 'Content Xtra', value: 'content' },
              { label: 'Đăng ký sản phẩm', value: 'product' },
              { label: 'Shopee Flash Sale', value: 'flash' },
              { label: 'Shopee Live', value: 'live' },
              { label: 'Chương Trình Mã Giảm Giá', value: 'discount' },
              { label: 'Rẻ Vô Địch', value: 'cheap' },
            ]} />
        </Form.Item>
      </Form>

      {/* Campaign Cards */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex">
                {/* Image Section */}
                <div className={`w-56 ${campaign.bgColor} flex items-center justify-center p-6 relative`}>
                  {campaign.id === 1 ? (
                    <div className="bg-white rounded-lg p-6 shadow-lg transform -rotate-3">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🎟️</div>
                        <div className="text-orange-500 font-bold text-xl">VOUCHER</div>
                        <div className="text-orange-500 font-bold text-xl">XTRA</div>
                      </div>
                      <div className="absolute top-2 right-2 bg-yellow-400 text-orange-600 px-2 py-1 rounded-full text-xs font-bold transform rotate-12">
                        ⚡
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        TIỆC THỜI TRANG
                      </div>
                      <div className="text-white text-center">
                        <div className="text-6xl mb-2">👗</div>
                        <div className="text-sm font-medium">TRẢ GIÁ<br />MỚI MUA</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6">
                  <div className="mb-2">
                    <span className="text-gray-500 text-sm">{campaign.type}</span>
                    <h3 className="text-lg font-semibold text-gray-800 mt-1">
                      {campaign.title}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-600 mb-2">
                    {campaign.timeline}
                  </p>

                  <p className={`text-sm font-medium mb-4 ${campaign.statusColor}`}>
                    {campaign.status}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                    <span>Lượt đăng ký: <strong className="text-gray-800">{campaign.registered}</strong></span>
                    <span>Chờ xác nhận: <strong className="text-gray-800">{campaign.pending}</strong></span>
                    <span>Đã đăng ký: <strong className="text-gray-800">{campaign.completed}</strong></span>
                  </div>

                  < Button variant='solid' color='blue'>
                    Đăng ký ngay
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}