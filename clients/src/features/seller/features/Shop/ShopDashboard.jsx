import React, { useState } from 'react';
import { Input, Button, Upload } from 'antd';

const { TextArea } = Input;

export default function ShopDashboard() {
  const [shopName, setShopName] = useState('VuThanhNam');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-5 bg-white rounded m-5 shadow-sm">
      <h2 className="text-xl font-medium text-gray-800 mb-6">Thông tin cơ bản</h2>

      {/* Shop Name */}
      <div className="mb-6">
        <div className="flex items-start gap-4">
          <label className="w-32 pt-2 text-gray-700 text-right flex-shrink-0">
            Tên Shop
          </label>
          <div className="flex-1">
            <Input
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              maxLength={30}
              className="w-full"
            />
            <div className="text-right text-gray-400 text-sm mt-1">
              {shopName.length}/30
            </div>
          </div>
        </div>
      </div>

      {/* Shop Logo */}
      <div className="mb-6">
        <div className="flex items-start gap-4">
          <label className="w-32 pt-2 text-gray-700 text-right flex-shrink-0">
            Logo của Shop
          </label>
          <div className="flex-1">
            <div className="flex items-start gap-4">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
                <img
                  src={imageUrl}
                  alt="Shop Logo"
                  className="w-full h-full object-cover"
                />
                <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-white text-sm">Sửa</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="text-sm text-gray-500 space-y-1">
                <p>• Kích thước hình ảnh tiêu chuẩn: Chiều rộng 300px, Chiều cao 300px</p>
                <p>• Dung lượng file tối đa: 2.0MB</p>
                <p>• Định dạng file được hỗ trợ: JPG, JPEG, PNG</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Description */}
      <div className="mb-8">
        <div className="flex items-start gap-4">
          <label className="w-32 pt-2 text-gray-700 text-right flex-shrink-0">
            Mô tả Shop
          </label>
          <div className="flex-1">
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả hoặc thông tin về Shop của bạn tại đây"
              maxLength={500}
              rows={5}
              className="w-full"
            />
            <div className="text-right text-gray-400 text-sm mt-1">
              {description.length}/500
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <div className="w-32 flex-shrink-0"></div>
        <div className="flex-1 flex gap-3">
          <Button
            type="primary"
            size="large"
            className="bg-orange-500 hover:bg-orange-600 border-orange-500 px-8"
          >
            Lưu
          </Button>
          <Button
            size="large"
            className="px-8"
          >
            Hủy
          </Button>
        </div>
      </div>
    </div>
  );
}