import React, { useRef, useState, ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'ghost' | 'outline' | 'glass';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  magnetic?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  magnetic = false,
  icon,
  iconRight,
  children,
  className = '',
  onClick,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    setPos({ x, y });
  };
  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  const sizeClasses = {
    sm: 'text-xs px-4 py-2',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-7 py-3.5'
  };

  const variantClass = {
    primary: 'btn-liquid btn-primary',
    ghost:   'btn-liquid btn-ghost',
    outline: 'btn-liquid',
    glass:   'glass-strong text-white'
  }[variant];

  const Component: any = motion.button;

  return (
    <Component
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={magnetic ? { x: pos.x, y: pos.y } : undefined}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      whileTap={{ scale: 0.97 }}
      className={`
        group relative font-medium tracking-tight select-none
        ${variantClass}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full justify-center' : ''}
        ${className}
      `}
      {...props}
    >
      <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </span>
      {icon && <span className="relative z-10 flex items-center">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {iconRight && (
        <span className="relative z-10 flex items-center transition-transform duration-300 group-hover:translate-x-1">
          {iconRight}
        </span>
      )}
    </Component>
  );
};

export default Button;