import { MessageOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Affix, Avatar, Button, Form, Input, message, Select, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { LayDanhSachNganhHang } from '_s/api/nganhHang';
import { LayThongTinSanPhamChiTiet, TaoSanPham } from '_s/api/sanPham';
import { routePaths } from '_s/routes';

const { TextArea } = Input;

function UpdateProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const [messageApi, contextHolder] = message.useMessage();
  const [nganhHang, setNganhHang] = useState([])

  useEffect(function () {
    LayDanhSachNganhHang().then(result => {
      const { data } = result
      console.log(data)
      setNganhHang(data)
    })

    LayThongTinSanPhamChiTiet({ id }).then(result => {
      const data = result.data
      console.log(data)
      form.setFieldsValue({
        nganhHangId: data.nganhHangId,
        tenSanPham: data.tenSanPham,
        moTaSanPham: data.moTaSanPham,
        giaBan: data.giaBan,
      })
    })
  }, [])

  async function onFinish(e) {
    try {
      const result = await TaoSanPham(e)
      console.log(result)
      if (result.success) {
        navigate(routePaths.management.product.root)
      }
    } catch (error) {
      messageApi.error("Lỗi tạo sản phẩm!")
    }
  }

  return (
    <div className="grid grid-cols-[1fr_auto] gap-5 p-5" >
      {contextHolder}
      <Form layout='horizontal' labelCol={{ span: 4 }} onFinish={onFinish} form={form}>
        <div className='bg-white p-5 rounded'>
          <h2 className="text-lg font-medium">Thông tin cơ bản</h2>

          {/* Product Images */}
          <Form.Item label="Hình ảnh sản phẩm">
            <Upload
              // {...props}
              listType="picture-card" showUploadList={false}
            >
              <div className="text-center">
                <PlusOutlined className="text-2xl text-blue-500 mb-2" />
                <div className="text-blue-500 text-sm">Thêm hình</div>
                <div className="text-blue-500 text-xs">ảnh (0/9)</div>
              </div>
            </Upload>
          </Form.Item>

          {/* Cover Image */}
          <Form.Item label="Ảnh bìa">
            <Upload listType="picture-card" showUploadList={false}        >
              <div className="text-center">
                <PlusOutlined className="text-2xl text-red-500 mb-2" />
                <div className="text-xs text-blue-500">(0/1)</div>
              </div>
            </Upload>
          </Form.Item>

          {/* Product Video */}
          {/* <Form.Item label="Video sản phẩm">
            <Upload listType="picture-card" showUploadList={false}>
              <div className="text-center">
                <PlusOutlined className="text-2xl text-blue-500 mb-2" />
                <div className="text-blue-500 text-sm">Thêm video</div>
              </div>
            </Upload>
          </Form.Item> */}

          {/* Product Name */}
          <Form.Item label="Tên sản phẩm" name="tenSanPham">
            <Input placeholder="Tên sản phẩm" suffix={<span className="text-gray-400">{"".length}/120</span>} />
          </Form.Item>

          {/* Category */}
          <Form.Item label="Ngành hàng" name="nganhHangId">
            <Select placeholder="Chọn ngành hàng" options={nganhHang.map(i => ({
              value: i.id,
              label: i.tenNganhHang,
            }))} />
          </Form.Item>

          {/* Price */}
          <Form.Item label="Giá" name="giaBan">
            <Input type='number' controls={false} prefix={<span className="text-gray-400">₫</span>} placeholder="Nhập vào" className='grow'
            />
          </Form.Item>

          {/* Product Description */}
          <Form.Item label="Mô tả sản phẩm" name="moTaSanPham">
            {/* <TiptapEditor /> */}
            <TextArea rows={10} maxLength={3000} style={{ resize: 'none' }} placeholder="Nhập mô tả sản phẩm..." />
          </Form.Item>
          <Form.Item >
            <div className='flex justify-end'>
              <Button color='blue' variant='solid' htmlType='submit'>Cập nhật</Button>
            </div>
          </Form.Item>


          {/* Bulk Discount */}
          {/* <Form.Item label="Mua nhiều giảm giá">
            <Form.List name="discounts">
              {(fields, { add, remove }) => (
                <div className='flex flex-col'>
                  {fields.map(({ key, name, ...restField }) => (
                    <div {...restField} key={key} className='grid grid-cols-[1fr_1fr_1fr_auto] gap-2 w-full'>
                      <Form.Item style={{ width: "100%" }} name={[name, 'from']} rules={[{ required: true, message: 'Từ sản phẩm' }]}>
                        <Input type='number' placeholder="Từ sản phẩm" />
                      </Form.Item>
                      <Form.Item style={{ width: "100%" }} {...restField} name={[name, 'to']} rules={[{ required: true, message: 'Đến sản phẩm' }]}>
                        <Input type='number' placeholder="Đến sản phẩm" />
                      </Form.Item>
                      <Form.Item style={{ width: "100%" }} {...restField} name={[name, 'price']} rules={[{ required: true, message: 'Đơn giá' }]}>
                        <Input type='number' placeholder="Đơn giá" />
                      </Form.Item>
                      <Button variant='solid' color='red' onClick={() => remove(name)} icon={<MinusCircleOutlined />} />
                    </div >
                  ))}
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Thêm khoảng giá
                  </Button>
                </div>
              )}
            </Form.List>
          </Form.Item> */}
        </div>
      </Form>

      {/* Preview Section */}
      <Affix offsetTop={100} className='w-90'>
        <div className='h-min p-5 bg-white shadow rounded flex flex-col gap-5'>
          <h3 className="font-medium">Xem trước</h3>

          {/* Product Preview Card */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="aspect-square bg-gray-100 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <ShoppingCartOutlined className="text-5xl mb-2" />
              </div>
            </div>

            <p className='p-3'>ddddddddddddddd</p>
          </div>

          {/* User Info */}
          <div className=" flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar src="/api/placeholder/40/40" size={40} />
              <span className="text-sm">ducminh16082004</span>
            </div>
            <Button variant='outlined' color='blue'>Xem</Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-between">
            <Button icon={<MessageOutlined />} variant='solid' color='cyan' className=" border-teal-500 text-teal-500">
              Chat
            </Button>
            <Button icon={<ShoppingCartOutlined />} className="">
              Giỏ hàng
            </Button>
            <Button type="primary" className="bg-blue-500 hover:bg-blue-600">
              Mua Ngay
            </Button>
          </div>
        </div>
      </Affix>
    </div>
  );
}

export default UpdateProduct