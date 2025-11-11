import { cn } from "@/utils/cn";
import { useId } from "react";
import { type RegisterOptions, useController, useFormContext } from "react-hook-form";
import { Input } from "../common/Input";

interface DateFieldProps {
  label: string;
  name: string;
  rules?: RegisterOptions;
  value?: Date;
}

export const DateField = ({ label, name, rules, value }: DateFieldProps) => {
  const inputId = useId();
  const inputHintId = useId();

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({
    name,
    control,
    rules,
    defaultValue: value,
  });

  const hasError = !!errors[name];

  return (
    <div className="flex flex-col items-start gap-2">
      <label className="w-fit text-sm font-medium" htmlFor={inputId}>
        {label}
      </label>
      <Input
        className={cn("block", hasError && "border-red-700")}
        id={inputId}
        type="date"
        {...field}
        value={new Date(field.value).toISOString().substring(0, 10)}
        aria-invalid={hasError}
        aria-describedby={inputHintId}
      />
      <p className={cn("hidden text-sm", hasError && "block text-red-700")} id={inputHintId}>
        {errors[name]?.message as string}
      </p>
    </div>
  );
};
