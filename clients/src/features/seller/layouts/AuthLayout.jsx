import { Outlet } from "react-router-dom"

function AuthLayout() {
  return (
    <div className="min-h-screen min-w-screen overflow-hidden bg-blue-200 flex justify-center items-center">
      <Outlet />
    </div>
  )
}

export default AuthLayout