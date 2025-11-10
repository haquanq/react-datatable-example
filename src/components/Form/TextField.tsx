import { cn } from "@/utils/cn";
import { useId } from "react";
import { type RegisterOptions, useFormContext } from "react-hook-form";

interface TextFieldProps {
  label: string;
  name: string;
  rules?: RegisterOptions;
  placeholder?: string;
  type?: "text" | "email" | "password";
}

export const TextField = ({ placeholder, label, name, rules, type = "text" }: TextFieldProps) => {
  const inputId = useId();
  const inputHintId = useId();

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasError = !!errors[name];

  return (
    <div className="flex flex-col items-start gap-2">
      <label className="text-sm font-medium" htmlFor={inputId}>
        {label}
      </label>
      <input
        className={cn(
          "peer h-10 w-full rounded-md border border-gray-200 px-4 transition-colors hover:border-gray-900 focus-visible:border-gray-900",
          hasError && "border-red-700",
        )}
        id={inputId}
        type={type}
        aria-invalid={hasError}
        aria-describedby={inputHintId}
        placeholder={placeholder}
        {...register(name, rules)}
      />
      <p className={cn("hidden text-sm", hasError && "block text-red-700")} id={inputHintId}>
        {errors[name]?.message as string}
      </p>
    </div>
  );
};
