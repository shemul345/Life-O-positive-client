import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import AOS from 'aos';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        fetch('/reviews.json')
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(err => console.error("Error loading reviews:", err));
    }, []);

    return (
        <section className="py-20 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16" data-aos="fade-down">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
                        Voices of <span className="text-red-600">Impact</span>
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                        Real stories from our heroes who help us save lives every single day.
                    </p>
                </div>

                {/* Swiper Slider */}
                <div data-aos="zoom-in">
                    <Swiper
                        loop={true}
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        spaceBetween={30}
                        slidesPerView={'3'}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        coverflowEffect={{
                            rotate: 30,
                            stretch: '50%',
                            depth: 200,
                            scale: 0.75,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        pagination={true}
                        modules={[EffectCoverflow, Pagination, Autoplay]}
                        className="mySwiper"
                    >
                        {reviews.map((comment) => (
                            <SwiperSlide key={comment.id}>
                                <div className="h-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-all duration-300">

                                    <div>
                                        {/* Quote Icon */}
                                        <div className="text-red-500 text-5xl mb-4 opacity-20 font-serif">“</div>

                                        {/* Review Text */}
                                        <p className="text-gray-600 leading-relaxed mb-6 italic min-h-[80px]">
                                            "{comment.review}"
                                        </p>
                                    </div>

                                    <div>
                                        <div className="border-t-2 border-dashed border-red-100 my-6"></div>

                                        {/* Profile Section */}
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full border-2 border-red-500 overflow-hidden p-1">
                                                <img
                                                    src={comment.user_photoURL}
                                                    alt={comment.userName}
                                                    className="w-full h-full object-cover rounded-full"
                                                />
                                            </div>

                                            <div className="overflow-hidden">
                                                <h3 className="text-gray-900 font-bold text-lg truncate">{comment.userName}</h3>
                                                <p className="text-gray-400 text-xs truncate uppercase tracking-tighter">
                                                    {comment.user_email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <style jsx>{`
                .testimonial-swiper .swiper-button-next,
                .testimonial-swiper .swiper-button-prev {
                    color: #dc2626;
                    transform: scale(0.6);
                }
                .testimonial-swiper .swiper-pagination-bullet-active {
                    background: #dc2626;
                }
            `}</style>
        </section>
    );
};

export default Testimonials;