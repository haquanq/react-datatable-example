import { cn } from "@/utils/cn";
import { MoveDown, MoveUp } from "lucide-react";
import { useContext } from "react";
import { SORT_ORDERS, TableContext } from "./context";

interface DataTableHeadProps extends React.ComponentProps<"th"> {
  disabled?: boolean;
  index?: number;
}

export const TableHead = ({ disabled, index, className, children, ...restProps }: DataTableHeadProps) => {
  const { sortingColumns, addSortingColumn } = useContext(TableContext);

  const sorting = sortingColumns.find((v) => index !== undefined && v.index === index);

  const handleClick = () => {
    if (index !== undefined)
      addSortingColumn({
        index,
        order: sorting?.order === SORT_ORDERS.ASCENDING ? SORT_ORDERS.DESCENDING : SORT_ORDERS.ASCENDING,
      });
  };

  return (
    <th
      className={cn(
        "text-start font-medium tracking-wide text-gray-900 *:rounded-none first:*:rounded-tl-md last:*:rounded-tr-md",
        className,
      )}
      {...restProps}
    >
      <button
        className="flex h-full w-full justify-between gap-1 bg-gray-100 py-2 pr-3 pl-4 transition-colors hover:bg-gray-100/50 focus-visible:outline-2 focus-visible:-outline-offset-2"
        type="button"
        aria-label="Sort"
        disabled={disabled}
        onClick={handleClick}
      >
        {children}
        <span className="flex">
          <MoveUp
            className={cn("py-0.5 opacity-0", sorting && sorting.order === SORT_ORDERS.ASCENDING && "opacity-100")}
            strokeWidth={1.5}
            size={20}
          />
          <MoveDown
            className={cn(
              "absolute py-0.5 opacity-0",
              sorting && sorting.order === SORT_ORDERS.DESCENDING && "opacity-100",
            )}
            strokeWidth={1.5}
            size={20}
          />
        </span>
      </button>
    </th>
  );
};
