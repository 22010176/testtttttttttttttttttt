import { Form, Input } from 'antd';
import Modal from 'antd/es/modal/Modal';
import { Plus } from 'lucide-react';

export default function BankDashboard() {
  return (
    <div className="m-5">

      <h1 className="text-lg font-bold text-gray-800 mb-5">Tài khoản ngân hàng</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Add Bank Account Card */}
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center hover:border-gray-400 transition-colors cursor-pointer">
          <div className="size-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <Plus className="size-8 text-gray-400" />
          </div>
          <p className="text-gray-600 text-center">Thêm Tài khoản Ngân hàng</p>
        </div>

        {/* Bank Account Card */}
        <div className="flex justify-between flex-col bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg p-5 text-white shadow-lg">
          {/* Bank Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center">
              <span className="text-2xl font-bold text-white">S</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">SHB - NHTMCP SAI GON HANOI</h3>
            </div>
          </div>

          {/* Account Number */}
          <div className="mb-2">
            <div className="text-lg font-mono tracking-wider">
              **** 1608
            </div>
          </div>

          {/* Account Holder */}
          <div className="flex items-center justify-between">
            <span className="text-gray-300 text-sm tracking-wide">DO DUC MINH</span>
            <span className="bg-teal-400 text-teal-900 text-xs font-semibold px-3 py-1 rounded">
              MẶC ĐỊNH
            </span>
          </div>
        </div>
      </div>

      <Modal open={false} title="Tài khoản ngân hàng" >
        <Form labelCol={{ span: 8 }} labelWrap>
          <Form.Item label="Họ và Tên">
            <Input size='small' />
          </Form.Item>
          <Form.Item label="Số CMND">
            <Input size='small' />
          </Form.Item>
          <Form.Item label="Tên Ngân Hàng">
            <Input size='small' />
          </Form.Item>
          <Form.Item label="Số Tài Khoản">
            <Input size='small' />
          </Form.Item>
          <Form.Item label="Tên Chủ Tài Khoản (Viết in hoa)">
            <Input size='small' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}