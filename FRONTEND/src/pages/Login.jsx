import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
    const { user, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = async () => {
        try {
            await loginWithGoogle();
            navigate(from, { replace: true });
        } catch (err) {
            console.error("Login failed", err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 px-6">
            <div className="max-w-md w-full text-center">
                <span className="uppercase tracking-[0.4em] text-[10px] text-zinc-400 block mb-6 font-medium">Authentication</span>
                <h1 className="text-4xl font-serif text-zinc-900 mb-12">Sign In to Your Account</h1>

                <div className="p-12 border border-stone-200 bg-white shadow-sm">
                    <p className="text-sm text-zinc-500 font-light mb-10 leading-relaxed">
                        Please sign in with your Google account to access our collections and personalized services.
                    </p>

                    <button
                        onClick={handleLogin}
                        className="w-full py-4 bg-zinc-900 text-stone-50 uppercase text-[9px] tracking-luxury hover:bg-zinc-800 transition-colors duration-300 flex items-center justify-center gap-3"
                    >
                        Sign in with Google
                    </button>
                </div>

                <button
                    onClick={() => navigate('/')}
                    className="mt-8 text-zinc-400 text-[9px] uppercase tracking-widest hover:text-zinc-900 transition-colors"
                >
                    Return to Guest View
                </button>
            </div>
        </div>
    );
};

export default Login;
