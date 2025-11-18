import { Button, DatePicker, Form, Input, message, Radio, Typography } from 'antd';
import { useEffect } from 'react';

import { CapNhatThongTinTaiKhoan, GIOI_TINH, XemThongTinTaiKhoan } from '_c/api/taiKhoan';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

// {
//     "HoTen": "UC6yHyzXCpqYS72chUXg",
//     "Email": "cDSRuYes6BDF@example.com",
//     "SoDienThoai": "(704) 395-1669",
//     "SinhNhat": "2025-11-13T17:00:00.000+00:00",
//     "GioiTinh": null
// }
export default function ProfilePage() {
  const [messageApi, dataContext] = message.useMessage()
  const [form] = Form.useForm()
  function updateThongTin() {
    XemThongTinTaiKhoan().then(res => {
      const data = res.data
      console.log(data)
      form.setFieldsValue({
        hoTen: data.HoTen,
        gioiTinh: Object.values(GIOI_TINH)[data.GioiTinh ?? 2],
        ngaySinh: dayjs(data.SinhNhat),
        email: data.Email,
        soDienThoai: data.SoDienThoai
      })
    })
  }
  useEffect(function () {
    updateThongTin()
  }, [])
  return (
    <div className='m-5'>
      {dataContext}
      <div className="border-b pb-4 mb-6">
        <Title level={4} className="!mb-1">Hồ Sơ Của Tôi</Title>
        <Text type="secondary">Quản lý thông tin hồ sơ để bảo mật tài khoản</Text>
      </div>
      <Form labelCol={{ span: 6 }} labelAlign='left' form={form}
        onFinish={async function (result) {
          console.log(result)
          if (dayjs(result.ngaySinh).isAfter(dayjs())) {

            updateThongTin()
            return message.error("Lỗi, ngày sinh lớn hơn hiện tại!")
          }
          const response = await CapNhatThongTinTaiKhoan({
            gioiTinh: result.gioiTinh,
            hoTen: result.hoTen,
            ngaySinh: dayjs(result.ngaySinh).toISOString()
          })
          if (response.success) message.success("Cập nhật thông tin tài khoản thành công!")
          else message.success("Cập nhật thông tin tài khoản thất bại!")

          updateThongTin()
        }}>
        <div className='grid grid-cols-[2fr_1fr] gap-5 px-10'>
          <div>
            <Form.Item label="Tên" name="hoTen">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Số điện thoại" name="soDienThoai">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Giới Tính" name="gioiTinh">
              <Radio.Group options={[
                { label: "Nam", value: GIOI_TINH.NAM },
                { label: "Nữ", value: GIOI_TINH.NU },
                { label: "Khác", value: GIOI_TINH.KHAC }
              ]} />
            </Form.Item>
            <Form.Item label="Ngày sinh" name="ngaySinh">
              <DatePicker />
            </Form.Item>
            <Form.Item >
              <Button variant='solid' color='blue' htmlType='submit'>
                Lưu
              </Button>
            </Form.Item>
          </div>

          {/* <Form.Item > */}
          {/* <div className="flex flex-col items-center gap-2">
              <Avatar size={100} src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
              <Upload>
                <Button className="mt-4">Chọn Ảnh</Button>
              </Upload>
            </div> */}
          {/* </Form.Item> */}


        </div>
      </Form>
    </div>
  );
}