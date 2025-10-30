import { SearchOutlined } from '@ant-design/icons';
import { Button, Cascader, Form, Input } from "antd";
import { useEffect, useState } from "react";

import { getNganhHangList } from "@/features/seller/api/nganhHang";

function FilterForm({ form }) {
  const [nganhHangList, setNganhHangList] = useState([]);
  function renderBrandList(brands) {
    // console.log('Rendering brand list for:', brands);
    if (!brands || brands?.length === 0) return [];

    return brands.map(i => ({
      value: i?.id,
      label: i?.tenNganhHang,
      // isLeaf: i?.nganhHangCon?.length === 0,
      children: renderBrandList(i?.nganhHangCon)
    }))
  }
  useEffect(function () {
    // Fetch category data here and set it to nganhHangList
    getNganhHangList({}).then(data => {

      setNganhHangList(data.data.nganhHangCon);
    });
  }, []);
  return (
    <Form layout='inline' form={form}>
      <Form.Item className='w-100' name="name">
        <Input prefix={<SearchOutlined className="text-gray-400" />} />
      </Form.Item>
      <Form.Item className="w-64" name="category" hidden>
        {/* <Select placeholder="Category" suffixIcon={<EditOutlined />} /> */}
        <Cascader
          defaultValue={[0]}
          // loadData={async function (options) {
          //   console.log(options)
          // }}
          options={[
            { value: 0, label: 'Tất cả ngành hàng', children: [] },
            ...renderBrandList(nganhHangList),
          ]} />
      </Form.Item>
      {/* <Form.Item className="w-64" name="program">
        <Select defaultValue="Chương trình Shopee" suffixIcon={<DownOutlined />} />
      </Form.Item> */}
      {/* <Form.Item>
          <Button variant='solid' color='blue' >Áp dụng</Button>
        </Form.Item> */}
      <Form.Item>
        <Button>Đặt lại</Button>
      </Form.Item>
    </Form>
  )
}

export default FilterForm;