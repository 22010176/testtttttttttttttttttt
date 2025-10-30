import axios from "axios";

const server_url = import.meta.env.VITE_SERVER_URL + "/api/san-pham";

export async function layDanhSachSanPham() {
  const result = await axios.get(server_url)
  return result.data
}