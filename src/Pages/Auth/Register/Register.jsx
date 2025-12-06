import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { IoEyeOff } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SocialLogin from '../../SocialLogin/SocialLogin';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [show, setShow] = useState(false)
    const { registerUser, updateUserProfile } = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();

    const handleRegistration = (data) => {
        // console.log(data)
        const profileImage = data.photo[0];

        registerUser(data.email, data.password)
            .then(() => {
                // console.log(result)
                // store the image and get the photo url
                const formData = new FormData();
                formData.append('image', profileImage);
                const image_API_URL_Key = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

                axios.post(image_API_URL_Key, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;

                        // User store in the database
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            photoURL: photoURL
                        }

                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user created in the database', res.data)
                                    navigate(location.state || '/')
                                }
                            })

                        // Update user profile
                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        }

                        updateUserProfile(userProfile)
                            .then(() => {
                                console.log('Update user profile successfully')
                                navigate(location.state || '/')
                            })
                            .catch()

                    })
                    .catch(() => {
                        // console.log(error)
                    })


                toast.success('You are successfully registered', {
                    position: "top-center"
                });
                navigate('/login')
            })
            .catch(() => {
                // console.log(error)
                toast.error('Email-already-in-use', {
                    position: "top-center"
                });
            })
    }
    return (
        <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
            <h1 className="text-5xl font-extrabold text-center mt-5 mb-1">Create an account</h1>
            <p className='text-center'>Register with <span className='ml-2 text-xl font-bold text-red-500'>Life O+</span></p>
            <div className="card-body">
                <form onSubmit={handleSubmit(handleRegistration)}>
                    <fieldset className="fieldset">
                        {/* Name */}
                        <label className="label">Name</label>
                        <input type="text"
                            className="input w-full"
                            {...register('name', { required: true })}
                            placeholder="Enter your name" />
                        {errors.name?.type === 'required' && <p className='text-red-500'>Password is required</p>}

                        {/* Photo */}
                        <label className="label">Photo</label>
                        <input type="file"
                            className="file-input"
                            {...register('photo', { required: true })}
                            placeholder="Choose your photo" />
                        {errors.photo?.type === 'required' &&
                            <p className='text-red-500'>Photo is required</p>}


                        {/* Email */}
                        <label className="label">Email</label>
                        <input type="email"
                            className="input w-full"
                            {...register('email', { required: true })}
                            placeholder="Email" />
                        {errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>}

                        {/* Password */}
                        <label className="label">Password</label>
                        <div className='relative'>
                            <input
                                type={show ? 'text' : 'password'}
                                className="input w-full"
                                {...register('password', {
                                    required: true,
                                    minLength: 6,
                                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/~`]).+$/
                                })}
                                placeholder="Password" />
                            <span
                                onClick={() => setShow(!show)}
                                className="absolute right-6 top-3 cursor-pointer z-50 text-gray-500 text-lg">
                                {show ? <IoEyeOff /> : <FaEye />}
                            </span>
                            {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className='text-red-500'>Must be 6 characters or longer</p>}
                            {errors.password?.type === 'pattern' && <p className='text-red-500'>Please use at least one lowercase,
                                one uppercase, and one special character in your password.</p>}
                        </div>


                        <button className="btn btn-primary text-white mt-4 w-full font-bold">Register</button>
                        <p>Already have an account?
                            <Link state={location.state}
                                to='/login'> <span className='text-red-500 font-bold'>Login</span>
                            </Link></p>
                    </fieldset>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;