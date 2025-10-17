import React from 'react';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Input, Button, Badge } from 'antd';

const LazadaHeader = () => {
  const topNavItems = [
    { label: 'FEEDBACK', color: 'text-pink-500' },
    { label: 'SAVE MORE ON APP', color: 'text-blue-800' },
    { label: 'SELL ON LAZADA', color: 'text-blue-800' },
    { label: 'CUSTOMER CARE', color: 'text-blue-800' },
    { label: 'TRACK MY ORDER', color: 'text-blue-800' },
    { label: "ĐỨC MINH ĐỖ'S ACCOUNT", color: 'text-blue-800' },
    { label: 'THAY ĐỔI NGÔN NGỮ', color: 'text-blue-800' }
  ];

  return (
    <div className="w-full bg-white">
      {/* Top Utility Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex justify-end items-center space-x-6 text-xs">
            {topNavItems.map((item, index) => (
              <span key={index} className={`${item.color} hover:underline cursor-pointer whitespace-nowrap`}>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Lazada Logo */}
            <div className="flex items-center">
              <div className="flex items-center">
                {/* Heart-shaped logo with gradient */}
                <div className="relative w-10 h-10 mr-3">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full transform rotate-45"></div>
                  <div className="absolute inset-1 bg-white rounded-full transform rotate-45"></div>
                  <div className="absolute inset-2 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full transform rotate-45"></div>
                </div>
                <span className="text-blue-800 text-2xl font-bold">Lazada</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Input
                  size="large"
                  placeholder="Search in Lazada"
                  className="rounded-lg border-gray-300 focus:border-orange-400 focus:ring-orange-400"
                  suffix={
                    <Button
                      type="primary"
                      icon={<SearchOutlined />}
                      className="bg-orange-500 hover:bg-orange-600 border-orange-500 rounded-lg"
                      size="large"
                    />
                  }
                />
              </div>
            </div>

            {/* Shopping Cart */}
            <div className="ml-4">
              <Badge count={6} showZero={false} className="bg-orange-500">
                <ShoppingCartOutlined
                  className="text-blue-800 text-2xl hover:text-orange-500 cursor-pointer"
                />
              </Badge>
            </div>

            {/* Promotional Banner */}
            <div className="ml-6">
              <div className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">%</span>
                </div>
                <div className="text-sm">
                  <div>SĂN SALE GIỮA THÁNG</div>
                  <div className="text-yellow-300 font-bold text-lg">GIẢM ĐẾN 500.000Đ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LazadaHeader;
