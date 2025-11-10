import { cn } from "@/utils/cn";
import { useState } from "react";
import { SORT_ORDERS, TableContext, type SortingColumn } from "./context";
import { DataTableCell } from "./DataTableCell";
import { TableHead } from "./DataTableHead";
import { DataTableHeadReset } from "./DataTableHeadReset";
import { DataTableRow } from "./DataTableRow";

type CommonValue = string | number | Date;

interface TableProps extends React.ComponentProps<"table"> {
  data: Array<Record<string, CommonValue>>;
  headers?: string[];
  dataColumnClass?: string[];
  headColumnClass?: string[];
  rowActions?: (row: Record<string, CommonValue>) => React.ReactNode;
}

export const DataTable = ({
  data,
  headers,
  dataColumnClass,
  headColumnClass,
  className,
  rowActions,
  ...restProps
}: TableProps) => {
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

  const headerLabels: string[] = headers || Object.keys(data[0] || {});

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
    <TableContext.Provider value={{ addSortingColumn, sortingColumns, clearSortingColumns }}>
      <table
        className={cn(
          "divide divide-y divide-gray-200 rounded-md bg-gray-50/50 text-sm outline -outline-offset-1 outline-gray-200",
          className,
        )}
        {...restProps}
      >
        <thead>
          <DataTableRow>
            {headerLabels.map((value, index) => (
              <TableHead className={headColumnClass?.[index]} index={index} key={"tablehead" + index}>
                {formatValue(value)}
              </TableHead>
            ))}
            <DataTableHeadReset />
          </DataTableRow>
        </thead>
        <tbody className="divide divide-y divide-gray-200">
          {sortedData.map((row, index) => (
            <DataTableRow key={"tablerow" + index}>
              {Object.values(row).map((value, index) => (
                <DataTableCell className={dataColumnClass?.[index]} key={"tabledata" + value}>
                  {formatValue(value)}
                </DataTableCell>
              ))}
              {rowActions && <DataTableCell className="flex h-full gap-2">{rowActions(row)}</DataTableCell>}
            </DataTableRow>
          ))}
        </tbody>
      </table>
    </TableContext.Provider>
  );
};
