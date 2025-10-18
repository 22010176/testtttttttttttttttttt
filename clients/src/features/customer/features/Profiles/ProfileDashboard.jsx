import { Avatar, Button, DatePicker, Form, Input, Layout, Radio, Typography, Upload } from 'antd';


const { Sider, Content } = Layout;
const { Title, Text } = Typography;

export default function ProfilePage() {

  return (
    <div className='m-5'>
      <div className="border-b pb-4 mb-6">
        <Title level={4} className="!mb-1">Hồ Sơ Của Tôi</Title>
        <Text type="secondary">Quản lý thông tin hồ sơ để bảo mật tài khoản</Text>
      </div>
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
                { label: "Nữ", value: 1 },
                { label: "Khác", value: 2 }
              ]} />
            </Form.Item>
            <Form.Item label="Ngày sinh">
              <DatePicker />
            </Form.Item>
            <Form.Item >
              <Button variant='solid' color='blue' htmlType='submit'>
                Lưu
              </Button>
            </Form.Item>
          </div>

          <Form.Item >
            <div className="flex flex-col items-center gap-2">
              <Avatar size={100} src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
              <Upload>
                <Button className="mt-4">Chọn Ảnh</Button>
              </Upload>
            </div>
          </Form.Item>


        </div>
      </Form>
    </div>
  );
}