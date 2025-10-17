import { DownloadOutlined } from '@ant-design/icons';
import { Affix, Button, DatePicker, Form, Table, Tabs } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import EmptyList from '../../components/EmptyList';
import { Link } from 'react-router-dom';

const { RangePicker } = DatePicker;


function LayoutA() {
  const columns = [
    { title: 'Đơn hàng', dataIndex: 'order', key: 'order', width: 150, },
    { title: 'Thanh toán đã chuyển vào', dataIndex: 'paymentTransferred', key: 'paymentTransferred', width: 200, },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status', width: 150, }, { title: 'Phương thức thanh toán', dataIndex: 'paymentMethod', key: 'paymentMethod', width: 200, },
    { title: 'Số tiền thanh toán', dataIndex: 'amount', key: 'amount', width: 150, align: 'right', },
  ];
  return (
    <div className='flex flex-col gap-5'>
      <Form layout='inline'>
        <Form.Item label="Tuần này">
          <DatePicker.RangePicker picker='week' />
        </Form.Item>

        <Form.Item>
          <Button>
            Xuất
          </Button>
        </Form.Item>
      </Form>

      <Table columns={columns} dataSource={[]} locale={{ emptyText: <EmptyList /> }} pagination={false} />
    </div>
  )
}
export default function ProfitDashboard() {
  const [activeTab, setActiveTab] = useState('paid');
  const [dateRange, setDateRange] = useState([dayjs('2025-10-06'), dayjs('2025-10-09')]);

  const reports = [
    { key: 1, period: '29 Th09 - 5 Th10 2025', },
    { key: 2, period: '22 Th09 - 28 Th09 2025', },
    { key: 3, period: '15 Th09 - 21 Th09 2025', },
  ];

  return (
    <div className="m-5">
      <div className="grid grid-cols-4 gap-5">
        {/* Left Column - Main Content */}
        <div className="col-span-3">
          {/* Overview Section */}
          <div className="bg-white rounded-lg shadow-sm mb-5 p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Tổng Quan</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-5">
              {/* Unpaid */}
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Chưa thanh toán</h3>
                <div>
                  <p className="text-gray-600 text-sm">Tổng cộng</p>
                  <p className="text-lg font-semibold text-gray-800">₫ 0</p>
                </div>
              </div>

              {/* Paid */}
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Đã thanh toán</h3>
                <div className="grid grid-cols-3 gap-5">
                  <div>
                    <p className="text-gray-600 text-sm ">Tuần này</p>
                    <p className="text-lg font-semibold text-gray-800">₫ 0</p>
                  </div>

                  <div>
                    <p className="text-gray-600 text-sm ">Tháng này</p>
                    <p className="text-lg font-semibold text-gray-800">₫ 0</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm ">Tổng cộng</p>
                    <p className="text-lg font-semibold text-gray-800">₫ 0</p>
                  </div>

                </div>
              </div>
            </div>

            {/* Shopee Balance Link */}
            {/* <div className="mt-6 text-right">
              <a href="#" className="text-blue-500 hover:underline text-sm">
                Số dư TK Shopee &gt;
              </a>
            </div> */}
          </div>

          {/* Details Section */}
          <div className="bg-white rounded-lg shadow-sm p-5">

            <h2 className="text-lg font-semibold text-gray-800">Chi Tiết</h2>

            {/* Tabs */}
            <Tabs items={[
              { key: "a", label: "Chưa thanh toán", children: <LayoutA /> },
              { key: "b", label: "Đã thanh toán", children: <LayoutA /> },
            ]} />

          </div>
        </div>

        {/* Right Column - Income Reports */}
        <Affix offsetTop={100}>
          <div className="bg-white rounded-lg shadow-sm sticky top-6 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className=" font-semibold text-gray-800">Báo cáo thu nhập</h2>
              <Link to="#" className="text-blue-500 hover:underline text-sm">
                Xem thêm &gt;
              </Link>
            </div>

            <div className="space-y-3">
              {reports.map((report) => (
                <div key={report.key} className="flex items-center justify-between border-gray-200 last:border-0">
                  <span className="text-gray-700">{report.period}</span>
                  <button className="text-blue-500 hover:text-blue-600">
                    <DownloadOutlined className="" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Affix>
        {/* <div className="col-span-1">

        </div> */}
      </div>
    </div>
  );
}