import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useEffect, useState } from 'react';

import { XemDanhSachDiaChi } from '_c/api/diaChi';

function DiaChi({ Id, HoTen, SoDienThoai, DiaChiCuThe }) {
  return (
    <div key={Id} className="flex justify-between items-start border-b-1 pb-2">
      {/* Left side - Address details */}
      <div className="">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="font-medium text-gray-800">
            {HoTen}
          </h3>
          <span className="text-gray-500">{SoDienThoai}</span>
        </div>

        <div className="text-gray-600 mb-2">
          <p>{DiaChiCuThe}</p>
          {/* <p>{district}</p> */}
        </div>

        {/* <div className="flex gap-2">
                {address.isDefault && (
                  <Tag color="red" className="border-red-500">
                    Mặc định
                  </Tag>
                )}
              </div> */}
      </div>

      {/* Right side - Actions */}
      <div className="flex flex-col items-end gap-2">
        <div className="flex gap-2">
          <a href="#" className="text-blue-500 hover:text-blue-600">
            Cập nhật
          </a>

          <a href="#" className="text-blue-500 hover:text-blue-600">
            Xóa
          </a>
          {/* {!address.isDefault && (
                  <>
                    <a href="#" className="text-blue-500 hover:text-blue-600">
                      Xóa
                    </a>
                    <span className="text-gray-300">|</span>
                  </>
                )} */}
        </div>

        {/* <Button>
                Thiết lập mặc định
              </Button> */}
      </div>
    </div>
  )
}

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([]);

  useEffect(function () {
    XemDanhSachDiaChi().then(data => {
      setAddresses(data.data)
    })
  }, [])
  console.log(addresses)
  return (
    <div className="p-5 space-y-5">
      <div className='flex justify-between border-b-1'>
        <h2 className="text-lg font-medium text-gray-800 mb-6">Địa chỉ</h2>
        <Button type="primary" icon={<PlusOutlined />}>
          Thêm địa chỉ mới
        </Button>
      </div>

      <div className="space-y-3">
        {addresses.map((address) => <DiaChi {...address} />)}
      </div>
    </div>
  );
};

export default AddressManagement;