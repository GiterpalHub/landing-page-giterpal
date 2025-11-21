import React from 'react';
import { Card, CardContent } from "@/components/ui/card"; 
import { cn } from "@/lib/utils"; 

interface CardMissionProps {
  number: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

const CardMission = ({ 
  number, 
  description, 
  icon, 
  className 
}: CardMissionProps) => {
  return (
    <Card 
      className={cn(
        "w-full max-w-[240px] aspect-square relative overflow-hidden border-none shadow-xl",
        
        "bg-[#180C37] text-white rounded-[32px]", 
        
        "transition-all duration-300 hover:-rotate-6 hover:shadow-2xl hover:bg-white hover:text-primary",
        
        className
      )}
    >
      <CardContent className="flex flex-col justify-between h-full p-8 font-secondary">
        <div className="flex justify-between items-start">
          <h2 className="text-4xl font-semibold tracking-tighter">
            {number}
          </h2>
          <div>
            {icon}
          </div>
        </div>

        <div>
          <p className="text-lg font-medium leading-snug">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardMission;