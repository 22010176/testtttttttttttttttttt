import { keys } from "@/constant/localStorageKey";
import axios from "axios";

const server_url = import.meta.env.VITE_SERVER_URL + "/api/tai-khoan"

export async function login({ email, matKhau }) {
  const result = await axios.post(`${server_url}/login`, { email, matKhau })
  // console.log(result)
  return result.data
}

export async function register({ email, matKhau, hoTen, soDienThoai, }) {
  const result = await axios.post(`${server_url}/register`, { email, matKhau, hoTen, soDienThoai, })
  // console.log(result)
  return result.data

}
// login({ email: "", matKhau: "" })

export async function getInfo() {
  const result = await axios.get(server_url, {
    params: {
      taiKhoanId: localStorage.getItem(keys.userToken)
    }
  })
  // console.log(result)
  return result.data

}