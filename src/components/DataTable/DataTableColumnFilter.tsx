import { cn } from "@/utils/cn";
import { Checkbox, CheckboxGroup } from "@base-ui-components/react";
import { CheckIcon, ListFilterIcon, ListFilterPlusIcon, MinusIcon, SearchIcon } from "lucide-react";
import { useContext, useState } from "react";
import { Input } from "../common/Input";
import { BasePopover } from "../Dialog";
import { DataTableContext } from "./context";
import { formatCommonValue } from "./helper";

interface DataTableColumnFilterProps {
  columnIndex: number;
}

export const DataTableColumnFilter = ({ columnIndex }: DataTableColumnFilterProps) => {
  const {
    data,
    columnDefinitions,
    filteringColumns,
    clearFilteringColumnValues,
    addFilteringColumnValue,
    removeFilteringColumnValue,
    setFilteringColumnValues,
  } = useContext(DataTableContext);

  const { field } = columnDefinitions[columnIndex];

  const items = [...new Set(data.map((v) => v[field]))];
  const filteringColumn = filteringColumns[columnIndex];

  const [searchValue, setSearchValue] = useState("");

  const selectedAll = filteringColumn.values.size === items.length;
  const selectedPartial = filteringColumn.values.size > 0 && !selectedAll;
  const selectedPartialOrAll = selectedAll || selectedPartial;

  const filteredItems = items.filter((v) => formatCommonValue(v).toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <BasePopover
      title="Sort column"
      trigger={
        <button
          className={cn(
            "relative flex size-6 shrink-0 items-center justify-center rounded-sm p-1 text-gray-900 transition-colors hover:bg-gray-200 focus-visible:-outline-offset-2",
            selectedPartialOrAll && "bg-white",
          )}
          type="button"
        >
          {selectedPartialOrAll ? <ListFilterPlusIcon /> : <ListFilterIcon />}
        </button>
      }
    >
      <div className="text-sm text-gray-900">
        <div className="p-3 pb-4">
          <label className="relative flex items-center">
            <span className="sr-only">Search</span>
            <Input className="h-8" type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <SearchIcon className="absolute right-2 size-5" strokeWidth={1.5} />
          </label>
        </div>
        <div>
          <div className="flex flex-col gap-2 px-3">
            <label className="flex items-center gap-2">
              <Checkbox.Root
                checked={selectedAll}
                onCheckedChange={(checked) =>
                  checked
                    ? setFilteringColumnValues(columnIndex, new Set(items))
                    : clearFilteringColumnValues(columnIndex)
                }
                name="apple"
                className="flex size-5 items-center justify-center rounded-sm focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-800 data-checked:bg-gray-900 data-unchecked:border data-unchecked:border-gray-300"
              >
                {selectedPartial && (
                  <span className="flex h-full w-full items-center justify-center rounded-[inherit] bg-gray-100">
                    <MinusIcon className="size-3" />
                  </span>
                )}
                <Checkbox.Indicator className="flex text-gray-50 data-unchecked:hidden">
                  <CheckIcon className="size-3" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <span>{`Select All (${items.length})`}</span>
            </label>
            <div className="h-px bg-gray-100"></div>
          </div>
          <div className="pb-2">
            <CheckboxGroup
              aria-labelledby="apples-caption"
              className="flex max-h-30 flex-col items-start gap-2 overflow-y-auto px-3 pt-2"
            >
              {filteredItems.map((itemValue, itemIndex) => (
                <label className="flex items-center gap-2" key={formatCommonValue(itemValue) + itemIndex}>
                  <Checkbox.Root
                    checked={filteringColumn.values.has(itemValue)}
                    onCheckedChange={(checked) =>
                      checked
                        ? addFilteringColumnValue(columnIndex, itemValue)
                        : removeFilteringColumnValue(columnIndex, itemValue)
                    }
                    name="apple"
                    value="fuji-apple"
                    className="flex size-5 items-center justify-center rounded-sm focus-visible:outline-offset-2 focus-visible:outline-blue-800 data-checked:bg-gray-900 data-unchecked:border data-unchecked:border-gray-300"
                  >
                    <Checkbox.Indicator className="flex text-gray-50 data-unchecked:hidden">
                      <CheckIcon className="size-3" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <span>{formatCommonValue(itemValue)}</span>
                </label>
              ))}
            </CheckboxGroup>
          </div>
        </div>
      </div>
    </BasePopover>
  );
};
