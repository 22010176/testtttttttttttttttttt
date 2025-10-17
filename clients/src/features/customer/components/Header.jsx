import { Button, Divider, Input, Menu, Space } from 'antd';

import Container from './Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { routePaths } from '../routes';

export default function Header() {
  return (
    <div className="w-full bg-blue-500 py-5">
      <Container className="flex items-center justify-between gap-20">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="size-10 bg-white rounded-sm flex items-center justify-center">
            <p className="text-blue-500 text-2xl" />
          </div>
          <span className="text-white text-2xl font-light">AAAAA</span>
        </div>

        {/* Search Bar */}
        <Space.Compact className='w-full'>
          <Input size='large' placeholder='dddd' />
          <Button size='large' variant='filled' color='blue'>Tìm kiếm</Button>
        </Space.Compact>


        {/* </Badge> */}
        <div className="flex items-baseline gap-5 cursor-pointer">
          <Link className='text-white'>
            <FontAwesomeIcon icon={faShoppingCart} className='text-xl' />
          </Link>
          <Link to={routePaths.account.infomation} className='text-white text-xl'>
            User
          </Link>
        </div>
      </Container>
    </div>
  );
}