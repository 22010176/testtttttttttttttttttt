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