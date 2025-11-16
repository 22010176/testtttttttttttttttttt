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
