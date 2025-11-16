import { Button, Select, Tabs } from 'antd';
import { useState } from 'react';

import OrderListLayout from './components/OrderListLayout';

const topTabs = [
  // { key: 'all', label: <p className='px-3'>Tất cả</p>, children: <OrderListLayout /> },
  { key: 'active', label: <p className='px-3'>Chờ xác nhận</p>, children: <OrderListLayout /> },
  { key: 'a', label: <p className='px-3'>Chờ lấy hàng</p>, children: <OrderListLayout /> },
  { key: 'b', label: <p className='px-3'>Đang giao</p>, children: <OrderListLayout /> },
  { key: 'c', label: <p className='px-3'>Đã giao</p>, children: <OrderListLayout /> },
];
export default function OrderDashboard() {
  const [activeTab, setActiveTab] = useState('active');

  return (
    <div className="bg-white m-5 p-5">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">Tất cả</h1>
        <div className="flex gap-3">
          <Button>Xuất</Button>
          <Button type="primary">Lịch sử Xuất Báo cáo</Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={topTabs} />
    </div>
  );
}