import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";

function ItemLayout({ icon, title, description }) {
  return (
    <div className="h-full flex justify-between border p-3 rounded border-gray-200 flex-col">
      <div className='flex flex-col '>
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <h3 className="font-semibold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-500 text-sm mb-4">
          {description}
        </p>
      </div>
      <Button variant='solid' color='blue' className="w-20 self-end">Tạo</Button>
    </div>
  )
}

export default ItemLayout;