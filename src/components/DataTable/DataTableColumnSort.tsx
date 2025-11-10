import { ArrowDownIcon, ArrowUpIcon, EllipsisVerticalIcon, RefreshCwIcon } from "lucide-react";
import { useContext } from "react";
import { BasePopover } from "../Dialog";
import { DataTableContext, SORT_ORDERS } from "./context";

interface DataTableColumnSortProps {
  index: number;
}

export const DataTableColumnSort = ({ index }: DataTableColumnSortProps) => {
  const { sortingColumns, addSortingColumn, clearSortingColumns } = useContext(DataTableContext);
  const sortingState = sortingColumns.find((v) => v.index === index);

  return (
    <BasePopover
      title="Sort column"
      trigger={
        <button
          className="flex size-6 shrink-0 items-center justify-center rounded-sm p-1 transition-colors hover:bg-gray-200 focus-visible:-outline-offset-2"
          type="button"
        >
          <EllipsisVerticalIcon />
        </button>
      }
    >
      <div className="flex flex-col items-start gap-1 p-1 text-sm *:flex *:h-8 *:w-full *:items-center *:gap-2 *:rounded-md *:pr-4 *:pl-2 *:text-start *:hover:bg-gray-100">
        {(!sortingState || sortingState.order === SORT_ORDERS.DESCENDING) && (
          <button
            type="button"
            onClick={() =>
              addSortingColumn({
                index,
                order: SORT_ORDERS.ASCENDING,
              })
            }
          >
            <ArrowUpIcon size={20} strokeWidth={1.5} />
            <span>Sort Ascending</span>
          </button>
        )}
        {(!sortingState || sortingState.order === SORT_ORDERS.ASCENDING) && (
          <button
            type="button"
            onClick={() =>
              addSortingColumn({
                index,
                order: SORT_ORDERS.DESCENDING,
              })
            }
          >
            <ArrowDownIcon size={20} strokeWidth={1.5} />
            <span>Sort Descending</span>
          </button>
        )}

        {sortingColumns.length !== 0 && (
          <button type="button" onClick={() => clearSortingColumns()}>
            <RefreshCwIcon size={20} strokeWidth={1.5} />
            <span>Clear Sort</span>
          </button>
        )}
      </div>
    </BasePopover>
  );
};
