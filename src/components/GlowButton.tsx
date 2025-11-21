import React, { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './ui/button';

type GlowButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>; 

const GlowButton = ({
  children,
  className = '',
  ...props
}: GlowButtonProps) => {
  const defaultClasses = `
    py-3 px-6
    font-primary font-bold text-primary text-lg
    bg-white rounded-2xl
    
    shadow-[0_0_20px_theme(colors.white/70)]
    
    transition-all duration-300
    
    focus:outline-none
    hover:bg-white/90
  `;

  return (
    <Button
      className={twMerge(defaultClasses, className)}
      {...props} 
    >
      {children}
    </Button>
  );
};

export default GlowButton;