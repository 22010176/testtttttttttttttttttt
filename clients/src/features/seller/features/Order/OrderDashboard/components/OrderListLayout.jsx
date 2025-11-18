import { Button, Form, Input, Table } from 'antd';

import EmptyList from '_s/components/EmptyList';

// const columns = [
//   { title: 'Khách hàng', dataIndex: 'tenKhachHang', key: 'product', },
//   { title: 'Số điện thoại', dataIndex: 'soDienThoai', key: 'product', },
//   {
//     title: 'Tổng giá trị', dataIndex: 'tongGiaTri', key: 'total',
//     render: val => (+val).toLocaleString() + " VND"
//   },
//   {
//     title: 'Ngày đặt', dataIndex: 'ngayDat', key: 'total',
//     render: val => new Date(val).toLocaleString()
//   },
//   // { title: 'Trạng thái', dataIndex: 'status', key: 'status', },
//   // { title: 'Đếm ngược', dataIndex: 'countdown', key: 'countdown', },
//   // { title: 'Đơn vị vận chuyển', dataIndex: 'shipping', key: 'shipping', },
//   {
//     title: 'Thao tác', render: (item) => (
//       <div className='space-x-5'>
//         <Button variant='text' color='blue'>Xác nhận</Button>
//         <Button variant='text' color='red'>Hủy</Button>
//       </div>
//     )
//   },
// ];
// const sanPhamColumns = [
//   { title: 'Tên sản phẩm', dataIndex: 'tenSanPham', key: 'product', },
//   { title: 'Mã sản phẩm', dataIndex: 'sanPhamId', key: 'product', },
//   {
//     title: 'Giá tiền', dataIndex: 'giaBan', key: 'total',
//     render: val => (+val).toLocaleString() + " VND"
//   },
//   { title: 'Số lượng', dataIndex: 'soLuong', key: 'total', },
// ]

// {
//     "donHangId": "eb19ff88-461f-4b6a-ba08-4ba86bc557df",
//     "ngayDat": "2025-11-14T14:39:10.917Z",
//     "taiKhoanKhachHangId": "363fc501-21e2-4b19-92f8-e7d7296017bd",
//     "soDienThoai": "(373) 750-9364",
//     "hoTen": "xndPIjG",
//     "phienBanSanPhamId": "4e964978-5d01-4a9d-91dc-87421feeac91",
//     "soLuong": 10,
//     "sanPhamId": "ac5b13be-88f6-4ff4-b0ae-0dd314cad500",
//     "tenSanPham": "8l8KkWE",
//     "giaBan": 28736008.75857796
// }
function OrderListLayout({ dataSource = {}, Function }) {
  const columns = [
    { title: 'Khách hàng', dataIndex: 'tenKhachHang', key: 'product', },
    { title: 'Số điện thoại', dataIndex: 'soDienThoai', key: 'product', },
    {
      title: 'Tổng giá trị', dataIndex: 'tongGiaTri', key: 'total',
      render: val => (+val).toLocaleString() + " VND"
    },
    {
      title: 'Ngày đặt', dataIndex: 'ngayDat', key: 'total',
      render: val => new Date(val).toLocaleString()
    },
    // { title: 'Trạng thái', dataIndex: 'status', key: 'status', },
    // { title: 'Đếm ngược', dataIndex: 'countdown', key: 'countdown', },
    // { title: 'Đơn vị vận chuyển', dataIndex: 'shipping', key: 'shipping', },
    typeof Function === 'function' ? {
      title: 'Thao tác', render: (item) => {
        console.log(item)
        return <Function item={item} />
      }
    } : null,
  ].filter(i => !!i);
  const sanPhamColumns = [
    { title: 'Tên sản phẩm', dataIndex: 'tenSanPham', key: 'product', },
    { title: 'Mã sản phẩm', dataIndex: 'sanPhamId', key: 'product', },
    {
      title: 'Giá tiền', dataIndex: 'giaBan', key: 'total',
      render: val => (+val).toLocaleString() + " VND"
    },
    { title: 'Số lượng', dataIndex: 'soLuong', key: 'total', },
  ]
  // const [donHang, setDonHang] = useState(dataSource)
  // console.log(donHang)
  // const temp = useMemo(function () {
  //   return donHang.reduce((acc, item) => {
  //     if (acc[item.donHangId] == null) acc[item.donHangId] = {
  //       key: item.donHangId,
  //       donHangId: item.donHangId,
  //       taiKhoanKhachHangId: item.taiKhoanKhachHangId,
  //       tenKhachHang: item.hoTen,
  //       soDienThoai: item.soDienThoai,
  //       tongGiaTri: 0,
  //       ngayDat: item.ngayDat,
  //       sanPham: []
  //     }
  //     acc[item.donHangId].tongGiaTri += item.soLuong * item.giaBan
  //     acc[item.donHangId].sanPham.push({
  //       key: item.sanPhamId,
  //       sanPhamId: item.sanPhamId,
  //       tenSanPham: item.tenSanPham,
  //       giaBan: item.giaBan,
  //       soLuong: item.soLuong
  //     })

  //     return acc
  //   }, {})
  // }, [donHang])
  // console.log(temp)
  // useEffect(function () {
  //   LayDanhSachDonHangKhachHang().then(result => {
  //     const data = result.data
  //     setDonHang(data)

  //   })
  // }, [])
  console.log(dataSource)
  return (
    <div className='flex flex-col gap-5'>

      {/* Filters */}
      <Form className="flex gap-4 items-center" layout='inline'>
        {/* <Form.Item className="" label="Dịch vụ vận chuyển">
          <Select value={"all"}
            options={[
              { value: 'all', label: 'Tất cả dịch vụ' },
              { value: 'shopee', label: 'Shopee Express' },
              { value: "madonHang", label: "Mã đơn hàng" },
              { value: "tenNguoiMua", label: "Tên người mua" },
              { value: "sanPham", label: "Sản phẩm" },
            ]} />
        </Form.Item> */}

        <Form.Item label="Mã đơn hàng">
          <Input placeholder="Nhập Mã đơn hàng" />
        </Form.Item>

        <Form.Item>
          <div className='flex gap-2'>
            <Button variant='solid' color='blue'>Áp dụng</Button>
            <Button>Đặt lại</Button>
          </div>
        </Form.Item>
      </Form>

      {/* Table */}
      <Table
        size='small'
        columns={columns} dataSource={Object.values(dataSource)} pagination={false}
        expandable={{
          expandedRowRender: (i) => {
            // console.log(i)
            return (
              <Table size='small' columns={sanPhamColumns} dataSource={i.sanPham} />
            )
          }
        }}
        locale={{ emptyText: <EmptyList message='Không có đơn hàng nào!' /> }}
      />
    </div>
  )
}

export default OrderListLayout;