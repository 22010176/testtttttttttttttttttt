import axios from 'axios'

const API_URL = import.meta.env.VITE_SERVER_URL + "/api/giohang";

export async function XemDanhSachGioHang({ ...params }) {
  const response = await axios.get(API_URL, {
    params
  })
  return response.data
}