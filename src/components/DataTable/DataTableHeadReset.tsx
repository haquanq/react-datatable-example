import { cn } from "@/utils/cn";
import { RefreshCwIcon } from "lucide-react";
import { useContext } from "react";
import { TableContext } from "./context";

export const DataTableHeadReset = ({ className, ...restProps }: React.ComponentProps<"th">) => {
  const { clearSortingColumns, sortingColumns } = useContext(TableContext);

  const handleClick = () => {
    clearSortingColumns();
  };

  return (
    <th className={cn("text-start font-medium tracking-wide text-gray-900", className)} {...restProps}>
      <button
        className="flex h-full w-full justify-center gap-1 bg-gray-100 py-2 pr-3 pl-4 transition-colors hover:bg-gray-100/50"
        type="button"
        aria-label="Sort"
        onClick={handleClick}
        disabled={sortingColumns.length === 0}
      >
        <RefreshCwIcon className={cn(sortingColumns.length === 0 && "opacity-0")} size={20} />
      </button>
    </th>
  );
};
