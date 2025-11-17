import { keys } from '@/constant/localStorageKey';
import axios from 'axios';
import { routePaths } from '../routes';

const API_URL = import.meta.env.VITE_SERVER_URL + "/api/giohang";

export async function XemDanhSachGioHang({ khachHangId }) {
  const response = await axios.get(API_URL, {
    params: {
      khachHangId
    }
  })
  return response.data
}
// http://localhost:8083/api/giohang

export async function ThemGioHang({
  sanPhamId = "string",
  soLuong = 0
}) {
  const khachHangId = localStorage.getItem(keys.userToken)
  if (khachHangId == null) return document.location.replace(routePaths.login)
  const response = await axios.post(API_URL, { sanPhamId, khachHangId, soLuong })
  return response.data
}

export async function XoaGioHang({ id }) {
  const response = await axios.delete(`${API_URL}/${id}`)
  return response.data
}