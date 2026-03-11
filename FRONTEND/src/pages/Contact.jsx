import React from 'react';

const Contact = () => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-24 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                <div>
                    <span className="uppercase tracking-[0.4em] text-[10px] text-zinc-400 block mb-4">Contact Us</span>
                    <h1 className="text-5xl font-serif text-zinc-900 mb-8 leading-tight">Get in Touch <br /> With Us</h1>
                    <p className="text-zinc-500 font-light leading-relaxed mb-12">
                        Our team is available for any questions, order updates, and customer support.
                    </p>

                    <div className="space-y-6">
                        <div>
                            <p className="uppercase tracking-widest text-[8px] text-zinc-400 mb-1">Email</p>
                            <p className="text-sm text-zinc-900">support@luxury-store.com</p>
                        </div>
                        <div>
                            <p className="uppercase tracking-widest text-[8px] text-zinc-400 mb-1">Office Location</p>
                            <p className="text-sm text-zinc-900">New York, USA</p>
                        </div>
                    </div>
                </div>

                <form className="bg-white p-12 border border-stone-100 shadow-sm space-y-8">
                    <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-luxury text-zinc-400">Full Name</label>
                        <input type="text" className="w-full border-b border-stone-200 py-3 focus:outline-none focus:border-zinc-900 text-sm font-light" required />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-luxury text-zinc-400">Email Address</label>
                        <input type="email" className="w-full border-b border-stone-200 py-3 focus:outline-none focus:border-zinc-900 text-sm font-light" required />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] uppercase tracking-luxury text-zinc-400">Message</label>
                        <textarea className="w-full border-b border-stone-200 py-3 focus:outline-none focus:border-zinc-900 text-sm font-light min-h-[120px] resize-none" required></textarea>
                    </div>
                    <button type="submit" className="w-full py-5 bg-zinc-900 text-stone-50 uppercase text-[10px] tracking-luxury hover:bg-zinc-800 transition-colors duration-300">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
