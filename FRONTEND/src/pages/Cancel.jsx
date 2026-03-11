import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cancel = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-stone-50 px-6 text-center">
            <div className="max-w-md">
                <span className="uppercase tracking-[0.4em] text-[10px] text-zinc-400 block mb-6 font-medium">Transaction Cancelled</span>
                <h1 className="text-4xl md:text-5xl font-serif text-zinc-900 mb-8">Payment Not Completed</h1>
                <p className="text-zinc-500 font-light leading-relaxed mb-12">
                    The transaction was not finalized. No charges were made. If you encountered an issue, our support team is available to assist you.
                </p>
                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/cart')}
                        className="w-full px-12 py-5 bg-zinc-900 text-stone-50 uppercase text-[10px] tracking-widest hover:bg-zinc-800 transition-colors duration-300"
                    >
                        Return to Cart
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full luxury-link py-2"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cancel;
