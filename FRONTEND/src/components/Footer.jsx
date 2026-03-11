import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-zinc-900 text-stone-300 py-24 px-6 border-t border-zinc-800">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
                    <div className="md:col-span-1">
                        <Link to="/" className="text-xl font-serif tracking-[0.3em] uppercase text-stone-50 block mb-6">
                            LUXURY STORE
                        </Link>
                        <p className="text-sm font-light leading-relaxed max-w-xs">
                            A curation of extraordinary objects for the modern aesthete. Defining high-end fashion with clinical precision and timeless design.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs uppercase tracking-widest text-stone-100 mb-6">Collections</h4>
                        <ul className="space-y-4 text-sm font-light">
                            <li><Link to="/products" className="hover:text-stone-50 transition-colors">Spring / Summer</Link></li>
                            <li><Link to="/products" className="hover:text-stone-50 transition-colors">Essentials</Link></li>
                            <li><Link to="/products" className="hover:text-stone-50 transition-colors">Accessories</Link></li>
                            <li><Link to="/products" className="hover:text-stone-50 transition-colors">Archive</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs uppercase tracking-widest text-stone-100 mb-6">Company</h4>
                        <ul className="space-y-4 text-sm font-light">
                            <li><Link to="/contact" className="hover:text-stone-50 transition-colors">Contact Us</Link></li>
                            <li><Link to="/" className="hover:text-stone-50 transition-colors">Our Story</Link></li>
                            <li><Link to="/" className="hover:text-stone-50 transition-colors">Sustainability</Link></li>
                            <li><Link to="/" className="hover:text-stone-50 transition-colors">Bespoke Services</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs uppercase tracking-widest text-stone-100 mb-6">Follow</h4>
                        <ul className="space-y-4 text-sm font-light">
                            <li><a href="#" className="hover:text-stone-50 transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-stone-50 transition-colors">Pinterest</a></li>
                            <li><a href="#" className="hover:text-stone-50 transition-colors">Vogue Runway</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] uppercase tracking-widest">© 2026 Luxury Store. All rights reserved.</p>
                    <div className="flex gap-8 text-[10px] uppercase tracking-widest">
                        <a href="#" className="hover:text-stone-50 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-stone-50 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
