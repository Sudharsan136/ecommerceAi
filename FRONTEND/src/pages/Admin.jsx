import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://127.0.0.1:5000/api/products';
const emptyProduct = { name: '', description: '', price: '', imageUrl: '', category: '' };

const s = {
    page: { background: '#f8f7f5', minHeight: '100vh', padding: '80px 24px', color: '#1a1a1a' },
    label: { display: 'block', color: '#888', fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '6px' },
    input: { width: '100%', background: '#f3f2ef', border: 'none', borderBottom: '1px solid #ddd', padding: '12px 16px', fontSize: '14px', color: '#1a1a1a', outline: 'none', fontWeight: 300 },
    card: { background: '#fff', border: '1px solid #eee', padding: '32px', maxWidth: '560px', margin: '0 auto 64px', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' },
    btnPrimary: { flex: 1, padding: '16px', background: '#1a1a1a', color: '#fff', border: 'none', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '10px', cursor: 'pointer' },
    btnSecondary: { padding: '16px 24px', background: 'transparent', border: '1px solid #ccc', color: '#555', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '10px', cursor: 'pointer' },
};

const Admin = () => {
    const [product, setProduct] = useState(emptyProduct);
    const [products, setProducts] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProducts = () => {
        setLoading(true);
        axios.get(API).then(res => { setProducts(res.data); setLoading(false); }).catch(() => setLoading(false));
    };

    useEffect(() => { fetchProducts(); }, []);

    const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            editingId ? await axios.put(`${API}/${editingId}`, product) : await axios.post(API, product);
            alert(editingId ? 'Product updated!' : 'Product added!');
            setProduct(emptyProduct); setEditingId(null); fetchProducts();
        } catch (err) { 
            const msg = err.response?.data?.message || err.message || 'Action Failed';
            alert('Action Failed: ' + msg); 
        }
    };

    const handleEdit = (item) => {
        setEditingId(item._id);
        setProduct({ name: item.name, description: item.description, price: item.price, imageUrl: item.imageUrl, category: item.category });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this product?')) return;
        try { await axios.delete(`${API}/${id}`); fetchProducts(); } catch { alert('Delete failed'); }
    };

    return (
        <div style={s.page}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <p style={{ color: '#aaa', letterSpacing: '0.4em', fontSize: '9px', textTransform: 'uppercase', marginBottom: '8px' }}>Admin Dashboard</p>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', color: '#1a1a1a' }}>
                    {editingId ? 'Edit Product' : 'Add New Product'}
                </h1>
                <div style={{ margin: '12px auto 0', height: '2px', width: '50px', background: 'linear-gradient(to right, #6366f1, #a855f7)' }} />
            </div>

            {/* FORM */}
            <div style={s.card}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div>
                        <label style={s.label}>Product Name</label>
                        <input name="name" value={product.name} onChange={handleChange} style={s.input} placeholder="e.g. Silk Cashmere Scarf" required />
                    </div>
                    <div>
                        <label style={s.label}>Description</label>
                        <textarea name="description" value={product.description} onChange={handleChange}
                            rows="4" style={{ ...s.input, resize: 'none' }} placeholder="Narrative of the piece..." required />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                            <label style={s.label}>Price (USD)</label>
                            <input name="price" type="number" value={product.price} onChange={handleChange} style={s.input} placeholder="0.00" required />
                        </div>
                        <div>
                            <label style={s.label}>Category</label>
                            <input name="category" value={product.category} onChange={handleChange} style={s.input} placeholder="e.g. mobile" required />
                        </div>
                    </div>
                    <div>
                        <label style={s.label}>Image URL</label>
                        <input name="imageUrl" value={product.imageUrl} onChange={handleChange} style={s.input} placeholder="https://..." required />
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                        <button type="submit" style={s.btnPrimary}
                            onMouseEnter={e => e.target.style.background = '#333'}
                            onMouseLeave={e => e.target.style.background = '#1a1a1a'}>
                            {editingId ? 'Update Product' : 'Add Product'}
                        </button>
                        {editingId && (
                            <button type="button" onClick={() => { setProduct(emptyProduct); setEditingId(null); }} style={s.btnSecondary}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* PRODUCT LIST */}
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
                    <div>
                        <p style={{ color: '#aaa', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: '4px' }}>Inventory</p>
                        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', color: '#1a1a1a' }}>All Products</h2>
                    </div>
                    <span style={{ color: '#aaa', fontSize: '12px' }}>{products.length} items</span>
                </div>

                {loading ? (
                    <p style={{ textAlign: 'center', color: '#aaa', padding: '40px 0', letterSpacing: '0.3em', fontSize: '11px' }}>Loading...</p>
                ) : products.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#aaa', padding: '40px 0', letterSpacing: '0.3em', fontSize: '11px' }}>No products yet.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {products.map(item => (
                            <div key={item._id} style={{ display: 'flex', alignItems: 'center', gap: '20px', background: '#fff', border: '1px solid #eee', padding: '16px', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
                                <img src={item.imageUrl} alt={item.name} style={{ width: '72px', height: '72px', objectFit: 'cover', flexShrink: 0 }} />
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '0.95rem', color: '#1a1a1a', marginBottom: '4px' }}>{item.name}</h3>
                                    <p style={{ color: '#888', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>{item.category}</p>
                                    <p style={{ color: '#555', fontSize: '13px', marginTop: '4px' }}>${item.price}</p>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button onClick={() => handleEdit(item)}
                                        style={{ padding: '8px 20px', border: '1px solid #1a1a1a', background: 'transparent', color: '#1a1a1a', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer' }}
                                        onMouseEnter={e => { e.target.style.background = '#1a1a1a'; e.target.style.color = '#fff'; }}
                                        onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#1a1a1a'; }}>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(item._id)}
                                        style={{ padding: '8px 20px', border: '1px solid #ef4444', background: 'transparent', color: '#ef4444', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer' }}
                                        onMouseEnter={e => { e.target.style.background = '#ef4444'; e.target.style.color = '#fff'; }}
                                        onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#ef4444'; }}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
