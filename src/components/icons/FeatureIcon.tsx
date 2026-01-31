import React from 'react';
import { FeatureIconBase } from './FeatureIconBase';

interface FeatureIconProps {
  foreground: React.ReactNode;
  title?: string;
  className?: string;
}

export const FeatureIcon: React.FC<FeatureIconProps> = ({
  foreground,
  title,
  className = '',
}) => {
  return (
    <div className={className} style={{ position: 'relative', width: '80px', height: '80px' }}>
      <FeatureIconBase />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '40px',
          height: '40px',
        }}
        aria-hidden={!title}
        role={title ? 'img' : undefined}
        aria-label={title}
      >
        {title && <title>{title}</title>}
        {foreground}
      </div>
    </div>
  );
};
