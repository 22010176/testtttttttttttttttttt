import { Button, message, Tabs } from 'antd';
import { useEffect, useMemo, useState } from 'react';

import { CapNhatTrangThaiDonHang, LayDanhSachDonHangKhachHang, TrangThaiDonHang } from '_s/api/donHang';
import OrderListLayout from './components/OrderListLayout';


// {
//     "donHangId": "0ddeff21-f185-4c69-bd8c-02ef4bf50fbe",
//     "ngayDat": "2025-11-17T07:34:55.085Z",
//     "taiKhoanKhachHangId": "7b99e9fd-fe96-44c6-b921-2ba9104f80d0",
//     "trangThaiDonHang": [
//         {
//             "id": "9ce13fbe-973d-42b8-bb2a-21268d76882e",
//             "trangThai": "NGUOI_BAN_XAC_NHAN",
//             "thoiGianTao": "2025-11-17T07:46:15.99212Z"
//         },
//         {
//             "id": "96006f2f-b761-49ff-bbdc-fba7bde87b4b",
//             "trangThai": "KHACH_HANG_DAT_HANG",
//             "thoiGianTao": "2025-11-17T07:46:15.987973Z"
//         }
//     ],
//     "soDienThoai": "(215) 317-2023",
//     "hoTen": "ya3uTlm",
//     "phienBanSanPhamId": "a1b76da5-f855-4af4-a130-8532e44f2027",
//     "soLuong": 17,
//     "sanPhamId": "81de29d4-2e1c-4ba9-b30c-3a1c23612809",
//     "tenSanPham": "1XyYCRD3H",
//     "giaBan": 40892956.84635452
// }
export default function OrderDashboard() {
  const [messageApi, contextHolder] = message.useMessage();
  const [activeTab, setActiveTab] = useState('active');
  const [donHang, setDonHang] = useState([])

  const temp = useMemo(function () {
    return donHang.reduce((acc, item) => {
      if (acc[item.donHangId] == null) {
        acc[item.donHangId] = {
          key: item.donHangId,
          donHangId: item.donHangId,
          taiKhoanKhachHangId: item.taiKhoanKhachHangId,
          tenKhachHang: item.hoTen,
          soDienThoai: item.soDienThoai,
          tongGiaTri: 0,
          ngayDat: item.ngayDat,
          trangThai: item.trangThaiDonHang[0]?.trangThai,
          sanPham: []
        }
      }

      acc[item.donHangId].tongGiaTri += item.soLuong * item.giaBan
      acc[item.donHangId].sanPham.push({
        key: item.sanPhamId,
        sanPhamId: item.sanPhamId,
        tenSanPham: item.tenSanPham,
        giaBan: item.giaBan,
        soLuong: item.soLuong
      })

      return acc
    }, {})
  }, [donHang])
  // console.log(
  //   Object.fromEntries(
  //     Object
  //       .entries(temp)
  //       .filter(i => TrangThaiDonHang[i[1].trangThai] === TrangThaiDonHang.DON_HANG_VAN_CHUYEN)
  //   )
  // )
  // console.log(temp)
  async function updateDonHang() {
    await LayDanhSachDonHangKhachHang().then(result => {
      const data = result.data
      setDonHang(data)
    })
  }
  useEffect(function () {
    updateDonHang()
  }, [])

  function createUpdateState(trangThai) {
    return async function (item) {
      let result
      try {
        result = await CapNhatTrangThaiDonHang({
          donHangId: item.donHangId,
          noiDungCapNhat: "",
          trangThaiDonHang: trangThai
        })

      } catch (error) {
        let data = item.item
        result = await CapNhatTrangThaiDonHang({
          donHangId: data.donHangId,
          noiDungCapNhat: "",
          trangThaiDonHang: trangThai
        })

      }
      if (!result.success) {
        return messageApi.error("Cập nhật lỗi!")
      }

      messageApi.success("Cập nhật thành công!")
      await updateDonHang()
    }
  }
  const nguoiBanXacNhan = createUpdateState(TrangThaiDonHang.NGUOI_BAN_XAC_NHAN)
  const huyDonHang = createUpdateState(TrangThaiDonHang.HUY_DON_HANG)
  const donHangVanChuyen = createUpdateState(TrangThaiDonHang.DON_HANG_VAN_CHUYEN)
  const giaoHangThanhCong = createUpdateState(TrangThaiDonHang.DON_HANG_GIAO_THANH_CONG)
  return (
    <div className="bg-white m-5 p-5">
      {contextHolder}
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-medium">Quản lý đơn hàng</h1>
        <div className="flex gap-3">
          <Button>Xuất</Button>
          <Button type="primary">Lịch sử Xuất Báo cáo</Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs activeKey={activeTab} onChange={setActiveTab} items={[
        // { key: 'all', label: <p className='px-3'>Tất cả</p>, children: <OrderListLayout /> },
        {
          key: 'active', label: <p className='px-3'>Chờ xác nhận</p>,
          children: <OrderListLayout dataSource={Object.fromEntries(
            Object.entries(temp)
              .filter(i => TrangThaiDonHang[i[1].trangThai] === TrangThaiDonHang.KHACH_HANG_DAT_HANG))}
            Function={({ item }) => (
              <div className='space-y-5'>
                <Button variant='text' color='green' onClick={nguoiBanXacNhan.bind({}, item)}>Xác nhận</Button>
                <Button variant='text' color='red' onClick={huyDonHang.bind({}, item)}>Hủy</Button>
              </div>
            )} />
        },
        {
          key: 'a', label: <p className='px-3'>Chờ lấy hàng</p>,
          children: <OrderListLayout dataSource={Object.fromEntries(
            Object.entries(temp)
              .filter(i => TrangThaiDonHang[i[1].trangThai] === TrangThaiDonHang.NGUOI_BAN_XAC_NHAN))}
            Function={item => (
              <div className='space-y-5'>
                <Button variant='text' color='green' onClick={donHangVanChuyen.bind({}, item)}>Giao hàng</Button>
                <Button variant='text' color='red' onClick={huyDonHang.bind({}, item)}>Hủy</Button>
              </div>
            )} />
        },
        {
          key: 'b', label: <p className='px-3'>Đang giao</p>,
          children: <OrderListLayout dataSource={Object.fromEntries(
            Object.entries(temp)
              .filter(i => TrangThaiDonHang[i[1].trangThai] === TrangThaiDonHang.DON_HANG_VAN_CHUYEN))}
            Function={item => (
              <div className='space-y-5'>
                <Button variant='text' color='green' onClick={giaoHangThanhCong.bind({}, item)} >Thành công</Button>
                <Button variant='text' color='red' onClick={donHangVanChuyen.bind({}, item)} >Thất bại</Button>
                <Button variant='text' color='red' onClick={huyDonHang.bind({}, item)} >Hủy</Button>
              </div>
            )} />
        },
        {
          key: 'c', label: <p className='px-3'>Hoàn thành</p>,
          children: <OrderListLayout dataSource={Object.fromEntries(
            Object.entries(temp)
              .filter(i => TrangThaiDonHang[i[1].trangThai] === TrangThaiDonHang.DON_HANG_GIAO_THANH_CONG))} />
        },
        {
          key: 'd', label: <p className='px-3'>Đơn hủy</p>,
          children: <OrderListLayout dataSource={Object.fromEntries(
            Object.entries(temp)
              .filter(i => TrangThaiDonHang[i[1].trangThai] === TrangThaiDonHang.HUY_DON_HANG))} />
        },
      ]} />
    </div>
  );
}