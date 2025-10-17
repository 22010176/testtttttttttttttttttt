import { useEffect } from "react"

function Administrator() {
  useEffect(function () {
    document.title = import.meta.env.VITE_MODE
  }, [])
  return (
    <Routes>

    </Routes>
  )
}
export default Administrator