import { faBagShopping, faGift, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, DatePicker, Form, Input, Select, Table, Tabs } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import EmptyList from '_s/components/EmptyList';
import ItemLayout from './components/ItemLayout';
import ItemLayout2 from './components/ItemLayout2';

const { RangePicker } = DatePicker;
const { Option } = Select;

function LayoutA() {
  const statsData = [
    { label: 'Doanh Số', value: '₫ 0', change: '7 ngày', percent: '0.00%' },
    { label: 'Đơn hàng', value: '0', change: '7 ngày', percent: '0.00%' },
    { label: 'Số lượng đã bán', value: '0', change: '7 ngày', percent: '0.00%' },
    { label: 'Người mua', value: '0', change: '7 ngày', percent: '0.00%' }
  ];

  const columns = [
    { title: 'Tất cả', dataIndex: 'name', key: 'name', },
    { title: 'Loại khuyến mãi', dataIndex: 'type', key: 'type', },
    { title: 'Sản phẩm', dataIndex: 'products', key: 'products', },
    { title: 'Thời Gian', dataIndex: 'time', key: 'time', },
    { title: 'Thao tác', dataIndex: 'actions', key: 'actions', },
  ];
  return (
    <div className="flex flex-col gap-5">
      <ItemLayout2
        title="Hiệu quả Khuyến Mãi"
        description="Thiết lập các chương trình khuyến mãi riêng của Shop để tăng Doanh Số và cải thiện tỉ lệ chuyển đổi"
        statsData={statsData} />

      {/* Campaign List Section */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-gray-800">Danh sách chương trình</h2>

        {/* Filters */}
        <Form layout='inline'>
          <Form.Item label="Tìm kiếm">
            <Input placeholder="Input" />
          </Form.Item>
          <Form.Item label="Thời gian khuyến mãi">
            <DatePicker.RangePicker />
          </Form.Item>
          <Form.Item>
            <div className='flex gap-3'>
              <Button className='w-20' variant='outlined' color='blue' >Tìm</Button >
              <Button className='w-20'>Đặt lại</Button>
            </div>
          </Form.Item>
        </Form>

        {/* Table */}
        <Table columns={columns} dataSource={[]} locale={{ emptyText: <EmptyList /> }} />
      </div>
    </div>
  )
}

export default function DiscountDashboard() {
  const [activeTab, setActiveTab] = useState('all');



  const tabItems = [
    { key: 'all', label: 'Tất cả', children: <LayoutA /> },
    { key: 'shop', label: 'Chương Trình Của Shop', children: <LayoutA /> },
    { key: 'combo', label: 'Combo Khuyến Mãi', children: <LayoutA /> },
    { key: 'flash', label: 'Mua Kèm Deal Sốc', children: <LayoutA /> }
  ];

  const discountTypes = [
    { icon: <FontAwesomeIcon icon={faGift} className='text-blue-400' size='xl' />, label: 'Chương Trình Của Shop', descriptions: 'Tạo Chương trình của Shop để thiết lập các chương trình giảm giá sản phẩm' },
    { icon: <FontAwesomeIcon icon={faTags} className='text-blue-400' size='xl' />, label: 'Combo Khuyến Mãi', descriptions: 'Tạo Combo Khuyến Mãi để tăng giá trị đơn hàng trên mỗi Người mua' },
    { icon: <FontAwesomeIcon icon={faBagShopping} className='text-blue-400' size='xl' />, label: 'Mua Kèm Deal Sốc', descriptions: 'Tạo Mua Kèm Deal Sốc để tăng đơn hàng' }
  ];

  return (
    <div className="flex flex-col p-5 gap-5">
      <div className="bg-white p-5 grid grid-cols-1 md:grid-cols-3 gap-5 rounded shadow">
        <div className='col-span-3'>
          <h1 className="text-lg font-semibold text-gray-800 mb-2">Tạo Khuyến Mãi</h1>
          <p className="text-gray-500">
            Thiết lập các chương trình khuyến mãi riêng của Shop để tăng Doanh Số và cải thiện tỉ lệ chuyển đổi{' '}
            <Link to="#" className="text-blue-500 hover:text-blue-600">Tìm hiểu thêm</Link>
          </p>
        </div>

        {discountTypes.map((item, i) => (
          <ItemLayout key={i} icon={item.icon} title={item.label} description={item.descriptions} />
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white px-5 rounded shadow flex flex-col gap-5">
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
      </div>
    </div>
  );
}