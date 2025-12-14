import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { Swiper, SwiperSlide } from 'swiper/react';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const Mission = () => {
    const [volunteer, setVolunteer] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(`/mission.json`);
                if (!res.ok) throw new Error('Failed to load mission.json: ' + res.status);
                const data = await res.json();
                setVolunteer(data);
            } catch (err) {
                console.error('Error loading mission.json:', err);
            }
        };
        load();
    }, []);

    console.log('volunteer:', volunteer);

    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 md:gap-8 gap-6 my-15'>
            {/* Left */}
            <div className='col-span-1 text-center lg:text-left'>
                <h1 className='text-4xl font-bold text-red-700'>
                    Our Mission: Saving Lives Together
                </h1>
                <p className='mt-4 text-gray-700'>
                    At Life O+, we believe every drop of blood carries the power to save a life.
                    Our mission is to connect generous donors with those in urgent need, ensuring
                    every patient receives hope, care, and a second chance.
                </p>
                {/* ✅ Link needs `to` */}
                <Link to="/register" className='inline-block mt-4'>
                    <PrimaryButton>Join the Mission</PrimaryButton>
                </Link>
            </div>

            {/* Right */}
            {/* ✅ make this take half width on md+ and full on small */}
            <div className='col-span-1 lg:col-span-2'>
                <Swiper
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                    }}
                    slidesPerView={2}
                    spaceBetween={30}
                    loop={true}
                    navigation={true}
                    modules={[ Autoplay]}
                    className="mySwiper"
                >
                    {
                        
                            volunteer.map((v, i) => (
                                <SwiperSlide key={v.id || v._id || i}>
                                    <div className='p-5 bg-white rounded-xl flex flex-col items-center'>
                                        <img
                                            className='h-64 w-full object-cover rounded-md mb-3'
                                            src={v.image}
                                        />
                                        <h1 className='text-lg font-semibold'>{v.name}</h1>
                                        <p className='text-sm text-gray-500'>{v.job_position}</p>
                                    </div>
                                </SwiperSlide>
                            ))
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Mission;
