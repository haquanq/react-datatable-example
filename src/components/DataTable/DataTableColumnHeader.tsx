import { cn } from "@/utils/cn";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useContext } from "react";
import { SORT_ORDERS } from "./constants";
import { DataTableContext } from "./context";
import { DataTableColumnFilter } from "./DataTableColumnFilter";
import { DataTableColumnSort } from "./DataTableColumnSort";

interface DataTableHeadProps extends React.ComponentProps<"th"> {
  columnLabel: string;
  columnIndex: number;
}

export const DataTableColumnHeader = ({ columnIndex, className, columnLabel, ...restProps }: DataTableHeadProps) => {
  const { sortingColumns } = useContext(DataTableContext);
  const sortingState = sortingColumns.find((v) => v.index === columnIndex);
  return (
    <th
      className={cn(
        "text-start font-medium tracking-wide text-gray-900 *:rounded-none first:*:rounded-tl-md last:*:rounded-tr-md",
        className,
      )}
      {...restProps}
    >
      <div className="flex items-center justify-between gap-4 py-3 pr-2 pl-3">
        <div className="flex items-center gap-2">
          <span>{columnLabel}</span>
          <div className="*:size-5">
            {sortingState && sortingState.order === SORT_ORDERS.ASCENDING && <ArrowUp strokeWidth={1.5} />}
            {sortingState && sortingState.order === SORT_ORDERS.DESCENDING && <ArrowDown strokeWidth={1.5} />}
          </div>
        </div>
        <div className="flex">
          <DataTableColumnFilter columnIndex={columnIndex} />
          <DataTableColumnSort index={columnIndex} />
        </div>
      </div>
    </th>
  );
};
