import { CalendarOutlined, DownloadOutlined, InfoCircleOutlined, RightOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Menu, Select, Switch, Table, Tabs, TimePicker } from 'antd';
import { useState } from 'react';

import { routePaths } from '_s/routes';
import { Link } from 'react-router-dom';

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Doanh số', value: '₫ 0', comparison: 'so với 00:00-10:00 hôm qua', percent: '0.00%' },
    { label: 'Đơn hàng', value: '0', comparison: 'so với 00:00-10:00 hôm qua', percent: '0.00%' },
    { label: 'Tỷ lệ chuyển đổi đơn hàng', value: '0,00%', comparison: 'so với 00:00-10:00 hôm qua', percent: '0.00%' },
    { label: 'Lượt truy cập', value: '0', comparison: 'so với 00:00-10:00 hôm qua', percent: '0.00%' },
  ];

  const sideStats = [
    { label: 'Doanh số hôm nay', value: '₫0' },
    { label: 'Lượt truy cập', value: '0' },
    { label: 'Lượt nhấp vào sản phẩm', value: '0' },
    { label: 'Đơn hàng', value: '0' },
    { label: 'Tỷ lệ chuyển đổi đơn hàng', value: '0,00%' },
  ];

  return (
    <div className="">
      {/* Main Content */}
      <div className="pt-5">
        {/* Top Controls */}
        <div className="bg-white rounded shadow p-4 mb-6 flex items-center justify-between">
          <Form layout='inline'>
            <Form.Item label="Khung Thời Gian">
              <TimePicker.RangePicker />
            </Form.Item>

            <Form.Item label="Loại Đơn Hàng" className='w-100'>
              <Select options={[
                { key: "a", label: "Đơn hàng đã đặt" },
                { key: "b", label: "Đơn hàng đã xác nhận" },
                { key: "c", label: "Đơn hàng đã thanh toán" },
              ]} />
            </Form.Item>
          </Form>

        </div>

        <div className="grid grid-cols-8 gap-5">
          {/* Left Section */}

          {/* Stats Cards */}
          <div className='col-span-6 space-y-5 bg-white shadow-sm p-5'>
            <div className='space-y-3'>
              <h2 className="text-lg font-semibold ">Tổng quan</h2>
              <div className="grid grid-cols-4 gap-5">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-4 border-t-3 border-blue-500">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">{stat.label}</span>
                      <InfoCircleOutlined className="text-gray-400" />
                    </div>
                    <div className="text-2xl font-semibold mb-1">{stat.value}</div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{stat.comparison}</span>
                      <span>{stat.percent}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            <div className='space-y-3'>
              <div className="text-lg font-semibold">Biểu đồ</div>
              {/* <div className="h-64 border border-gray-200">
                <div className="absolute inset-0 flex items-end justify-between px-8">
                  <div className="flex flex-col items-center">
                    <div className="text-xs text-gray-500 mb-2">00:00</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-xs text-gray-500 mb-2">06:00</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mb-16"></div>
                    <div className="text-xs text-gray-500 mb-2">12:00</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-xs text-gray-500 mb-2">18:00</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-xs text-gray-500 mb-2">24:00</div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"></div>
              </div>
              <div className="flex items-center justify-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Doanh số</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Lượt truy cập</span>
                </div>
              </div> */}
            </div>
          </div>

          <div className="bg-white shadow-sm p-5 col-span-2">
            <div className="flex items-end justify-between mb-4">
              <h3 className="font-semibold">Chỉ số theo thời gian thực</h3>
              <Link type="link" className="text-blue-500 text-sm">Xem thêm <RightOutlined /></Link>
            </div>
            <div className="flex items-center mb-4 text-sm text-gray-600">
              <div className="size-2 bg-green-500 rounded-full mr-2"></div>
              Cập nhật theo thời gian thực
            </div>

            {/* Timeline */}
            {/* <div className="relative h-32 mb-6">
              <div className="absolute top-0 left-0 right-0 flex justify-between text-xs text-gray-500">
                <span>00:00</span>
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mb-1"></div>
                  <span>12:00</span>
                </div>
                <span>24:00</span>
              </div>
              <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-red-500 to-blue-200 rounded-full"></div>
            </div> */}

            {/* Stats */}
            <div className="space-y-4 flex flex-col">
              {sideStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600">{stat.label}</span>
                    <InfoCircleOutlined className="text-gray-400 ml-1 text-xs" />
                  </div>
                  <span className="font-semibold">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Chart Section */}


          {/* Product Rankings */}
          <div className="bg-white shadow-sm p-5 col-span-5">
            <div className="flex justify-between mb-3">
              <h3 className="font-semibold">Thứ hạng sản phẩm</h3>
              <Link type="link" className="text-blue-500">Xem thêm <RightOutlined /></Link>
            </div>

            <Tabs items={[
              {
                key: "a", label: <p className='px-2'> Theo doanh số</p>, children:
                  <Table columns={[
                    { title: "Thứ hạng" },
                    { title: "Thông tin sản phẩm" },
                    { title: "Theo doanh số" }
                  ]} />
              },
              {
                key: "b", label: <p className='px-2'> Theo số sản phẩm</p>, children:
                  <Table columns={[
                    { title: "Thứ hạng" },
                    { title: "Thông tin sản phẩm" },
                    { title: "Theo số sản phẩm" }
                  ]} />
              },
              {
                key: "c", label: <p className='px-2'> Theo lượt xem</p>, children:
                  <Table columns={[
                    { title: "Thứ hạng" },
                    { title: "Thông tin sản phẩm" },
                    { title: "Theo lượt xem" }
                  ]} />
              },
              {
                key: "d", label: <p className='px-2'> Theo tỷ lệ chuyển đổi</p>, children:
                  <Table columns={[
                    { title: "Thứ hạng" },
                    { title: "Thông tin sản phẩm" },
                    { title: "Theo tỷ lệ chuyển đổi" }
                  ]} />
              },
            ]} />

          </div>

          <div className="bg-white shadow-sm p-5 col-span-3">
            <div className="flex justify-between mb-3">
              <h3 className="font-semibold">Thứ hạng ngành hàng</h3>
              <Link type="link" className="text-blue-500">Xem thêm <RightOutlined /></Link>
            </div>
            <Table className='h-full' columns={[
              { title: "Thứ hạng" },
              { title: "Ngành hàng" },
              { title: "Theo doanh số" }
            ]} />
          </div>
        </div>
      </div>
    </div>
  );
}