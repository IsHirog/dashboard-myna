"use client";

import { Star as StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StarProps = {
  filled?: boolean;
  rating?: number;
  className?: string;
};

export default function Star({ filled, rating, className }: StarProps) {
  return (
    <StarIcon
      className={cn(
        "h-5 w-5",
        filled ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
        className
      )}
      aria-label={`Estrela ${rating}`}
    />
  );
}
