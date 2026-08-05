import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'strong' | 'soft' | 'glow';
  className?: string;
  onClick?: () => void;
  tilt?: boolean;
  glow?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  onClick,
  tilt = false,
  glow = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTransform(`perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`);
  };
  const handleMouseLeave = () => setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)');

  const variantClass = {
    default: 'glass',
    strong:  'glass-strong',
    soft:    'glass-soft',
    glow:    'glass-strong shadow-glow'
  }[variant];

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: tilt ? 'transform 0.2s ease-out' : undefined }}
      whileHover={onClick ? { y: -4 } : undefined}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`
        relative ${variantClass}
        ${onClick ? 'cursor-pointer' : ''}
        ${glow ? 'shadow-glow' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default Card;