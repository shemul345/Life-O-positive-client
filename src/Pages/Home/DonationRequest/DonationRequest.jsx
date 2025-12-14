import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Loader from '../../../components/Loader/Loader';

const DonationRequest = () => {
    const { user } = useAuth(); // get logged-in user info
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    const selectedDistrict = watch('recipientDistrict');

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

    const onSubmit = async (data) => {
        try {
            const donationRequest = {
                requesterName: user.displayName,
                requesterEmail: user.email,
                recipientName: data.recipientName,
                recipientDistrict: data.recipientDistrict,
                recipientUpazila: data.recipientUpazila,
                hospitalName: data.hospitalName,
                fullAddress: data.fullAddress,
                bloodGroup: data.bloodGroup,
                donationDate: data.donationDate,
                donationTime: data.donationTime,
                requestMessage: data.requestMessage,
                status: 'pending'
            };

            await axiosSecure.post('/donation-requests', donationRequest);
            toast.success('Donation request created successfully!');
            reset();
        } catch (error) {
            console.error(error);
            toast.error('Failed to create donation request');
        }
    };

    if (!user) {
        return <Loader></Loader>
    }
    return (
        <div className="max-w-3xl mx-auto p-5 bg-white shadow-md rounded-md my-10">
            <h1 className="text-3xl font-bold mb-5 text-center">Create Donation Request</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Requester Name */}
                <div>
                    <label className="block mb-1 font-medium">Requester Name</label>
                    <input
                        type="text"
                        value={user.displayName || ''}
                        readOnly
                        className="input w-full"
                    />
                </div>

                {/* Requester Email */}
                <div>
                    <label className="block mb-1 font-medium">Requester Email</label>
                    <input
                        type="email"
                        value={user.email || ''}
                        readOnly
                        className="input w-full"
                    />
                </div>

                {/* Recipient Name */}
                <div>
                    <label className="block mb-1 font-medium">Recipient Name</label>
                    <input
                        type="text"
                        {...register('recipientName', { required: true })}
                        className="input w-full"
                        placeholder='Recipient name'
                    />
                    {errors.recipientName && <p className="text-red-500">Recipient name is required</p>}
                </div>

                {/* Recipient District */}
                <div>
                    <label className="block mb-1 font-medium">Recipient District</label>
                    <select
                        {...register('recipientDistrict', { required: true })}
                        className="input w-full"
                    >
                        <option value="">-- Select District --</option>
                        {districts.map(d => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                    </select>
                    {errors.recipientDistrict && <p className="text-red-500">District is required</p>}
                </div>

                {/* Recipient Upazila */}
                <div>
                    <label className="block mb-1 font-medium">Recipient Upazila</label>
                    <select
                        {...register('recipientUpazila', { required: true })}
                        className="input w-full"
                        disabled={!selectedDistrict}
                    >
                        <option value="">-- Select Upazila --</option>
                        {filteredUpazilas.map(u => (
                            <option key={u.id} value={u.id}>{u.name}</option>
                        ))}
                    </select>
                    {errors.recipientUpazila && <p className="text-red-500">Upazila is required</p>}
                </div>

                {/* Hospital Name */}
                <div>
                    <label className="block mb-1 font-medium">Hospital Name</label>
                    <input
                        type="text"
                        {...register('hospitalName', { required: true })}
                        className="input w-full"
                        placeholder="e.g., Dhaka Medical College Hospital"
                    />
                    {errors.hospitalName && <p className="text-red-500">Hospital name is required</p>}
                </div>

                {/* Full Address */}
                <div>
                    <label className="block mb-1 font-medium">Full Address</label>
                    <input
                        type="text"
                        {...register('fullAddress', { required: true })}
                        className="input w-full"
                        placeholder="e.g., Zahir Raihan Rd, Dhaka"
                    />
                    {errors.fullAddress && <p className="text-red-500">Full address is required</p>}
                </div>

                {/* Blood Group */}
                <div>
                    <label className="block mb-1 font-medium">Blood Group</label>
                    <select
                        {...register('bloodGroup', { required: true })}
                        className="input w-full"
                    >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                    {errors.bloodGroup && <p className="text-red-500">Blood group is required</p>}
                </div>

                {/* Donation Date */}
                <div>
                    <label className="block mb-1 font-medium">Donation Date</label>
                    <input
                        type="date"
                        {...register('donationDate', { required: true })}
                        className="input w-full"
                    />
                    {errors.donationDate && <p className="text-red-500">Date is required</p>}
                </div>

                {/* Donation Time */}
                <div>
                    <label className="block mb-1 font-medium">Donation Time</label>
                    <input
                        type="time"
                        {...register('donationTime', { required: true })}
                        className="input w-full"
                    />
                    {errors.donationTime && <p className="text-red-500">Time is required</p>}
                </div>

                {/* Request Message */}
                <div>
                    <label className="block mb-1 font-medium">Request Message</label>
                    <textarea
                        {...register('requestMessage', { required: true })}
                        className="input w-full h-32"
                        placeholder="Write why you need blood..."
                    />
                    {errors.requestMessage && <p className="text-red-500">Message is required</p>}
                </div>

                {/* Submit Button */}
                <div>
                    <button type="submit" className="btn btn-primary w-full text-white">
                        Request
                    </button>
                </div>

            </form>
        </div>
    );
};

export default DonationRequest;