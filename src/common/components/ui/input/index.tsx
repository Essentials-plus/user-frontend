import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  bordered?: true;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, bordered, error, ...rest }, ref) => {
    return (
      <div>
        {label && (
          <label className="inline-block pb-2 text-sm font-bold">{label}</label>
        )}
        <input
          type="text"
          className={cn(
            "w-full py-2.5 px-4 rounded-lg outline-none ring-offset-1 focus:ring-1 focus:ring-offset-app-dark-green",
            bordered && `border border-black ${error && "!border-red-500"}`,
            className,
          )}
          ref={ref}
          {...rest}
        />
        {error && <div className="text-sm text-red-500">{error}</div>}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
