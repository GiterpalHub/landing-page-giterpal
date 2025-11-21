import React, { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './ui/button';

type IconButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton = ({
  children,
  className = '',
  ...props
}: IconButtonProps) => {
  const defaultClasses = `
    text-primary
    bg-white rounded-full
    
    transition-all duration-300
    
    hover:bg-white/90
  `;

  return (
    <Button
      size="icon"
      className={twMerge(defaultClasses, className)}
      {...props}
    >
      {children}
    </Button>
  );
};

export default IconButton;