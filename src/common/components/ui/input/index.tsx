import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  bordered?: true;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, bordered, error, ...rest }, ref) => {
    return (
      <div>
        {label && (
          <label className="pb-2 text-sm font-bold inline-block">{label}</label>
        )}
        <input
          type="text"
          className={cn(
            className,
            "w-full py-2.5 px-4 rounded-lg outline-none ring-offset-1 focus:ring-1 focus:ring-offset-app-dark-green",
            bordered && `border border-black ${error && "!border-red-500"}`
          )}
          ref={ref}
          {...rest}
        />
        {error && <div className="text-sm text-red-500">{error}</div>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
