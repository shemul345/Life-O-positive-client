import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../../components/Logo/Logo';
import authImage from '../../assets/authImage.png';

const AuthLayout = () => {
    return (
        <div className='bg-white flex h-[100vh]'>
            <div className='flex-1 mt-5 ml-20'>
                <section><Logo></Logo></section>
                <section className='mt-15 ml-20'>
                    <Outlet></Outlet>
                </section>
            </div>
            <div className='flex-1 bg-gray-50'>
                <img className='mx-auto mt-25' src={authImage} alt="" />
            </div>
        </div>
    );
};

export default AuthLayout;