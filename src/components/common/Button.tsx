import { cn } from "@/utils/cn";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "primary" | "secondary" | "danger";
}

export const Button = ({ className, variant = "primary", children, ...restProps }: ButtonProps) => {
  return (
    <button
      className={cn(
        "flex h-10 items-center justify-center gap-2 rounded-md border px-4 font-medium transition-colors",
        {
          "border-gray-900 bg-gray-900 text-gray-50 hover:bg-white hover:text-gray-900": variant === "primary",
          "border-gray-200 bg-gray-50 text-gray-900 hover:border-gray-900": variant === "secondary",
          "border-red-700 bg-red-700 text-white hover:bg-white hover:text-red-700": variant === "danger",
        },
        className,
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};
