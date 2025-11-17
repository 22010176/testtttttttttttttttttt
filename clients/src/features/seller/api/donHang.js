import axios from "axios";

import { keys } from "@/constant/localStorageKey";

const donHangApi = import.meta.env.VITE_SERVER_URL + "/api/don-hang";

export async function LayDanhSachDonHangKhachHang() {
  const result = await axios.get(donHangApi, {
    params: {
      nguoiBanId: localStorage.getItem(keys.userToken)
    }
  })
  return result.data
}

export const TrangThaiDonHang =
{
  KHACH_HANG_DAT_HANG: 0,
  NGUOI_BAN_XAC_NHAN: 1,
  DON_HANG_VAN_CHUYEN: 2,
  DON_HANG_GIAO_THANH_CONG: 3,
  HUY_DON_HANG: 4
}
export async function CapNhatTrangThaiDonHang({
  donHangId = "string",
  noiDungCapNhat = "string",
  trangThaiDonHang = 0
}) {
  const result = await axios.post(donHangApi, {
    donHangId,
    noiDungCapNhat,
    trangThaiDonHang
  })

  return result.data
}