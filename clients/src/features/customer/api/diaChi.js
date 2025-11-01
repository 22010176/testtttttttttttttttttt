import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL + "/api/diachi";

export const XemDanhSachDiaChi = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// export async function XemChiTietSanPham({ id }) {
//   const response = await axios.get(`${API_URL}/${id}`);
//   return response.data;
// }