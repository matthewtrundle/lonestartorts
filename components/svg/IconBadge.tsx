import { ReactNode } from 'react';

interface IconBadgeProps {
  children: ReactNode;
  variant?: 'hexagon' | 'shield' | 'circle' | 'square';
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export function IconBadge({
  children,
  variant = 'hexagon',
  size = 'md',
  color = '#FEF3E7',
  className = ''
}: IconBadgeProps) {
  const sizes = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const shapes = {
    hexagon: 'M24 4L44 14V34L24 44L4 34V14L24 4Z',
    shield: 'M24 4L40 12V28C40 36 32 42 24 44C16 42 8 36 8 28V12L24 4Z',
    circle: 'M24 4A20 20 0 1 1 24 44A20 20 0 1 1 24 4Z',
    square: 'M8 8H40V40H8V8Z'
  };

  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 48 48">
        <path d={shapes[variant]} fill={color} />
        <path
          d={shapes[variant]}
          fill="none"
          stroke="#F15A0E"
          strokeWidth="1"
          opacity="0.2"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
