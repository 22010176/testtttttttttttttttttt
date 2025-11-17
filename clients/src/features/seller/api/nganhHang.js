import axios from "axios";

const nganhHangApi = import.meta.env.VITE_SERVER_URL + "/api/nganh-hang";
console.log("NganhHang API URL:", nganhHangApi);
export async function getNganhHangList({ id = 0, page = null, pageSize = null }) {
  const response = await axios.get(`${nganhHangApi}/lay-nganh-hang-con`, {
    params: { id, page, pageSize }
  });
  return response.data;
}

export async function LayDanhSachNganhHang() {
  const result = await axios.get('http://localhost:5216/api/nganh-hang')
  return result.data
}