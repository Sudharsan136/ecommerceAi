import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ACCENT = '#6366f1';

const formatCard = (v) => v.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
const formatExpiry = (v) => v.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '$1/$2').slice(0, 5);

/**
 * PaymentModal
 * Props:
 *   product  — single product object { name, price, imageUrl, ... } OR null for full cart
 *   cartItems / cartTotal — used when product is null
 *   onClose  — function to close the modal
 */
const PaymentModal = ({ product, cartItems = [], cartTotal = 0, onClose }) => {
    const navigate = useNavigate();
    const { clearCart } = useCart();

    const [tab, setTab] = useState('card');
    const [paying, setPaying] = useState(false);
    const [paid, setPaid] = useState(false);
    const [form, setForm] = useState({ name: '', card: '', expiry: '', cvv: '', upi: '' });

    // Single product OR full cart
    const isSingle = !!product;
    const displayName = isSingle ? product.name : `${cartItems.length} item(s)`;
    const displayTotal = isSingle ? parseFloat(product.price).toFixed(2) : cartTotal.toFixed(2);

    const handlePay = (e) => {
        e.preventDefault();
        setPaying(true);
        setTimeout(() => {
            setPaid(true);
            setTimeout(() => {
                if (!isSingle) clearCart();
                onClose();
                navigate('/success');
            }, 1500);
        }, 2000);
    };

    return (
        <div
            onClick={(e) => { if (e.target === e.currentTarget && !paying) onClose(); }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
        >
            <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '440px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.35)' }}>

                {/* Header */}
                <div style={{ background: ACCENT, padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', marginBottom: '2px' }}>Pay to</p>
                        <p style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 700 }}>Luxury Store</p>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', marginTop: '2px' }}>{displayName}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', marginBottom: '2px' }}>Amount</p>
                        <p style={{ color: '#fff', fontWeight: 700, fontSize: '1.3rem' }}>${displayTotal}</p>
                    </div>
                </div>

                <div style={{ padding: '28px' }}>
                    {paid ? (
                        <div style={{ textAlign: 'center', padding: '24px 0' }}>
                            <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>✅</div>
                            <p style={{ color: '#16a34a', fontWeight: 700, fontSize: '1.1rem' }}>Payment Successful!</p>
                            <p style={{ color: '#888', fontSize: '13px', marginTop: '6px' }}>Redirecting to confirmation...</p>
                        </div>
                    ) : (
                        <>
                            {/* Tabs */}
                            <div style={{ display: 'flex', borderBottom: '2px solid #f0eeea', marginBottom: '24px' }}>
                                {['card', 'upi'].map(t => (
                                    <button key={t} onClick={() => setTab(t)}
                                        style={{ flex: 1, padding: '10px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: tab === t ? 700 : 400, color: tab === t ? ACCENT : '#888', borderBottom: tab === t ? `2px solid ${ACCENT}` : '2px solid transparent', marginBottom: '-2px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
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
                                        <p style={{ marginTop: '8px', fontSize: '11px', color: '#aaa' }}>Enter any UPI ID to simulate payment</p>
                                    </div>
                                )}

                                <button type="submit" disabled={paying}
                                    style={{ width: '100%', padding: '14px', background: paying ? '#a5b4fc' : ACCENT, color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 600, cursor: paying ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    {paying
                                        ? <><span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.4)', borderTop: '2px solid #fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} /> Processing...</>
                                        : `Pay $${displayTotal}`}
                                </button>

                                <p style={{ textAlign: 'center', fontSize: '10px', color: '#ccc', marginTop: '12px' }}>🔒 256-bit SSL encrypted · Demo payment</p>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
