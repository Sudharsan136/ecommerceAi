import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Success = () => {
    const navigate = useNavigate();
    const { clearCart } = useCart();

    useEffect(() => { clearCart(); }, [clearCart]);

    return (
        <div style={{
            background: '#f8f7f5', minHeight: '100vh', display: 'flex',
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', padding: '24px', color: '#1a1a1a'
        }}>
            <div style={{ maxWidth: '480px' }}>
                {/* Success icon */}
                <div style={{
                    width: '80px', height: '80px', borderRadius: '50%',
                    background: '#dcfce7', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', margin: '0 auto 32px', fontSize: '2rem'
                }}>
                    ✅
                </div>

                <p style={{ color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.4em', fontSize: '10px', fontWeight: 600, marginBottom: '16px' }}>Order Confirmed</p>

                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 2.8rem)', color: '#1a1a1a', marginBottom: '20px', lineHeight: 1.2 }}>
                    Thank You for Your Purchase!
                </h1>

                <p style={{ color: '#888', fontWeight: 300, lineHeight: 1.8, marginBottom: '40px', fontSize: '15px' }}>
                    Your order has been received and is being prepared. A confirmation will be sent to your registered email address.
                </p>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button onClick={() => navigate('/products')}
                        style={{
                            padding: '14px 36px', background: '#1a1a1a', color: '#fff',
                            border: 'none', textTransform: 'uppercase', letterSpacing: '0.25em',
                            fontSize: '10px', cursor: 'pointer', transition: 'background 0.3s'
                        }}
                        onMouseEnter={e => e.target.style.background = '#6366f1'}
                        onMouseLeave={e => e.target.style.background = '#1a1a1a'}
                    >
                        Continue Shopping
                    </button>
                    <button onClick={() => navigate('/')}
                        style={{
                            padding: '14px 36px', background: 'transparent', color: '#1a1a1a',
                            border: '1px solid #ddd', textTransform: 'uppercase',
                            letterSpacing: '0.25em', fontSize: '10px', cursor: 'pointer'
                        }}
                    >
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Success;
