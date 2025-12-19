import React, { useEffect } from 'react';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import SecondaryButton from '../../../components/Buttons/SecondaryButton';
import bannerImage from '../../../assets/bannerImage.jpg';
import { MdBloodtype } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router';

const Banner = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <section className="w-full bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    <div className="lg:col-span-6 flex flex-col gap-6">
                        <div className="flex items-center gap-3" data-aos="fade-right">
                            <span className="inline-block w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shadow-sm">
                                <MdBloodtype className='text-red-600 text-3xl' />
                            </span>
                            <span className="text-sm text-red-600 font-bold uppercase tracking-widest">
                                Donate Blood | Save Lives
                            </span>
                        </div>

                        <h1
                            className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-gray-900"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            A Drop of <span className="text-red-600">Blood</span> <br />
                            Can Save a Life
                        </h1>

                        <p
                            className="text-gray-600 text-lg max-w-xl leading-relaxed"
                            data-aos="fade-up"
                            data-aos-delay="400"
                        >
                            Blood donation is a simple, safe, and powerful act of kindness. Every time you give blood, you give someone the chance to see another sunrise.
                        </p>

                        <div
                            className="flex flex-wrap gap-4 mt-2"
                            data-aos="zoom-in"
                            data-aos-delay="600"
                        >
                            <Link to="/collection-area">
                                <PrimaryButton className="flex items-center gap-2">
                                    <FaLocationDot />
                                    <span>Find Location</span>
                                </PrimaryButton>
                            </Link>

                            <div className="flex flex-wrap gap-3">
                                <Link to="/search-donor">
                                    <SecondaryButton>Search Donors</SecondaryButton>
                                </Link>
                                <Link to="/donation-request">
                                    <PrimaryButton>Donation Request</PrimaryButton>
                                </Link>
                            </div>
                        </div>

                        <div
                            className="mt-4 flex items-center gap-2 text-sm text-gray-500 font-medium"
                            data-aos="fade-in"
                            data-aos-delay="800"
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Safe & Confidential. Medical guidelines strictly followed.
                        </div>
                    </div>

                    <div
                        className="lg:col-span-6 flex justify-center lg:justify-end"
                        data-aos="fade-left"
                        data-aos-delay="300"
                    >
                        <div className="relative w-full max-w-md lg:max-w-lg group">
                            {/* Decorative element behind image */}
                            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-red-100 rounded-3xl -z-10 group-hover:top-0 group-hover:right-0 transition-all duration-500"></div>

                            <div className="relative rounded-3xl p-4 shadow-2xl bg-white border border-red-50">
                                <img
                                    className='w-full h-[450px] object-cover rounded-2xl transform hover:scale-[1.02] transition-transform duration-500'
                                    src={bannerImage}
                                    alt="Life O+ Blood Donation"
                                />

                                {/* Stats Overlay with Flip Up */}
                                <div
                                    className="mt-6 grid grid-cols-3 gap-2 text-center py-2"
                                    data-aos="flip-up"
                                    data-aos-delay="900"
                                >
                                    <div className="px-2">
                                        <div className="text-2xl font-black text-red-600">1.2k+</div>
                                        <div className="text-[10px] uppercase font-bold text-gray-400">Donations</div>
                                    </div>
                                    <div className="px-2 border-x border-gray-100">
                                        <div className="text-2xl font-black text-red-600">800+</div>
                                        <div className="text-[10px] uppercase font-bold text-gray-400">Lives Saved</div>
                                    </div>
                                    <div className="px-2">
                                        <div className="text-2xl font-black text-red-600">150+</div>
                                        <div className="text-[10px] uppercase font-bold text-gray-400">Volunteers</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Banner;