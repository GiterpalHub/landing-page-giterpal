import React, { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './ui/button';

type OutlineButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>; 

const OutlineButton = ({
  children,
  className = '',
  ...props
}: OutlineButtonProps) => {
  const defaultClasses = `
    py-4 px-4
    font-secondary text-white text-md
    bg-transparent border border-white/40 rounded-2xl
    
    transition-all duration-300
    
    hover:bg-white
    hover:text-primary
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

export default OutlineButton;