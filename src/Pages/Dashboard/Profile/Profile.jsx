import React, { useState, useEffect } from 'react';
import { Edit3, Save, X } from 'lucide-react';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Profile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isEditing, setIsEditing] = useState(false);

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);

    const [profileData, setProfileData] = useState({
        name: '',
        avatar: '',
        bloodGroup: '',
        district: '',
        upazila: '',
        email: '',
        createdAt: ''
    });

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

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/profile/${user.email}`)
                .then(res => setProfileData(res.data))
                .catch(err => console.error("Profile load error:", err));
        }
    }, [user?.email, axiosSecure]);

    const handleDistrictChange = (e) => {
        const districtName = e.target.value;
        setProfileData({ ...profileData, district: districtName, upazila: '' });

        const selectedDistrict = districts.find(d => d.name === districtName);
        if (selectedDistrict) {
            const list = upazilas.filter(u => String(u.district_id) === String(selectedDistrict.id));
            setFilteredUpazilas(list);
        }
    };

    const handleSave = async () => {
        try {
            // eslint-disable-next-line no-unused-vars
            const { _id, email, createdAt, ...updateDoc } = profileData;

            const res = await axiosSecure.patch(`/profile/${user.email}`, updateDoc);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Profile Updated',
                    text: 'Your information has been saved successfully!',
                    timer: 1500
                });
                setIsEditing(false);
            } else {
                setIsEditing(false);
            }
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Failed to update profile. Please try again.', 'error');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white shadow-xl rounded-2xl mt-5 border border-gray-100">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-6 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage your account information</p>
                </div>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 bg-red-500 text-white px-5 py-2.5 rounded-xl hover:bg-red-600 transition shadow-md font-semibold"
                    >
                        <Edit3 size={18} /> Edit Profile
                    </button>
                ) : (
                    <div className="flex gap-3">
                        <button onClick={handleSave} className="flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-xl hover:bg-green-600 transition font-semibold shadow-md"><Save size={18} /> Save</button>
                        <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 bg-gray-100 text-gray-600 px-5 py-2.5 rounded-xl hover:bg-gray-200 transition font-semibold"><X size={18} /> Cancel</button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Left Side: photo */}
                <div className="flex flex-col items-center border-b md:border-b-0 md:border-r pb-8 md:pb-0">
                    <div className="relative">
                        <img
                            src={profileData.avatar || 'https://via.placeholder.com/150'}
                            alt="Avatar"
                            className="w-48 h-48 rounded-full border-8 border-red-50 object-cover shadow-inner"
                        />
                        <div className="absolute bottom-2 right-4 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
                    </div>
                    <h3 className="text-xl font-bold mt-4 text-gray-800">{profileData.name}</h3>
                    <p className="text-gray-400 text-sm italic mt-1">
                        Member since: {profileData.createdAt ? new Date(profileData.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                </div>

                {/* Right Side: Inputs */}
                <div className="md:col-span-2 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="form-control">
                            <label className="label font-semibold text-gray-700">Full Name</label>
                            <input
                                disabled={!isEditing}
                                value={profileData.name}
                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                className={`input input-bordered w-full ${isEditing ? 'border-red-200 focus:border-red-500' : 'bg-gray-50'}`}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-semibold text-gray-700">Email (Read Only)</label>
                            <input disabled value={profileData.email} className="input input-bordered w-full bg-gray-100" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="form-control">
                            <label className="label font-semibold text-gray-700">Blood Group</label>
                            <select
                                disabled={!isEditing}
                                value={profileData.bloodGroup}
                                onChange={(e) => setProfileData({ ...profileData, bloodGroup: e.target.value })}
                                className="select select-bordered w-full disabled:bg-gray-50 disabled:text-gray-600"
                            >
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => <option key={group} value={group}>{group}</option>)}
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label font-semibold text-gray-700">District</label>
                            <select
                                disabled={!isEditing}
                                value={profileData.district}
                                onChange={handleDistrictChange}
                                className="select select-bordered w-full disabled:bg-gray-50"
                            >
                                <option value="">Select District</option>
                                {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label font-semibold text-gray-700">Upazila</label>
                        <select
                            disabled={!isEditing || filteredUpazilas.length === 0}
                            value={profileData.upazila}
                            onChange={(e) => setProfileData({ ...profileData, upazila: e.target.value })}
                            className="select select-bordered w-full disabled:bg-gray-50"
                        >
                            <option value="">Select Upazila</option>
                            {filteredUpazilas.length > 0 ? (
                                filteredUpazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)
                            ) : (
                                <option value={profileData.upazila}>{profileData.upazila}</option>
                            )}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;