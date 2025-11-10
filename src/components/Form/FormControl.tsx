import { cn } from "@/utils/cn";
import { FormProvider, useForm, type FieldValues, type DefaultValues } from "react-hook-form";

interface FormControlProps<T extends FieldValues> {
  children: React.JSX.Element;
  className?: string;
  onSubmit: (data: T) => void;
  defaultValues?: DefaultValues<T>;
}
export const FormControl = <T extends FieldValues>({
  children,
  className,
  onSubmit,
  defaultValues,
}: FormControlProps<T>) => {
  const methods = useForm<T>({ mode: "onBlur", defaultValues });

  return (
    <FormProvider {...methods}>
      <form
        className={cn("flex flex-col gap-4", className)}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
};
