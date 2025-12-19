import React, { useEffect, useState } from 'react';
import { MdBloodtype, MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Footer = () => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) return;
        setSubscribed(true);
        setEmail("");
        setTimeout(() => setSubscribed(false), 5000);
    };

    return (
        <footer className="bg-neutral-950 text-neutral-200 border-t border-neutral-800 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-6" data-aos="fade-right">
                        <a href="/" className="inline-flex items-center gap-2 group" aria-label="LifeO+ Home">
                            <MdBloodtype className='text-red-600 text-4xl group-hover:scale-110 transition-transform duration-300' />
                            <span className="text-2xl font-bold tracking-tight text-white">
                                Life<span className="text-red-600">O</span>+
                            </span>
                        </a>
                        <p className="text-neutral-400 leading-relaxed max-w-sm text-sm md:text-base">
                            LifeO+ is a dedicated platform bridging the gap between blood donors and those in urgent need. We empower communities to save lives through seamless connection.
                        </p>
                        <div className="flex items-center gap-4">
                            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                                <a key={index} href="#" className="p-2.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300 transform hover:-translate-y-1">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2" data-aos="fade-up" data-aos-delay="200">
                        <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-l-2 border-red-600 pl-3">Platform</h3>
                        <ul className="space-y-4 text-sm">
                            {['Home', 'Search Donors', 'Donation Requests', 'Funding', 'Contact'].map((link) => (
                                <li key={link}>
                                    <a href={`/${link.toLowerCase().replace(' ', '-')}`} className="text-neutral-400 hover:text-red-500 hover:pl-2 transition-all duration-300">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="lg:col-span-2" data-aos="fade-up" data-aos-delay="400">
                        <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 border-l-2 border-red-600 pl-3">Resources</h3>
                        <ul className="space-y-4 text-sm">
                            {['How to Donate', 'Eligibility', 'Safety Guidelines', 'Privacy Policy', 'Terms of Use'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-neutral-400 hover:text-red-500 hover:pl-2 transition-all duration-300">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div className="lg:col-span-4 space-y-6" data-aos="fade-left">
                        <div>
                            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-3">Stay Updated</h3>
                            <p className="text-xs text-neutral-500 mb-4 font-medium">Subscribe for emergency alerts and updates.</p>

                            <form onSubmit={handleSubscribe} className="relative group">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/50 transition-all"
                                />
                                <button type="submit" className="absolute right-1.5 top-1.5 bottom-1.5 px-5 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-lg transition-all active:scale-95">
                                    JOIN
                                </button>
                                {subscribed && (
                                    <p className="absolute -bottom-6 left-0 text-[10px] font-bold text-green-500 uppercase tracking-tighter animate-pulse">
                                        Subscription successful!
                                    </p>
                                )}
                            </form>
                        </div>

                        <div className="pt-4 space-y-4">
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="p-2 rounded-lg bg-red-600/10 group-hover:bg-red-600 transition-colors duration-300">
                                    <MdPhone className="text-red-600 group-hover:text-white" size={18} />
                                </div>
                                <a href="tel:+880123456789" className="text-sm text-neutral-400 group-hover:text-white transition-colors font-medium">+880 1234 56789</a>
                            </div>
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="p-2 rounded-lg bg-red-600/10 group-hover:bg-red-600 transition-colors duration-300">
                                    <MdEmail className="text-red-600 group-hover:text-white" size={18} />
                                </div>
                                <a href="mailto:help@lifeo.plus" className="text-sm text-neutral-400 group-hover:text-white transition-colors font-medium">help@lifeo.plus</a>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="p-2 rounded-lg bg-red-600/10 group-hover:bg-red-600 transition-colors duration-300">
                                    <MdLocationOn className="text-red-600 group-hover:text-white" size={18} />
                                </div>
                                <span className="text-sm text-neutral-400 group-hover:text-white transition-colors font-medium">15 Health Ave, Dhaka, BD</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold tracking-[0.1em] text-neutral-600">
                    <p className="text-center md:text-left uppercase">
                        © {new Date().getFullYear()} LIFEO+. SECURING THE LIFELINE OF THE NATION.
                    </p>
                    <div className="flex gap-6 sm:gap-8">
                        {['Privacy', 'Terms', 'Sitemap'].map((item) => (
                            <a key={item} href={`/${item.toLowerCase()}`} className="hover:text-red-500 transition-colors uppercase">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;