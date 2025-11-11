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
  const { sortingColumns, columnDefinitions } = useContext(DataTableContext);
  const sortingState = sortingColumns.find((v) => v.index === columnIndex);
  const columnDefinition = columnDefinitions[columnIndex];

  const isSorting = sortingState !== undefined;
  const isSortingAscending = isSorting && sortingState.order === SORT_ORDERS.ASCENDING;
  const isSortingDescending = isSorting && sortingState.order === SORT_ORDERS.DESCENDING;

  const isSortable = [undefined, true].includes(columnDefinition.sortable);
  const isFilterable = [undefined, true].includes(columnDefinition.filterable);
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
          {isSorting && (
            <div className="*:size-5">
              {isSortingAscending && <ArrowUp strokeWidth={1.5} />}
              {isSortingDescending && <ArrowDown strokeWidth={1.5} />}
            </div>
          )}
        </div>
        <div className="flex">
          {isFilterable && <DataTableColumnFilter columnIndex={columnIndex} />}
          {isSortable && <DataTableColumnSort index={columnIndex} />}
        </div>
      </div>
    </th>
  );
};
