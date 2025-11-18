import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import { keys } from "@/constant/localStorageKey"
import { getInfo } from "../api/taiKhoan"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { routePaths } from "../routes"

function MainLayout() {
  const navigate = useNavigate()
  useEffect(function () {
    getInfo().then(result => {
      console.log(result)
    }).catch(err => {
      localStorage.removeItem(keys.userToken)
      navigate(routePaths.account.login)
    })

  }, [])
  return (
    <div className="w-screen h-screen overflow-hidden grid grid-rows-[max-content_1fr]">
      <Header />
      <div className="overflow-hidden grid grid-cols-[max-content_1fr]">
        <Sidebar />

        <div className="h-full overflow-y-scroll overflow-x-auto bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MainLayout