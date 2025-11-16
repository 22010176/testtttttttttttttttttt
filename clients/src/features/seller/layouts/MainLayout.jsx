import { Outlet, useNavigate } from "react-router-dom"

import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { useEffect } from "react"
import { keys } from "@/constant/localStorageKey"
import { routePaths } from "../routes"

function MainLayout() {
  const navigate = useNavigate()
  useEffect(function () {
    if (localStorage.getItem(keys.userToken) == null) {
      navigate(routePaths.account.login)
    }

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