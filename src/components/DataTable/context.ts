import { createContext } from "react";

const SORT_ORDERS = {
    ASCENDING: "ascending",
    DESCENDING: "descending",
} as const;

type SortOrders = (typeof SORT_ORDERS)[keyof typeof SORT_ORDERS];

type SortingColumn = {
    index: number;
    order: SortOrders;
};

interface DataTableContextData {
    sortingColumns: SortingColumn[];
    addSortingColumn: (sortingColumn: SortingColumn) => void;
    clearSortingColumns: () => void;
}

const dataTableContextInitialData: DataTableContextData = {
    sortingColumns: [],
    addSortingColumn: () => {},
    clearSortingColumns: () => {},
};

const DataTableContext = createContext<DataTableContextData>(dataTableContextInitialData);

export { DataTableContext, SORT_ORDERS, type DataTableContextData, type SortingColumn, type SortOrders };
