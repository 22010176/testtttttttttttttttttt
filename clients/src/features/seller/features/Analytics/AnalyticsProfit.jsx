import { DownloadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Empty, Select, Table, Tabs, Tooltip } from 'antd';
import { useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip as RechartsTooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const { TabPane } = Tabs;
const { Option } = Select;

const AnalyticsProduct = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [selectedMetrics, setSelectedMetrics] = useState([
    'pageViews',
    'uniqueVisitors',
    'products'
  ]);

  // Sample chart data
  const chartData = [
    { time: '00:00', pageViews: 0, uniqueVisitors: 0, products: 0 },
    { time: '06:00', pageViews: 0, uniqueVisitors: 0, products: 0 },
    { time: '12:00', pageViews: 0, uniqueVisitors: 0, products: 0 },
    { time: '18:00', pageViews: 0, uniqueVisitors: 0, products: 0 },
  ];

  const MetricCard = ({ title, value, percentage, change, info }) => (
    <div className="flex flex-col">
      <div className="flex items-center gap-1 mb-2">
        <span className="text-sm text-gray-600">{title}</span>
        {info && (
          <Tooltip title={info}>
            <QuestionCircleOutlined className="text-gray-400 text-xs" />
          </Tooltip>
        )}
      </div>
      <div className="text-2xl font-semibold mb-1">{value}</div>
      <div className="text-xs text-gray-500 mb-2">so với 00:00-21:00 hôm qua</div>
      <div className="text-sm">{change}</div>
    </div>
  );

  const topProductsColumns = [
    {
      title: 'Thứ hạng',
      dataIndex: 'rank',
      key: 'rank',
      width: 80,
    },
    {
      title: 'Thông tin sản phẩm',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Lượt truy cập',
      dataIndex: 'views',
      key: 'views',
      align: 'right',
    },
    {
      title: 'Tỉ lệ',
      dataIndex: 'rate',
      key: 'rate',
      align: 'right',
    },
    {
      title: 'Thay đổi',
      dataIndex: 'change',
      key: 'change',
      align: 'right',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="bg-white rounded-lg mb-4">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="px-4"
        >
          <TabPane tab="Tổng quan về sản phẩm" key="1" />
          <TabPane tab="Hiệu quả của sản phẩm" key="2" />
          <TabPane tab="Sản phẩm cần cải thiện" key="3" />
        </Tabs>
      </div>

      {/* Date and Export Section */}
      <Card className="mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Không Thời Gian</span>
            <Select defaultValue="today" className="w-64">
              <Option value="today">Hôm nay Từ 21:00 hôm nay (GMT+07)</Option>
              <Option value="yesterday">Hôm qua</Option>
              <Option value="last7days">7 ngày qua</Option>
            </Select>
          </div>
          <Button icon={<DownloadOutlined />}>
            Tải dữ liệu
          </Button>
        </div>
      </Card>

      {/* Metrics Overview */}
      <Card title="Tổng quan về sản phẩm" className="mb-4">
        {/* Traffic Section */}
        <div className="mb-8">
          <div className="text-sm font-medium mb-4 text-gray-700">Lượt truy cập</div>
          <div className="grid grid-cols-4 gap-6">
            <MetricCard
              title="Số khách truy cập sản phẩm"
              value="0"
              percentage="0.00%"
              change="0.00%"
              info="Số lượt khách truy cập sản phẩm"
            />
            <MetricCard
              title="Lượt xem trang sản phẩm"
              value="0"
              percentage="0.00%"
              change="0.00%"
              info="Tổng số lượt xem trang sản phẩm"
            />
            <MetricCard
              title="Số sản phẩm được xem"
              value="0"
              percentage="0.00%"
              change="0.00%"
            />
            <MetricCard
              title="Số lượng khách thoát trang sản phẩm"
              value="0"
              percentage="0.00%"
              change="0.00%"
            />
          </div>
          <div className="grid grid-cols-4 gap-6 mt-6">
            <MetricCard
              title="Tỷ lệ thoát trang sản phẩm"
              value="0.00%"
              percentage="0.00%"
              change="0.00%"
            />
            <MetricCard
              title="Lượt click từ Trang tìm kiếm"
              value="0"
              percentage="0.00%"
              change="0.00%"
            />
            <MetricCard
              title="Lượt thích"
              value="0"
              percentage="0.00%"
              change="0.00%"
            />
            <div></div>
          </div>
        </div>

        {/* Add to Cart Section */}
        <div className="mb-8">
          <div className="text-sm font-medium mb-4 text-gray-700">Thêm vào giỏ hàng</div>
          <div className="grid grid-cols-4 gap-6">
            <MetricCard
              title="Số khách truy cập sản phẩm"
              value="0"
              percentage="0.00%"
              change="0.00%"
            />
            <MetricCard
              title="Sản phẩm"
              value="0"
              percentage="0.00%"
              change="0.00%"
            />
            <MetricCard
              title="Tỷ lệ chuyển đổi"
              value="0.00%"
              percentage="0.00%"
              change="0.00%"
            />
            <div></div>
          </div>
          <div className="grid grid-cols-4 gap-6 mt-6">
            <MetricCard
              title="Người mua"
              value="0"
              percentage="0.00%"
              change="0.00%"
            />
            <MetricCard
              title="Sản phẩm"
              value="0"
              percentage="0.00%"
              change="0.00%"
            />
            <MetricCard
              title="Số sản phẩm đã bán"
              value="0"
              percentage="0.00%"
              change="0.00%"
            />
            <MetricCard
              title="Doanh số"
              value="₫ 0"
              percentage="0.00%"
              change="0.00%"
            />
          </div>
          <div className="grid grid-cols-4 gap-6 mt-6">
            <MetricCard
              title="Tỷ lệ chuyển đổi"
              value="0.00%"
              percentage="0.00%"
              change="0.00%"
            />
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        {/* Orders Section */}
        <div>
          <div className="text-sm font-medium mb-4 text-gray-700">Đơn hàng đã đặt</div>
          <div className="grid grid-cols-4 gap-6">
            <MetricCard
              title="Người mua"
              value="0"
              percentage="0.00%"
              change="0.00%"
            />
            <MetricCard
              title="Sản phẩm"
              value="0"
              percentage="0.00%"
              change="0.00%"
            />
            <MetricCard
              title="Sản phẩm được duyệt"
              value="0"
              percentage="0.00%"
              change="0.00%"
            />
            <MetricCard
              title="Doanh số"
              value="₫ 0"
              percentage="0.00%"
              change="0.00%"
            />
          </div>
          <div className="grid grid-cols-4 gap-6 mt-6">
            <MetricCard
              title="Tỷ lệ chuyển đổi"
              value="0.00%"
              percentage="0.00%"
              change="0.00%"
            />
            <MetricCard
              title="Tỷ lệ chuyển đổi (Từ Đơn đã đặt thành Đơn đã xác nhận)"
              value="0.00%"
              percentage="0.00%"
              change="0.00%"
            />
            <div></div>
            <div></div>
          </div>
        </div>
      </Card>

      {/* Trend Section */}
      <Card title="Xu hướng số liệu" className="mb-4">
        <div className="mb-4">
          <div className="flex flex-wrap gap-4">
            <Checkbox checked>Số khách truy cập sản phẩm</Checkbox>
            <Checkbox checked>Lượt xem trang sản phẩm</Checkbox>
            <Checkbox>Số sản phẩm được xem</Checkbox>
            <Checkbox>Số lượng khách thoát trang sản phẩm</Checkbox>
            <Checkbox>Tỷ lệ thoát trang sản phẩm</Checkbox>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            <Checkbox>Lượt click từ Trang tìm kiếm</Checkbox>
            <Checkbox>Lượt thích</Checkbox>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            <Checkbox>Số khách truy cập sản phẩm</Checkbox>
            <Checkbox>Sản phẩm</Checkbox>
            <Checkbox>Tỷ lệ chuyển đổi</Checkbox>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            <Checkbox>Người mua</Checkbox>
            <Checkbox>Sản phẩm</Checkbox>
            <Checkbox>Số sản phẩm đã bán</Checkbox>
            <Checkbox>Doanh số</Checkbox>
            <Checkbox>Tỷ lệ chuyển đổi</Checkbox>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            <Checkbox>Người mua</Checkbox>
            <Checkbox>Sản phẩm</Checkbox>
            <Checkbox>Sản phẩm được duyệt</Checkbox>
            <Checkbox>Doanh số</Checkbox>
            <Checkbox>Tỷ lệ chuyển đổi</Checkbox>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            <Checkbox>Tỷ lệ chuyển đổi (Từ Đơn đã đặt thành Đơn đã xác nhận)</Checkbox>
          </div>
        </div>

        <div className="text-xs text-gray-500 mb-4">Dữ liệu: 3 / 4</div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <RechartsTooltip />
            <Legend />
            <Line type="monotone" dataKey="pageViews" stroke="#8884d8" name="Lượt truy cập sản phẩm" />
            <Line type="monotone" dataKey="uniqueVisitors" stroke="#82ca9d" name="Lượt xem trang sản phẩm" />
            <Line type="monotone" dataKey="products" stroke="#ffc658" name="Sản phẩm (Thêm vào giỏ hàng)" />
          </LineChart>
        </ResponsiveContainer>

        <div className="text-right mt-4">
          <Button type="link">Xem xu hướng sản phẩm</Button>
        </div>
      </Card>

      {/* Top Products Section */}
      <Card title="Thứ hạng sản phẩm (Top 10)" extra={<Button type="link">Xem thêm</Button>}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Theo số khách xem sản phẩm" key="1">
            <Table
              columns={topProductsColumns}
              dataSource={[]}
              pagination={false}
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="Không có dữ liệu"
                  />
                ),
              }}
            />
          </TabPane>
          <TabPane tab="Theo lượt xem trang sản phẩm" key="2">
            <Table columns={topProductsColumns} dataSource={[]} pagination={false} />
          </TabPane>
          <TabPane tab="Theo doanh số (Đơn Đã Thanh Toán)" key="3">
            <Table columns={topProductsColumns} dataSource={[]} pagination={false} />
          </TabPane>
          <TabPane tab="Theo số sản phẩm (Đơn hàng đã đặt)" key="4">
            <Table columns={topProductsColumns} dataSource={[]} pagination={false} />
          </TabPane>
          <TabPane tab="Theo Tỷ lệ chuyển đổi (Đơn hàng đã đặt)" key="5">
            <Table columns={topProductsColumns} dataSource={[]} pagination={false} />
          </TabPane>
          <TabPane tab="Theo số sản phẩm (T..." key="6">
            <Table columns={topProductsColumns} dataSource={[]} pagination={false} />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default AnalyticsProduct;