import { CalendarOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Switch, Table, Tabs } from 'antd';
import { useState } from 'react';
import ItemLayout2 from './components/ItemLayout2';

function LayoutA() {
  const columns = [
    { title: 'Khung giờ', dataIndex: 'timeFrame', key: 'timeFrame', width: 200, },
    {
      title: 'Sản Phẩm', dataIndex: 'product', key: 'product', render: (text, record) => (
        <div>
          <div className="font-medium">{record.productName}</div>
          <div className="text-gray-500 text-sm">{record.productCount}</div>
        </div>
      ),
    },
    { title: 'Lượt Người mua đạt Nhắc nhở', dataIndex: 'buyerReminder', key: 'buyerReminder', align: 'center', },
    { title: 'Lượt nhấp chuột/xem', dataIndex: 'clicks', key: 'clicks', align: 'center', },
    {
      title: 'Trạng thái', dataIndex: 'status', key: 'status', align: 'center', render: (status) => (
        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm">
          {status}
        </span>
      ),
    },
    { title: 'Bật/Tắt', dataIndex: 'toggle', key: 'toggle', align: 'center', render: (_, record) => <Switch checked={record.isActive} />, },
    {
      title: 'Thao tác', key: 'action', align: 'center',
      render: () => (
        <div className="flex flex-col gap-1 text-blue-500">
          <a href="#" className="hover:underline">Chi tiết</a>
          <a href="#" className="hover:underline">Sao chép</a>
          <a href="#" className="hover:underline">Dữ liệu</a>
        </div>
      ),
    },
  ];

  const dataSource = [
    {
      key: '1',
      timeFrame: '19:00 29-09-2025 - 21:00',
      productName: 'Bật Flash Sale 0',
      productCount: 'Số sản phẩm tham gia 10',
      buyerReminder: '-',
      clicks: '-',
      status: 'Đã kết thúc',
      isActive: true,
    },
  ];

  return (
    <>
      {/* Filter */}
      <Form>
        <Form.Item label="Khung giờ">
          <DatePicker.RangePicker />
        </Form.Item>
      </Form>

      {/* Table */}
      <Table columns={columns} dataSource={dataSource} />
    </>
  )
}

export default function FlashSaleDashboard() {
  const [activeTab, setActiveTab] = useState('all');

  const statCards = [
    { label: 'Doanh Số', value: '0₫', change: '7 ngày', percent: '0.00%' },
    { label: 'Đơn hàng', value: '0', change: '7 ngày', percent: '0.00%' },
    { label: 'Người mua', value: '0', change: '7 ngày', percent: '0.00%' },
    { label: 'Tỷ lệ truy cập', value: '0.00 %', change: '7 ngày', percent: '-%' }
  ];


  return (
    <div className="m-5">
      {/* Stats Cards */}
      <div className='bg-white p-5 rounded-lg shadow-sm mb-5'>
        <ItemLayout2
          title="Hiệu quả Flash Sale"
          description="Tổng quan hiệu quả Flash Sale của Shop trong khoảng thời gian đã chọn"
          statsData={statCards}
        />
      </div>

      {/* Program List Section */}
      <div className="bg-white rounded-lg shadow-sm p-5">
        {/* Section Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Danh sách chương trình</h2>
          <Button variant='solid' color='blue'>Tạo chương trình</Button>
        </div>

        {/* Tabs */}
        <Tabs className='px-5' activeKey={activeTab} onChange={setActiveTab}
          items={[
            { key: 'all', label: 'Tất cả', children: <LayoutA /> },
            { key: 'ongoing', label: 'Đang diễn ra', children: <LayoutA /> },
            { key: 'upcoming', label: 'Sắp diễn ra', children: <LayoutA /> },
            { key: 'ended', label: 'Đã kết thúc', children: <LayoutA /> },
          ]} />
      </div>
    </div>
  );
}