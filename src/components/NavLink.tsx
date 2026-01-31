import React from 'react';
import styles from './NavLink.module.css';

interface NavLinkProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ href = '#', children, className = '' }) => {
  return (
    <a href={href} className={`${styles.link} ${className}`}>
      {children}
    </a>
  );
};
