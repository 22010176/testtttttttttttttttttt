import { Button, Form, message, Table } from 'antd';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ROUTE_KEYS } from '@/constant/route_keys';
import { CapNhatTrangThaiSanPham, layDanhSachSanPham, TrangThaiSanPham } from '_s/api/sanPham';
import EmptyList from '_s/components/EmptyList';
import { routePaths } from '_s/routes';
import { PageProvider } from '../pageReducer';
import FilterForm from './FilterForm';

// console.log(import.meta.env.VITE_SERVER_URL);
routePaths
function ProductListLayout({ dataSource = [] }) {
  const [state, dispatch] = useContext(PageProvider)
  // console.log(state, dispatch)
  const [messageApi, contextHolder] = message.useMessage();
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
          <Link to={routePaths.management.product.update.replace(ROUTE_KEYS.BY_ID, item.id)} className='text-blue-600'>Chỉnh sửa</Link>
          {/* <Button variant='text' color='red' onClick={function () {

          }}>
            Xoá
          </Button> */}
          {item.trangThaiSanPham === "BAN_NHAP" ? (
            <Button variant='text' color='green' onClick={async function () {
              try {
                const result = await CapNhatTrangThaiSanPham({
                  sanPhamId: item.id,
                  trangThaiSanPham: TrangThaiSanPham.HOAT_DONG
                })
                console.log(result)
                if (result.success) {
                  messageApi.info("Cập nhật trạng thái thành công!")
                }
                else throw ""
                layDanhSachSanPham().then(function (res) {
                  dispatch({ type: 'SET_DANH_SACH_SAN_PHAM', payload: res.data });
                })
              } catch (error) {
                messageApi.error("Cập nhật trạng thái thất bại!")
              }
            }}>
              Đăng bán
            </Button>
          ) : (
            <Button variant='text' color='gray' onClick={async function () {
              try {
                const result = await CapNhatTrangThaiSanPham({
                  sanPhamId: item.id,
                  trangThaiSanPham: TrangThaiSanPham.BI_XOA
                })
                console.log(result)
                if (result.success) {
                  messageApi.info("Cập nhật trạng thái thành công!")
                }
                else throw ""
                layDanhSachSanPham().then(function (res) {
                  dispatch({ type: 'SET_DANH_SACH_SAN_PHAM', payload: res.data });
                })

              } catch (error) {
                messageApi.error("Cập nhật trạng thái thất bại!")
              }
            }}>
              Huỷ bán
            </Button>
          )}
        </div>
      ),
    }
  ];

  return (
    <div className='bg-white p-5 flex flex-col gap-5'>
      {contextHolder}
      <FilterForm form={form} />

      {/* Product Table */}
      <Table size='small' columns={columns} dataSource={dataSource} locale={{ emptyText: <EmptyList /> }} />
    </div >
  )
}

export default ProductListLayout