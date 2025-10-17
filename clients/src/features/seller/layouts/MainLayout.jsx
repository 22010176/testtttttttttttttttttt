import { Outlet } from "react-router-dom"

import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

function MainLayout() {
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