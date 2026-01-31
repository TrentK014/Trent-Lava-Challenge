"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { TextField } from '@/components/ui/TextField';
import { AuthCard } from '@/components/ui/AuthCard';
import { supabase } from '@/lib/supabase';
import styles from './page.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; general?: string }>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: { name?: string; email?: string; password?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

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

    setErrors({}); //supabase code below

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            name: name.trim(),
          },
        },
      });

      if (error) {
        setErrors({ general: error.message });
        return;
      }

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            full_name: name.trim(),
            total_spending: 0,
          });

        if (profileError) {
          setErrors({ general: profileError.message });
          return;
        }

        // Redirect to home page on successful registration
        router.push('/products');
        router.refresh();
      }
    } catch (err) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    }
  };

  return (
    <div className={styles.container}>
      <AuthCard title="Create Account">
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {errors.general && (
            <div className={styles.errorSummary} role="alert">
              {errors.general}
            </div>
          )}

          <TextField
            id="name"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) {
                setErrors({ ...errors, name: undefined });
              }
            }}
            error={errors.name}
            required
            autoComplete="name"
          />

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
            autoComplete="new-password"
          />

          <Button type="submit" className={styles.submitButton}>
            Create Account
          </Button>

          <div className={styles.linkContainer}>
            <span className={styles.linkText}>Already have an account? </span>
            <Link href="/login" className={styles.link}>
              Log in
            </Link>
          </div>
        </form>
      </AuthCard>
    </div>
  );
}
