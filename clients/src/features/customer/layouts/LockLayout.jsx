import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { keys } from "@/constant/localStorageKey";
import { XemThongTinTaiKhoan } from "../api/taiKhoan";
import { routePaths } from "../routes";

export function LockLayout() {
  const navigate = useNavigate()

  useEffect(function () {
    XemThongTinTaiKhoan().then(result => {
      if (result.success) return
      localStorage.removeItem(keys.userToken)
      navigate(routePaths.login)
    })
  }, [])
  return (
    <Outlet />
  )
}