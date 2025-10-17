import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tabs } from 'antd';
import { Link } from 'react-router-dom';

import { routePaths } from '_s/routes';
import ProductListLayout from './components/ProductListLayout';


function ProductDashBoard() {
  const topTabs = [
    { key: 'all', label: <p className='px-3'>Tất cả</p>, children: <ProductListLayout /> },
    {
      key: 'active', label: <p className='px-3'>Đang hoạt động</p>,
      children: (
        <div className='bg-white px-5'>
          <Tabs items={[
            { key: 'all', label: <p className='px-3'>Tất cả</p>, children: <ProductListLayout /> },
            { key: 'need-produce', label: <p className='px-3'>Cần bổ sung hàng</p>, children: <ProductListLayout /> },
          ]} />
        </div>
      )
    },
    { key: 'not-logged', label: <p className='px-3'>Đang ẩn</p>, children: <ProductListLayout /> }
  ];

  return (
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
  );
};

export default ProductDashBoard;