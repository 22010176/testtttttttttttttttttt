import { DownOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Table } from 'antd';

import EmptyList from '_s/components/EmptyList';

function ProductListLayout({ dataSource = [] }) {
  const columns = [
    { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name', width: '30%', sorter: true },
    { title: 'Doanh số', dataIndex: 'sales', key: 'sales', sorter: true },
    { title: 'Giá', dataIndex: 'price', key: 'price', sorter: true },
    { title: 'Kho hàng', dataIndex: 'stock', key: 'stock', sorter: true },
    { title: 'Thao tác', dataIndex: 'action', key: 'action' }
  ];

  return (
    <div className='bg-white p-5 flex flex-col gap-5'>
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

      {/* Product Table */}
      <Table columns={columns} dataSource={dataSource} locale={{ emptyText: <EmptyList /> }} />
    </div >
  )
}

export default ProductListLayout