"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import styles from './success.module.css';

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className={styles.page}>
      <div className={styles.successContainer}>
        <div className={styles.successImage}>
          <img
            src="/uploads/MyDog.PNG"
            alt="Success"
            className={styles.dogImage}
          />
        </div>
        <h1 className={styles.successTitle}>Order Successful!</h1>
        <Button
          variant="primary"
          onClick={() => router.push('/products')}
          className={styles.shopButton}
        >
          Shop Again
        </Button>
      </div>
    </div>
  );
}
