import { Button, Image, Input, Space } from 'antd';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { routePaths } from '../routes';

import Container from './Container';

export default function Header() {
  return (
    <div className="w-full bg-blue-500 py-5">
      <Container className="flex items-center justify-between gap-20">
        {/* Logo */}
        <Link to={routePaths.root} className="flex items-center gap-3">
          <div className="size-10 bg-white rounded-sm flex items-center justify-center">
            <p className="text-blue-500 text-2xl" />
          </div>
          <span className="text-white text-2xl font-light">AAAAA</span>
        </Link>

        {/* Search Bar */}
        <Space.Compact className='w-full'>
          <Input size='large' placeholder='dddd' />
          <Button size='large' variant='filled' color='blue'>Tìm kiếm</Button>
        </Space.Compact>


        {/* </Badge> */}
        <div className="flex items-center gap-8 cursor-pointer">
          <Link className='text-white' to={routePaths.orders.carts}>
            <FontAwesomeIcon icon={faShoppingCart} className='text-xl' />
          </Link>
          <Link to={routePaths.account.infomation} className='text-white text-xl flex items-center gap-2'>
            <p>
              User
            </p>
            <img
              src="https://cf.shopee.vn/file/sg-11134201-22100-3m3nv4od6s6t2e"
              alt="User Avatar"
              className="size-8 rounded-full object-cover bg-white"
            />

          </Link>
        </div>
      </Container>
    </div>
  );
}