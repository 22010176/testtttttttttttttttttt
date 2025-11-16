import { keys } from "@/constant/localStorageKey";
import axios from "axios";

const server_url = import.meta.env.VITE_SERVER_URL + "/api/san-pham";

export async function LayThongTinSanPhamChiTiet({ id }) {
  const result = await axios.get(`${server_url}/${id}`)
  return result.data
}

export async function layDanhSachSanPham() {
  const result = await axios.get(server_url, {
    params: {
      nguoiBanId: localStorage.getItem(keys.userToken)
    }
  })
  return result.data
}


// http://localhost:5216/api/san-pham/cap-nhat-san-pham
export async function TaoSanPham({
  nganhHangId = "string",
  tenSanPham = "string",
  moTaSanPham = "string",
  giaBan = 0,
}) {
  const result = await axios.post(`${server_url}/cap-nhat-san-pham`, {
    sanPhamId: null,
    nguoiBanId: localStorage.getItem(keys.userToken),
    ngayTao: new Date(),
    nganhHangId,
    tenSanPham,
    moTaSanPham,
    giaBan
  })

  return result.data
}

// dotnet
export const TrangThaiSanPham = {
  HOAT_DONG: 0,
  BAN_NHAP: 1,
  NGUNG_HOAT_DONG: 2,
  BI_XOA: 3
}
export async function CapNhatTrangThaiSanPham({ sanPhamId, trangThaiSanPham }) {
  const result = await axios.put(`${server_url}/cap-nhat-trang-thai`, {
    sanPhamId,
    trangThaiSanPham
  })
  return result.data
}