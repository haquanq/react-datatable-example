import { cn } from "@/utils/cn";

export const DataTableColumnCell = ({ className, children, ...restProps }: React.ComponentProps<"td">) => {
  return (
    <td className={cn("px-3 py-1 text-gray-800 md:py-2", className)} {...restProps}>
      {children}
    </td>
  );
};
