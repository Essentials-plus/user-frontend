import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";
import Spinner from "../spinner";

export const button = cva(
  "__c_all border-2 duration-200 ring-offset-1 outline-none focus-visible:ring-1 focus-visible:ring-app-black flex items-center gap-2",
  {
    variants: {
      intent: {
        primary:
          "bg-app-darker-green text-white border-app-darker-green enabled:hover:bg-white enabled:hover:text-app-darker-green focus-visible:ring-app-darker-green",
        "outline-primary":
          "bg-white text-app-black border-app-darker-green focus-visible:ring-app-darker-green enabled:hover:bg-app-darker-green enabled:hover:text-white",
        "outline-green":
          "bg-white text-app-black border-app-green focus-visible:ring-app-green enabled:hover:bg-app-green enabled:hover:text-white",
        green:
          "text-white border-app-green focus-visible:ring-app-green bg-app-green enabled:hover:text-app-black enabled:hover:bg-white",
        black:
          "bg-app-black text-white focus-visible:ring-app-black focus-visible:ring-offset-white border-app-black enabled:hover:bg-black",
        yellow:
          "text-app-black border-app-yellow focus-visible:ring-app-yellow bg-app-yellow enabled:hover:bg-white",
        orange:
          "text-white border-app-orange focus-visible:ring-app-orange bg-app-orange enabled:hover:bg-white enabled:hover:text-app-orange",
      },
      size: {
        md: "text-base font-medium h-10 px-6 rounded-lg",
        sm: "px-4 h-8 text-sm rounded-md",
        default: "text-lg font-semibold h-12 px-8 rounded-lg",
      },
      iconButton: {
        true: "aspect-square",
        false: "",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "default",
    },
    compoundVariants: [
      {
        iconButton: true,
        className: "px-0",
      },
    ],
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> & { loading?: boolean };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, intent, size, iconButton, loading, ...rest },
    ref,
  ) => {
    const buttonClass = button({ intent, size, iconButton, className });

    return (
      <button
        disabled={loading}
        className={cn(buttonClass, "disabled:opacity-70")}
        ref={ref}
        {...rest}
      >
        {loading ? (
          <span className={cn(" flex justify-center items-center gap-1")}>
            <Spinner className="w-5" />
            bezig met laden..
          </span>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
export default Button;
