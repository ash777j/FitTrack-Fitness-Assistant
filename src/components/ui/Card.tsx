import React from 'react';

interface CardProps {
  children: React.ReactNode;
  neonBorder?: 'blue' | 'green' | 'none';
  className?: string;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  neonBorder = 'none',
  className = '' 
}) => {
  const borderClass = {
    blue: 'border-neon-blue hover:shadow-neon-blue',
    green: 'border-neon-green hover:shadow-neon-green',
    none: 'border-metallic-dark'
  };

  return (
    <div 
      className={`
        bg-background-secondary 
        border ${borderClass[neonBorder]} 
        rounded-lg 
        shadow-lg 
        transition-all 
        duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
