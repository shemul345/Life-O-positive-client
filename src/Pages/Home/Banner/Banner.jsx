import React from 'react';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import SecondaryButton from '../../../components/Buttons/SecondaryButton';
import bannerImage from '../../../assets/bannerImage.jpg';
import { MdBloodtype } from 'react-icons/md';
import { Link } from 'react-router';
import { FaLocationDot } from 'react-icons/fa6';



const Banner = () => {
    return (
        <div>
            <section className="w-full bg-white">
                <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">


                        {/* Left content */}
                        <div className="lg:col-span-6 flex flex-col gap-6">
                            <div className="flex items-center gap-3">
                                <span className="inline-block w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center">
                                    {/* small icon */}
                                    <MdBloodtype className='text-primary text-5xl' />
                                </span>
                                <span className="text-sm text-red-600 font-medium uppercase tracking-wider">Donate Blood | Save Lives</span>
                            </div>


                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-red-700">
                                A Drop of Blood Can Save a Life
                            </h1>

                            <p className="text-gray-800 text-base sm:text-lg max-w-xl">
                                Blood donation is a simple, safe, and powerful act of kindness. Every time you give blood, you give someone the
                                chance to see another sunrise. Join our community of donors — your single donation can become a lifeline for a
                                patient in need.
                            </p>


                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-2">
                                <Link to="/collection-area">
                                    <PrimaryButton ariaLabel="Find donation locations">
                                        {/* icon */}
                                        <FaLocationDot />
                                        <span>Find Location</span>
                                    </PrimaryButton>
                                </Link>


                                <div className="flex items-center gap-3">
                                    <Link to="/register">
                                        <SecondaryButton ariaLabel="Register to donate">
                                            Register to Donate
                                        </SecondaryButton>
                                    </Link>

                                    <Link to="/donation-request">
                                        <PrimaryButton ariaLabel="Check donor eligibility">
                                            Donation Request
                                        </PrimaryButton>
                                    </Link>
                                    
                                </div>
                            </div>

                            <div className="mt-4 text-sm text-gray-600">
                                <strong>Safe & Confidential.</strong> We follow all medical guidelines and keep your information private.
                            </div>
                        </div>


                        {/* Right Content */}
                        <div className="lg:col-span-6 flex justify-center lg:justify-end">
                            <div className="w-full h-5xl max-w-md lg:max-w-lg">
                                {/* card */}
                                <div className="relative rounded-3xl p-6 shadow-2xl" style={{ background: "linear-gradient(180deg,#fff8f8, #fff)" }}>

                                    <div className="flex items-center justify-center">
                                        <img className=' h-[400px] rounded-2xl' src={bannerImage} alt="" />
                                    </div>

                                    <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                                        <div>
                                            <div className="text-2xl font-bold text-red-600">1,200+</div>
                                            <div className="text-xs text-gray-500">Donations</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-red-600">800+</div>
                                            <div className="text-xs text-gray-500">Lives Helped</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-red-600">150</div>
                                            <div className="text-xs text-gray-500">Volunteers</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Banner;