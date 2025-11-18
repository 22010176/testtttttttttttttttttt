import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Input, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { keys } from '@/constant/localStorageKey';
import { dangNhapTaiKhoan } from '_c/api/taiKhoan';
import { routePaths } from '_c/routes';

// import { login } from '../../api/taiKhoan';

function Login() {
  const navidate = useNavigate()
  const [api, contextHolder] = notification.useNotification();

  async function onFinish(values) {
    try {
      const result = await dangNhapTaiKhoan({ email: values.email, matKhau: values.matKhau })
      console.log(result, values)
      localStorage.setItem(keys.userToken, result.data?.Id)

      api.success({ description: "Đăng nhập thành công!" })
      navidate('/')
    } catch (error) {
      api.error({ description: "Đăng nhập thất bại!" })
      console.log(error)
    }
  }

  return (
    <>
      {contextHolder}
      <div className="bg-blue-50 p-10 rounded-lg shadow-md w-150 mx-auto">
        <div className="text-2xl font-bold text-center mb-10">Đăng nhập tài khoản</div>
        <Form layout="vertical" className="w-full" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Mật khẩu" name="matKhau">
            <Input.Password />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <Link className='text-sm text-blue-500' to={routePaths.account.register}>
          <FontAwesomeIcon icon={faLeftLong} className='pr-2' />
          Đăng kí tài khoản
        </Link>
      </div>
    </>
  )
}
export default Login