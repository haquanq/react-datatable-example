import { cn } from "@/utils/cn";

export const DataTableRow = ({ className, children, ...restProps }: React.ComponentProps<"tr">) => {
  return (
    <tr className={cn("divide divide-x divide-gray-200", className)} {...restProps}>
      {children}
    </tr>
  );
};
