import { DownOutlined, EditOutlined, SearchOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Dropdown, Form, Input, Select, Table } from 'antd';

import EmptyList from '@seller/components/EmptyList';

function AllActiveProduct() {
  const columns = [
    { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name', width: '30%', sorter: true },
    { title: 'Doanh số', dataIndex: 'sales', key: 'sales', sorter: true },
    { title: 'Giá', dataIndex: 'price', key: 'price', sorter: true },
    { title: 'Kho hàng', dataIndex: 'stock', key: 'stock', sorter: true },
    { title: 'Thao tác', dataIndex: 'action', key: 'action' }
  ];

  return (
    <div className='flex flex-col gap-5'>
      <Form layout='inline'>
        <Form.Item className='w-100' name="name">
          <Input prefix={<SearchOutlined className="text-gray-400" />} />
        </Form.Item>
        <Form.Item className="w-64" name="category">
          <Select placeholder="Category" suffixIcon={<EditOutlined />} />
        </Form.Item>
        <Form.Item className="w-64" name="program">
          <Select defaultValue="Chương trình Shopee" suffixIcon={<DownOutlined />} />
        </Form.Item>
        <Form.Item>
          <Button variant='solid' color='blue' >Áp dụng</Button>
        </Form.Item>
        <Form.Item>
          <Button >Đặt lại</Button>
        </Form.Item>
      </Form>

      {/* Product List Header */}
      <div className="flex justify-between items-center">
        <div className="text-lg font-medium">0 Sản Phẩm</div>
        <div className="flex items-center gap-4">
          <Dropdown menu={{
            items: [
              { key: 'recommend', label: 'Đề xuất' },
              { key: 'name', label: 'Tên sản phẩm' },
              { key: 'price', label: 'Giá' },
              { key: 'stock', label: 'Kho hàng' }
            ]
          }} trigger={['click']}>
            <Button icon={<UnorderedListOutlined />}>
              Sắp xếp theo
            </Button>
          </Dropdown>
        </div>
      </div>

      {/* Product Table */}
      <Table columns={columns} dataSource={[]} locale={{ emptyText: <EmptyList /> }} />
    </div >
  )
}

export default AllActiveProduct