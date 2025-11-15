import axios from "axios";

import { keys } from "@/constant/localStorageKey";

const API_URL = import.meta.env.VITE_SERVER_URL + "/api/diachi";

export const XemDanhSachDiaChi = async () => {
  const response = await axios.get(API_URL, {
    params: {
      id: localStorage.getItem(keys.userToken)
    }
  }
  );
  return response.data;
};

// export async function XemChiTietSanPham({ id }) {
//   const response = await axios.get(`${API_URL}/${id}`);
//   return response.data;
// }