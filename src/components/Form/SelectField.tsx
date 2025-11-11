import { cn } from "@/utils/cn";
import { Combobox } from "@base-ui-components/react/combobox";
import { CheckIcon } from "lucide-react";
import * as React from "react";
import { type RegisterOptions, useController, useFormContext } from "react-hook-form";
import { Input } from "../common/Input";

interface SelectFieldProps {
  label: string;
  name: string;
  rules?: RegisterOptions;
  items: string[];
  defaultValue?: string;
}

export const SelectField = ({ name, label, rules, items, defaultValue }: SelectFieldProps) => {
  const inputId = React.useId();
  const inputHintId = React.useId();

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  const hasError = !!errors[name];

  return (
    <Combobox.Root items={items} value={field.value} onValueChange={field.onChange}>
      <div className="relative flex w-full flex-col gap-2">
        <label htmlFor={inputId} className="w-fit text-sm font-medium text-gray-900">
          {label}
        </label>
        <Combobox.Input
          render={
            <Input
              id={inputId}
              aria-invalid={hasError}
              aria-describedby={inputHintId}
              className={cn("capitalize", hasError && "border-red-700")}
            />
          }
        />
        <p className={cn("hidden text-sm", hasError && "block text-red-700")} id={inputHintId}>
          {errors[name]?.message as string}
        </p>
      </div>

      <Combobox.Portal>
        <Combobox.Positioner className="outline-none" sideOffset={4}>
          <Combobox.Popup className="max-h-[min(var(--available-height),23rem)] w-(--anchor-width) max-w-(--available-width) origin-(--transform-origin) scroll-pt-2 scroll-pb-2 overflow-y-auto overscroll-contain rounded-md bg-[canvas] py-2 text-gray-900 shadow-lg shadow-gray-200 outline-1 outline-gray-200 transition-[transform,scale,opacity] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300">
            <Combobox.Empty className="px-4 py-2 text-[0.925rem] leading-4 text-gray-600 empty:m-0 empty:p-0">
              No matches found.
            </Combobox.Empty>
            <Combobox.List>
              {(item: string) => (
                <Combobox.Item
                  key={item}
                  value={item}
                  className="grid cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-8 pl-4 text-base leading-4 capitalize outline-none select-none data-highlighted:relative data-highlighted:z-0 data-highlighted:text-gray-50 data-highlighted:before:absolute data-highlighted:before:inset-x-2 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-sm data-highlighted:before:bg-gray-900"
                >
                  <Combobox.ItemIndicator className="col-start-1">
                    <CheckIcon size={12} />
                  </Combobox.ItemIndicator>
                  <div className="col-start-2">{item}</div>
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
};
