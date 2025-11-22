import { keys } from "@/constant/localStorageKey";
import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL + "/api/donhang";

export async function XemDanhSachDonHang() {
  const response = axios.get(API_URL, {
    params: {
      khachHangId: localStorage.getItem(keys.userToken)
    }
  })
  return (await response).data
}

export async function XemThongTinChiTietDonHang({ id }) {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}

export async function TaoDonHang({ khachHangId = "", loaiHinhThanhToan = "", sanPham = [] }) {
  const result = await axios.post(API_URL, { khachHangId, loaiHinhThanhToan, sanPham })
  return result.data
}
export async function LayDanhSachDonHangCanDuyet() {
  const result = await axios.get(`${API_URL}/duyetdonhang`, {
    params: {
      khachHangId: localStorage.getItem(keys.userToken)
    }
  })
  return result.data
}
export async function XacNhanDuyetDonHang() {
  const result = await axios.post(`${API_URL}/duyetdonhang?khachHangId=${localStorage.getItem(keys.userToken)}`,)
  return result.data
}
export async function XacNhanHuyDuyetDonHang() {
  const result = await axios.delete(`${API_URL}/duyetdonhang?khachHangId=${localStorage.getItem(keys.userToken)}`,)
  return result.data
}

