import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const LIGHT = {
    bg: '#f8f7f5',
    card: '#ffffff',
    text: '#1a1a1a',
    muted: '#888888',
    border: '#e8e5e0',
    accent: '#6366f1',
    accentAlt: '#a855f7',
    price: '#16a34a',
};

const Home = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addedId, setAddedId] = useState(null);

        axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products`)
            .then(res => { setFeatured(res.data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const handleAddToCart = (item) => {
        addToCart(item);
        setAddedId(item._id);
        setTimeout(() => setAddedId(null), 1500);
    };

    return (
        <div style={{ background: LIGHT.bg, minHeight: '100vh', color: LIGHT.text }}>

            {/* HERO */}
            <section style={{ position: 'relative', height: '88vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img
                    src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2600"
                    alt="Hero"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(248,247,245,0.3) 0%, rgba(248,247,245,0.7) 100%)' }} />

                <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '700px', padding: '0 24px' }}>
                    <p style={{ letterSpacing: '0.5em', fontSize: '10px', color: LIGHT.accent, textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600 }}>
                        High-End Fashion &amp; Accessories
                    </p>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontFamily: 'Playfair Display, serif', lineHeight: 1.1, marginBottom: '40px', color: LIGHT.text }}>
                        Exclusive <br /> Summer Collection
                    </h1>
                    <button
                        onClick={() => navigate('/products')}
                        style={{
                            padding: '16px 48px', background: LIGHT.text,
                            color: '#fff', border: 'none',
                            textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '11px',
                            cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                        }}
                        onMouseEnter={e => { e.target.style.background = LIGHT.accent; }}
                        onMouseLeave={e => { e.target.style.background = LIGHT.text; }}
                    >
                        Shop Now
                    </button>
                </div>
            </section>

            {/* COLLECTION SECTION */}
            <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px' }}>
                    <div>
                        <p style={{ color: LIGHT.accent, textTransform: 'uppercase', letterSpacing: '0.4em', fontSize: '9px', fontWeight: 600 }}>Featured</p>
                        <h2 style={{ fontSize: '2rem', fontFamily: 'Playfair Display, serif', marginTop: '8px', color: LIGHT.text }}>Our Collection</h2>
                    </div>
                    <button onClick={() => navigate('/products')}
                        style={{ color: LIGHT.accent, textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '10px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                        View All →
                    </button>
                </div>

                {/* Divider */}
                <div style={{ height: '2px', background: `linear-gradient(to right, ${LIGHT.accent}, ${LIGHT.accentAlt}, transparent)`, marginBottom: '48px' }} />

                {loading ? (
                    <p style={{ textAlign: 'center', color: LIGHT.muted, letterSpacing: '0.3em', padding: '80px 0', fontSize: '12px', textTransform: 'uppercase' }}>Loading collection...</p>
                ) : featured.length === 0 ? (
                    <p style={{ textAlign: 'center', color: LIGHT.muted, letterSpacing: '0.3em', padding: '80px 0', fontSize: '12px', textTransform: 'uppercase' }}>No products yet — add from Admin panel</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '28px' }}>
                        {featured.map((item) => (
                            <div key={item._id} style={{
                                background: LIGHT.card, border: `1px solid ${LIGHT.border}`,
                                borderRadius: '4px', overflow: 'hidden',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                                transition: 'box-shadow 0.3s, transform 0.3s'
                            }}
                                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                {/* Image */}
                                <div style={{ overflow: 'hidden', height: '280px' }}>
                                    <img src={item.imageUrl} alt={item.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }}
                                        onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                                        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                                    />
                                </div>

                                {/* Info & Buttons */}
                                <div style={{ padding: '20px' }}>
                                    <p style={{ color: LIGHT.accent, fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 600 }}>{item.category}</p>
                                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', color: LIGHT.text, margin: '6px 0 4px' }}>{item.name}</h3>
                                    <p style={{ color: LIGHT.price, fontWeight: 'bold', fontSize: '1.1rem' }}>${item.price}</p>

                                    <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                                        <button onClick={() => { addToCart(item); navigate('/cart'); }}
                                            style={{
                                                flex: 1, padding: '10px 0', background: LIGHT.text, color: '#fff',
                                                border: 'none', textTransform: 'uppercase', fontSize: '9px',
                                                letterSpacing: '0.2em', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s'
                                            }}
                                            onMouseEnter={e => e.target.style.background = LIGHT.accent}
                                            onMouseLeave={e => e.target.style.background = LIGHT.text}
                                        >
                                            Buy Now
                                        </button>
                                        <button onClick={() => handleAddToCart(item)}
                                            style={{
                                                flex: 1, padding: '10px 0',
                                                border: `1px solid ${LIGHT.text}`,
                                                color: addedId === item._id ? '#fff' : LIGHT.text,
                                                background: addedId === item._id ? LIGHT.accent : 'transparent',
                                                textTransform: 'uppercase', fontSize: '9px',
                                                letterSpacing: '0.2em', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s'
                                            }}
                                        >
                                            {addedId === item._id ? '✓ Added' : 'Add to Cart'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
