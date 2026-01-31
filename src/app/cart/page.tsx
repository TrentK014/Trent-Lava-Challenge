"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { CartIcon } from '@/components/icons/CartIcon';
import { Button } from '@/components/Button';
import { supabase } from '@/lib/supabase';
import styles from './cart.module.css';

interface CartItem {
  id: string;
  quantity: number;
  shoe_id: string;
  shoes: {
    id: string;
    name: string;
    price: number;
    image_url: string | null;
  };
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('cart_items')
        .select('id, quantity, shoe_id, shoes(id, name, price, image_url)')
        .eq('user_id', user.id);

      if (fetchError) {
        setError('Failed to load cart');
        console.error('Error fetching cart:', fetchError);
      } else {
        // Transform data to match CartItem interface (shoes is a single object, not array)
        const transformedData = (data || []).map((item: any) => ({
          id: item.id,
          quantity: item.quantity,
          shoe_id: item.shoe_id,
          shoes: Array.isArray(item.shoes) ? item.shoes[0] : item.shoes,
        }));
        setCartItems(transformedData);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      const { error: updateError } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', itemId);

      if (updateError) {
        console.error('Error updating quantity:', updateError);
        setError('Failed to update quantity');
      } else {
        setCartItems(items =>
          items.map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          )
        );
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred');
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const { error: deleteError } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (deleteError) {
        console.error('Error removing item:', deleteError);
        setError('Failed to remove item');
      } else {
        setCartItems(items => items.filter(item => item.id !== itemId));
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred');
    }
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      // Calculate total
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + Number(item.shoes.price) * item.quantity,
        0
      );

      // Update user's total spending
      const { data: profile } = await supabase
        .from('profiles')
        .select('total_spending')
        .eq('id', user.id)
        .single();

      if (profile) {
        const newTotal = Number(profile.total_spending || 0) + totalAmount;
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ total_spending: newTotal })
          .eq('id', user.id);

        if (updateError) {
          console.error('Error updating total spending:', updateError);
          setError('Failed to update spending');
          setIsCheckingOut(false);
          return;
        }
      }

      // Remove all items from cart
      const { error: deleteError } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (deleteError) {
        console.error('Error clearing cart:', deleteError);
        setError('Failed to clear cart');
        setIsCheckingOut(false);
        return;
      }

      // Success - redirect to success page
      router.push('/success');
      router.refresh();
    } catch (err) {
      console.error('Checkout error:', err);
      setError('An unexpected error occurred during checkout');
      setIsCheckingOut(false);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.shoes.price) * item.quantity,
    0
  );

  const showEmptyState = !loading && cartItems.length === 0;

  return (
    <div className={styles.page}>
      {/* Announcement Bar */}
      <div className={styles.announcementBar}>
        <p className={styles.announcementText}>
          New here? Save 20% with code: YR24
        </p>
      </div>

      {/* Header */}
      <Navbar styles={styles} />

      {/* Cart Content */}
      <main className={styles.mainContent}>
        <div className={styles.cartContainer}>
          <h1 className={styles.pageTitle}>My Cart</h1>

          {error && (
            <div className={styles.errorMessage} role="alert">
              {error}
            </div>
          )}

          {!showEmptyState && !loading && (
            <div className={styles.cartLayout}>
              <div className={styles.cartItems}>
                {cartItems.map((item) => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.itemImage}>
                      <img
                        src={item.shoes.image_url || ''}
                        alt={item.shoes.name}
                      />
                    </div>
                    <div className={styles.itemDetails}>
                      <h3 className={styles.itemName}>{item.shoes.name}</h3>
                      <p className={styles.itemPrice}>${Number(item.shoes.price).toFixed(2)}</p>
                    </div>
                    <div className={styles.itemQuantity}>
                      <button
                        className={styles.quantityButton}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        type="button"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className={styles.quantityValue}>{item.quantity}</span>
                      <button
                        className={styles.quantityButton}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        type="button"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <div className={styles.itemTotal}>
                      ${(Number(item.shoes.price) * item.quantity).toFixed(2)}
                    </div>
                    <button
                      className={styles.removeButton}
                      onClick={() => removeItem(item.id)}
                      type="button"
                      aria-label="Remove item"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className={styles.cartSummary}>
                <h2 className={styles.summaryTitle}>Order Summary</h2>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <div className={styles.summaryDivider}></div>
                <div className={styles.summaryTotal}>
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <Button
                  variant="primary"
                  onClick={handleCheckout}
                  className={styles.checkoutButton}
                >
                  {isCheckingOut ? 'Processing...' : 'Checkout'}
                </Button>
              </div>
            </div>
          )}

          {showEmptyState && (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>
                <CartIcon />
              </div>
              <h2 className={styles.emptyStateTitle}>Your Cart is Empty</h2>
              <p className={styles.emptyStateText}>
                Add some shoes to your cart to get started
              </p>
              <Button
                variant="primary"
                onClick={() => router.push('/products')}
                className={styles.shopButton}
              >
                Browse Products
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
