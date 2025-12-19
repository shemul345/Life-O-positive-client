import React, { useEffect } from 'react';
import helpWay from '../../../assets/helpWay.jpg'
import { MdBloodtype, MdOutlineInsertDriveFile, MdOutlineVolunteerActivism } from 'react-icons/md';
import { RiTeamLine } from 'react-icons/ri';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HelpWay = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
        });
    }, []);

    const items = [
        {
            title: 'Give blood',
            desc: "When you give blood with Life O+, you save lives in your community and beyond.",
            icon: <MdBloodtype className='text-white text-2xl sm:text-3xl' />,
            color: 'bg-red-600',
            ring: 'ring-red-100',
            aos: 'fade-left'
        },
        {
            title: 'Host a blood drive',
            desc: "Save even more lives by hosting a blood drive and inviting other people to donate blood.",
            icon: <MdOutlineInsertDriveFile className='text-white text-2xl sm:text-3xl' />,
            color: 'bg-orange-500',
            ring: 'ring-orange-100',
            aos: 'fade-left'
        },
        {
            title: 'Volunteer',
            desc: "You can support hospital patients by providing assistance in various areas of our mission.",
            icon: <MdOutlineVolunteerActivism className='text-white text-2xl sm:text-3xl' />,
            color: 'bg-emerald-500',
            ring: 'ring-emerald-100',
            aos: 'fade-left'
        },
        {
            title: 'Join our team',
            desc: "Discover how rewarding it is to make an impact by becoming part of the Life O+ team.",
            icon: <RiTeamLine className='text-white text-2xl sm:text-3xl' />,
            color: 'bg-blue-600',
            ring: 'ring-blue-100',
            aos: 'fade-left'
        },
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24 overflow-hidden">
            {/* Section Title */}
            <div className="text-center mb-16" data-aos="fade-down">
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
                    Ways You Can <span className="text-red-600">Help</span>
                </h2>
                <div className="w-24 h-1.5 bg-red-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16">

                {/* Left Side */}
                <div className="lg:col-span-5 relative flex justify-center" data-aos="zoom-in-right">
                    {/* Background Decorative Circle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full bg-red-50/50 -z-10 animate-pulse hidden lg:block" />

                    <div className="relative group">
                        {/* Shadow Effect */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-red-100 to-purple-100 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition duration-1000"></div>

                        <img
                            src={helpWay}
                            alt="Helping hands"
                            className="relative z-10 w-full max-w-sm lg:max-w-md h-[400px] lg:h-[550px] rounded-2xl object-cover shadow-2xl border-4 border-white transform transition-transform duration-500 hover:scale-[1.02]"
                        />
                    </div>
                </div>

                {/* Right Side */}
                <div className="lg:col-span-7">
                    <div className="space-y-8">
                        {items.map((it, idx) => (
                            <div
                                key={idx}
                                className="flex items-start gap-5 group"
                                data-aos={it.aos}
                                data-aos-delay={idx * 150}
                            >
                                {/* Icon container with dynamic colors */}
                                <div className="flex-shrink-0">
                                    <div className={`${it.color} ${it.ring} rounded-2xl p-4 shadow-lg ring-4 flex items-center justify-center transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110`}>
                                        {it.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="pt-1">
                                    <h3 className="text-xl lg:text-2xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-red-600">
                                        {it.title}
                                    </h3>
                                    <p className="mt-2 text-base lg:text-lg text-slate-500 leading-relaxed max-w-2xl">
                                        {it.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HelpWay;