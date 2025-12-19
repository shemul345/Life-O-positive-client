import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router';

const DonorPortalFeatures = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <section className="bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:py-24">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto" data-aos="fade-down">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                        Get Signed Up & <span className="text-red-600">Signed In</span>
                    </h2>
                    <p className="mt-6 text-gray-600 text-base sm:text-lg leading-relaxed">
                        Explore the features available in your portal, where you can access exciting
                        rewards and review your health history from your previous donations.
                    </p>

                    <div className="mt-10" data-aos="zoom-in" data-aos-delay="200">
                        <Link to="/login">
                            <button
                                className="inline-flex items-center px-10 py-4 rounded-full bg-red-600 text-white font-bold text-lg shadow-lg shadow-red-200 hover:bg-red-700 hover:shadow-red-300 transform hover:-translate-y-1 transition-all duration-300"
                            >
                                Sign In Now
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3 items-stretch">

                    {/* Health history */}
                    <article
                        className="group flex flex-col items-center text-center p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-red-100"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-white shadow-xl group-hover:bg-red-600 transition-colors duration-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                className="w-10 h-10 text-red-600 group-hover:text-white transition-colors duration-500"
                            >
                                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" />
                                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8 13l2 2 6-6" />
                            </svg>
                        </div>
                        <h3 className="mt-8 text-2xl font-bold text-gray-900">Health History</h3>
                        <p className="mt-4 text-gray-500 text-sm sm:text-base leading-relaxed">
                            Review your latest health summary results and gain valuable insights into your
                            well-being after every donation.
                        </p>
                    </article>

                    {/* Rewards */}
                    <article
                        className="group flex flex-col items-center text-center p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-red-100"
                        data-aos="fade-up"
                        data-aos-delay="500"
                    >
                        <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-white shadow-xl group-hover:bg-red-600 transition-colors duration-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                className="w-10 h-10 text-red-600 group-hover:text-white transition-colors duration-500"
                            >
                                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 8v8" />
                                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8 12h8" />
                                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="mt-8 text-2xl font-bold text-gray-900">Exclusive Rewards</h3>
                        <p className="mt-4 text-gray-500 text-sm sm:text-base leading-relaxed">
                            Enjoy the convenience of redeeming your points for a variety of eGift Cards and exclusive donor perks.
                        </p>
                    </article>

                    {/* Journey */}
                    <article
                        className="group flex flex-col items-center text-center p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-red-100"
                        data-aos="fade-up"
                        data-aos-delay="700"
                    >
                        <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-white shadow-xl group-hover:bg-red-600 transition-colors duration-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                className="w-10 h-10 text-red-600 group-hover:text-white transition-colors duration-500"
                            >
                                <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 3v4M12 17v4M5 12h14" />
                                <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
                            </svg>
                        </div>
                        <h3 className="mt-8 text-2xl font-bold text-gray-900">My LifeO+ Journey</h3>
                        <p className="mt-4 text-gray-500 text-sm sm:text-base leading-relaxed">
                            Track your impact! Get notified exactly when your blood donation is delivered to a hospital to save a life.
                        </p>
                    </article>

                </div>
            </div>
        </section>
    );
};

export default DonorPortalFeatures;