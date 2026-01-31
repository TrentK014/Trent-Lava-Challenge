"use client";

import React from 'react';
import styles from './TextField.module.css';

interface TextFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  autoComplete?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  autoComplete,
}) => {
  const hasError = !!error;

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${hasError ? styles.inputError : ''}`}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
        required={required}
        autoComplete={autoComplete}
      />
      {hasError && (
        <span id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
