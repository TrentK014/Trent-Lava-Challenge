import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
}) => {
  const variantClass = variant === 'primary' ? styles.primary : styles.secondary;
  
  return (
    <button
      type={type}
      className={`${styles.button} ${variantClass} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
