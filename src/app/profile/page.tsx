"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { HeartIcon } from '@/components/icons/HeartIcon';
import { CartIcon } from '@/components/icons/CartIcon';
import { UserIcon } from '@/components/icons/UserIcon';
import { NavLink } from '@/components/NavLink';
import { Button } from '@/components/Button';
import { supabase } from '@/lib/supabase';
import styles from './profile.module.css';

export default function ProfilePage() {
  const router = useRouter();

  // Hardcoded for now
  const [userName, setUserName] = useState<string>('John Doe');
  const [totalSpent, setTotalSpent] = useState<number>(0);

  useEffect(() => {
    const fetchTotalSpending = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('Error fetching user:', userError);
        return;
      }

      if (!user) {
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('total_spending, full_name')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching total spending:', error);
        return;
      }

      setTotalSpent(Number(data?.total_spending ?? 0));
      if (data?.full_name) {
        setUserName(data.full_name);
      }
    };

    fetchTotalSpending();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Error logging out:', error);
        return;
      }
      
      // Redirect to login page
      router.push('/login');
      router.refresh();
    } catch (err) {
      console.error('Unexpected error during logout:', err);
    }
  };

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
            <Link href="/favorites">
              <button 
                className={`${styles.iconButton} ${styles.heartButton}`} 
                aria-label="Wishlist" 
                type="button"
              >
                <HeartIcon className={styles.headerIcon} active={false} />
              </button>
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

      {/* Profile Content */}
      <main className={styles.mainContent}>
        <div className={styles.profileContainer}>
          <h1 className={styles.pageTitle}>My Profile</h1>
          
          <div className={styles.profileCard}>
            <div className={styles.profileSection}>
              <h2 className={styles.sectionLabel}>Name</h2>
              <p className={styles.sectionValue}>{userName}</p>
            </div>
            
            <div className={styles.divider}></div>
            
            <div className={styles.profileSection}>
              <h2 className={styles.sectionLabel}>Total Spent</h2>
              <p className={styles.sectionValue}>${totalSpent.toFixed(2)}</p>
            </div>
            
            <div className={styles.divider}></div>
            
            <div className={styles.logoutSection}>
              <Button 
                variant="primary" 
                onClick={handleLogout}
                className={styles.logoutButton}
              >
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
