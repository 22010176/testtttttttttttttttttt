import { CreditCardOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, Form, Input } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import EmptyList from '_s/components/EmptyList';

const { RangePicker } = DatePicker;

export default function BalanceDashboard() {
  const [cashFlow, setCashFlow] = useState('all');
  const [selectedFilters, setSelectedFilters] = useState([
    'revenue',
    'adjustment',
    'fee',
    'refund',
    'withdraw',
    'seasy'
  ]);

  const filterOptions = [
    { value: 'revenue', label: 'Doanh Thu Đơn Hàng' },
    { value: 'adjustment', label: 'Điều chỉnh' },
    { value: 'fee', label: 'Cắn trừ Số dư TK Shopee' },
    { value: 'refund', label: 'Giá trị hoàn được ghi nhận' },
    { value: 'withdraw', label: 'Rút Tiền' },
    { value: 'seasy', label: 'SEasy Cho Vay Người Bán' },
  ];

  return (
    <div className="m-5 space-y-5">
      {/* Overview Section */}
      <div className="bg-white p-5 rounded shadow">
        <h3 className="text-lg font-semibold mb-5">Tổng Quan</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left - Balance */}
          <div className='border p-3 rounded border-gray-200 flex gap-5 items-center'>
            <div>
              <p className="text-lg text-gray-500">
                Số dư
              </p>
              <p className="font-bold">₫0</p>
            </div>
            <Button variant='outlined' color='primary'>
              Yêu Cầu Thanh Toán
            </Button>
          </div>

          {/* Right - Bank Account */}
          <div className='border p-3 rounded border-gray-200'>
            <p className="text-lg font-medium mb-3">Tài khoản ngân hàng</p>
            <div className="flex items-center gap-5">

              <CreditCardOutlined className="text-gray-400" />

              <p className="text-sm">
                Hủy Liên Kết Tài Khoản Ngân Hàng,{" "}
                <Link to="#" className="text-sm text-blue-500">
                  Thêm Tài khoản Ngân hàng
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="bg-white p-5 rounded shadow">
        <h3 className="text-lg font-semibold mb-6">Các giao dịch gần đây</h3>

        {/* Filters Row */}
        <Form>
          <Form.Item label="Thời gian phát sinh giao dịch">
            <DatePicker.RangePicker picker='month' />
          </Form.Item>

          <Form.Item label="Loại giao dịch">
            <Checkbox.Group options={[
              { value: 'revenue', label: 'Doanh Thu Đơn Hàng' },
              { value: 'adjustment', label: 'Điều chỉnh' },
              { value: 'fee', label: 'Cắn trừ Số dư TK Shopee' },
              { value: 'refund', label: 'Giá trị hoàn được ghi nhận' },
              { value: 'withdraw', label: 'Rút Tiền' },
              { value: 'seasy', label: 'SEasy Cho Vay Người Bán' },
            ]} />
          </Form.Item>

          <Form.Item>
            <div className='space-x-3'>
              <Button variant='solid' color='blue'>
                Áp dụng
              </Button>
              <Button>Thiết lập lại</Button>
            </div>
          </Form.Item>
        </Form>

        {/* Transaction List Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="text-base">
              <span className="font-semibold">0 giao dịch</span>
              <span className="text-gray-400 ml-2">(Tổng số tiền: 0)</span>
            </div>
            <div className="flex gap-3">
              <Input
                placeholder="Tìm kiếm đơn hàng"
                prefix={<SearchOutlined />}
                className="w-64"
              />
              <Button>Xuất</Button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="text-center py-16">
          <EmptyList />
        </div>
      </div>
    </div>
  );
}