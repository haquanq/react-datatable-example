import type { SORT_ORDERS } from "./constants";

type SortOrders = (typeof SORT_ORDERS)[keyof typeof SORT_ORDERS];

type SortingColumn = {
    index: number;
    order: SortOrders;
};

type FilteringColumn = {
    index: number;
    values: Set<CommonValue>;
};

type ColumnDefinition = {
    field: string;
    headerName?: string;
    width?: number;
    headerClass?: string;
    columnClass?: string;
    filterable?: boolean;
    sortable?: boolean;
};

type CommonValue = string | number | Date;

export type { ColumnDefinition, CommonValue, FilteringColumn, SortingColumn, SortOrders };
