"use client";

import React, { useState, useEffect } from 'react';
import { HeartIcon } from './icons/HeartIcon';
import { StarIcon } from './icons/StarIcon';
import { supabase } from '@/lib/supabase';
import { isShoeFavorited, toggleFavorite } from '@/lib/favorites';
import { getSaleDisplay } from '@/lib/products';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  image: string;
  imageAlt?: string;
  title: string;
  price: number;
  originalPrice?: number;
  isOnSale?: boolean | null;
  rating: number;
  reviewCount: number;
  discount?: number;
  imageRotationDegrees?: number | null;
  imageFlipHorizontal?: boolean | null;
  imageScalePercent?: number | null;
  imageShadow?: boolean | null;
  isLiked?: boolean;
  onLikeToggle?: () => void;
  shoeId: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  imageAlt = 'Product image',
  title,
  price,
  originalPrice,
  isOnSale,
  rating,
  reviewCount,
  discount,
  imageRotationDegrees,
  imageFlipHorizontal,
  imageScalePercent,
  imageShadow,
  isLiked = false,
  onLikeToggle,
  shoeId,
}) => {
  const [internalLiked, setInternalLiked] = useState(isLiked);
  const [isLoading, setIsLoading] = useState(false);
  const liked = internalLiked;
  const fullStars = Math.floor(rating);
  const saleDisplay = isOnSale !== undefined && isOnSale !== null
    ? getSaleDisplay(price, !!isOnSale)
    : { originalPrice, discount };
  const computedOriginalPrice = saleDisplay.originalPrice;
  const computedDiscount = saleDisplay.discount;

  //image rotation and flip
  const normalizedScale = imageScalePercent ?? 100;
  const imageTransform = [
    imageFlipHorizontal ? 'scaleX(-1)' : '',
    imageRotationDegrees ? `rotate(${imageRotationDegrees}deg)` : '',
    normalizedScale !== 100 ? `scale(${normalizedScale / 100})` : '',
  ]
    .filter(Boolean)
    .join(' ') || undefined;
  const imageShadowStyle = imageShadow ? { filter: 'drop-shadow(var(--shadow-product-1-drop))' } : undefined;


  // Check if shoe is favorited on mount (if user is logged in)
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const favorited = await isShoeFavorited(user.id, shoeId);
      setInternalLiked(favorited);
    };

    checkFavoriteStatus();
  }, [shoeId]);

  const handleLikeToggle = async () => {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user!.id;
    const wasLiked = internalLiked;
    setInternalLiked(!wasLiked);
    setIsLoading(true);
    const success = await toggleFavorite(userId, shoeId, wasLiked);
    
    if (success) {
      onLikeToggle?.();
    } else {
      setInternalLiked(wasLiked);
    }
    
    setIsLoading(false);
  };

  const handleAddToCart = async () => {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user!.id;

    try {
      // Check if item already exists in cart
      const { data: existingItems, error: fetchError } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('user_id', userId)
        .eq('shoe_id', shoeId);

      if (fetchError) {
        console.error('Error checking cart:', fetchError);
        return;
      }

      if (existingItems && existingItems.length > 0) {
        // Update quantity on first matching item
        const existingItem = existingItems[0];
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id);

        if (error) {
          console.error('Error updating cart:', error);
        }
      } else {
        // Insert new item
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: userId,
            shoe_id: shoeId,
            quantity: 1,
          });

        if (error) {
          console.error('Error adding to cart:', error);
        }
      }
    } catch (err) {
      console.error('Unexpected error adding to cart:', err);
    }
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        {computedDiscount && (
          <div className={styles.discountBadge}>
            -{computedDiscount}%
          </div>
        )}
        <button
          className={styles.heartButton}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={liked}
          type="button"
          onClick={handleLikeToggle}
          disabled={isLoading}
        >
          <HeartIcon className={styles.heartIcon} active={liked} />
        </button>
        <div className={styles.imageWrapper}>
          <div className={styles.imageTransform} style={{ transform: imageTransform, ...imageShadowStyle }}>
            <img
              src={image}
              alt={imageAlt}
              className={styles.productImage}
            />
          </div>
        </div>
        <div className={styles.addToCartOverlay}></div>
        <button className={styles.addToCartButton} type="button" onClick={handleAddToCart}>
          Add To Cart
        </button>
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.priceContainer}>
          {computedOriginalPrice ? (
            <>
              <span className={styles.price}>${price}</span>
              <span className={styles.originalPrice}>${computedOriginalPrice}</span>
            </>
          ) : (
            <span className={styles.priceOnly}>${price}</span>
          )}
        </div>
        <div className={styles.ratingContainer}>
          <div className={styles.stars} aria-label={`Rating: ${rating} out of 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                filled={i < fullStars}
                className={styles.star}
              />
            ))}
          </div>
          <span className={styles.reviewCount}>({reviewCount})</span>
        </div>
      </div>
    </article>
  );
};
