import { cn } from "@/utils/cn";

export const DataTableRow = ({ className, children, ...restProps }: React.ComponentProps<"tr">) => {
  return (
    <tr className={cn("divide divide-x divide-gray-200 bg-gray-50/50 hover:bg-gray-100", className)} {...restProps}>
      {children}
    </tr>
  );
};
