import { cn } from "@/utils/cn";
import { useState } from "react";
import { SORT_ORDERS } from "./constants";
import { DataTableContext } from "./context";
import { DataTableColumnCell } from "./DataTableColumnCell";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { DataTableRow } from "./DataTableRow";
import { compareTwoCommonValues, formatCommonValue } from "./helper";
import { type ColumnDefinition, type CommonValue, type FilteringColumn, type SortingColumn } from "./types";

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
  const [filteringColumns, setFilteringColumns] = useState<FilteringColumn[]>(
    data.map((_, index) => ({ index, values: new Set() })),
  );

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

  const addFilteringColumnValue = (index: number, value: CommonValue) => {
    setFilteringColumns((prev) =>
      prev.map((v, i) => (i === index ? { ...v, values: new Set([...v.values, value]) } : v)),
    );
  };

  const removeFilteringColumnValue = (index: number, value: CommonValue) => {
    setFilteringColumns((prev) =>
      prev.map((v, i) => (i === index ? { ...v, values: new Set([...v.values].filter((v) => v !== value)) } : v)),
    );
  };

  const clearFilteringColumnValues = (index: number) => {
    setFilteringColumns((prev) => prev.map((v, i) => (i === index ? { ...v, values: new Set() } : v)));
  };

  const setFilteringColumnValues = (index: number, values: Set<CommonValue>) => {
    setFilteringColumns((prev) => prev.map((v, i) => (i === index ? { ...v, values } : v)));
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

  const filteredAndSortedData = sortedData.filter((v) => {
    for (const filteringColumn of filteringColumns) {
      if (filteringColumn.values.size === 0) continue;
      const target = v[columnDefinitions[filteringColumn.index].field];
      if (!filteringColumn.values.has(target)) return false;
    }
    return true;
  });

  return (
    <DataTableContext.Provider
      value={{
        addSortingColumn,
        sortingColumns,
        clearSortingColumns,
        data,
        columnDefinitions,
        filteringColumns,
        addFilteringColumnValue,
        clearFilteringColumnValues,
        removeFilteringColumnValue,
        setFilteringColumnValues,
      }}
    >
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
                columnIndex={index}
                key={"tablehead" + index}
                columnLabel={v.headerName ?? v.field}
              />
            ))}
            <th className="bg-gray-100"></th>
          </DataTableRow>
        </thead>
        <tbody className="divide divide-y divide-gray-200">
          {filteredAndSortedData.map((row, index) => (
            <DataTableRow key={"tablerow" + index}>
              {columnDefinitions.map((v, index) => (
                <DataTableColumnCell className={v.columnClass} key={"tabledata" + v + index}>
                  {formatCommonValue(row[v.field])}
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
