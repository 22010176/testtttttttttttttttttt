import { DownOutlined, QuestionCircleOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Table } from 'antd';
import { useState } from 'react';

import Container from '_s/components/Container';

const WorkingPerformance = () => {
  const [expandedRows, setExpandedRows] = useState(['order-management']);

  const handleExpand = (key) => {
    setExpandedRows(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const MetricCard = ({ title, value, status, linkText }) => (
    <div className="border rounded-lg p-4 bg-white">
      <div className="text-sm text-gray-600 mb-2">{title}</div>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-2xl font-semibold">{value}</span>
        <span className="text-sm text-gray-500">{status}</span>
      </div>
      <Button type="link" className="p-0 h-auto text-blue-500">
        {linkText} <RightOutlined className="text-xs" />
      </Button>
    </div>
  );

  const detailColumns = [
    {
      title: 'Chỉ số', dataIndex: 'metric', key: 'metric',
      render: (text, record) => (
        <div className="flex items-center gap-2">
          {record.children && (
            <Button
              type="text"
              size="small"
              icon={expandedRows.includes(record.key) ? <DownOutlined /> : <RightOutlined />}
              onClick={() => handleExpand(record.key)}
            />
          )}
          <span className={record.indent ? 'ml-6' : ''}>{text}</span>
          {record.info && <QuestionCircleOutlined className="text-gray-400 text-xs" />}
        </div>
      ),
    },
    { title: 'Shop của tôi', dataIndex: 'myShop', key: 'myShop', align: 'center', },
    { title: 'Chỉ tiêu', dataIndex: 'target', key: 'target', align: 'center', },
    { title: 'Kỳ trước', dataIndex: 'previous', key: 'previous', align: 'center', }, {
      title: 'Thao tác', dataIndex: 'action', key: 'action', align: 'right', render: () => (
        <Button type="link" className="text-blue-500">
          Xem chi tiết
        </Button>
      ),
    },
  ];

  const orderManagementData = [
    {
      key: 'order-management', metric: 'Quản Lý Đơn Hàng', myShop: '', target: '', previous: '',
      children: [
        { key: 'completion-rate', metric: 'Tỷ lệ đơn hàng không thành công', info: true, myShop: '-', target: '<10.00%', previous: '-', indent: true, },
        { key: 'delivery-rate', metric: 'Tỷ lệ giao hàng trễ', info: true, myShop: '-', target: '<10.00%', previous: '-', indent: true, },
        { key: 'prep-time', metric: 'Thời gian chuẩn bị hàng', info: true, myShop: '-', target: '<1.50 ngày', previous: '-', indent: true, },
      ],
    },
  ];

  const productManagementData = [
    {
      key: 'product-management', metric: 'Vị Phạm Đăng Bán', myShop: '', target: '', previous: '',
      children: [
        { key: 'return-rate', metric: 'Hàng đã trước', info: true, myShop: '0.00%', target: '≤10.00%', previous: '0.00%', indent: true, },
        { key: 'violations', metric: 'Các vi phạm khác', info: true, myShop: '0', target: '0', previous: '0', indent: true, },
      ],
    },
  ];

  const customerServiceData = [
    {
      key: 'customer-service', metric: 'Chăm sóc khách hàng', myShop: '', target: '', previous: '',
      children: [
        { key: 'response-rate', metric: 'Tỉ lệ phản hồi', info: true, myShop: '-', target: '≥80.00%', previous: '-', indent: true, },
        { key: 'shop-rating', metric: 'Đánh giá Shop', info: true, myShop: '-', target: '≥4.00/5', previous: '-', indent: true, },
      ],
    },
  ];

  const violationItems = [
    { label: 'Vi Phạm Đơn Hàng Không Thành Công', value: '0 Điểm phạt' },
    { label: 'Vi Phạm Giao Hàng Trễ', value: '0 Điểm phạt' },
    { label: 'Vi phạm về đăng bán', value: '0 Điểm phạt' },
    { label: 'Vi Phạm Khác', value: '0 Điểm phạt' },
  ];

  return (
    <div className="m-5">
      {/* Header Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="col-span-2">
          <h2 className="text-xl font-semibold mb-2">Xuất sắc</h2>
          <p className="text-sm text-gray-600 mb-6">
            Thật tuyệt, các chỉ số hoạt động của Shop đều đạt chỉ tiêu. Giữ vững hiệu quả hoạt động của Shop để thu hút thêm khách hàng nhé
          </p>

          <div className="grid grid-cols-3 gap-4">
            <MetricCard title="Quản Lý Đơn Hàng" value="0" status="Chỉ số không đạt" linkText="Xem" />
            <MetricCard title="Vi phạm đăng bán" value="0" status="Chỉ số không đạt" linkText="Xem" />
            <MetricCard title="Chăm sóc khách hàng" value="0" status="Chỉ số không đạt" linkText="Xem" />
          </div>
        </Card>

        <Card className="flex flex-col items-center justify-center">
          <div className="text-center mb-4">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-4xl">🏆</span>
            </div>
            <p className="text-sm text-gray-600">
              Cải thiện hiệu suất của 3 tiêu chỉ để tham gia Chương trình Shop Yêu Thích
            </p>
          </div>
          <Button type="link" className="text-blue-500">
            Xem chi tiết <RightOutlined className="text-xs" />
          </Button>
        </Card>
      </div>

      {/* Detail Section */}
      <Container className="mb-6">
        <span className="text-lg font-semibold">Chi tiết chỉ số</span>
        <div className="mb-4">
          <h3 className="font-medium mb-4">Quản Lý Đơn Hàng</h3>
          <Table
            columns={detailColumns}
            dataSource={orderManagementData}
            pagination={false}
            showHeader={true}
            className="mb-6"
          />
        </div>

        <div className="mb-4">
          <h3 className="font-medium mb-4">Vi phạm đăng bán</h3>
          <Table
            columns={detailColumns}
            dataSource={productManagementData}
            pagination={false}
            showHeader={false}
            className="mb-6"
          />
        </div>

        <div>
          <h3 className="font-medium mb-4">Chăm sóc khách hàng</h3>
          <Table
            columns={detailColumns}
            dataSource={customerServiceData}
            pagination={false}
            showHeader={false}
          />
        </div>
      </Container>

      {/* Violations Section */}
      <Card
        title={
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">
              Sao Quá Tệ <span className="text-sm font-normal text-gray-500">(06/10/2025 Đến 04/01/2026)</span>
            </span>
            <Button type="link" className="text-blue-500">
              Xem thêm <RightOutlined className="text-xs" />
            </Button>
          </div>
        }
        className="mb-6"
      >
        <Row gutter={24}>
          <Col span={12}>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-500 mb-2">0</div>
              <div className="text-sm text-gray-600 mb-4">Điểm phạt</div>
              <div className="text-xs text-gray-500">Tuần trước: 0</div>
            </div>
            <div className="mt-6 space-y-3">
              {violationItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm">{item.label}</span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </Col>
          <Col span={12}>
            <div className="bg-gray-50 rounded-lg p-8 h-full flex flex-col items-center justify-center">
              <div className="text-6xl mb-4">🛍️</div>
              <p className="text-sm text-gray-500 text-center">
                Xuất sắc! Shop bạn không có bất kỳ mức phạt nào tại thời điểm này
              </p>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Issues Section */}
      <Card
        title={
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Vấn đề cần cải thiện</span>
            <Button type="link" className="text-blue-500">
              Xem thêm <RightOutlined className="text-xs" />
            </Button>
          </div>
        }
      >
        <p className="text-sm text-gray-600 mb-6">
          Đang có 0 vấn đề mà Shop có thể cải thiện ngay.
        </p>

        <Row gutter={24}>
          <Col span={12}>
            <div className="border rounded-lg p-6 text-center">
              <div className="text-5xl font-bold text-green-500 mb-2">0</div>
              <div className="text-sm text-gray-600 mb-4">Sản phẩm đang bán gặp vấn đề</div>
              <p className="text-xs text-gray-500">
                Vi phạm chính sách đăng bán sản phẩm có thể bị điểm phạt Sao Quá Tệ.
              </p>
            </div>
          </Col>
          <Col span={12}>
            <div className="border rounded-lg p-6 text-center">
              <div className="text-5xl font-bold text-green-500 mb-2">0</div>
              <div className="text-sm text-gray-600 mb-4">Đơn hàng trễ</div>
              <p className="text-xs text-gray-500">
                Đơn hàng giao trễ sẽ ảnh hưởng đến số chỉ "Tỷ lệ giao hàng trễ"
              </p>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default WorkingPerformance;