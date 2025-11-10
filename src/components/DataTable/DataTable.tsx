import { cn } from "@/utils/cn";
import { useState } from "react";
import { DataTableContext, SORT_ORDERS, type SortingColumn } from "./context";
import { DataTableColumnCell } from "./DataTableColumnCell";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { DataTableRow } from "./DataTableRow";

type CommonValue = string | number | Date;
type ColumnDefinition = {
  field: string;
  headerName?: string;
  width?: number;
  headerClass?: string;
  columnClass?: string;
};

interface TableProps<T extends Record<string, CommonValue> = Record<string, CommonValue>>
  extends React.ComponentProps<"table"> {
  data: Array<T>;
  headers?: string[];
  dataColumnClass?: string[];
  headColumnClass?: string[];
  rowActions?: (row: Record<string, CommonValue>) => React.ReactNode;
  columnDefinitions: ColumnDefinition[];
}

export const DataTable = ({ data, className, rowActions, columnDefinitions, ...restProps }: TableProps) => {
  const [sortingColumns, setSortingColumns] = useState<SortingColumn[]>([]);

  const addSortingColumn = (sortingColumn: SortingColumn) => {
    const position = sortingColumns.findIndex((v) => v.index === sortingColumn.index);

    setSortingColumns((prev) => {
      if (position !== -1) {
        prev.splice(position, 1);
      }
      return [sortingColumn, ...prev].slice(0, 3);
    });
  };

  const clearSortingColumns = () => {
    setSortingColumns([]);
  };

  const formatValue = (value: CommonValue) => {
    if (value instanceof Date)
      return value
        .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
        .replaceAll("/", "-");
    if (typeof value === "number") return value.toString();
    return value;
  };

  const compareTwoCommonValues = (a: CommonValue, b: CommonValue): number => {
    if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
    if (typeof a === "string" && typeof b === "string") return a.localeCompare(b);
    ///@ts-expect-error a or b are not number
    return a - b;
  };

  const sortedData = [...data].sort((a, b) => {
    const aValues = Object.values(a);
    const bValues = Object.values(b);
    for (const sortingColumn of sortingColumns) {
      const d = compareTwoCommonValues(aValues[sortingColumn.index], bValues[sortingColumn.index]);
      if (d !== 0) return sortingColumn.order === SORT_ORDERS.ASCENDING ? -d : d;
    }
    return 0;
  });

  if (data.length === 0) return null;

  return (
    <DataTableContext.Provider value={{ addSortingColumn, sortingColumns, clearSortingColumns }}>
      <table
        className={cn(
          "divide divide-y divide-gray-200 overflow-hidden rounded-md text-sm outline -outline-offset-1 outline-gray-200",
          className,
        )}
        {...restProps}
      >
        <thead className="rounded-t-md bg-gray-100">
          <DataTableRow>
            {columnDefinitions.map((v, index) => (
              <DataTableColumnHeader
                className={cn("capitalize", v.headerClass)}
                index={index}
                key={"tablehead" + index}
                label={v.headerName ?? v.field}
              />
            ))}
            <th className="bg-gray-100"></th>
          </DataTableRow>
        </thead>
        <tbody className="divide divide-y divide-gray-200">
          {sortedData.map((row, index) => (
            <DataTableRow key={"tablerow" + index}>
              {columnDefinitions.map((v, index) => (
                <DataTableColumnCell className={v.columnClass} key={"tabledata" + v + index}>
                  {formatValue(row[v.field])}
                </DataTableColumnCell>
              ))}
              {rowActions && <DataTableColumnCell className="flex h-full gap-2">{rowActions(row)}</DataTableColumnCell>}
            </DataTableRow>
          ))}
        </tbody>
      </table>
    </DataTableContext.Provider>
  );
};
