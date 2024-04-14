import React from 'react';
import Nav_bar from './Nav';
import { Outlet } from 'react-router-dom';
import '../page/style.css';

const Layout = () => {
  return (
    <div className='container-fluid dark-mode'>
      <Nav_bar />
      <Outlet />
    </div>
  );
};

export default Layout;
