import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const CheckIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const XIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const StarIcon: React.FC<IconProps> = ({ className = '', size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export const BulletIcon: React.FC<IconProps> = ({ className = '', size = 8 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export const TacoIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.8 2.6 6.5.3.3.8.3 1.1 0l.5-.5c.3-.3.3-.8 0-1.1C4.8 15.5 4 13.8 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8c0 1.8-.8 3.5-2.2 4.9-.3.3-.3.8 0 1.1l.5.5c.3.3.8.3 1.1 0C21 16.8 22 14.5 22 12c0-5.5-4.5-10-10-10zm0 4c-3.3 0-6 2.7-6 6 0 1.4.5 2.7 1.3 3.7l1.4-1.4C8.3 13.6 8 12.8 8 12c0-2.2 1.8-4 4-4s4 1.8 4 4c0 .8-.3 1.6-.7 2.3l1.4 1.4c.8-1 1.3-2.3 1.3-3.7 0-3.3-2.7-6-6-6z" />
  </svg>
);

export const ChefIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
    <line x1="6" y1="17" x2="18" y2="17" />
  </svg>
);

export const BurritoIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M20 4c-1.1 0-2 .9-2 2v2h-2V6c0-2.2-1.8-4-4-4S8 3.8 8 6v2H6V6c0-1.1-.9-2-2-2s-2 .9-2 2v12c0 2.2 1.8 4 4 4h12c2.2 0 4-1.8 4-4V6c0-1.1-.9-2-2-2zM6 18c-1.1 0-2-.9-2-2V10h16v6c0 1.1-.9 2-2 2H6zm12-10H6V6c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v2z" />
  </svg>
);

export const CheeseIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M22 10L12 2 2 10v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V10zM8 18c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm2-4c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm4 2c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm2-4c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
  </svg>
);

export const FlameIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M13.5 0C10.4 0 8 2.4 8 5.5c0 1.7.8 3.2 2 4.2-.5-.9-.8-2-.8-3.2 0-2.2 1.1-4.2 3-5.3-.3 1.1-.4 2.2-.4 3.3 0 4.7 3.8 8.5 8.5 8.5.5 0 .9 0 1.4-.1C20.2 17.7 17 21 13 21c-4.4 0-8-3.6-8-8 0-2.2.9-4.2 2.4-5.7.2 1 .6 1.9 1.2 2.7 0 0 0-.1 0-.2-.1-.5-.2-1-.2-1.5 0-2.1 1.1-4 2.8-5-.3.7-.4 1.5-.4 2.3 0 1.8.9 3.5 2.3 4.5-.1-.3-.1-.7-.1-1 0-1.8 1-3.5 2.5-4.3-.2.6-.3 1.2-.3 1.8 0 2.5 2 4.5 4.5 4.5.3 0 .5 0 .8-.1-1.5 2.8-4.5 4.6-7.8 4.6-5 0-9-4-9-9 0-3.9 2.5-7.3 6-8.5z" />
  </svg>
);

export const PepperIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2c-1.1 0-2 .9-2 2v1.5c-2.5.3-4.5 2.3-4.8 4.8-.5 4 1.5 7.7 5 9.5.8.4 1.7.7 2.6.9.3.1.6.2.9.2h.6c.3 0 .6-.1.9-.2.9-.2 1.8-.5 2.6-.9 3.5-1.8 5.5-5.5 5-9.5-.3-2.5-2.3-4.5-4.8-4.8V4c0-1.1-.9-2-2-2zM8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4zm4-6c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const SparkleIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 0l1.5 5.5L19 7l-5.5 1.5L12 14l-1.5-5.5L5 7l5.5-1.5L12 0z" />
    <path d="M19 14l.8 3.2L23 18l-3.2.8L19 22l-.8-3.2L15 18l3.2-.8L19 14z" />
    <path d="M5 14l.8 3.2L9 18l-3.2.8L5 22l-.8-3.2L1 18l3.2-.8L5 14z" />
  </svg>
);

export const PanIcon: React.FC<IconProps> = ({ className = '', size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="8" />
    <path d="M20 12h4" />
    <path d="M4 12c0-4.4 3.6-8 8-8" />
  </svg>
);
