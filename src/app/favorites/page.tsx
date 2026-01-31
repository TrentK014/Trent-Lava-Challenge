"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/Button';
import { Navbar } from '@/components/Navbar';
import { HeartIcon } from '@/components/icons/HeartIcon';
import { supabase } from '@/lib/supabase';
import styles from './favorites.module.css';

interface FavoriteShoe {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  rating: number | null;
  review_count: number | null;
  image_rotation_degrees: number | null;
  image_flip_horizontal: boolean | null;
  image_shadow: boolean | null;
  image_scale_percent: number | null;
}

interface FavoriteRow {
  shoes: FavoriteShoe | FavoriteShoe[] | null;
}

export default function FavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<FavoriteShoe[]>([]);

  const fetchFavorites = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setFavorites([]);
      return;
    }

    const { data, error } = await supabase
      .from('favorites')
      .select('shoes (id, name, price, image_url, rating, review_count, image_rotation_degrees, image_flip_horizontal, image_shadow, image_scale_percent)')
      .eq('user_id', user.id);

    if (error || !data) {
      console.error('Error fetching favorites:', error);
      setFavorites([]);
      return;
    }

    const rows = data as FavoriteRow[];
    const shoes = rows.flatMap((row) => {
      if (!row.shoes) return [];
      return Array.isArray(row.shoes) ? row.shoes : [row.shoes];
    });

    setFavorites(shoes);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleUnfavorite = () => {
    // Refresh favorites list when an item is unfavorited
    fetchFavorites();
  };

  const showEmptyState = favorites.length === 0;

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
                  imageRotationDegrees={shoe.image_rotation_degrees}
                  imageFlipHorizontal={shoe.image_flip_horizontal}
                  imageShadow={shoe.image_shadow}
                  imageScalePercent={shoe.image_scale_percent}
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
