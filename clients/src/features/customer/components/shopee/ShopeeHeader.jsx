import React from 'react';
import { SearchOutlined, ShoppingCartOutlined, BellOutlined, QuestionCircleOutlined, GlobalOutlined, FacebookOutlined, InstagramOutlined } from '@ant-design/icons';
import { Input, Button, Dropdown, Badge } from 'antd';

const ShopeeHeader = () => {
  const topNavItems = [
    { label: 'Kênh Người Bán', key: 'seller' },
    { label: 'Trở thành Người bán Shopee', key: 'become-seller' },
    { label: 'Tải ứng dụng', key: 'download-app' },
    { label: 'Kết nối', key: 'connect', icon: true }
  ];

  const languageItems = [
    { key: 'vi', label: 'Tiếng Việt' },
    { key: 'en', label: 'English' }
  ];

  const categoryItems = [
    'Bình Nước Giữ Nhiệt Cute',
    'Bộ Quần Áo Ngủ Nữ Mùa Hè',
    'Áo Khoác Hot',
    'Ốp Điện Thoại',
    'Bánh Mix Nội Địa Trung',
    'Gương Điện',
    'Set Kẹp 50 Cái'
  ];

  return (
    <div className="w-full">
      {/* Top Navigation Bar */}
      <div className="bg-orange-500 text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {topNavItems.map((item, index) => (
                <div key={item.key} className="flex items-center">
                  <span className="hover:text-orange-200 cursor-pointer">
                    {item.label}
                  </span>
                  {item.icon && (
                    <div className="flex items-center ml-2 space-x-1">
                      <FacebookOutlined className="text-white hover:text-orange-200 cursor-pointer" />
                      <InstagramOutlined className="text-white hover:text-orange-200 cursor-pointer" />
                    </div>
                  )}
                  {index < topNavItems.length - 1 && !item.icon && (
                    <span className="mx-2">|</span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <BellOutlined />
                <span className="hover:text-orange-200 cursor-pointer">Thông Báo</span>
              </div>
              <div className="flex items-center space-x-1">
                <QuestionCircleOutlined />
                <span className="hover:text-orange-200 cursor-pointer">Hỗ Trợ</span>
              </div>
              <Dropdown menu={{ items: languageItems }} trigger={['hover']} placement="bottomRight">
                <div className="flex items-center space-x-1 hover:text-orange-200 cursor-pointer">
                  <GlobalOutlined />
                  <span>Tiếng Việt</span>
                  <span className="text-xs">▼</span>
                </div>
              </Dropdown>
              <span className="hover:text-orange-200 cursor-pointer">Đăng Ký</span>
              <span className="hover:text-orange-200 cursor-pointer">Đăng Nhập</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-orange-500">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-white text-2xl font-bold mr-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                    <span className="text-orange-500 font-bold text-lg">S</span>
                  </div>
                  <span>Shopee</span>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Input
                  size="large"
                  placeholder="Shopee bao ship 0Đ - Đăng ký ngay!"
                  className="pr-12 rounded-sm"
                  suffix={
                    <Button
                      type="primary"
                      icon={<SearchOutlined />}
                      className="bg-orange-400 hover:bg-orange-500 border-orange-400 rounded-sm"
                    />
                  }
                />
              </div>
            </div>

            {/* Cart */}
            <div className="ml-4">
              <Badge count={0} showZero={false}>
                <ShoppingCartOutlined
                  className="text-white text-2xl hover:text-orange-200 cursor-pointer"
                />
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-orange-500 pb-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center space-x-8 text-white text-xs">
            {categoryItems.map((category, index) => (
              <span
                key={index}
                className="hover:text-orange-200 cursor-pointer whitespace-nowrap"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopeeHeader;