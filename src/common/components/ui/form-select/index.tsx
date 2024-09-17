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
        <label className="pb-2 text-sm font-bold inline-block">{label}</label>
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
        <ChevronDown className="absolute top-1/2 pointer-events-none -translate-y-1/2 right-3 size-4 text-app-black/80" />
      </div>
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  );
});

FormSelect.displayName = "FormSelect";

export default FormSelect;
