import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaTint, FaCamera } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { toast } from 'react-toastify';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [show, setShow] = useState(false);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [loading, setLoading] = useState(false);

    const selectedDistrictId = watch('district');
    const { registerUser, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        AOS.init({ duration: 800, once: true });

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
        setLoading(true);
        try {
            const districtObj = districts.find(d => String(d.id) === String(data.district));
            const upazilaObj = upazilas.find(u => String(u.id) === String(data.upazila));
            const imageFile = data.photo[0];
            const formData = new FormData();
            formData.append('image', imageFile);

            const imgRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
                formData
            );

            const photoURL = imgRes.data.data.url;
            await registerUser(data.email, data.password);
            await updateUserProfile({ displayName: data.displayName, photoURL });

            const userInfo = {
                name: data.displayName,
                email: data.email,
                avatar: photoURL,
                bloodGroup: data.bloodGroup,
                district: districtObj?.name || "",
                upazila: upazilaObj?.name || "",
                status: 'active',
                role: 'donor'
            };

            const dbRes = await axiosSecure.post('/users', userInfo);
            if (dbRes.data.insertedId || dbRes.data.message === 'success') {
                toast.success('Registration Successful!');
                navigate(location.state || '/');
            }
        } catch (err) {
            toast.error(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white md:bg-gray-50 flex items-center justify-center py-10 px-4">
            <div
                className="w-full max-w-2xl bg-white md:shadow-2xl md:rounded-[3rem] overflow-hidden border border-gray-100"
                data-aos="fade-up"
            >
                {/* Header Section */}
                <div className="bg-red-600 p-8 text-center text-white">
                    <h1 className="text-3xl font-black uppercase tracking-tight">Create Account</h1>
                    <p className="text-red-100 text-sm mt-2 font-medium">Join Life O+ and start saving lives today</p>
                </div>

                <div className="p-6 md:p-12">
                    <form onSubmit={handleSubmit(handleRegistration)} className="space-y-5">

                        {/* Name & Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 ml-1">FULL NAME</label>
                                <div className="relative group">
                                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500" />
                                    <input
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                                        placeholder="John Doe"
                                        {...register('displayName', { required: "Name is required" })}
                                    />
                                </div>
                                {errors.displayName && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.displayName.message}</p>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 ml-1">EMAIL ADDRESS</label>
                                <div className="relative group">
                                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-500" />
                                    <input
                                        type="email"
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                                        placeholder="john@example.com"
                                        {...register('email', { required: "Email is required" })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Blood Group & Photo */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 ml-1">BLOOD GROUP</label>
                                <div className="relative">
                                    <FaTint className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 z-10" />
                                    <select
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-red-500 outline-none appearance-none cursor-pointer"
                                        {...register('bloodGroup', { required: true })}
                                    >
                                        <option value="">Select Group</option>
                                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                                            <option key={group} value={group}>{group}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 ml-1">PROFILE PHOTO</label>
                                <div className="relative">
                                    <FaCamera className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="file"
                                        className="w-full pl-11 pr-4 py-[7px] bg-gray-50 border border-gray-200 rounded-xl file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer"
                                        {...register('photo', { required: true })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* District & Upazila */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 ml-1">DISTRICT</label>
                                <select
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-red-500 outline-none cursor-pointer"
                                    {...register('district', { required: true })}
                                >
                                    <option value="">Select District</option>
                                    {districts.map(d => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 ml-1">UPAZILA</label>
                                <select
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-red-500 outline-none cursor-pointer disabled:opacity-50"
                                    {...register('upazila', { required: true })}
                                    disabled={!selectedDistrictId}
                                >
                                    <option value="">Select Upazila</option>
                                    {filteredUpazilas.map(u => (
                                        <option key={u.id} value={u.id}>{u.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Password & Confirm */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 ml-1">PASSWORD</label>
                                <div className="relative">
                                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type={show ? 'text' : 'password'}
                                        className="w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-red-500 outline-none transition-all"
                                        {...register('password', { required: true, minLength: 6 })}
                                        placeholder="••••••••" />
                                    <span onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400">
                                        {show ? <IoEyeOff /> : <FaEye />}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 ml-1">CONFIRM PASSWORD</label>
                                <div className="relative">
                                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type={show ? 'text' : 'password'}
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-red-500 outline-none transition-all"
                                        {...register('confirmPassword', {
                                            required: true,
                                            validate: (value) => value === watch('password') || "Mismatch"
                                        })}
                                        placeholder="••••••••" />
                                </div>
                            </div>
                        </div>

                        {/* Register Button */}
                        <button
                            disabled={loading}
                            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-red-200 active:scale-[0.98] transition-all duration-200 mt-4 disabled:bg-gray-400"
                        >
                            {loading ? <span className="loading loading-spinner"></span> : "SIGN UP NOW"}
                        </button>

                        <p className="text-center text-gray-500 font-medium">
                            Already have an account?
                            <Link to="/login" className="text-red-600 font-bold ml-2 hover:underline">Log In</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;