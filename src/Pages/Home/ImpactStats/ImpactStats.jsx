import React from 'react';
import { FaHeartbeat, FaHospital, FaUsers, FaAward } from 'react-icons/fa';

const ImpactStats = () => {
    const stats = [
        { id: 1, icon: <FaHeartbeat />, count: '25k+', label: 'Blood Donated', aos: 'fade-up', delay: '0' },
        { id: 2, icon: <FaHospital />, count: '120+', label: 'Hospitals Partnered', aos: 'fade-up', delay: '200' },
        { id: 3, icon: <FaUsers />, count: '15k+', label: 'Happy Donors', aos: 'fade-up', delay: '400' },
        { id: 4, icon: <FaAward />, count: '50+', label: 'Awards Won', aos: 'fade-up', delay: '600' },
    ];

    return (
        <section className="bg-red-600 py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-white text-center">
                    {stats.map((stat) => (
                        <div key={stat.id} data-aos={stat.aos} data-aos-delay={stat.delay}>
                            <div className="text-4xl lg:text-5xl mb-4 flex justify-center opacity-80">
                                {stat.icon}
                            </div>
                            <h3 className="text-3xl lg:text-4xl font-black">{stat.count}</h3>
                            <p className="text-red-100 font-medium mt-1 uppercase text-sm tracking-widest">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpactStats;