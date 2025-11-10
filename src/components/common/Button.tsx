import { cn } from "@/utils/cn";

export const Button = ({ className, children, ...restProps }: React.ComponentProps<"button">) => {
  return (
    <button
      className={cn(
        "flex h-10 items-center justify-center gap-2 rounded-md border-2 border-gray-900 bg-gray-900 px-4 font-medium text-gray-50 transition-colors hover:bg-white hover:text-gray-900",
        className,
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};
