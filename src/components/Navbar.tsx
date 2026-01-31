"use client";

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { NavLink } from './NavLink';
import { HeartIcon } from './icons/HeartIcon';
import { CartIcon } from './icons/CartIcon';
import { UserIcon } from './icons/UserIcon';

interface NavbarProps {
  styles: Record<string, string>;
}

export const Navbar: React.FC<NavbarProps> = ({ styles }) => (
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
        <Link href="/cart" className={styles.iconButton} aria-label="Shopping cart">
          <CartIcon className={styles.headerIcon} />
        </Link>
        <Link href="/profile" className={styles.iconButton} aria-label="User account">
          <UserIcon className={styles.headerIcon} />
        </Link>
      </div>
    </div>
  </header>
);
