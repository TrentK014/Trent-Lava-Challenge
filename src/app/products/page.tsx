"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/Button';
import { ProductCard } from '@/components/ProductCard';
import { Navbar } from '@/components/Navbar';
import { FacebookIcon, InstagramIcon, TwitterIcon, LinkedInIcon, YoutubeIcon } from '@/components/icons/SocialIcons';
import { DeliveryIcon } from '@/components/icons/DeliveryIcon';
import { CustomerServiceIcon } from '@/components/icons/CustomerServiceIcon';
import { MoneyBackIcon } from '@/components/icons/MoneyBackIcon';
import { supabase } from '@/lib/supabase';
import styles from './page.module.css';

// Image URLs from Figma (for hero section)
const imgSportShoes = "https://www.figma.com/api/mcp/asset/38ad647e-70ec-48ed-9798-3da0ba344d70";
const imgEllipse1 = "https://www.figma.com/api/mcp/asset/1ae2fd96-c577-4ea8-b35a-710fe578c71d";
const imgLogo = "https://www.figma.com/api/mcp/asset/3412de14-8ccb-4107-a182-f223f8d4c688";

export default function HomePage() {
  const [shoes, setShoes] = useState<Array<{
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
    is_on_sale: boolean | null;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShoes = async () => {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('shoes')
        .select('id, name, price, image_url, rating, review_count, image_rotation_degrees, image_flip_horizontal, image_shadow, image_scale_percent, is_on_sale');

      if (fetchError) {
        console.error('Error fetching shoes:', fetchError);
        setError('Failed to load products.');
        setShoes([]);
      } else {
        setShoes(data || []);
      }

      setLoading(false);
    };

    fetchShoes();
  }, []);

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

      {/* Hero Section */}
      <section className={styles.hero} aria-label="Hero section">
        <div className={styles.heroContainer}>
          <p className={styles.heroBackgroundText}>SHOP ALL</p>
          <p className={styles.heroTextTop}>ADJUSTABLE</p>
          <p className={styles.heroTextBottom}>Soft Pad</p>
          <div className={styles.heroEllipse}>
            <div className={styles.heroEllipseInner}>
              <img
                src={imgEllipse1}
                alt=""
                className={styles.heroEllipseImage}
                aria-hidden="true"
              />
            </div>
          </div>
          <div className={styles.heroImageWrapper}>
            <img
              src={imgSportShoes}
              alt="Sport shoes"
              className={styles.heroImage}
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className={styles.productsSection} aria-label="Products">
        <div className={styles.productsContent}>
          <div className={styles.buttonGroup}>
            <Button variant="primary">NEW ARRIVALS</Button>
            <Button variant="secondary">WHAT'S TRENDING</Button>
          </div>

          {error && (
            <div className={styles.errorMessage} role="alert">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className={styles.productsGrid}>
              {shoes.map((shoe) => (
                (() => {
                  const price = Number(shoe.price);

                  return (
                <ProductCard
                  key={shoe.id}
                  image={shoe.image_url || ''}
                  imageAlt={shoe.name}
                  title={shoe.name}
                  price={price}
                  isOnSale={shoe.is_on_sale}
                  rating={shoe.rating ?? 5}
                  reviewCount={shoe.review_count ?? 0}
                  imageRotationDegrees={shoe.image_rotation_degrees}
                  imageFlipHorizontal={shoe.image_flip_horizontal}
                  imageShadow={shoe.image_shadow}
                  imageScalePercent={shoe.image_scale_percent}
                  shoeId={shoe.id}
                />
                  );
                })()
              ))}
            </div>
          )}
        </div>
        <div className={styles.divider}></div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection} aria-label="Services">
        <div className={styles.serviceItem}>
          <DeliveryIcon className={styles.serviceIcon} title="Free and Fast Delivery" />
          <div className={styles.serviceText}>
            <h3 className={styles.serviceTitle}>FREE AND FAST DELIVERY</h3>
            <p className={styles.serviceDescription}>Free delivery for all orders over $140</p>
          </div>
        </div>

        <div className={styles.serviceItem}>
          <CustomerServiceIcon className={styles.serviceIcon} title="24/7 Customer Service" />
          <div className={styles.serviceText}>
            <h3 className={styles.serviceTitle}>24/7 CUSTOMER SERVICE</h3>
            <p className={styles.serviceDescription}>Friendly 24/7 customer support</p>
          </div>
        </div>

        <div className={styles.serviceItem}>
          <MoneyBackIcon className={styles.serviceIcon} title="Money Back Guarantee" />
          <div className={styles.serviceText}>
            <h3 className={styles.serviceTitle}>MONEY BACK GUARANTEE</h3>
            <p className={styles.serviceDescription}>We return money within 30 days</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerColumn}>
            <div className={styles.footerLogo}>
              <img src={imgLogo} alt="Logo" className={styles.logoImage} />
            </div>
            <div className={styles.footerInfo}>
              <div className={styles.footerInfoItem}>
                <p className={styles.footerLabel}>Address:</p>
                <p className={styles.footerValue}>USA, California</p>
              </div>
              <div className={styles.footerInfoItem}>
                <p className={styles.footerLabel}>Contact:</p>
                <div className={styles.footerValue}>
                  <a href="tel:18001234567" className={styles.footerLink}>1800 123 4567</a>
                  <a href="mailto:javaria.y2b@gmail.com" className={styles.footerLink}>javaria.y2b@gmail.com</a>
                </div>
              </div>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink} aria-label="Facebook">
                  <FacebookIcon className={styles.socialIcon} />
                </a>
                <a href="#" className={styles.socialLink} aria-label="Instagram">
                  <InstagramIcon className={styles.socialIcon} />
                </a>
                <a href="#" className={styles.socialLink} aria-label="Twitter">
                  <TwitterIcon className={styles.socialIcon} />
                </a>
                <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                  <LinkedInIcon className={styles.socialIcon} />
                </a>
                <a href="#" className={styles.socialLink} aria-label="YouTube">
                  <YoutubeIcon className={styles.socialIcon} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footerCredits}>
          <div className={styles.footerDivider}></div>
          <p className={styles.copyright}>© 2023 Javaria. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
