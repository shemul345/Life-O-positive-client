import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SocialLogin from '../../SocialLogin/SocialLogin';

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [show, setShow] = useState(false);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    const selectedDistrict = watch('district');

    const { registerUser, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();

    /* ---------- LOAD PHPMyAdmin JSON ---------- */
    useEffect(() => {
        fetch('/data/districts.json')
            .then(res => res.json())
            .then(json => {
                const table = json.find(item => item.type === 'table' && item.name === 'districts');
                setDistricts(table?.data || []);
            });

        fetch('/data/upazilas.json')
            .then(res => res.json())
            .then(json => {
                const table = json.find(item => item.type === 'table' && item.name === 'upazilas');
                setUpazilas(table?.data || []);
            });
    }, []);

    const filteredUpazilas = upazilas.filter(
        u => String(u.district_id) === String(selectedDistrict)
    );

    /* ---------- SUBMIT ---------- */
    const handleRegistration = async (data) => {
        try {
            const imageFile = data.photo[0];

            const formData = new FormData();
            formData.append('image', imageFile);

            const imgRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
                formData
            );

            const photoURL = imgRes.data.data.url;

            await registerUser(data.email, data.password);

            await updateUserProfile({
                displayName: data.name,
                photoURL
            });

            const userInfo = {
                name: data.name,
                email: data.email,
                photoURL,
                district: data.district,
                upazila: data.upazila
            };

            await axiosSecure.post('/users', userInfo);

            toast.success('Registration successful');
            navigate(location.state || '/');

        } catch (err) {
            console.error(err);
            toast.error('Registration failed');
        }
    };

    return (
        <div className="card bg-base-100 w-full max-w-lg shadow-2xl">
            <h1 className="text-4xl font-extrabold text-center mt-5">
                Create an Account
            </h1>

            <div className="card-body">
                <form onSubmit={handleSubmit(handleRegistration)}>

                    <input
                        className="input w-full mb-2"
                        placeholder="Name"
                        {...register('name', { required: true })}
                    />
                    {errors.name && <p className="text-red-500">Name required</p>}

                    <input
                        type="file"
                        className="file-input w-full mb-2"
                        {...register('photo', { required: true })}
                    />

                    <input
                        type="email"
                        className="input w-full mb-2"
                        placeholder="Email"
                        {...register('email', { required: true })}
                    />

                    <select
                        className="input w-full mb-2"
                        {...register('district', { required: true })}
                    >
                        <option value="">-- Select District --</option>
                        {districts.map(d => (
                            <option key={d.id} value={d.id}>
                                {d.name} - {d.bn_name}
                            </option>
                        ))}
                    </select>

                    <select
                        className="input w-full mb-2"
                        {...register('upazila', { required: true })}
                        disabled={!selectedDistrict}
                    >
                        <option value="">-- Select Upazila --</option>
                        {filteredUpazilas.map(u => (
                            <option key={u.id} value={u.id}>
                                {u.name} - {u.bn_name}
                            </option>
                        ))}
                    </select>

                    {/* Password */}
                    <div className='relative'>
                        <input
                            type={show ? 'text' : 'password'}
                            className="input w-full mb-2"
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

                    {/* Password */}
                    <div className='relative'>
                        <input
                            type={show ? 'text' : 'password'}
                            className="input w-full"
                            {...register('confirmPassword', { required: true, minLength: 6 })}
                            placeholder="Confirm Password" />
                        <span
                            onClick={() => setShow(!show)}
                            className="absolute right-6 top-3 cursor-pointer z-50 text-gray-500 text-lg">
                            {show ? <IoEyeOff /> : <FaEye />}
                        </span>
                        {errors.confirmPassword?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                        {errors.confirmPassword?.type === 'minLength' && <p className='text-red-500'>Must be 6 characters or longer</p>}
                    </div>

                    <button className="mt-5 btn btn-primary w-full text-white">
                        Register
                    </button>

                    <p className="mt-2">
                        Already have an account?
                        <Link to="/login" className="text-red-500 font-bold ml-1">
                            Login
                        </Link>
                    </p>
                </form>

                <SocialLogin />
            </div>
        </div>
    );
};

export default Register;
