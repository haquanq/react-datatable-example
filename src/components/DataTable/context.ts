import { createContext } from "react";
import type { ColumnDefinition, CommonValue, FilteringColumn, SortingColumn } from "./types";

interface DataTableContextData {
    data: Array<Record<string, CommonValue>>;
    columnDefinitions: ColumnDefinition[];
    sortingColumns: SortingColumn[];
    filteringColumns: FilteringColumn[];
    setFilteringColumnValues: (index: number, values: Set<CommonValue>) => void;
    addFilteringColumnValue: (index: number, value: CommonValue) => void;
    removeFilteringColumnValue: (index: number, value: CommonValue) => void;
    clearFilteringColumnValues: (index: number) => void;
    addSortingColumn: (sortingColumn: SortingColumn) => void;
    clearSortingColumns: () => void;
}

const dataTableContextInitialData: DataTableContextData = {
    data: [],
    columnDefinitions: [],
    filteringColumns: [],
    setFilteringColumnValues() {},
    addFilteringColumnValue() {},
    removeFilteringColumnValue() {},
    clearFilteringColumnValues() {},
    sortingColumns: [],
    addSortingColumn: () => {},
    clearSortingColumns: () => {},
};

const DataTableContext = createContext<DataTableContextData>(dataTableContextInitialData);

export { DataTableContext, type DataTableContextData };
