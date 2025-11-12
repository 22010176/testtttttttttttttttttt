import axios from 'axios'

const API_URL = import.meta.env.VITE_SERVER_URL + "/api/giohang";

export async function XemDanhSachGioHang({ ...params }) {
  const response = await axios.get(API_URL, {
    params
  })
  return response.data
}
// http://localhost:8083/api/giohang

export async function ThemGioHang({
  sanPhamId = "string",
  khachHangId = "e6794ee2-2ed6-4f40-9280-1edfb5122db9",
  soLuong = 0
}) {
  const response = await axios.post(API_URL, { sanPhamId, khachHangId, soLuong })
  return response.data
}

export async function XoaGioHang({ id }) {
  const response = await axios.delete(`${API_URL}/${id}`)
  return response.data
}