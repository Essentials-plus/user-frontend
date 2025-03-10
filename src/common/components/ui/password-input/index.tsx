import { cn } from "@/lib/utils";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
  useState,
} from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa6";

type AdditionalInput = {
  error?: string;
  label?: string;
  bordered?: boolean;
};

const PasswordInput = forwardRef<
  HTMLInputElement,
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
    AdditionalInput
>(({ error, label, bordered, ...props }, ref) => {
  const [isPassword, setIsPassword] = useState(true);

  return (
    <>
      {label && (
        <label className="inline-block pb-2 text-sm font-bold">{label}</label>
      )}
      <div className="relative">
        <input
          ref={ref}
          type={isPassword ? "password" : "true"}
          {...props}
          className={cn(
            "w-full py-2.5 pl-4 pr-9 rounded-lg outline-none ring-offset-1 focus:ring-1 focus:ring-offset-app-dark-green",
            props.className,
            bordered && "border border-gray-500",
            error && "border border-red-500",
          )}
        />

        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center">
          <button type="button" onClick={() => setIsPassword((prev) => !prev)}>
            {!isPassword ? <FaEyeSlash /> : <FaRegEye />}
          </button>
        </div>

        {error && <div className="text-sm text-red-500">{error}</div>}
      </div>
    </>
  );
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
