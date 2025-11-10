import { cn } from "@/utils/cn";

export const DataTableCell = ({ className, children, ...restProps }: React.ComponentProps<"td">) => {
  return (
    <td className={cn("px-4 py-1 text-gray-800 md:py-2", className)} {...restProps}>
      {children}
    </td>
  );
};
