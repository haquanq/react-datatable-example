import { cn } from "@/utils/cn";
import { EditIcon, Trash2Icon } from "lucide-react";
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
}

export const DataTable = ({ data, headers, dataColumnClass, headColumnClass, className, ...restProps }: TableProps) => {
  const [sortingColumns, setSortingColumns] = useState<SortingColumn[]>([]);

  const addSortingColumn = (sortingColumn: SortingColumn) => {
    const position = sortingColumns.findIndex((v) => v.index === sortingColumn.index);

    setSortingColumns((prev) => {
      if (position !== -1) {
        prev[position] = sortingColumn;
        return [...prev];
      }
      return [sortingColumn, ...prev].slice(0, 3);
    });
  };

  const clearSortingColumns = () => {
    setSortingColumns([]);
  };

  const headerLabels: string[] = headers || Object.keys(data[0]);
  const flattenedData: Array<Array<CommonValue>> = data.map((v) => Object.values(v));

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

  flattenedData.sort((a, b) => {
    for (const sortingColumn of sortingColumns) {
      const d = compareTwoCommonValues(a[sortingColumn.index], b[sortingColumn.index]);
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
          {flattenedData.map((item, index) => (
            <DataTableRow key={"tablerow" + index}>
              {item.map((value, index) => (
                <DataTableCell className={dataColumnClass?.[index]} key={"tabledata" + value}>
                  {formatValue(value)}
                </DataTableCell>
              ))}
              <DataTableCell className="flex h-full gap-2 align-middle">
                <button className="text-gray-900 transition-opacity hover:opacity-50" type="button" aria-label="Edit">
                  <EditIcon size={20} />
                </button>
                <button
                  className="text-[#a81c1c] transition-opacity hover:opacity-50"
                  type="button"
                  aria-label="Delete"
                >
                  <Trash2Icon size={20} />
                </button>
              </DataTableCell>
            </DataTableRow>
          ))}
        </tbody>
      </table>
    </TableContext.Provider>
  );
};
