import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [show, setShow] = useState(false);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    const selectedDistrictId = watch('district');

    const { registerUser, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();

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
        u => String(u.district_id) === String(selectedDistrictId)
    );

    const handleRegistration = async (data) => {
        try {
            const districtObj = districts.find(d => String(d.id) === String(data.district));
            const upazilaObj = upazilas.find(u => String(u.id) === String(data.upazila));

            const districtName = districtObj ? districtObj.name : "";
            const upazilaName = upazilaObj ? upazilaObj.name : "";

        //    image upload to ImgBB
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
                displayName: data.displayName,
                photoURL
            });

            const userInfo = {
                name: data.displayName,
                email: data.email,
                avatar: photoURL,
                bloodGroup: data.bloodGroup,
                district: districtName,
                upazila: upazilaName, 
                status: 'active',
                role: 'donor'
            };

            const dbRes = await axiosSecure.post('/users', userInfo);

            if (dbRes.data.insertedId || dbRes.data.message === 'success') {
                toast.success('Registration successful');
                navigate(location.state || '/');
            }

        } catch (err) {
            console.error(err);
            toast.error(err.message || 'Registration failed');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
            <div className="card bg-base-100 w-full max-w-lg shadow-2xl">
                <h1 className="text-4xl font-extrabold text-center mt-8">Create an Account</h1>

                <div className="card-body">
                    <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">

                        {/* Name */}
                        <div>
                            <input
                                className="input input-bordered w-full"
                                placeholder="Full Name"
                                {...register('displayName', { required: "Name is required" })}
                            />
                            {errors.displayName && <p className="text-red-500 text-sm">{errors.displayName.message}</p>}
                        </div>

                        {/* Photo */}
                        <div>
                            <label className="label text-sm font-semibold">Profile Picture</label>
                            <input
                                type="file"
                                className="file-input file-input-bordered w-full"
                                {...register('photo', { required: "Photo is required" })}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                className="input input-bordered w-full"
                                placeholder="Email Address"
                                {...register('email', { required: "Email is required" })}
                            />
                        </div>

                        {/* Blood Group */}
                        <div>
                            <select
                                className="select select-bordered w-full"
                                {...register('bloodGroup', { required: "Blood group is required" })}
                            >
                                <option value="">-- Select Blood Group --</option>
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                                    <option key={group} value={group}>{group}</option>
                                ))}
                            </select>
                        </div>

                        {/* District */}
                        <div>
                            <select
                                className="select select-bordered w-full"
                                {...register('district', { required: "District is required" })}
                            >
                                <option value="">-- Select District --</option>
                                {districts.map(d => (
                                    <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Upazila */}
                        <div>
                            <select
                                className="select select-bordered w-full"
                                {...register('upazila', { required: "Upazila is required" })}
                                disabled={!selectedDistrictId}
                            >
                                <option value="">-- Select Upazila --</option>
                                {filteredUpazilas.map(u => (
                                    <option key={u.id} value={u.id}>{u.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Password */}
                        <div className='relative'>
                            <input
                                type={show ? 'text' : 'password'}
                                className="input input-bordered w-full"
                                {...register('password', { required: true, minLength: 6 })}
                                placeholder="Password" />
                            <span
                                onClick={() => setShow(!show)}
                                className="absolute right-4 top-3 cursor-pointer text-gray-500 text-xl">
                                {show ? <IoEyeOff /> : <FaEye />}
                            </span>
                            {errors.password && <p className='text-red-500 text-sm'>Min 6 characters required</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className='relative'>
                            <input
                                type={show ? 'text' : 'password'}
                                className="input input-bordered w-full"
                                {...register('confirmPassword', {
                                    required: true,
                                    validate: (value) => value === watch('password') || "Passwords do not match"
                                })}
                                placeholder="Confirm Password" />
                            {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword.message}</p>}
                        </div>

                        <button className="btn btn-error w-full text-white font-bold text-lg mt-4">
                            Register
                        </button>

                        <p className="text-center mt-4">
                            Already have an account?
                            <Link to="/login" className="text-red-600 font-bold ml-1 hover:underline">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;