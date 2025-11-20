interface WaveDividerProps {
  className?: string;
  color?: string;
  flip?: boolean;
}

export function WaveDivider({
  className = '',
  color = '#FEFDFB',
  flip = false
}: WaveDividerProps) {
  return (
    <svg
      className={`absolute ${flip ? 'top-0 rotate-180' : 'bottom-0'} left-0 w-full ${className}`}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      style={{ height: '60px' }}
    >
      <path
        fill={color}
        d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
      />
    </svg>
  );
}
