import React from "react";
import Image, { StaticImageData } from "next/image";
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
  className,
}: CardProjectProps) => {
  return (
    <Card
      className={cn(
        "border-none rounded-none",
        "group relative bg-white p-3.5 sm:p-4 shadow-[0_18px_45px_rgba(7,5,36,0.55)]",
        "transition-all duration-500 ease-out",
        "hover:scale-105 hover:rotate-0 hover:z-20",
        "w-full",
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

        <div className="mt-4 mb-1.5 text-left">
          <h3 className="text-primary font-primary text-base sm:text-lg uppercase tracking-wide">
            {title}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardProject;
