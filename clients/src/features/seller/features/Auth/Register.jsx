import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Input, notification } from 'antd';
import { Link } from 'react-router-dom';

import { register } from '../../api/taiKhoan';
import { routePaths } from '../../routes';

function Register() {
  const [api, contextHolder] = notification.useNotification();

  async function onFinish(values) {
    try {
      const result = await register({ email: values.email, matKhau: values.matKhau, soDienThoai: values.soDienThoai, hoTen: values.hoTen })
      console.log(result)
      api.success({ description: "Đăng kí thành công!" })
    } catch (error) {
      console.log(error)
      api.error({ description: "Đăng kí thất bại!" })
    }
  }

  return (
    <>
      {contextHolder}
      <div className="bg-gray-50 p-10 rounded-lg shadow-md w-200">
        <div className="text-2xl font-bold text-center mb-10">Đăng ký tài khoản</div>
        <Form layout="vertical" className="w-full" onFinish={onFinish}>
          <Form.Item label="Họ tên" name="hoTen">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}>
            <Input />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="soDienThoai" rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            { pattern: /^(0|\+84)[0-9]{9,10}$/, message: "Số điện thoại không hợp lệ!", },
          ]}>
            <Input />
          </Form.Item>
          <Form.Item label="Mật khẩu" name="matKhau" rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
          ]}>
            <Input.Password />

          </Form.Item>
          <Form.Item label="Xác nhận mật khẩu" name="xacNhanMatKhau" dependencies={["MatKhau"]} rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                // return Promise.resolve();
                if (!value || getFieldValue("matKhau") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp!")
                );
              },
            }),
          ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
        <Link className='text-sm text-blue-500' to={routePaths.account.login}>
          <FontAwesomeIcon icon={faLeftLong} className='pr-2' />
          Đăng nhập tài khoản
        </Link>
      </div>
    </>
  )
}
export default Register