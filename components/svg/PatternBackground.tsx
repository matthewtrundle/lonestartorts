interface PatternBackgroundProps {
  className?: string;
  opacity?: number;
  variant?: 'dots' | 'grid' | 'mesh';
}

export function PatternBackground({
  className = '',
  opacity = 0.05,
  variant = 'dots'
}: PatternBackgroundProps) {
  const patterns = {
    dots: (
      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="#F15A0E" opacity={opacity} />
      </pattern>
    ),
    grid: (
      <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#B58650" strokeWidth="1" opacity={opacity} />
      </pattern>
    ),
    mesh: (
      <defs>
        <linearGradient id="mesh-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF3E7" stopOpacity={opacity * 2} />
          <stop offset="50%" stopColor="#F15A0E" stopOpacity={opacity} />
          <stop offset="100%" stopColor="#B58650" stopOpacity={opacity * 1.5} />
        </linearGradient>
      </defs>
    )
  };

  return (
    <svg className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} style={{ zIndex: 0 }}>
      {patterns[variant]}
      {variant === 'mesh' ? (
        <rect width="100%" height="100%" fill="url(#mesh-gradient)" />
      ) : (
        <rect width="100%" height="100%" fill={`url(#${variant})`} />
      )}
    </svg>
  );
}
