import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { DetailedHTMLProps, SelectHTMLAttributes, forwardRef } from "react";

type AdditionalInput = {
  error?: string;
  label?: string;
};

const FormSelect = forwardRef<
  HTMLSelectElement,
  DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > &
    AdditionalInput
>(({ error, label, ...props }, ref) => {
  return (
    <div className="relative">
      {label && (
        <label className="inline-block pb-2 text-sm font-bold">{label}</label>
      )}
      <div className="relative">
        <select
          ref={ref}
          {...props}
          className={cn(
            "w-full py-2.5 px-4 rounded-lg truncate pr-8 outline-none ring-offset-1 focus:ring-1 focus:ring-offset-app-dark-green",
            "border border-black",
            props.className,
            error && "border-red-500",
          )}
        >
          {props.children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-app-black/80" />
      </div>
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  );
});

FormSelect.displayName = "FormSelect";

export default FormSelect;
