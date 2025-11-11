import { cn } from "@/utils/cn";
import type React from "react";

export const Input = ({ className, ...restProps }: React.ComponentProps<"input">) => {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-md border border-gray-200 px-4 text-gray-900 transition-colors hover:border-gray-900 focus-visible:border-gray-900",
        className,
      )}
      {...restProps}
    />
  );
};
