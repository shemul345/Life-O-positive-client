import React, { useEffect } from 'react';
import {
    MdSecurity,
    MdSpeed,
    MdFavorite,
    MdCheckCircle,
    MdTimeline,
    MdLocationCity,
} from 'react-icons/md';
import { Link } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutUs = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out',
        });
    }, []);

    return (
        <div className="bg-white text-neutral-900 overflow-hidden">

            {/* Hero Section */}
            <section className="relative py-24 bg-neutral-950 text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center" data-aos="zoom-out">
                    <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight">
                        Saving Lives, <span className="text-red-600">One Drop</span> <br className="hidden md:block" /> at a Time.
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="300">
                        LifeO+ is Bangladesh's most trusted digital blood bridge, connecting thousands of donors with patients in real-time.
                    </p>
                </div>
                {/* Background Glow */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-red-600/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-red-900/10 rounded-full blur-[120px]"></div>
            </section>

            {/* Our Mission & Vision */}
            <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8" data-aos="fade-right">
                    <div className="inline-block px-4 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full uppercase tracking-widest">
                        Our Purpose
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 leading-tight">The Mission to <br /> Digitize Donation</h2>
                    <p className="text-neutral-600 leading-relaxed text-lg">
                        Our mission is simple: To ensure that no life is lost due to a lack of blood. We aim to build a zero-gap ecosystem where hospitals and donors operate in perfect synchronicity.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                        <div className="p-6 border-l-4 border-red-600 bg-neutral-50 rounded-r-2xl shadow-sm" data-aos="fade-up" data-aos-delay="200">
                            <h4 className="font-bold text-xl mb-2 text-gray-800">Vision</h4>
                            <p className="text-sm text-neutral-500 leading-relaxed">To be the primary emergency blood network across South Asia by 2030.</p>
                        </div>
                        <div className="p-6 border-l-4 border-neutral-900 bg-neutral-50 rounded-r-2xl shadow-sm" data-aos="fade-up" data-aos-delay="400">
                            <h4 className="font-bold text-xl mb-2 text-gray-800">Values</h4>
                            <p className="text-sm text-neutral-500 leading-relaxed">Transparency, speed, and absolute commitment to patient privacy.</p>
                        </div>
                    </div>
                </div>
                <div className="relative group" data-aos="fade-left">
                    <div className="absolute -inset-4 bg-red-100/50 rounded-3xl -z-10 group-hover:bg-red-200/50 transition-all duration-500"></div>
                    <img
                        src="https://i.ibb.co.com/r228LvhT/vitaly-gariev-v-JHBw-F4-DW0-unsplash.jpg"
                        alt="Medical Professional"
                        className="rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition-all duration-500"
                    />
                </div>
            </section>

            {/* Key Statistics Section */}
            <section className="py-20 bg-neutral-900 text-white">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {[
                        { label: "Registered Donors", val: "50K+", aos: "fade-up", delay: "0" },
                        { label: "Successful Matches", val: "12K+", aos: "fade-up", delay: "200" },
                        { label: "Emergency Support", val: "24/7", aos: "fade-up", delay: "400" },
                        { label: "Partner Hospitals", val: "150+", aos: "fade-up", delay: "600" }
                    ].map((s, i) => (
                        <div key={i} data-aos={s.aos} data-aos-delay={s.delay}>
                            <div className={`text-5xl font-black mb-3 ${i === 1 ? 'text-red-500' : 'text-white'}`}>{s.val}</div>
                            <div className="text-xs text-neutral-400 uppercase tracking-[0.2em] font-bold">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Core Features */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16" data-aos="fade-down">
                    <h2 className="text-4xl font-black uppercase tracking-tight">Why Choose <span className="text-red-600">LifeO+</span></h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { icon: <MdSpeed />, title: "Rapid Response", desc: "Our algorithm notifies the nearest eligible donors within seconds.", delay: "0" },
                        { icon: <MdSecurity />, title: "Verified Donors", desc: "Every profile undergoes multi-step verification for safety.", delay: "200" },
                        { icon: <MdLocationCity />, title: "Location Precise", desc: "Smart geolocation helps find blood within hospital vicinity.", delay: "400" }
                    ].map((f, i) => (
                        <div key={i} data-aos="fade-up" data-aos-delay={f.delay} className="group p-10 bg-white border border-neutral-100 rounded-[2rem] hover:border-red-500 hover:shadow-2xl transition-all duration-500">
                            <div className="text-5xl text-red-600 mb-8 transform group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">{f.icon}</div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-800">{f.title}</h3>
                            <p className="text-neutral-500 leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Our Journey */}
            <section className="py-24 bg-neutral-950 text-white overflow-hidden">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl font-black mb-16 flex items-center gap-4" data-aos="fade-right">
                        <MdTimeline className="text-red-600 text-5xl" /> Our Journey
                    </h2>
                    <div className="space-y-16 border-l-2 border-neutral-800 ml-4 pl-12 relative">
                        {[
                            { year: "2021: The Genesis", desc: "Born out of personal tragedy, aiming to bridge the blood gap.", active: true },
                            { year: "2023: Massive Growth", desc: "Expanded operations to all major divisions in Bangladesh.", active: false },
                            { year: "Today: AI Integration", desc: "Implementing predictive models for blood shortage trends.", active: false }
                        ].map((j, i) => (
                            <div key={i} className="relative" data-aos="fade-left" data-aos-delay={i * 200}>
                                <div className={`absolute -left-[57px] top-1 w-6 h-6 rounded-full border-4 border-neutral-950 ${j.active ? 'bg-red-600 scale-125' : 'bg-neutral-700'}`}></div>
                                <h4 className="text-2xl font-bold text-gray-100">{j.year}</h4>
                                <p className="text-neutral-400 mt-3 text-lg leading-relaxed max-w-lg">{j.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How We Operate */}
            <section className="py-24 max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-black mb-20 uppercase tracking-tighter" data-aos="fade-down">How We Operate</h2>
                <div className="grid md:grid-cols-3 gap-12 relative">
                    {[
                        { step: "01", title: "Registration", desc: "Donors sign up with health details and blood group." },
                        { step: "02", title: "Smart Matching", desc: "Requests are matched with nearby available donors." },
                        { step: "03", title: "Life Saved", desc: "Direct connection is established for quick donation." }
                    ].map((item, idx) => (
                        <div key={idx} className="relative p-8 group" data-aos="zoom-in" data-aos-delay={idx * 200}>
                            <span className="text-[8rem] font-black text-neutral-50 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-50 group-hover:text-red-50 transition-colors">{item.step}</span>
                            <h4 className="text-2xl font-bold mb-4 mt-8">{item.title}</h4>
                            <p className="text-neutral-500 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/*Final Call to Action */}
            <section className="py-24 bg-red-600 text-white relative overflow-hidden" data-aos="fade-up">
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <MdFavorite className="text-7xl mx-auto mb-8 animate-bounce" />
                    <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready to be a Hero?</h2>
                    <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">Your blood donation can give someone a second chance at life. Join our community today.</p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link to="/register" className="px-12 py-5 bg-white text-red-600 font-black rounded-full hover:bg-neutral-900 hover:text-white transition-all duration-300 uppercase tracking-widest shadow-2xl">
                            Register as Donor
                        </Link>
                        <Link to="/funding" className="px-12 py-5 bg-transparent border-2 border-white text-white font-black rounded-full hover:bg-white hover:text-red-600 transition-all duration-300 uppercase tracking-widest">
                            Donate Funds
                        </Link>
                    </div>
                </div>
                {/* Decoration Circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            </section>
        </div>
    );
};

export default AboutUs;