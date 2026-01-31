"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { TextField } from '@/components/ui/TextField';
import { AuthCard } from '@/components/ui/AuthCard';
import { supabase } from '@/lib/supabase';
import styles from './auth.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setErrors({});

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrors({ general: error.message });
        return;
      }

      if (data.user) {
        // Redirect to products page on successful login
        router.push('/products');
        router.refresh();
      }
    } catch (err) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    }
  };

  return (
    <div className={styles.container}>
      <AuthCard title="Log In">
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {errors.general && (
            <div className={styles.errorSummary} role="alert">
              {errors.general}
            </div>
          )}

          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors({ ...errors, email: undefined });
              }
            }}
            error={errors.email}
            required
            autoComplete="email"
          />

          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) {
                setErrors({ ...errors, password: undefined });
              }
            }}
            error={errors.password}
            required
            autoComplete="current-password"
          />

          <Button type="submit" className={styles.submitButton}>
            Log In
          </Button>

          <div className={styles.linkContainer}>
            <span className={styles.linkText}>Don't have an account? </span>
            <Link href="/" className={styles.link}>
              Create an account
            </Link>
          </div>
        </form>
      </AuthCard>
    </div>
  );
}
