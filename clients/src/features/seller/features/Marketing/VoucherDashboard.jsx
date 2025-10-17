import { GiftOutlined, QuestionCircleOutlined, ShopOutlined, ShoppingOutlined, TagOutlined, TeamOutlined, UserAddOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Table, Tabs } from 'antd';
import { useState } from 'react';
import ItemLayout from './components/ItemLayout';
import { Link } from 'react-router-dom';
import ItemLayout2 from './components/ItemLayout2';

const { Option } = Select;

function LayoutA() {
  const columns = [
    {
      title: 'Tên Voucher | Mã voucher', dataIndex: 'name', key: 'name', width: 250,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center">
            <span className="text-white text-lg font-bold">%</span>
          </div>
          <div>
            <div className="font-medium">{record.status}</div>
            <div className="text-sm text-gray-600">{record.name}</div>
            <div className="text-xs text-gray-400">{record.code}</div>
          </div>
        </div>
      ),
    },
    { title: 'Loại mã', dataIndex: 'type', key: 'type', align: 'center', },
    { title: "Sản phẩm áp dụng", dataIndex: 'products', key: 'products', align: 'center', },
    { title: "Người mua mục tiêu", dataIndex: 'targetUsers', key: 'targetUsers', align: 'center', },
    { title: 'Giảm giá', dataIndex: 'discount', key: 'discount', align: 'center', },
    { title: "Tổng lượt sử dụng tối đa", dataIndex: 'maxUsage', key: 'maxUsage', align: 'center', },
    { title: 'Đã dùi', dataIndex: 'used', key: 'used', align: 'center', },
    {
      title: 'Thao tác', key: 'action', align: 'center',
      render: () => (
        <div className="flex flex-col gap-1 text-blue-500">
          <a href="#" className="hover:underline">Chi tiết</a>
          <a href="#" className="hover:underline">Đơn hàng</a>
          <a href="#" className="hover:underline">Sao chép</a>
        </div>
      ),
    },
  ];

  const dataSource = [
    { key: '1', name: 'test', code: 'Mã voucher DUCMDDDD', status: 'Đã kết thúc', type: 'Mã giảm giá toàn Shop', products: 'Tất cả sản phẩm', targetUsers: 'Tất cả Người mua', discount: '3%GIẢM', maxUsage: '3', used: '0', },
  ];
  return (
    <div className='flex flex-col gap-3'>
      <Form layout='inline' >
        <Form.Item className='w-100' label="Tìm kiếm">
          <Input placeholder='Tên/Mã voucher' />
        </Form.Item>
      </Form>

      {/* Table */}
      <Table columns={columns} dataSource={dataSource} />
    </div>
  )
}

export default function VoucherDashboard() {
  const [activeTab, setActiveTab] = useState('all');
  const [collapsed, setCollapsed] = useState(false);

  const voucherTypes = [
    {
      section: 'Cài thiện tỷ lệ chuyển đổi',
      items: [
        {
          icon: <GiftOutlined className="text-blue-400 text-xl" />,
          title: 'Voucher toàn Shop',
          description: 'Voucher áp dụng cho tất cả sản phẩm trong Shop của bạn'
        },
        {
          icon: <TagOutlined className="text-blue-400 text-xl" />,
          title: 'Voucher sản phẩm',
          description: 'Voucher chỉ áp dụng cho những sản phẩm nhất định mà Shop chọn'
        }
      ]
    },
    {
      section: 'Tập trung vào Kênh hiện thị Voucher',
      items: [
        {
          icon: <ShopOutlined className="text-blue-400 text-xl" />,
          title: 'Voucher riêng tư',
          description: 'Voucher áp dụng cho những Khách hàng Shop muốn thông qua mã Voucher'
        },
        {
          icon: <VideoCameraOutlined className="text-blue-400 text-xl" />,
          title: 'Voucher Shopee Live',
          description: 'Voucher độc quyền áp dụng các sản phẩm trong livestream của Shop thúc đẩy chuyển đổi đơn hàng'
        },
        {
          icon: <VideoCameraOutlined className="text-blue-400 text-xl" />,
          title: 'Voucher Shopee Video',
          description: 'Voucher áp dụng độc quyền cho những sản phẩm trên Video của Shop để tăng doanh số bán hàng'
        }
      ]
    },
    {
      section: 'Tập trung vào nhóm Khách hàng mục tiêu',
      items: [
        {
          icon: <UserAddOutlined className="text-blue-400 text-xl" />,
          title: 'Voucher Khách hàng mới',
          description: 'Voucher nhằm thu hút Khách hàng mới và Khách hàng tiềm năng'
        },
        {
          icon: <ShoppingOutlined className="text-blue-400 text-xl" />,
          title: 'Voucher Khách hàng mua lại',
          description: 'Voucher nhằm thu hút khách hàng mục tiêu cũ đón lại tại Shop'
        },
        {
          icon: <TeamOutlined className="text-blue-400 text-xl" />,
          title: 'Ưu đãi Follower',
          description: 'Khuyến khích người mua theo dõi Shop bằng cách tặng Voucher cho người theo dõi mới'
        }
      ]
    }
  ];

  const stats = [
    { label: 'Doanh Số', value: '₫ 0', change: '7 ngày', percent: '0.00%' },
    { label: 'Đơn hàng', value: '0', change: '7 ngày', percent: '0.00%' },
    { label: 'Tỉ lệ sử dụng', value: '0.00%', change: '7 ngày', percent: '0.00%' },
    { label: 'Người mua', value: '0', change: '7 ngày', percent: '0.00%' }
  ];



  const tabs = [
    { key: 'all', label: 'Tất cả', children: <LayoutA /> },
    { key: 'ongoing', label: 'Đang diễn ra', children: <LayoutA /> },
    { key: 'upcoming', label: 'Sắp diễn ra', children: <LayoutA /> },
    { key: 'ended', label: 'Đã kết thúc', children: <LayoutA /> },
  ];

  return (
    <div className="m-5">
      {/* Voucher Types */}
      <div className="bg-white p-5 mb-5">
        <ItemLayout2
          title={'Tạo Mã Giảm Giá'}
          description={'Tạo Mã giảm giá toàn Shop hoặc Mã giảm giá sản phẩm ngay bây giờ để thu hút người mua.'} />

        {voucherTypes.map((section, sectionIdx) => (
          <div key={sectionIdx} className="mb-5">
            <h2 className="text-base font-medium text-gray-700 mb-3">{section.section}</h2>
            <div className="grid grid-cols-3 gap-3">
              {section.items.map((item, itemIdx) => (
                <ItemLayout key={itemIdx} icon={item.icon} title={item.title} description={item.description} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Voucher List */}
      <div className="bg-white rounded-lg shadow-sm p-5 flex flex-col gap-5">
        <ItemLayout2
          title={'Hiệu Suất Mã Giảm Giá'}
          description={'Tổng quan hiệu suất mã giảm giá của Shop trong khoảng thời gian đã chọn'}
          statsData={stats}
        />

        <h2 className="text-lg font-semibold text-gray-800">Danh sách mã giảm giá</h2>
        <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabs} />
      </div>
    </div>
  );
}