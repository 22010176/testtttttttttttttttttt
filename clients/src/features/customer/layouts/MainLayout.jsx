import { Outlet } from "react-router-dom"

import Footer from "../components/Footer"
import Header from "../components/Header"

function MainLayout() {
  return (
    <div className="w-screen h-screen">
      <Header />

      <div className="bg-gray-50 py-10">
        <Outlet />
      </div>
      <Footer />

    </div>
  )
}

export default MainLayout