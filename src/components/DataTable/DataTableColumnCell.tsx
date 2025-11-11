import { cn } from "@/utils/cn";

export const DataTableColumnCell = ({ className, children, ...restProps }: React.ComponentProps<"td">) => {
  return (
    <td className={cn("px-3 py-2 text-gray-800", className)} {...restProps}>
      {children}
    </td>
  );
};
