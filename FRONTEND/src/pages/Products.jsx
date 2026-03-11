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

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addedId, setAddedId] = useState(null);
    const navigate = useNavigate();
    const { addToCart } = useCart();

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/products')
            .then(res => { setProducts(res.data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedId(product._id);
        setTimeout(() => setAddedId(null), 1500);
    };

    return (
        <div style={{ background: LIGHT.bg, minHeight: '100vh', color: LIGHT.text, padding: '80px 24px' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                <p style={{ color: LIGHT.accent, textTransform: 'uppercase', letterSpacing: '0.5em', fontSize: '10px', fontWeight: 600, marginBottom: '12px' }}>Our Store</p>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: LIGHT.text }}>All Products</h1>
                <div style={{ margin: '16px auto 0', height: '2px', width: '80px', background: `linear-gradient(to right, ${LIGHT.accent}, ${LIGHT.accentAlt})` }} />
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '80px 0' }}>
                    <div style={{ width: '36px', height: '36px', margin: '0 auto', border: `3px solid ${LIGHT.border}`, borderTop: `3px solid ${LIGHT.accent}`, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                </div>
            ) : products.length === 0 ? (
                <p style={{ textAlign: 'center', color: LIGHT.muted, padding: '80px 0', fontSize: '13px', fontStyle: 'italic' }}>No products available yet.</p>
            ) : (
                <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
                    {products.map((product) => (
                        <div key={product._id}
                            style={{
                                background: LIGHT.card, border: `1px solid ${LIGHT.border}`,
                                borderRadius: '4px', overflow: 'hidden',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                                transition: 'box-shadow 0.3s, transform 0.3s'
                            }}
                            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            {/* Image */}
                            <div style={{ overflow: 'hidden', height: '240px' }}>
                                <img src={product.imageUrl} alt={product.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }}
                                    onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                                />
                            </div>

                            {/* Info + Buttons */}
                            <div style={{ padding: '16px' }}>
                                <p style={{ color: LIGHT.accent, fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 600 }}>{product.category}</p>
                                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '0.95rem', color: LIGHT.text, margin: '6px 0 4px' }}>{product.name}</h3>
                                <p style={{ color: LIGHT.price, fontWeight: 'bold', marginBottom: '2px' }}>${product.price}</p>

                                <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                                    <button onClick={() => { addToCart(product); navigate('/cart'); }}
                                        style={{
                                            flex: 1, padding: '9px 0', background: LIGHT.text, color: '#fff',
                                            border: 'none', textTransform: 'uppercase', fontSize: '8px',
                                            letterSpacing: '0.2em', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s'
                                        }}
                                        onMouseEnter={e => e.target.style.background = LIGHT.accent}
                                        onMouseLeave={e => e.target.style.background = LIGHT.text}
                                    >
                                        Buy Now
                                    </button>
                                    <button onClick={() => handleAddToCart(product)}
                                        style={{
                                            flex: 1, padding: '9px 0',
                                            border: `1px solid ${LIGHT.text}`,
                                            color: addedId === product._id ? '#fff' : LIGHT.text,
                                            background: addedId === product._id ? LIGHT.accent : 'transparent',
                                            textTransform: 'uppercase', fontSize: '8px',
                                            letterSpacing: '0.2em', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s'
                                        }}
                                    >
                                        {addedId === product._id ? '✓ Added' : '+ Cart'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;
