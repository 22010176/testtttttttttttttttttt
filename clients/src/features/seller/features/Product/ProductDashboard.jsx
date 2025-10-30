import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tabs } from 'antd';
import { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';

import { layDanhSachSanPham } from '_s/api/sanPham';
import { routePaths } from '_s/routes';
import ProductListLayout from './components/ProductListLayout';
import { defaultValue, PageProvider, reducer } from './pageReducer';


function ProductDashBoard() {
  const [state, dispatch] = useReducer(reducer, defaultValue);

  useEffect(function () {
    layDanhSachSanPham().then(function (res) {
      dispatch({ type: 'SET_DANH_SACH_SAN_PHAM', payload: res.data });
    })
  }, [])

  const topTabs = [
    {
      key: 'all', label: <p className='px-3'>Tất cả</p>,
      children: <ProductListLayout dataSource={state.danh_sach_san_pham} />
    },
    {
      key: 'active', label: <p className='px-3'>Đang hoạt động</p>,
      children: <ProductListLayout dataSource={state.danh_sach_san_pham.filter(item => item.trangThaiSanPham === "HOAT_DONG")} />
    },
    {
      key: 'not-logged', label: <p className='px-3'>Đang ẩn</p>,
      children: <ProductListLayout dataSource={state.danh_sach_san_pham.filter(item => item.trangThaiSanPham !== "HOAT_DONG")} />
    }
  ];

  return (
    <PageProvider value={[state, dispatch]}>
      <div className="p-5 h-full">
        <div className='flex justify-end gap-5'>
          <Link to={routePaths.management.product.insert}>
            <Button size='large' variant='solid' color='blue' icon={<FontAwesomeIcon icon={faPlus} />}>
              Thêm sản phẩm
            </Button>
          </Link>
        </div>
        <Tabs mode='horizontal' items={topTabs} />
      </div>
    </PageProvider>
  );
};

export default ProductDashBoard;