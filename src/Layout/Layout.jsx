import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const Layout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Layout;