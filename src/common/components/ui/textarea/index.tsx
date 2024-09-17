import { cn } from "@/lib/utils";
import { forwardRef, TextareaHTMLAttributes } from "react";

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  bordered?: true;
}

const TextArea = forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, label, bordered, ...rest }, ref) => {
    return (
      <div>
        {label && (
          <label className="pb-2 text-sm font-bold inline-block">{label}</label>
        )}
        <textarea
          className={cn(
            className,
            "w-full py-2.5 px-4 rounded-lg outline-none ring-offset-1 focus:ring-1 focus:ring-offset-app-dark-green resize-none",
            bordered && "border border-black"
          )}
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
export default TextArea;
