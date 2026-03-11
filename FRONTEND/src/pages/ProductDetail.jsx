import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error('Error fetching product', err))
            .finally(() => setLoading(false));
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f8f7f5' }}>
            <div style={{ width: '32px', height: '32px', border: '2px solid #ddd', borderTop: '2px solid #6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        </div>
    );

    if (!product) return (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '96px 24px', textAlign: 'center', minHeight: '100vh', background: '#f8f7f5' }}>
            <p style={{ color: '#888' }}>Product not found.</p>
            <button onClick={() => navigate('/products')} style={{ marginTop: '16px', background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', textDecoration: 'underline' }}>Back to Shop</button>
        </div>
    );

    return (
        <>
        <div style={{ background: '#f8f7f5', minHeight: '100vh' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '96px 24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>

                    {/* Image */}
                    <div style={{ background: '#f0eeea', aspectRatio: '3/4', overflow: 'hidden' }}>
                        <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    {/* Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '420px' }}>
                        <p style={{ color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.4em', fontSize: '10px', fontWeight: 600, marginBottom: '16px' }}>{product.category}</p>
                        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#1a1a1a', marginBottom: '16px', lineHeight: 1.2 }}>{product.name}</h1>
                        <p style={{ fontSize: '1.5rem', color: '#16a34a', fontWeight: 'bold', marginBottom: '32px' }}>${product.price}</p>

                        <div style={{ marginBottom: '40px' }}>
                            <p style={{ color: '#888', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '9px', marginBottom: '10px' }}>Description</p>
                            <p style={{ color: '#555', lineHeight: 1.8, fontWeight: 300 }}>
                                {product.description || 'Crafted with precision and fine materials, this piece embodies our commitment to timeless quality.'}
                            </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <button onClick={handleAddToCart}
                                style={{ padding: '16px', border: '1px solid #1a1a1a', background: added ? '#1a1a1a' : 'transparent', color: added ? '#fff' : '#1a1a1a', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '10px', cursor: 'pointer', transition: 'all 0.3s' }}>
                                {added ? '✓ Added to Cart' : 'Add to Cart'}
                            </button>
                            <button onClick={() => { addToCart(product); navigate('/cart'); }}
                                style={{ padding: '16px', background: '#6366f1', color: '#fff', border: 'none', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '10px', cursor: 'pointer', transition: 'background 0.3s' }}
                                onMouseEnter={e => e.target.style.background = '#4f46e5'}
                                onMouseLeave={e => e.target.style.background = '#6366f1'}>
                                Buy It Now
                            </button>
                        </div>

                        <p style={{ marginTop: '24px', color: '#aaa', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.3em', textAlign: 'center' }}>
                            🚚 Complimentary Insured Shipping & Returns
                        </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default ProductDetail;
