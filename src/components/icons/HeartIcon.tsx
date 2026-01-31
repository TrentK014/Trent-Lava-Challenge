import React from 'react';

interface HeartIconProps {
  className?: string;
  active?: boolean;
  title?: string;
}

export const HeartIcon: React.FC<HeartIconProps> = ({ className = '', active = false, title }) => {
  return (
    <svg
      className={className}
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={!title}
      aria-label={title}
    >
      {active ? (
        // Active/Selected state (node 1-370): filled with #FF4747, no stroke
        <path
          d="M21 8.5C21 6.015 18.901 4 16.312 4C14.377 4 12.715 5.126 12 6.733C11.285 5.126 9.623 4 7.687 4C5.1 4 3 6.015 3 8.5C3 15.72 12 20.5 12 20.5C12 20.5 21 15.72 21 8.5Z"
          fill="#FF4747"
        />
      ) : (
        // Default/Unselected state (node 1-368): stroke only, no fill
        <path
          d="M21 8.5C21 6.015 18.901 4 16.312 4C14.377 4 12.715 5.126 12 6.733C11.285 5.126 9.623 4 7.687 4C5.1 4 3 6.015 3 8.5C3 15.72 12 20.5 12 20.5C12 20.5 21 15.72 21 8.5Z"
          stroke="#181818"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
};
