import React, { useState } from 'react';
import { Layout, Menu, Avatar, Input, Radio, Select, Button, Upload, Typography, Form, DatePicker } from 'antd';
import {
  BellOutlined,
  UserOutlined,
  FileTextOutlined,
  BankOutlined,
  EnvironmentOutlined,
  LockOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  ShoppingOutlined,
  GiftOutlined,
  ShopOutlined,
  QuestionCircleOutlined,
  PlusOutlined
} from '@ant-design/icons';
import Container from '../components/Container';
import SectionIsland from '../components/SectionIsland';

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

export default function ProfileLayout() {
  const [selectedMenu, setSelectedMenu] = useState('ho-so');

  const menuItems = [
    // { key: 'thong-bao', icon: <BellOutlined />, label: 'Thông Báo', },
    {
      key: 'tai-khoan',
      icon: <UserOutlined />,
      label: 'Tài Khoản Của Tôi',
      children: [
        { key: 'ho-so', label: 'Hồ Sơ' },
        { key: 'ngan-hang', label: 'Ngân Hàng' },
        { key: 'dia-chi', label: 'Địa Chỉ' },
        { key: 'doi-mat-khau', label: 'Đổi Mật Khẩu' },
        { key: 'cai-dat-thong-bao', label: 'Cài Đặt Thông Báo' },
        { key: 'nhung-thiet-lap-rieng-tu', label: 'Những Thiết Lập Riêng Tư' },
        { key: 'thong-tin-ca-nhan', label: 'Thông Tin Cá Nhân' },
      ],
    },
    { key: 'don-mua', icon: <ShoppingOutlined />, label: 'Đơn Mua', },
    { key: 'kho-voucher', icon: <GiftOutlined />, label: 'Kho Voucher', },
    // { key: 'shopee-xu', icon: <ShopOutlined />, label: 'Shopee Xu', },
  ];

  return (
    <Container className="grid grid-cols-5 gap-5">
      <div className="bg-white ">
        <div className="flex items-center gap-3 p-3">
          <Avatar size={50} src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
          <p className='font-semibold text-lg'>
            User
          </p>
        </div>
        <Menu mode="inline" items={menuItems} />
      </div>

      <div className="col-span-4 bg-white p-5">
        <div className="border-b pb-4 mb-6">
          <Title level={4} className="!mb-1">Hồ Sơ Của Tôi</Title>
          <Text type="secondary">Quản lý thông tin hồ sơ để bảo mật tài khoản</Text>
        </div>
        <div>
          <Form labelCol={{ span: 6 }} labelAlign='left'>
            <div className='grid grid-cols-[2fr_1fr] gap-5 px-10'>
              <div>
                <Form.Item label="Tên đăng nhập">
                  <Input />
                </Form.Item>
                <Form.Item label="Tên">
                  <Input />
                </Form.Item>
                <Form.Item label="Email">
                  <Input />
                </Form.Item>
                <Form.Item label="Số điện thoại">
                  <Input />
                </Form.Item>
                <Form.Item label="Giới Tính">
                  <Radio.Group options={[
                    { label: "Nam", value: 0 },
                    { label: "Nữ", value: 0 },
                    { label: "Khác", value: 0 }
                  ]} />
                </Form.Item>
                <Form.Item label="Ngày sinh">
                  <DatePicker />
                </Form.Item>
              </div>

              <div className="border-l pl-12">
                <Form.Item>
                  {/* <Upload listType="picture-circle"> */}
                  <div className="flex flex-col items-center">
                    <Avatar size={100} src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                    <Button className="mt-4">Chọn Ảnh</Button>
                    <Text type="secondary" className="text-xs mt-2 text-center">
                      Dung lượng file tối đa 1 MB<br />
                      Định dạng: .JPEG, .PNG
                    </Text>
                  </div>
                  {/* </Upload> */}

                  {/* <Image wrapperStyle={{ display: 'none' }} /> */}

                </Form.Item>
              </div>

            </div>
          </Form>
        </div>
        <div className="flex gap-12">
          {/* <div className="flex-1">
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <label className="w-32 text-right mr-5 text-gray-600"></label>
                  <Text>ducminh16082004</Text>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <label className="w-32 text-right mr-5 text-gray-600">Tên</label>
                  <Input
                    placeholder="Đức Minh"
                    className="flex-1"
                    defaultValue="Đức Minh"
                  />
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <label className="w-32 text-right mr-5 text-gray-600">Email</label>
                  <div className="flex-1 flex items-center gap-2">
                    <Text>du*********@gmail.com</Text>
                    <a href="#" className="text-blue-500">Thay Đổi</a>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <label className="w-32 text-right mr-5 text-gray-600">Số điện thoại</label>
                  <div className="flex-1 flex items-center gap-2">
                    <Text>*********08</Text>
                    <a href="#" className="text-blue-500">Thay Đổi</a>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-start mb-2">
                  <label className="w-32 text-right mr-5 text-gray-600 pt-1">
                    Giới tính <QuestionCircleOutlined className="text-gray-400" />
                  </label>
                  <Radio.Group defaultValue="nam">
                    <Radio value="nam">Nam</Radio>
                    <Radio value="nu">Nữ</Radio>
                    <Radio value="khac">Khác</Radio>
                  </Radio.Group>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <label className="w-32 text-right mr-5 text-gray-600">
                    Ngày sinh <QuestionCircleOutlined className="text-gray-400" />
                  </label>
                  <div className="flex-1 flex gap-2">
                    <Select placeholder="Ngày" className="flex-1" />
                    <Select placeholder="Tháng" className="flex-1" />
                    <Select placeholder="Năm" className="flex-1" />
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-32"></div>
                <Button type="primary" danger size="large" className="ml-5">
                  Lưu
                </Button>
              </div>
            </div> */}


        </div>
      </div>
    </Container>
  );
}