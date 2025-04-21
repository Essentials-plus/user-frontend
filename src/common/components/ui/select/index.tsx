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
  varient = "default",
  ...rest
}: ComponentProps<"select"> & {
  label?: string;
  children?: ReactNode;
  varient?: "default" | "secondary";
}) => {
  const idHook = useId();

  const _id = id ? id : idHook;
  return (
    <div className="relative">
      <select
        id={_id}
        className={cn(
          "h-[46px] placeholder:text-sm placeholder:font-bold placeholder:opacity-50 text-sm font-bold outline-none w-full border-[3px] border-app-darker-green pl-4 pr-[42px] rounded-[15px] text-[#6B6B6B]",
          varient === "secondary" && "border-none rounded-none bg-app-text/10",
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
        <ChevronDown
          className={cn(
            "w-4 text-app-darker-green",
            varient === "secondary" && "text-app-text",
          )}
        />
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
        <label className="mb-1.5 inline-block font-open-sans text-sm font-semibold text-app-black">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          {...props}
          className={cn(
            "h-[46px] placeholder:text-sm placeholder:font-bold truncate placeholder:opacity-50 text-sm font-bold outline-none w-full border-[1.5px] lg:border-[3px] border-app-darker-green pl-4 pr-[42px] rounded-[15px] text-[#6B6B6B]",
            props.className,
          )}
        >
          {props.children}
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
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
        <label className="mb-1.5 inline-block font-open-sans text-sm font-semibold text-app-black">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          {...props}
          className={cn(
            "h-[46px] placeholder:text-sm truncate placeholder:font-bold placeholder:opacity-50 text-sm font-bold outline-none w-full border-[1.5px] lg:border-[3px] border-app-darker-green pl-4 pr-[42px] rounded-[15px] text-[#6B6B6B]",
            props.className,
          )}
        />
      </div>
    </div>
  );
});

FilterInputSelect.displayName = "FilterInputSelect";

export default Select;
