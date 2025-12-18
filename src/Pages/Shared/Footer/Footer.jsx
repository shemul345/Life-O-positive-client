import React, { useState } from 'react';
import { MdBloodtype, MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) return;
        // Simulating API call
        setSubscribed(true);
        setEmail("");
        setTimeout(() => setSubscribed(false), 5000);
    };

    return (
        <footer className="bg-neutral-950 text-neutral-200 border-t border-neutral-800">
            <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-6">
                        <a href="/" className="inline-flex items-center gap-2 group" aria-label="LifeO+ Home">
                            <MdBloodtype className='text-red-600 text-4xl group-hover:scale-110 transition-transform duration-300' />
                            <span className="text-2xl font-bold tracking-tight text-white">
                                Life<span className="text-red-600">O</span>+
                            </span>
                        </a>
                        <p className="text-neutral-400 leading-relaxed max-w-sm">
                            LifeO+ is a dedicated platform bridging the gap between blood donors and those in urgent need. We empower communities to save lives through seamless connection and real-time coordination.
                        </p>
                        <div className="flex items-center gap-4">
                            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                                <a key={index} href="#" className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2">
                        <h3 className="text-white font-semibold uppercase tracking-wider text-xs mb-6">Platform</h3>
                        <ul className="space-y-4 text-sm">
                            {['Home', 'Search Donors', 'Donation Requests', 'Funding', 'Contact'].map((link) => (
                                <li key={link}>
                                    <a href={`/${link.toLowerCase().replace(' ', '-')}`} className="text-neutral-400 hover:text-red-500 transition-colors duration-200">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="lg:col-span-2">
                        <h3 className="text-white font-semibold uppercase tracking-wider text-xs mb-6">Resources</h3>
                        <ul className="space-y-4 text-sm">
                            {['How to Donate', 'Eligibility', 'Safety Guidelines', 'Privacy Policy', 'Terms of Use'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-neutral-400 hover:text-red-500 transition-colors duration-200">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div className="lg:col-span-4 space-y-6">
                        <h3 className="text-white font-semibold uppercase tracking-wider text-xs mb-2">Stay Updated</h3>
                        <p className="text-sm text-neutral-400">Subscribe for emergency alerts and community updates.</p>

                        <form onSubmit={handleSubscribe} className="relative">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-600 transition-colors"
                            />
                            <button type="submit" className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-md transition-colors">
                                JOIN
                            </button>
                            {subscribed && <p className="absolute -bottom-6 left-0 text-xs text-green-500">Subscription successful!</p>}
                        </form>

                        <div className="pt-4 space-y-3">
                            <div className="flex items-center gap-3 text-sm text-neutral-400">
                                <MdPhone className="text-red-600" size={20} />
                                <a href="tel:+880123456789" className="hover:text-white">+880 1234 56789</a>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-neutral-400">
                                <MdEmail className="text-red-600" size={20} />
                                <a href="mailto:help@lifeo.plus" className="hover:text-white">help@lifeo.plus</a>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-neutral-400">
                                <MdLocationOn className="text-red-600" size={20} />
                                <span>15 Health Ave, Dhaka, BD</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-neutral-500">
                    <p>© {new Date().getFullYear()} LIFEO+. SECURING THE LIFELINE OF THE NATION.</p>
                    <div className="flex gap-8">
                        <a href="/privacy" className="hover:text-white transition-colors">PRIVACY</a>
                        <a href="/terms" className="hover:text-white transition-colors">TERMS</a>
                        <a href="/site-map" className="hover:text-white transition-colors">SITEMAP</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;