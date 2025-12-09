import React from 'react';
import { Link } from 'react-router';

const DonorPortalFeatures = () => {
    return (
        <div>
            <section className="bg-white">
                <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:py-24">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
                            Get Signed Up & Signed In
                        </h2>
                        <p className="mt-4 text-gray-600 text-base sm:text-lg">
                            Explore the features available in your portal, where you can access exciting
                            rewards and review your health history from the previous donation.
                        </p>


                        <div className="mt-8">
                            <Link to="/login">
                                <button
                                    className="inline-flex items-center px-8 py-3 rounded-full bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition"
                                >
                                    Sign In Now
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 items-start">
                        {/* Feature - Health History */}
                        <article className="flex flex-col items-center text-center px-6">
                            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-red-100 shadow-2xl">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    className="w-12 h-12 text-red-600"
                                    aria-hidden
                                >
                                    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" />
                                    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8 13l2 2 6-6" />
                                </svg>
                            </div>
                            <h3 className="mt-6 text-xl font-semibold text-gray-900">Health History</h3>
                            <p className="mt-3 text-gray-600 text-sm sm:text-base">
                                Review your latest health summary results and gain valuable insights into your
                                well-being.
                            </p>
                        </article>

                        {/* Feature - Rewards */}
                        <article className="flex flex-col items-center text-center px-6">
                            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-red-100 shadow-2xl">
                                {/* bonus icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    className="w-12 h-12 text-red-600"
                                    aria-hidden
                                >
                                    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 8v8" />
                                    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8 12h8" />
                                    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="mt-6 text-xl font-semibold text-gray-900">Rewards</h3>
                            <p className="mt-3 text-gray-600 text-sm sm:text-base">
                                Enjoy the convenience of redeeming your rewards all in one place, where you can
                                select from a variety of eGift Cards.
                            </p>
                        </article>

                        {/* Feature - My OneBlood Journey */}
                        <article className="flex flex-col items-center text-center px-6">
                            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-red-100 shadow-2xl">
                                {/* journey icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    className="w-12 h-12 text-red-600"
                                    aria-hidden
                                >
                                    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 3v4" />
                                    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 17v4" />
                                    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                    <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
                                </svg>
                            </div>
                            <h3 className="mt-6 text-xl font-semibold text-gray-900">My LifeO+ Journey</h3>
                            <p className="mt-3 text-gray-600 text-sm sm:text-base">
                                Check out your LifeO+ Journey, a program that will notify you when your
                                donation is on its way to a hospital.
                            </p>
                        </article>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DonorPortalFeatures;