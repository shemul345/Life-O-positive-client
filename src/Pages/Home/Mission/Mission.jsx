import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import AOS from 'aos';
import 'swiper/css';
import 'swiper/css/pagination';
import 'aos/dist/aos.css';
import { Link } from 'react-router';

const Mission = () => {
    const [volunteer, setVolunteer] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });

        const load = async () => {
            try {
                const res = await fetch(`/mission.json`);
                if (!res.ok) throw new Error('Failed to load mission.json');
                const data = await res.json();
                setVolunteer(data);
            } catch (err) {
                console.error('Error loading mission.json:', err);
            }
        };
        load();
    }, []);

    return (
        <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24 overflow-hidden">
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>

                {/* Left Content */}
                <div className='lg:col-span-4 text-center lg:text-left' data-aos="fade-right">
                    <div className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest text-red-600 uppercase bg-red-50 rounded-full">
                        Our Values
                    </div>
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight'>
                        Our Mission: <br />
                        <span className="text-red-700">Saving Lives Together</span>
                    </h2>
                    <p className='mt-6 text-gray-600 text-lg leading-relaxed'>
                        At Life O+, we believe every drop of blood carries the power to save a life.
                        Our mission is to connect generous donors with those in urgent need, ensuring
                        every patient receives hope and care.
                    </p>
                    <Link to="/register" className='inline-block mt-8'>
                        <PrimaryButton className="shadow-lg shadow-red-100">Join the Mission</PrimaryButton>
                    </Link>
                </div>

                {/* Right Content */}
                <div className='lg:col-span-8 w-full' data-aos="fade-left" data-aos-delay="200">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            320: { slidesPerView: 1, spaceBetween: 20 },
                            640: { slidesPerView: 2, spaceBetween: 20 },
                            1024: { slidesPerView: 3, spaceBetween: 30 },
                        }}
                        loop={volunteer.length > 3}
                        className="pb-12"
                    >
                        {volunteer.map((v, i) => (
                            <SwiperSlide key={v.id || v._id || i}>
                                <div className='group bg-white p-4 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500'>
                                    <div className="overflow-hidden rounded-2xl">
                                        <img
                                            className='h-72 w-full object-cover transform group-hover:scale-110 transition-transform duration-700'
                                            src={v.image}
                                            alt={v.name}
                                        />
                                    </div>
                                    <div className="mt-5 text-center">
                                        <h3 className='text-xl font-bold text-gray-800 group-hover:text-red-600 transition-colors'>
                                            {v.name}
                                        </h3>
                                        <p className='text-sm font-medium text-gray-400 mt-1 uppercase tracking-tighter'>
                                            {v.job_position}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Mission;