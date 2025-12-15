import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import SocialLogin from '../../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const { signInUser, resetPassword } = useAuth()
    const [show, setShow] = useState(false)
    const location = useLocation();
    const navigate = useNavigate()
    // console.log('in login location', location)

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(() => {
                // console.log(result)
                toast.success("You’re logged in! Enjoy your session", {
                    position: "top-center"
                });
                navigate(location.state || '/')
            })
            .catch(() => {
                // console.log(error)
                toast.error("Please provide your verified email & password", {
                    position: "top-center"
                });
            })
    }

    const handleResetPassword = async () => {
        const email = getValues('email');

        if (!email) {
            toast.info('Please enter your email above to receive reset link.', {
                position: "top-center"
            });
            return;
        }
        try {
            await resetPassword(email)
            toast.success('If an account exists for that email, you will receive a password reset link.', {
                position: "top-center"
            });
        } catch (err) {
            console.error('resetPassword error:', err);

            toast.success('If an account exists for that email, you will receive a password reset link.', {
                position: "top-center"
            });
        }
    }
    return (
        <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
            <h1 className="text-5xl font-extrabold text-center mt-5 mb-1">Welcome Back</h1>
            <p className='text-center'>Login with
                <span className='ml-2 text-xl font-bold text-red-500'>Life O+</span></p>
            <div className="card-body">
                <form onSubmit={handleSubmit(handleLogin)}>
                    <fieldset className="fieldset">
                        {/* Email */}
                        <label className="label">Email</label>
                        <input type="email"
                            className="input w-full"
                            {...register('email', { required: true })}
                            placeholder="Enter your email" />
                        {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}
                        {/* Password */}
                        <label className="label">Password</label>
                        <div className='relative'>
                            <input
                                type={show ? 'text' : 'password'}
                                className="input w-full"
                                {...register('password', { required: true, minLength: 6 })}
                                placeholder="Password" />
                            <span
                                onClick={() => setShow(!show)}
                                className="absolute right-6 top-3 cursor-pointer z-50 text-gray-500 text-lg">
                                {show ? <IoEyeOff /> : <FaEye />}
                            </span>
                            {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className='text-red-500'>Must be 6 characters or longer</p>}
                        </div>
                        
                        <div>
                            <a onClick={handleResetPassword} className="link link-hover">Forgot password?</a>
                        </div>
                        <button className="btn btn-primary text-white mt-4 w-full font-bold">Login</button>
                        <p>Don't have any account?
                            <Link state={location.state}
                                to='/register'> <span className='text-red-500 font-bold'>Register</span>
                            </Link></p>
                    </fieldset>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Login;