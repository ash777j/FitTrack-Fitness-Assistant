import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, error, fullWidth = true, className = '', ...props }, ref) => {
    return (
      <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="block text-text-secondary mb-2 text-sm font-medium">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              bg-background-tertiary 
              border ${error ? 'border-red-500' : 'border-metallic-dark focus:border-neon-blue'} 
              text-text-primary 
              rounded-md 
              focus:outline-none 
              focus:ring-1 
              focus:ring-neon-blue
              transition-colors 
              duration-200
              w-full
              py-2 
              ${icon ? 'pl-10 pr-3' : 'px-3'} 
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
