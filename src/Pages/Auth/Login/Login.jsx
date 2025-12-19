import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaLock, FaEnvelope } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const { signInUser, resetPassword } = useAuth();
    const [show, setShow] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(() => {
                toast.success("Welcome back to Life O+!", { position: "top-center" });
                navigate(location.state || '/');
            })
            .catch(() => {
                toast.error("Invalid credentials. Please try again.", { position: "top-center" });
            });
    };

    const handleResetPassword = async () => {
        const email = getValues('email');
        if (!email) {
            toast.info('Please enter your email first.', { position: "top-center" });
            return;
        }
        try {
            await resetPassword(email);
            toast.success('Password reset link sent to your email.', { position: "top-center" });
        } catch {
            toast.error('Failed to send reset link.', { position: "top-center" });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <div
                className="bg-white w-full max-w-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100"
                data-aos="zoom-in"
            >
                {/* Upper */}
                <div className="bg-red-600 p-10 text-center text-white relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
                    <h1 className="text-4xl font-black mb-2" data-aos="fade-down" data-aos-delay="300">Welcome Back</h1>
                    <p className="text-red-100 font-medium tracking-wide">Secure Access to Life O+</p>
                </div>

                <div className="p-8 md:p-10">
                    <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">

                        {/* Email */}
                        <div data-aos="fade-up" data-aos-delay="400">
                            <label className="text-sm font-bold text-gray-700 ml-1 mb-2 block uppercase tracking-wider">Email Address</label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-red-500 transition-colors">
                                    <FaEnvelope />
                                </span>
                                <input
                                    type="email"
                                    className={`w-full pl-11 pr-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all ${errors.email ? 'border-red-300' : 'border-transparent focus:border-red-500 focus:bg-white'}`}
                                    {...register('email', { required: true })}
                                    placeholder="name@example.com"
                                />
                            </div>
                            {errors.email && <p className='text-red-500 text-xs mt-2 ml-1 font-bold'>Email is required</p>}
                        </div>

                        {/* Password */}
                        <div data-aos="fade-up" data-aos-delay="500">
                            <label className="text-sm font-bold text-gray-700 ml-1 mb-2 block uppercase tracking-wider">Password</label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-red-500 transition-colors">
                                    <FaLock />
                                </span>
                                <input
                                    type={show ? 'text' : 'password'}
                                    className={`w-full pl-11 pr-12 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all ${errors.password ? 'border-red-300' : 'border-transparent focus:border-red-500 focus:bg-white'}`}
                                    {...register('password', { required: true, minLength: 6 })}
                                    placeholder="••••••••"
                                />
                                <span
                                    onClick={() => setShow(!show)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-red-500 text-xl transition-colors">
                                    {show ? <IoEyeOff /> : <FaEye />}
                                </span>
                            </div>
                            {errors.password && <p className='text-red-500 text-xs mt-2 ml-1 font-bold'>Password must be at least 6 characters</p>}
                        </div>

                        {/* Forgot Password */}
                        <div className="text-right" data-aos="fade-in" data-aos-delay="600">
                            <button
                                type="button"
                                onClick={handleResetPassword}
                                className="text-sm font-bold text-red-600 hover:text-red-800 transition-colors underline-offset-4 hover:underline"
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <button
                            data-aos="zoom-in"
                            data-aos-delay="700"
                            className="w-full py-4 bg-red-600 text-white rounded-2xl font-black text-lg shadow-[0_10px_20px_rgba(220,38,38,0.3)] hover:shadow-none hover:bg-neutral-900 transform active:scale-95 transition-all duration-300"
                        >
                            LOGIN
                        </button>

                        {/* Register Link */}
                        <p className='text-center text-gray-500 font-medium pt-4' data-aos="fade-up" data-aos-delay="800">
                            New here?
                            <Link
                                state={location.state}
                                to='/register'
                                className='ml-2 text-red-600 font-black hover:underline underline-offset-4 transition-all'
                            >
                                CREATE ACCOUNT
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;