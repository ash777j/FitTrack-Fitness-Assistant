import React, { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  neonColor?: 'blue' | 'green';
  fullWidth?: boolean;
  isAnimated?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  neonColor = 'blue',
  fullWidth = false,
  isAnimated = false,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'font-medium rounded-md transition-all duration-300 focus:outline-none';
  
  const variantClasses = {
    primary: neonColor === 'blue' 
      ? 'bg-neon-blue text-background-primary hover:shadow-neon-blue' 
      : 'bg-neon-green text-background-primary hover:shadow-neon-green',
    secondary: 'bg-background-tertiary text-text-primary border border-metallic-dark hover:border-neon-blue',
    outline: neonColor === 'blue'
      ? 'bg-transparent border border-neon-blue text-neon-blue hover:bg-neon-blue/10'
      : 'bg-transparent border border-neon-green text-neon-green hover:bg-neon-green/10'
  };

  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg'
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const animationClass = isAnimated ? (neonColor === 'blue' ? 'animate-pulse-neon' : 'animate-pulse-neon') : '';

  return (
    <button
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${widthClass} 
        ${animationClass} 
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
