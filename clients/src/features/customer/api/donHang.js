import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL + "/api/donhang";

export async function XemDanhSachDonHang() {
  const response = axios.get(API_URL)
  return (await response).data
}

export async function XemThongTinChiTietDonHang({ id }) {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}