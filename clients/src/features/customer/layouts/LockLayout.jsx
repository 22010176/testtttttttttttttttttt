import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { keys } from "@/constant/localStorageKey";
import { XemThongTinTaiKhoan } from "../api/taiKhoan";
import { routePaths } from "../routes";

export function LockLayout() {
  const navigate = useNavigate()
  const [status, setStatus] = useState("waiting")

  useEffect(function () {
    XemThongTinTaiKhoan().then(result => {
      if (result.data == null || result.success == false) {
        localStorage.removeItem(keys.userToken)
        navigate(routePaths.account.login)
        return
      }
      setStatus(' ')
    }).catch(er => {
      localStorage.removeItem(keys.userToken)
      navigate(routePaths.account.login)

    })
  }, [])
  return status == 'waiting' ? "" : <Outlet />
}