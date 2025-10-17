import { Button, Form, Input, Select, Table } from 'antd';

import EmptyList from '_s/components/EmptyList';

const columns = [
  { title: 'Sản phẩm', dataIndex: 'product', key: 'product', },
  { title: 'Tổng Đơn hàng', dataIndex: 'total', key: 'total', },
  { title: 'Trạng thái', dataIndex: 'status', key: 'status', },
  { title: 'Đếm ngược', dataIndex: 'countdown', key: 'countdown', },
  { title: 'Đơn vị vận chuyển', dataIndex: 'shipping', key: 'shipping', },
  { title: 'Thao tác', dataIndex: 'action', key: 'action', },
];
function OrderListLayout({ dataSource = [] }) {
  return (
    <div className='flex flex-col gap-5'>

      {/* Filters */}
      <Form className="flex gap-4 items-center" layout='inline'>
        <Form.Item className="" label="Dịch vụ vận chuyển">
          <Select value={"all"}
            options={[
              { value: 'all', label: 'Tất cả dịch vụ' },
              { value: 'shopee', label: 'Shopee Express' },
              { value: "madonHang", label: "Mã đơn hàng" },
              { value: "tenNguoiMua", label: "Tên người mua" },
              { value: "sanPham", label: "Sản phẩm" },
            ]} />
        </Form.Item>

        <Form.Item label="Mã đơn hàng">
          <Input placeholder="Nhập Mã đơn hàng" />
        </Form.Item>

        <Form.Item>
          <div className='flex gap-2'>
            <Button variant='solid' color='blue'>Áp dụng</Button>
            <Button>Đặt lại</Button>
          </div>
        </Form.Item>
      </Form>

      {/* Table */}
      <Table columns={columns} dataSource={dataSource} pagination={false} locale={{ emptyText: <EmptyList message='Không có đơn hàng nào!' /> }} />
    </div>
  )
}

export default OrderListLayout;