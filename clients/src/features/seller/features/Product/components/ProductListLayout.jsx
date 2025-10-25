import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Cascader, Form, Input, Select, Table } from 'antd';
import { useEffect, useState } from 'react';

import { getNganhHangList } from '@/features/seller/api/nganhHang';
import EmptyList from '_s/components/EmptyList';
import FilterForm from './FilterForm';

// console.log(import.meta.env.VITE_SERVER_URL);

function ProductListLayout({ dataSource = [] }) {
  const [form] = Form.useForm();
  const searchValue = Form.useWatch(i => i, form);
  console.log('Search Value:', searchValue);

  const columns = [
    { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name', width: '30%', sorter: true },
    { title: 'Doanh số', dataIndex: 'sales', key: 'sales', sorter: true },
    { title: 'Giá', dataIndex: 'price', key: 'price', sorter: true },
    // { title: 'Kho hàng', dataIndex: 'stock', key: 'stock', sorter: true },
    { title: 'Thao tác', dataIndex: 'action', key: 'action' }
  ];

  return (
    <div className='bg-white p-5 flex flex-col gap-5'>
      <FilterForm form={form} />

      {/* Product Table */}
      <Table columns={columns} dataSource={dataSource} locale={{ emptyText: <EmptyList /> }} />
    </div >
  )
}

export default ProductListLayout