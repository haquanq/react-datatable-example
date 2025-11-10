import { GENDERS } from "@/constants/Genders";
import { cn } from "@/utils/cn";
import { Combobox } from "@base-ui-components/react/combobox";
import * as React from "react";
import { type RegisterOptions, useController, useFormContext } from "react-hook-form";

interface CandidateGenderSelectProps {
  label: string;
  name: string;
  rules?: RegisterOptions;
}

export default function CandidateGenderSelect({ name, label, rules }: CandidateGenderSelectProps) {
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
    defaultValue: GENDERS.MALE,
  });

  const hasError = !!errors[name];

  return (
    <Combobox.Root items={Object.values(GENDERS)} value={field.value} onValueChange={field.onChange}>
      <div className="relative flex w-full flex-col gap-2">
        <label htmlFor={inputId} className="w-fit text-sm font-medium text-gray-900">
          {label}
        </label>
        <Combobox.Input
          id={inputId}
          className={cn(
            "peer h-10 w-full rounded-md border border-gray-200 bg-white pl-4 text-base font-normal text-gray-900 capitalize transition-colors hover:border-gray-900 focus-visible:border-gray-900",
            hasError && "border-[var(--color-red-700)]"
          )}
          aria-invalid={hasError}
          aria-describedby={inputHintId}
        />
      </div>

      <Combobox.Portal>
        <Combobox.Positioner className="outline-none" sideOffset={4}>
          <Combobox.Popup className="max-h-[min(var(--available-height),23rem)] w-[var(--anchor-width)] max-w-[var(--available-width)] origin-[var(--transform-origin)] scroll-pt-2 scroll-pb-2 overflow-y-auto overscroll-contain rounded-md bg-[canvas] py-2 text-gray-900 shadow-lg shadow-gray-200 outline-1 outline-gray-200 transition-[transform,scale,opacity] data-ending-style:opacity-0 data-starting-style:scale-95 data-[ending-style]:scale-95 data-[starting-style]:opacity-0 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-300">
            <Combobox.Empty className="px-4 py-2 text-[0.925rem] leading-4 text-gray-600 empty:m-0 empty:p-0">
              No matches found.
            </Combobox.Empty>
            <Combobox.List>
              {(item: string) => (
                <Combobox.Item
                  key={item}
                  value={item}
                  className="grid cursor-default grid-cols-[0.75rem_1fr] items-center gap-2 py-2 pr-8 pl-4 text-base leading-4 capitalize outline-none select-none data-highlighted:relative data-highlighted:before:absolute data-highlighted:before:inset-x-2 data-highlighted:before:z-[-1] data-[highlighted]:z-0 data-[highlighted]:text-gray-50 data-[highlighted]:before:inset-y-0 data-[highlighted]:before:rounded-sm data-[highlighted]:before:bg-gray-900"
                >
                  <Combobox.ItemIndicator className="col-start-1">
                    <CheckIcon className="size-3" />
                  </Combobox.ItemIndicator>
                  <div className="col-start-2">{item}</div>
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
      <p
        className="text-sm text-[var(--color-red-700)]"
        id={inputHintId}
        style={{ display: hasError ? "block" : "none" }}
      >
        {errors[name]?.message as string}
      </p>
    </Combobox.Root>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg fill="currentcolor" width="10" height="10" viewBox="0 0 10 10" {...props}>
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}
