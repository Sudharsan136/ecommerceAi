import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const LIGHT = {
    bg: '#f8f7f5', card: '#ffffff', text: '#1a1a1a',
    muted: '#888888', border: '#e8e5e0', accent: '#6366f1', price: '#16a34a',
};

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [paying, setPaying] = useState(false);
    const [paid, setPaid] = useState(false);
    const [tab, setTab] = useState('card'); // 'card' | 'upi'
    const [form, setForm] = useState({ name: '', card: '', expiry: '', cvv: '', upi: '' });

    const formatCard = (v) => v.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    const formatExpiry = (v) => v.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '$1/$2').slice(0, 5);

    const handlePay = (e) => {
        e.preventDefault();
        setPaying(true);
        setTimeout(() => {
            setPaid(true);
            setTimeout(() => { clearCart(); navigate('/success'); }, 1500);
        }, 2000);
    };

    if (cartItems.length === 0) {
        return (
            <div style={{ background: LIGHT.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px' }}>
                <p style={{ color: LIGHT.accent, letterSpacing: '0.5em', fontSize: '10px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '16px' }}>Review Your Selection</p>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: LIGHT.text, marginBottom: '16px' }}>Your Cart is Empty</h1>
                <p style={{ color: LIGHT.muted, marginBottom: '40px' }}>You haven't added any pieces yet.</p>
                <button onClick={() => navigate('/products')}
                    style={{ padding: '16px 48px', background: LIGHT.text, color: '#fff', border: 'none', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '11px', cursor: 'pointer' }}
                    onMouseEnter={e => e.target.style.background = LIGHT.accent}
                    onMouseLeave={e => e.target.style.background = LIGHT.text}
                >Explore Collection</button>
            </div>
        );
    }

    return (
        <div style={{ background: LIGHT.bg, minHeight: '100vh', color: LIGHT.text, padding: '80px 24px' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <p style={{ color: LIGHT.accent, letterSpacing: '0.5em', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', marginBottom: '12px' }}>Review Your Selection</p>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: LIGHT.text }}>Shopping Cart</h1>
                    <div style={{ margin: '14px auto 0', height: '2px', width: '60px', background: `linear-gradient(to right, ${LIGHT.accent}, #a855f7)` }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '40px' }}>
                    {/* Items */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {cartItems.map(item => (
                            <div key={item._id} style={{ display: 'flex', gap: '20px', padding: '20px', background: LIGHT.card, border: `1px solid ${LIGHT.border}`, boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
                                <img src={item.imageUrl} alt={item.name} style={{ width: '90px', height: '110px', objectFit: 'cover', flexShrink: 0 }} />
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', color: LIGHT.text, marginBottom: '4px' }}>{item.name}</h3>
                                            <p style={{ color: LIGHT.accent, fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.3em', fontWeight: 600 }}>{item.category}</p>
                                        </div>
                                        <button onClick={() => removeFromCart(item._id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '10px', textTransform: 'uppercase' }}>Remove</button>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <button onClick={() => updateQuantity(item._id, item.quantity - 1)} style={{ width: '28px', height: '28px', border: `1px solid ${LIGHT.border}`, background: 'transparent', color: LIGHT.text, cursor: 'pointer', fontSize: '14px' }}>−</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item._id, item.quantity + 1)} style={{ width: '28px', height: '28px', border: `1px solid ${LIGHT.border}`, background: 'transparent', color: LIGHT.text, cursor: 'pointer', fontSize: '14px' }}>+</button>
                                        </div>
                                        <p style={{ color: LIGHT.price, fontWeight: 'bold' }}>${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button onClick={clearCart} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Clear All Items</button>
                    </div>

                    {/* Summary */}
                    <div style={{ background: LIGHT.card, border: `1px solid ${LIGHT.border}`, padding: '32px', boxShadow: '0 2px 20px rgba(0,0,0,0.06)', position: 'sticky', top: '100px', alignSelf: 'start' }}>
                        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: LIGHT.text, marginBottom: '24px' }}>Order Summary</h2>
                        <div style={{ borderTop: `1px solid ${LIGHT.border}`, paddingTop: '16px', marginBottom: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: LIGHT.muted, fontSize: '13px' }}><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: LIGHT.muted, fontSize: '13px' }}><span>Shipping</span><span style={{ color: LIGHT.price, fontSize: '9px', fontWeight: 600, textTransform: 'uppercase' }}>Free</span></div>
                        </div>
                        <div style={{ borderTop: `1px solid ${LIGHT.border}`, paddingTop: '16px', marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontFamily: 'Playfair Display, serif' }}>Total</span>
                            <span style={{ fontSize: '1.4rem', color: LIGHT.price, fontWeight: 'bold' }}>${cartTotal.toFixed(2)}</span>
                        </div>
                        <button onClick={() => setShowModal(true)}
                            style={{ width: '100%', padding: '16px', background: LIGHT.accent, color: '#fff', border: 'none', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '10px', cursor: 'pointer' }}
                            onMouseEnter={e => e.target.style.background = '#4f46e5'}
                            onMouseLeave={e => e.target.style.background = LIGHT.accent}
                        >💳  Proceed to Payment</button>
                        <p style={{ marginTop: '12px', fontSize: '9px', color: LIGHT.muted, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.2em' }}>🔒 Secure Checkout</p>
                    </div>
                </div>
            </div>

            {/* ═══ PAYMENT MODAL ═══ */}
            {showModal && (
                <div onClick={e => { if (e.target === e.currentTarget && !paying) setShowModal(false); }}
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                    <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '440px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.35)' }}>

                        {/* Header */}
                        <div style={{ background: LIGHT.accent, padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>Pay to</p>
                                <p style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700 }}>Luxury Store</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>Amount</p>
                                <p style={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem' }}>${cartTotal.toFixed(2)}</p>
                            </div>
                        </div>

                        <div style={{ padding: '28px' }}>
                            {paid ? (
                                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                                    <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>✅</div>
                                    <p style={{ color: LIGHT.price, fontWeight: 700, fontSize: '1.1rem' }}>Payment Successful!</p>
                                    <p style={{ color: '#888', fontSize: '13px', marginTop: '6px' }}>Redirecting to order confirmation...</p>
                                </div>
                            ) : (
                                <>
                                    {/* Tabs */}
                                    <div style={{ display: 'flex', borderBottom: `2px solid ${LIGHT.border}`, marginBottom: '24px' }}>
                                        {['card', 'upi'].map(t => (
                                            <button key={t} onClick={() => setTab(t)}
                                                style={{ flex: 1, padding: '10px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: tab === t ? 700 : 400, color: tab === t ? LIGHT.accent : LIGHT.muted, borderBottom: tab === t ? `2px solid ${LIGHT.accent}` : '2px solid transparent', marginBottom: '-2px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                                {t === 'card' ? '💳 Card' : '📱 UPI'}
                                            </button>
                                        ))}
                                    </div>

                                    <form onSubmit={handlePay}>
                                        {tab === 'card' ? (
                                            <>
                                                <div style={{ marginBottom: '14px' }}>
                                                    <label style={{ display: 'block', fontSize: '11px', color: '#888', marginBottom: '5px', textTransform: 'uppercase' }}>Cardholder Name</label>
                                                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Smith" required
                                                        style={{ width: '100%', padding: '11px 14px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', color: '#1a1a1a', outline: 'none' }} />
                                                </div>
                                                <div style={{ marginBottom: '14px' }}>
                                                    <label style={{ display: 'block', fontSize: '11px', color: '#888', marginBottom: '5px', textTransform: 'uppercase' }}>Card Number</label>
                                                    <input value={form.card} onChange={e => setForm({ ...form, card: formatCard(e.target.value) })} placeholder="4111 1111 1111 1111" maxLength="19" required
                                                        style={{ width: '100%', padding: '11px 14px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', color: '#1a1a1a', outline: 'none', letterSpacing: '0.1em' }} />
                                                </div>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                                                    <div>
                                                        <label style={{ display: 'block', fontSize: '11px', color: '#888', marginBottom: '5px', textTransform: 'uppercase' }}>Expiry</label>
                                                        <input value={form.expiry} onChange={e => setForm({ ...form, expiry: formatExpiry(e.target.value) })} placeholder="MM/YY" maxLength="5" required
                                                            style={{ width: '100%', padding: '11px 14px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', color: '#1a1a1a', outline: 'none' }} />
                                                    </div>
                                                    <div>
                                                        <label style={{ display: 'block', fontSize: '11px', color: '#888', marginBottom: '5px', textTransform: 'uppercase' }}>CVV</label>
                                                        <input value={form.cvv} onChange={e => setForm({ ...form, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })} placeholder="123" maxLength="3" required
                                                            style={{ width: '100%', padding: '11px 14px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', color: '#1a1a1a', outline: 'none' }} />
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div style={{ marginBottom: '20px' }}>
                                                <label style={{ display: 'block', fontSize: '11px', color: '#888', marginBottom: '5px', textTransform: 'uppercase' }}>UPI ID</label>
                                                <input value={form.upi} onChange={e => setForm({ ...form, upi: e.target.value })} placeholder="yourname@upi" required
                                                    style={{ width: '100%', padding: '11px 14px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', color: '#1a1a1a', outline: 'none' }} />
                                                <p style={{ marginTop: '8px', fontSize: '11px', color: '#888' }}>Enter any UPI ID to simulate payment</p>
                                            </div>
                                        )}

                                        <button type="submit" disabled={paying}
                                            style={{ width: '100%', padding: '14px', background: paying ? '#a5b4fc' : LIGHT.accent, color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 600, cursor: paying ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                            {paying
                                                ? <><span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.4)', borderTop: '2px solid #fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} /> Processing...</>
                                                : `Pay $${cartTotal.toFixed(2)}`}
                                        </button>
                                        <p style={{ textAlign: 'center', fontSize: '10px', color: '#bbb', marginTop: '12px' }}>🔒 256-bit SSL encrypted · Demo payment</p>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
