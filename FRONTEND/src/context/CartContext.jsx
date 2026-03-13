import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Import useAuth to get the current user

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user } = useAuth(); // Get the currently logged-in user
    const [cartItems, setCartItems] = useState([]);

    // Optional helper to get storage key
    const getCartKey = () => (user ? `cart_${user.uid}` : 'cart_guest');

    // Whenever the user changes (login or logout), load THEIR specific cart
    useEffect(() => {
        if (!user) {
            setCartItems([]); // If nobody is logged in, clear the active cart array
            return;
        }
        const savedCart = localStorage.getItem(getCartKey());
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        } else {
            setCartItems([]); // Reset if they don't have a saved cart
        }
    }, [user]); // Re-run whenever user changes

    // Whenever cartItems change, immediately save it to THIS user's local storage key
    useEffect(() => {
        if (user) {
            localStorage.setItem(getCartKey(), JSON.stringify(cartItems));
        }
    }, [cartItems, user]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item._id === product._id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item._id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
