import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const linkStyle = {
        color: '#555',
        textTransform: 'uppercase',
        letterSpacing: '0.25em',
        fontSize: '10px',
        textDecoration: 'none',
        transition: 'color 0.2s',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        fontWeight: 500,
    };

    const hoverOn = (e) => { e.target.style.color = '#6366f1'; };
    const hoverOff = (e) => { e.target.style.color = '#555'; };

    return (
        <nav style={{
            position: 'sticky', top: 0, zIndex: 50, width: '100%',
            background: 'rgba(248,247,245,0.92)', backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #e8e5e0',
            boxShadow: '0 1px 12px rgba(0,0,0,0.06)'
        }}>
            {/* Top accent line */}
            <div style={{ height: '2px', background: 'linear-gradient(to right, #6366f1, #a855f7, #6366f1)' }} />

            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                {/* Left links */}
                <div style={{ display: 'flex', gap: '32px', flex: 1 }}>
                    <Link to="/" style={linkStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>Collection</Link>
                    <Link to="/products" style={linkStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>Shop All</Link>
                </div>

                {/* Brand */}
                <Link to="/" style={{
                    fontFamily: 'Playfair Display, serif', fontSize: '1.3rem',
                    letterSpacing: '0.3em', textTransform: 'uppercase', textDecoration: 'none',
                    color: '#1a1a1a', transition: 'color 0.3s', flex: 'none'
                }}>
                    LUXURY STORE
                </Link>

                {/* Right links */}
                <div style={{ display: 'flex', gap: '28px', flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Link to="/contact" style={linkStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>Contact</Link>

                    <Link to="/cart" style={{ ...linkStyle, position: 'relative' }} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                        Cart
                        {cartCount > 0 && (
                            <span style={{
                                position: 'absolute', top: '-8px', right: '-16px',
                                background: '#6366f1', color: '#fff', fontSize: '8px',
                                width: '16px', height: '16px', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 'bold'
                            }}>
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {user && user.isAdmin && (
                        <Link to="/admin" style={{ ...linkStyle, color: '#a855f7', fontWeight: 600 }}>
                            Admin Panel
                        </Link>
                    )}

                    {user ? (
                        <button onClick={handleLogout} style={{ ...linkStyle, cursor: 'pointer' }} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                            Sign Out
                        </button>
                    ) : (
                        <Link to="/login" style={linkStyle} onMouseEnter={hoverOn} onMouseLeave={hoverOff}>Sign In</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
