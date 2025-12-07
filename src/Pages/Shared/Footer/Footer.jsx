import React, { useState } from 'react';
import { MdBloodtype } from 'react-icons/md';

const Footer = () => {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);


    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) return;
        // replace with API call when needed
        setSubscribed(true);
        setEmail("");
    }
    return (
        <div>
            <footer className="bg-neutral-900 text-neutral-100">
                <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">


                        {/* Brand + short about */}
                        <div className="space-y-4">
                            <a href="/" className="inline-flex items-center gap-3" aria-label="LifeO+ Home">
                                <MdBloodtype className='text-primary text-5xl' />
                                <span className="text-2xl font-semibold tracking-tight">Life<span className="text-red-500">O</span><span className="text-red-500">+</span></span>
                            </a>


                            <p className="text-sm text-neutral-300">LifeO+ connects donors, volunteers and hospitals so lifesaving blood reaches those who need it quickly. Join our community and make a difference.</p>


                            <div className="flex items-center gap-3">
                                <a href="#" className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-neutral-800 hover:bg-neutral-700" aria-label="Facebook">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 4.99 3.66 9.13 8.45 9.95v-7.05H8.08v-2.9h2.37V9.69c0-2.34 1.39-3.63 3.52-3.63. 0 0 1.97 0 0 0 0 0 0 0v2.59h-1.67c-1.31 0-1.71.8-1.71 1.63v1.97h2.9l-.46 2.9h-2.44V22c4.79-.82 8.45-4.96 8.45-9.93z" /></svg>
                                </a>
                                <a href="#" className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-neutral-800 hover:bg-neutral-700" aria-label="Twitter/X">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 5.92c-.64.28-1.32.47-2.04.55.73-.44 1.28-1.14 1.54-1.98-.69.41-1.46.7-2.28.86a4.1 4.1 0 0 0-7 3.74A11.64 11.64 0 0 1 3.16 4.9a4.07 4.07 0 0 0-.55 2.06c0 1.42.72 2.67 1.83 3.4-.6-.02-1.17-.18-1.67-.45v.05c0 1.99 1.4 3.65 3.26 4.02-.34.1-.7.14-1.07.14-.26 0-.52-.02-.77-.07.52 1.6 2.02 2.76 3.8 2.8A8.24 8.24 0 0 1 2 19.5a11.62 11.62 0 0 0 6.29 1.84c7.55 0 11.68-6.25 11.68-11.66v-.53c.8-.58 1.5-1.3 2.05-2.12-.73.33-1.52.55-2.33.64z" /></svg>
                                </a>
                                <a href="#" className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-neutral-800 hover:bg-neutral-700" aria-label="Instagram">
                                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5a4.5 4.5 0 1 0 .001 9.001A4.5 4.5 0 0 0 12 8.5zM18.5 6a1.5 1.5 0 1 0 .001 3.001A1.5 1.5 0 0 0 18.5 6z" /></svg>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-sm font-semibold text-neutral-200 mb-4">Quick Links</h3>
                            <ul className="space-y-3 text-sm text-neutral-300">
                                <li><a href="/" className="hover:text-white transition">Home</a></li>
                                <li><a href="/search" className="hover:text-white transition">Search Donors</a></li>
                                <li><a href="/donation-requests" className="hover:text-white transition">Donation Requests</a></li>
                                <li><a href="/funding" className="hover:text-white transition">Funding</a></li>
                                <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
                            </ul>
                        </div>


                        {/* Resources / Support */}
                        <div>
                            <h3 className="text-sm font-semibold text-neutral-200 mb-4">Resources</h3>
                            <ul className="space-y-3 text-sm text-neutral-300">
                                <li><a href="#" className="hover:text-white transition">How to Donate</a></li>
                                <li><a href="#" className="hover:text-white transition">Eligibility</a></li>
                                <li><a href="#" className="hover:text-white transition">Safety Guidelines</a></li>
                                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition">Terms of Use</a></li>
                            </ul>
                        </div>

                        {/* Contact & Newsletter */}
                        <div>
                            <h3 className="text-sm font-semibold text-neutral-200 mb-4">Get in touch</h3>
                            <p className="text-sm text-neutral-300">Have a question or need urgent help? Reach our support team.</p>


                            <ul className="mt-4 space-y-3 text-sm text-neutral-300">
                                <li className="flex items-start gap-3"><svg className="w-5 h-5 text-red-500 mt-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5a2 2 0 0 1 2-2h3.28a2 2 0 0 1 1.87 1.31l.94 2.65A2 2 0 0 0 12.1 9l2.5.83a2 2 0 0 0 1.6-.2L20 8.1A2 2 0 0 1 22 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5z" /></svg><span>Phone: <a href="tel:+880123456789" className="text-neutral-100 hover:underline">+880 1234 56789</a></span></li>
                                <li className="flex items-start gap-3"><svg className="w-5 h-5 text-red-500 mt-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 8V7l-3 2-2-1-6 6-2 3 3-2 6-6 1-2 2 1 3-2z" /></svg><span>Email: <a href="mailto:help@lifeo.plus" className="text-neutral-100 hover:underline">help@lifeo.plus</a></span></li>
                                <li className="flex items-start gap-3"><svg className="w-5 h-5 text-red-500 mt-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" /></svg><span>Address: 15 Health Ave, Dhaka</span></li>
                            </ul>


                            <form className="mt-6" onSubmit={handleSubscribe} aria-label="Subscribe to newsletter">
                                <label htmlFor="newsletter" className="sr-only">Subscribe to newsletter</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        id="newsletter"
                                        type="email"
                                        placeholder="Your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 rounded-md bg-neutral-800 placeholder-neutral-400 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                    <button type="submit" className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-medium">Subscribe</button>
                                </div>
                                {subscribed && <p className="mt-2 text-sm text-green-400">Thanks for subscribing!</p>}
                            </form>
                        </div>
                    </div>

                    {/* Footer bottom */}
                    <div className="mt-10 border-t border-neutral-800 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <p className="text-sm text-neutral-400">© {new Date().getFullYear()} LifeO+. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <a href="/privacy" className="text-sm text-neutral-400 hover:text-white">Privacy</a>
                            <a href="/terms" className="text-sm text-neutral-400 hover:text-white">Terms</a>
                            <a href="/site-map" className="text-sm text-neutral-400 hover:text-white">Sitemap</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;