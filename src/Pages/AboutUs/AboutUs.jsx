import React from 'react';
import {
    MdBloodtype,
    MdSecurity,
    MdGroups,
    MdSpeed,
    MdFavorite,
    MdCheckCircle,
    MdOutlineHandshake,
    MdTimeline,
    MdLocationCity,
    MdInsertChartOutlined
} from 'react-icons/md';

const AboutUs = () => {
    return (
        <div className="bg-white text-neutral-900 my-10">

            {/* 1. Hero Section */}
            <section className="relative py-20 bg-neutral-950 text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Saving Lives, <span className="text-red-600">One Drop</span> at a Time.
                    </h1>
                    <p className="text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        LifeO+ is Bangladesh's most trusted digital blood bridge, connecting thousand of donors with patients in real-time through technology and compassion.
                    </p>
                </div>
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
            </section>

            {/* 2. Our Mission & Vision */}
            <section className="py-20 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <div className="inline-block px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full uppercase tracking-widest">
                        Our Purpose
                    </div>
                    <h2 className="text-3xl font-bold">The Mission to Digitize Donation</h2>
                    <p className="text-neutral-600 leading-relaxed text-lg">
                        Our mission is simple: To ensure that no life is lost due to a lack of blood. We aim to build a zero-gap ecosystem where hospitals, donors, and volunteers operate in perfect synchronicity.
                    </p>
                    <div className="grid grid-cols-2 gap-6 pt-4">
                        <div className="p-4 border-l-4 border-red-600 bg-neutral-50">
                            <h4 className="font-bold">Vision</h4>
                            <p className="text-sm text-neutral-500">To be the primary emergency blood network across South Asia by 2030.</p>
                        </div>
                        <div className="p-4 border-l-4 border-neutral-900 bg-neutral-50">
                            <h4 className="font-bold">Values</h4>
                            <p className="text-sm text-neutral-500">Transparency, speed, and absolute commitment to patient privacy.</p>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <img
                        src="https://i.ibb.co.com/r228LvhT/vitaly-gariev-v-JHBw-F4-DW0-unsplash.jpg"
                        alt="Medical Professional"
                        className="rounded-2xl shadow-2xl"
                    />
                </div>
            </section>

            {/* 3. Key Statistics Section */}
            <section className="py-16 bg-neutral-50 border-y border-neutral-100">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-extrabold text-neutral-900">50K+</div>
                        <div className="text-sm text-neutral-500 uppercase mt-2 tracking-wide">Registered Donors</div>
                    </div>
                    <div>
                        <div className="text-4xl font-extrabold text-red-600">12K+</div>
                        <div className="text-sm text-neutral-500 uppercase mt-2 tracking-wide">Successful Matches</div>
                    </div>
                    <div>
                        <div className="text-4xl font-extrabold text-neutral-900">24/7</div>
                        <div className="text-sm text-neutral-500 uppercase mt-2 tracking-wide">Emergency Support</div>
                    </div>
                    <div>
                        <div className="text-4xl font-extrabold text-neutral-900">150+</div>
                        <div className="text-sm text-neutral-500 uppercase mt-2 tracking-wide">Partner Hospitals</div>
                    </div>
                </div>
            </section>

            {/* 4. Core Features/Methodology */}
            <section className="py-20 max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-16 uppercase tracking-tight">Why Choose <span className="text-red-600">LifeO+</span></h2>
                <div className="grid md:grid-cols-3 gap-10">
                    <div className="group p-8 border border-neutral-100 rounded-2xl hover:border-red-500 transition-all duration-300 shadow-sm">
                        <MdSpeed className="text-4xl text-red-600 mb-6" />
                        <h3 className="text-xl font-bold mb-3">Rapid Response</h3>
                        <p className="text-neutral-500 text-sm">Our algorithm notifies the nearest eligible donors within seconds of a request.</p>
                    </div>
                    <div className="group p-8 border border-neutral-100 rounded-2xl hover:border-red-500 transition-all duration-300 shadow-sm">
                        <MdSecurity className="text-4xl text-red-600 mb-6" />
                        <h3 className="text-xl font-bold mb-3">Verified Donors</h3>
                        <p className="text-neutral-500 text-sm">Every donor profile undergoes a multi-step verification to ensure medical safety.</p>
                    </div>
                    <div className="group p-8 border border-neutral-100 rounded-2xl hover:border-red-500 transition-all duration-300 shadow-sm">
                        <MdLocationCity className="text-4xl text-red-600 mb-6" />
                        <h3 className="text-xl font-bold mb-3">Location Precise</h3>
                        <p className="text-neutral-500 text-sm">Smart geolocation helps find blood within your specific hospital vicinity.</p>
                    </div>
                </div>
            </section>

            {/* 5. Our Story / Timeline */}
            <section className="py-20 bg-neutral-950 text-white">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                        <MdTimeline className="text-red-600" /> Our Journey
                    </h2>
                    <div className="space-y-12 border-l-2 border-neutral-800 pl-8 relative">
                        <div className="relative">
                            <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-red-600"></div>
                            <h4 className="text-xl font-bold">2021: The Genesis</h4>
                            <p className="text-neutral-400 mt-2 italic text-sm">LifeO+ was born out of a personal tragedy where a founder's family member couldn't find O-negative blood in time.</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-neutral-700"></div>
                            <h4 className="text-xl font-bold">2023: Crossing 10,000 Donors</h4>
                            <p className="text-neutral-400 mt-2 text-sm">We expanded our operations to all major divisions in Bangladesh.</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[41px] top-0 w-4 h-4 rounded-full bg-neutral-700"></div>
                            <h4 className="text-xl font-bold">Today: Leading the Digital Front</h4>
                            <p className="text-neutral-400 mt-2 text-sm">Implementing AI to predict blood shortage trends in local blood banks.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Medical Advisory / Trust Section */}
            <section className="py-20 max-w-7xl mx-auto px-6">
                <div className="bg-red-50 rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10">
                    <MdCheckCircle className="text-8xl text-red-600 shrink-0" />
                    <div>
                        <h2 className="text-2xl font-bold mb-4 italic text-neutral-800 underline underline-offset-4 decoration-red-600">Medical Standards First</h2>
                        <p className="text-neutral-700 max-w-2xl leading-relaxed">
                            We strictly follow WHO and Red Crescent guidelines. LifeO+ is not a blood bank; we are a facilitator. We encourage all donors to follow safe medical practices and consult doctors before donation.
                        </p>
                    </div>
                </div>
            </section>

            {/* 7. How it Works (Short) */}
            <section className="py-20 max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold mb-12 uppercase">How We Operate</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { step: "01", title: "Registration", desc: "Donors sign up with health details and blood group." },
                        { step: "02", title: "Smart Matching", desc: "Requests are matched with nearby available donors." },
                        { step: "03", title: "Life Saved", desc: "Direct connection is established for quick donation." }
                    ].map((item, idx) => (
                        <div key={idx} className="relative p-6">
                            <span className="text-6xl font-black text-neutral-100 absolute top-0 left-1/2 -translate-x-1/2 -z-10">{item.step}</span>
                            <h4 className="text-xl font-bold mt-4 mb-2">{item.title}</h4>
                            <p className="text-neutral-500 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 8. Founders / Leadership */}
            <section className="py-20 bg-neutral-50">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-12 text-center uppercase tracking-tight underline decoration-red-600 decoration-4">The Hearts Behind LifeO+</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {[
                            { name: "Dr. Ahmed Sharif", role: "Medical Advisor", img: "https://i.pravatar.cc/300?img=11" },
                            { name: "Sarah Kabir", role: "Product Strategy", img: "https://i.pravatar.cc/300?img=26" },
                            { name: "Tanvir Hossain", role: "Tech Lead", img: "https://i.pravatar.cc/300?img=12" }
                        ].map((person, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm text-center">
                                <img src={person.img} className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-red-500 p-1" alt={person.name} />
                                <h4 className="font-bold text-lg">{person.name}</h4>
                                <p className="text-red-600 text-sm font-medium">{person.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. Partnerships Section */}
            <section className="py-16 bg-white border-t border-neutral-100">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-8">Trusted by leading institutions</p>
                    <div className="flex flex-wrap justify-center gap-12 grayscale opacity-60">
                        <span className="text-2xl font-bold text-neutral-800">DHAKA MEDICAL</span>
                        <span className="text-2xl font-bold text-neutral-800">EVERCARE</span>
                        <span className="text-2xl font-bold text-neutral-800">BRAC</span>
                        <span className="text-2xl font-bold text-neutral-800">LABAID</span>
                    </div>
                </div>
            </section>

            {/* 10. Call to Action (CTA) */}
            <section className="py-24 bg-red-600 text-white text-center">
                <div className="max-w-3xl mx-auto px-6">
                    <MdFavorite className="text-6xl mx-auto mb-8 animate-pulse" />
                    <h2 className="text-4xl font-bold mb-6 italic">Ready to be a Hero?</h2>
                    <p className="text-xl mb-10 opacity-90">Your blood donation can give someone a second chance at life. Join our community of lifesavers today.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-10 py-4 bg-white text-red-600 font-bold rounded-full hover:bg-neutral-100 transition-colors uppercase tracking-wide">
                            Register as Donor
                        </button>
                        <button className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-red-600 transition-all uppercase tracking-wide">
                            Donate Funds
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutUs;