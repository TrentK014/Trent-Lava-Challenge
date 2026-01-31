import React from 'react';
import styles from './Logo.module.css';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`${styles.logo} ${className}`}>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Logo">
        <path fillRule="evenodd" clipRule="evenodd" d="M15 0H0L15 15H0L15 30H30L15 15H30L15 0Z" fill="#181818"/>
      </svg>
    </div>
  );
};
