import type { CSSProperties } from "react";
import React, { forwardRef } from "react";

import { cn } from "@/lib/utils";

const Skeleton = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
  return (
    <div
      {...props}
      style={
        {
          "--base-color": "#f6f6f6",
          "--highlight-color": "#fff",
          "--animation-duration": "1.5s",
          "--animation-direction": "normal",
          ...style,
        } as CSSProperties
      }
      className={cn(
        "relative inline-flex select-none overflow-hidden bg-[--base-color]",
        "after:animate-loading-skeleton after:left-0 after:right-0 after:top-0 after:block after:h-full after:w-full after:-translate-x-full after:bg-[linear-gradient(90deg,var(--base-color),var(--highlight-color),var(--base-color))] after:bg-no-repeat",
        className,
      )}
      ref={ref}
    />
  );
});

Skeleton.displayName = "Skeleton";
export default Skeleton;
