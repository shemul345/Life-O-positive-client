import React from 'react';
import { MdBloodtype } from 'react-icons/md';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to='/'>
            <div className='flex items-end'>
                <MdBloodtype className='text-primary text-5xl' />
                <p className='font-extrabold text-3xl'>Life O+</p>
            </div>
        </Link>
    );
};

export default Logo;