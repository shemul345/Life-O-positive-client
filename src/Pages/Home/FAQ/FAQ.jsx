import React from 'react';

const FAQ = () => {
    const faqs = [
        { q: "Is blood donation safe?", a: "Absolutely. We use sterile, disposable equipment for every donor, so there's no risk of contracting diseases." },
        { q: "How long does the process take?", a: "The entire process takes about 45-60 minutes, but the actual donation only takes 8-10 minutes." },
        { q: "Can I donate if I have a tattoo?", a: "Yes, provided the tattoo was applied by a state-regulated entity using sterile needles and ink." }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12" data-aos="fade-down">
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900">Common <span className="text-red-600">Questions</span></h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="collapse collapse-plus bg-gray-50 rounded-2xl border border-gray-100"
                            data-aos="fade-up"
                            data-aos-delay={idx * 100}
                        >
                            <input type="radio" name="my-accordion-3" defaultChecked={idx === 0} />
                            <div className="collapse-title text-xl font-bold text-gray-800">
                                {faq.q}
                            </div>
                            <div className="collapse-content text-gray-600">
                                <p>{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;