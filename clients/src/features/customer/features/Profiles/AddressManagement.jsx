import React, { useState } from 'react';
import { Button, Tag, Alert } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([
    { id: 1, name: 'Đỗ Thành Nam', phone: '(+84) 1234567890', street: '344444', district: 'aaaaaaaaaai', isDefault: true, isRetail: false },
    { id: 2, name: 'Đỗ Thành Nam', phone: '(+84) 1234567890', street: '344444', district: 'aaaaaaaaaai', isDefault: false, isRetail: true },
    { id: 3, name: 'Đỗ Thành Nam', phone: '(+84) 1234567890', street: '344444', district: 'aaaaaaaaaai', isDefault: false, isRetail: false }
  ]);

  return (
    <div className="p-5 space-y-5">
      <div className='flex justify-between border-b-1'>
        <h2 className="text-lg font-medium text-gray-800 mb-6">Địa chỉ</h2>
        <Button type="primary" icon={<PlusOutlined />}>
          Thêm địa chỉ mới
        </Button>
      </div>

      <div className="space-y-3">
        {addresses.map((address) => (
          <div key={address.id} className="flex justify-between items-start border-b-1 pb-2">
            {/* Left side - Address details */}
            <div className="">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-medium text-gray-800">
                  {address.name}
                </h3>
                <span className="text-gray-500">{address.phone}</span>
              </div>

              <div className="text-gray-600 mb-2">
                <p>{address.street}</p>
                <p>{address.district}</p>
              </div>

              <div className="flex gap-2">
                {address.isDefault && (
                  <Tag color="red" className="border-red-500">
                    Mặc định
                  </Tag>
                )}
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-2">
                <a href="#" className="text-blue-500 hover:text-blue-600">
                  Cập nhật
                </a>
                {!address.isDefault && (
                  <>
                    <span className="text-gray-300">|</span>
                    <a href="#" className="text-blue-500 hover:text-blue-600">
                      Xóa
                    </a>
                  </>
                )}
              </div>

              <Button>
                Thiết lập mặc định
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressManagement;