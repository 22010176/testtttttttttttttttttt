import { keys } from "@/constant/localStorageKey";
import axios from "axios";
import { Import } from "lucide-react";

const API_URL = import.meta.env.VITE_SERVER_URL + '/api/taikhoan'

export async function dangNhapTaiKhoan({
  email = "xdU6hgTUyM@random.co",
  matKhau = "abc"
}) {
  const response = await axios.post(API_URL + '/dang-nhap', { email, matKhau })
  return response.data
}
export async function dangKiTaiKhoan({
  email = "string",
  soDienThoai = "string",
  matKhau = "string",
  hoTen = "string"
}) {
  const response = await axios.post(API_URL + '/dang-ki', { email, matKhau, soDienThoai, hoTen })
  return response.data
}

export async function XemThongTinTaiKhoan() {
  const result = await axios.get(API_URL, {
    params: {
      khachHangId: localStorage.getItem(keys.userToken)
    }
  })
  return result.data
}

export const GIOI_TINH = {
  NAM: 'NAM',
  NU: 'NU',
  KHAC: 'KHAC'
}

export async function CapNhatThongTinTaiKhoan({
  hoTen = "string",
  gioiTinh = "NAM",
  ngaySinh = "2025-11-18T01:31:19.878Z"
}) {
  const result = await axios.put(API_URL, {
    khachHangId: localStorage.getItem(keys.userToken),
    hoTen,
    gioiTinh,
    ngaySinh
  })
  return result.data
}