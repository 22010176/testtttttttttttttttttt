import { CalendarOutlined, FileTextOutlined } from '@ant-design/icons';
import { Button, DatePicker, Divider, Form, Input, Radio, Select, Table, Tabs } from 'antd';
import { useState } from 'react';

function ReturnOrder() {
  const [activeMainTab, setActiveMainTab] = useState('all');
  const [activeSubTab, setActiveSubTab] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showAdvanced, setShowAdvanced] = useState(true);

  const columns = [
    { title: 'Sản phẩm', dataIndex: 'product', key: 'product', width: 200, sorter: true },
    { title: 'Số tiền', dataIndex: 'amount', key: 'amount', width: 120, sorter: true },
    { title: 'Lý do', dataIndex: 'reason', key: 'reason', width: 150, sorter: true },
    { title: 'Phương án cho Người mua', dataIndex: 'buyerOption', key: 'buyerOption', width: 180, sorter: true },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', width: 120, sorter: true },
    { title: 'Vận chuyển chiều giao hàng', dataIndex: 'deliveryShipping', key: 'deliveryShipping', width: 180, sorter: true },
    { title: 'Vận chuyển hàng hoàn', dataIndex: 'returnShipping', key: 'returnShipping', width: 180, sorter: true },
    { title: 'Thao tác', dataIndex: 'action', key: 'action', width: 120, sorter: true },
  ];

  const emptyDescription = (
    <div className="flex flex-col items-center py-20">
      <FileTextOutlined className="text-8xl text-gray-300 mb-4" />
      <p className="text-gray-500 text-base">Không tìm thấy đơn hàng</p>
    </div>
  );

  return (
    <div className="m-5">
      {/* Main Tabs */}
      <Tabs activeKey={activeMainTab} onChange={setActiveMainTab} className="flex-1"
        items={[
          { key: 'all', label: 'Tất cả', children: null },
          { key: 'return', label: 'Đơn Trả hàng Hoàn tiền', children: null },
          { key: 'cancel', label: 'Đơn Hủy', children: null },
          { key: 'failed', label: 'Đơn Giao hàng không thành công', children: null },
        ]} />

      {/* Sub Tabs */}
      <div className="bg-white px-5">
        <Tabs activeKey={activeSubTab} onChange={setActiveSubTab} items={[
          { key: 'all', label: 'Tất cả', children: null },
          // { key: 'reviewing', label: 'Shopee đang xem xét', children: null },
          { key: 'returning', label: 'Đang trả hàng cho Người bán', children: null },
          { key: 'refunded', label: 'Đã hoàn tiền cho Người mua', children: null },
          // { key: 'complained', label: 'Đã khiếu nại đến Shopee', children: null },
          { key: 'invalid', label: 'Yêu cầu bị hủy/không hợp lệ', children: null },
          { key: 'pending', label: 'Đã gửi yêu cầu cần kiểu nai', children: null },
        ]} />
      </div>

      <div className='bg-white px-5 flex flex-col'>
        {/* Priority Filter */}
        <Form layout="horizontal" className='pt-5'>
          <Form.Item label="Ưu tiên" name="priority">
            <Radio.Group optionType='button' options={[
              { label: 'Tất cả', value: 'all' },
              { label: 'Hết hạn sau 1 ngày', value: '1day' },
              { label: 'Hết hạn sau 2 ngày', value: '2days' },
            ]} />
          </Form.Item>

          {/* Action Tags */}
          <Form.Item label="HÀNH ĐỘNG QUAN TRỌNG" name="actionTags"   >
            <Radio.Group optionType='button' options={[
              { label: 'Thương lượng với Người mua', value: 'all' },
              { label: 'Cần cung cấp bằng chứng', value: 'pending' },
              { label: 'Giữ lại kiện hàng', value: 'shipping' },
              { label: 'Kiểm tra hàng hoàn', value: 'completed' },
              { label: 'Phản hồi quyết định hoàn tiền của Shopee', value: 'canceled' },
            ]} />
          </Form.Item>
        </Form>

        <Divider />

        {/* Advanced Filters */}
        <Form layout="vertical" className='pt-5' onFinish={(values) => console.log(values)}>
          <div className="grid grid-cols-2 gap-x-5">
            {/* Left Column */}
            <Form.Item label="Tìm yêu cầu" name="searchRequest">
              <Input placeholder="Điền Mã yêu cầu trả hàng/ Mã đơn hàng/ Mã vận đơn hàng hoàn/ Tài khoản Người mua" className="flex-1" />
            </Form.Item>

            <Form.Item label="Toàn bộ thao tác" name="searchProduct" >
              <Select placeholder="Vui lòng chọn" />
            </Form.Item>

            <Form.Item label="Trạng thái" name="status">
              <Select placeholder="Vui lòng chọn" />
            </Form.Item>
            <Form.Item label="Vận chuyển chiều giao hàng" name="deliveryShipping">
              <Select placeholder="Vui lòng chọn" />
            </Form.Item>

            <Form.Item label="Vận chuyển chiều hoàn hàng" name="returnShipping">
              <Select placeholder="Vui lòng chọn" />
            </Form.Item>

            <Form.Item label="Lý do" name="reason">
              <Select placeholder="Vui lòng chọn" />
            </Form.Item>

            <Form.Item label="Phương án cho Người mua" name="buyerOption">
              <Select placeholder="Vui lòng chọn" />
            </Form.Item>

            <Form.Item label="Khiếu nại được cấp bù" name="compensated">
              <Select placeholder="Vui lòng chọn" />
            </Form.Item>

            <Form.Item label="Dự kiến hoàn tiền">
              <div className='grid grid-cols-2 gap-3 items-center w-full'>
                <Form.Item name="minAmount">
                  <Input type='number' placeholder="Số tiền hoàn tối thiểu" />
                </Form.Item>
                <Form.Item name="maxAmount">
                  <Input type='number' placeholder="Số tiền hoàn tối đa" />
                </Form.Item>
              </div>
            </Form.Item>

            <Form.Item label="Ngày yêu cầu" name="requestDate">
              <DatePicker.RangePicker className='w-full' suffixIcon={<CalendarOutlined />} />
            </Form.Item>
          </div>

          {/* Action Buttons */}
          <Form.Item>
            <div className='flex gap-3 w-full'>
              <Button type="primary" color="blue" htmlType='submit'>Tìm kiếm</Button>
              <Button>Đặt lại</Button>
            </div>
          </Form.Item>
        </Form>

        {/* Results Section */}
        <Table className='pb-5' columns={columns} pagination={false} locale={{ emptyText: emptyDescription }} />
      </div>
    </div >
  );
}

export default ReturnOrder