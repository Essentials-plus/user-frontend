import ChevronDown from "@/common/components/icons/chevron-down";
import { cn } from "@/lib/utils";
import {
  ComponentProps,
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  forwardRef,
  useId,
} from "react";

const Select = ({
  className,
  // eslint-disable-next-line no-unused-vars
  label,
  id,
  children,
  ...rest
}: ComponentProps<"select"> & { label?: string; children?: ReactNode }) => {
  const idHook = useId();

  const _id = id ? id : idHook;
  return (
    <div className="relative">
      <select
        id={_id}
        className={cn(
          "h-[46px] placeholder:text-sm placeholder:font-bold placeholder:opacity-50 text-sm font-bold outline-none w-full border-[3px] border-app-darker-green pl-4 pr-[42px] rounded-[15px] text-[#6B6B6B]",
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-4">
        <ChevronDown className="w-4 text-app-darker-green" />
      </div>
    </div>
  );
};

type AdditionalInput = {
  error?: string;
  label?: string;
};

export const FilterSearchSelect = forwardRef<
  HTMLSelectElement,
  DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > &
    AdditionalInput
  // eslint-disable-next-line no-unused-vars
>(({ error, label, ...props }, ref) => {
  return (
    <div>
      {label && (
        <label className="font-open-sans font-semibold text-app-black inline-block mb-1.5 text-sm">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          {...props}
          className={cn(
            "h-[46px] placeholder:text-sm placeholder:font-bold truncate placeholder:opacity-50 text-sm font-bold outline-none w-full border-[3px] border-app-darker-green pl-4 pr-[42px] rounded-[15px] text-[#6B6B6B]",
            props.className,
          )}
        >
          {props.children}
        </select>
        <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-4">
          <ChevronDown className="w-4 text-app-darker-green" />
        </div>
      </div>
    </div>
  );
});

FilterSearchSelect.displayName = "FilterSearchSelect";

export const FilterInputSelect = forwardRef<
  HTMLInputElement,
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
    AdditionalInput
  // eslint-disable-next-line no-unused-vars
>(({ error, label, ...props }, ref) => {
  return (
    <div>
      {label && (
        <label className="font-open-sans font-semibold text-app-black inline-block mb-1.5 text-sm">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          {...props}
          className={cn(
            "h-[46px] placeholder:text-sm truncate placeholder:font-bold placeholder:opacity-50 text-sm font-bold outline-none w-full border-[3px] border-app-darker-green pl-4 pr-[42px] rounded-[15px] text-[#6B6B6B]",
            props.className,
          )}
        />
      </div>
    </div>
  );
});

FilterInputSelect.displayName = "FilterInputSelect";

export default Select;
