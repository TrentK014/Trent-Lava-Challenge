"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { HeartIcon } from '@/components/icons/HeartIcon';
import { CartIcon } from '@/components/icons/CartIcon';
import { UserIcon } from '@/components/icons/UserIcon';
import { NavLink } from '@/components/NavLink';
import { supabase } from '@/lib/supabase';
import styles from './favorites.module.css';

interface FavoriteShoe {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  rating: number | null;
  review_count: number | null;
}

interface FavoriteRow {
  shoes: FavoriteShoe | FavoriteShoe[] | null;
}

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<FavoriteShoe[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchFavorites = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setFavorites([]);
      setHasLoaded(true);
      return;
    }

    const { data, error } = await supabase
      .from('favorites')
      .select('shoes (id, name, price, image_url, rating, review_count)')
      .eq('user_id', user.id);

    if (error || !data) {
      console.error('Error fetching favorites:', error);
      setFavorites([]);
      setHasLoaded(true);
      return;
    }

    const rows = data as FavoriteRow[];
    const shoes = rows.flatMap((row) => {
      if (!row.shoes) return [];
      return Array.isArray(row.shoes) ? row.shoes : [row.shoes];
    });

    setFavorites(shoes);
    setHasLoaded(true);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleUnfavorite = () => {
    // Refresh favorites list when an item is unfavorited
    fetchFavorites();
  };

  const showEmptyState = hasLoaded && favorites.length === 0;

  return (
    <div className={styles.page}>
      {/* Announcement Bar */}
      <div className={styles.announcementBar}>
        <p className={styles.announcementText}>
          New here? Save 20% with code: YR24
        </p>
      </div>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <Link href="/products">
              <Logo />
            </Link>
            <nav className={styles.nav} aria-label="Main navigation">
              <NavLink href="/products">Women</NavLink>
              <NavLink href="/products">Men</NavLink>
              <NavLink href="/products">Kids</NavLink>
              <NavLink href="/products">Classic</NavLink>
              <NavLink href="/products">Sport</NavLink>
              <NavLink href="/products">Sale</NavLink>
            </nav>
          </div>
          <div className={styles.headerRight}>
            <Link
              href="/favorites"
              className={`${styles.iconButton} ${styles.heartButton}`}
              aria-label="Wishlist"
            >
              <HeartIcon className={styles.headerIcon} active={false} />
            </Link>
            <Link href="/cart">
              <button className={styles.iconButton} aria-label="Shopping cart" type="button">
                <CartIcon className={styles.headerIcon} />
              </button>
            </Link>
            <Link href="/profile">
              <button className={styles.iconButton} aria-label="User account" type="button">
                <UserIcon className={styles.headerIcon} />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Favorites Content */}
      <main className={styles.mainContent}>
        <div className={styles.favoritesContainer}>
          <div className={styles.titleSection}>
            <h1 className={styles.pageTitle}>My Favorites</h1>
            <p className={styles.itemCount}>{favorites.length} items</p>
          </div>

          {!showEmptyState && (
            <div className={styles.productsGrid}>
              {favorites.map((shoe) => (
                <ProductCard
                  key={shoe.id}
                  image={shoe.image_url ?? ''}
                  imageAlt={shoe.name}
                  title={shoe.name}
                  price={Number(shoe.price)}
                  rating={shoe.rating ?? 5}
                  reviewCount={shoe.review_count ?? 0}
                  isLiked={true}
                  shoeId={shoe.id}
                  onLikeToggle={handleUnfavorite}
                />
              ))}
            </div>
          )}

          {/* Empty state (hidden when there are items) */}
          {showEmptyState && (
            <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>
              <HeartIcon active={false} />
            </div>
            <h2 className={styles.emptyStateTitle}>No Favorites Yet</h2>
            <p className={styles.emptyStateText}>
              Start adding items to your favorites to see them here
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
