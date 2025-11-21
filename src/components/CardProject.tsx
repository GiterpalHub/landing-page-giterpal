import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface CardProjectProps {
  image: StaticImageData | string;
  title: string;
  rotate?: string;
  className?: string;
}

const CardProject = ({ 
  image, 
  title, 
  rotate = "rotate-0", 
  className 
}: CardProjectProps) => {
  return (
    <Card 
      className={cn(
        "border-none rounded-none",
        "group relative bg-white p-4 shadow-2xl",
        "transition-all duration-500 ease-in-out",
        "hover:scale-105 hover:rotate-0 hover:z-10",
        "w-[450px]", 

        rotate,
        className
      )}
    >
      <CardContent className="p-0">
        <div className="relative w-full aspect-[2/1] overflow-hidden bg-white">
          <Image 
            src={image} 
            alt={title}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="mt-4 mb-2">
          <h3 className="text-primary font-primary text-lg uppercase">
            {title}
          </h3>
        </div>

      </CardContent>
    </Card>
  );
};

export default CardProject;