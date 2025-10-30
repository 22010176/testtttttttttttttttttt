import { Button, Form, Table } from 'antd';
import { Link } from 'react-router-dom';

import EmptyList from '_s/components/EmptyList';
import { routePaths } from '_s/routes';
import FilterForm from './FilterForm';

// console.log(import.meta.env.VITE_SERVER_URL);
routePaths
function ProductListLayout({ dataSource = [] }) {
  const [form] = Form.useForm();
  const searchValue = Form.useWatch(i => i, form);

  const columns = [
    {
      title: 'Tên sản phẩm', key: 'name', width: '50%', sorter: true,
      render: (text, record) => (
        <div className='flex items-center gap-3'>
          <img src={record.anhBia} alt={record.tenSanPham} className='w-12 h-12 object-cover rounded-md' />
          <div>
            <p className='font-semibold'>{record.tenSanPham}</p>
            <p className='text-gray-600'>{record.id}</p>

          </div>
        </div>
      ),
    },
    {
      title: 'Doanh số', key: 'sales', sorter: true,
      render: (text, record) => (
        <span> {record.trangThaiSanPham === "BAN_NHAP" ? "Không hoạt động" : record.doanhSoBanHang}</span>
      ),
    },
    {
      title: 'Giá', key: 'price', sorter: true,
      render: (text, record) => (
        <span>{(+record.giaBan).toLocaleString()} đ</span>
      ),
    },
    // { title: 'Kho hàng', key: 'stock', sorter: true },
    {
      title: 'Thao tác', key: 'action', width: '10%',
      render: (item) => (
        // <Link to={routePaths} className='text-blue-600'>Chỉnh sửa</Link>
        <div className='grid text-center gap-1'>
          <Link to={routePaths.management.product.insert} className='text-blue-600'>Chỉnh sửa</Link>
          <Button variant='text' color='red'>Xoá</Button>
          {item.trangThaiSanPham === "BAN_NHAP" ? (
            <Button variant='text' color='green'>Đăng bán</Button>
          ) : (
            <Button variant='text' color='gray'>Huỷ bán</Button>
          )}
        </div>
      ),
    }
  ];

  return (
    <div className='bg-white p-5 flex flex-col gap-5'>
      <FilterForm form={form} />

      {/* Product Table */}
      <Table size='small' columns={columns} dataSource={dataSource} locale={{ emptyText: <EmptyList /> }} />
    </div >
  )
}

export default ProductListLayout