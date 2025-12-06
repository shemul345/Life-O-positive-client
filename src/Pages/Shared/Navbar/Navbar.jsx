import React from 'react';
import { Link, NavLink } from 'react-router';
import { FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import Logo from '../../../components/Logo/Logo';


const Navbar = () => {
    const { user, signOutUser } = useAuth();
    const links = <>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/coverage">Coverage</NavLink></li>
        <li><NavLink to="/about-us">About Us</NavLink></li>

        {
            user && <>
                <li><NavLink to="/send-parcel">Send Parcel</NavLink></li>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            </>
        }
    </>

    const handleSignOutUser = () => {
        signOutUser()
            .then(() => {
                // console.log(result)
                toast.success('You are successfully signout', {
                    position: "top-center"
                });
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className="navbar bg-base-100 shadow-sm rounded-xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content
                         bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <span className=" text-xl">
                    <Logo></Logo>
                </span>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end flex">
                {
                    user ?
                        <a onClick={handleSignOutUser} className="btn">Sign Out</a>
                        :
                        <Link className='btn' to='/login'>Sign In</Link>
                }
                <Link to='/rider'
                    className='btn btn-primary
                     text-black font-bold ml-3'>Be a rider</Link>
                <button className='icon-circle-container -rotate-45'>
                    <FaArrowRight className='text-2xl text-[#CAEB66]
                         font-extrabold' />
                </button>
            </div>
        </div>
    );
};

export default Navbar;