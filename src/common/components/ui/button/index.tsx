import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";
import Spinner from "../spinner";

export const button = cva(
  "__c_all flex items-center gap-2 border-2 outline-none ring-offset-1 duration-200 focus-visible:ring-1 focus-visible:ring-app-black disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      intent: {
        primary:
          "border-app-darker-green bg-app-darker-green text-white hover:bg-white hover:text-app-darker-green focus-visible:ring-app-darker-green",
        "outline-primary":
          "border-app-darker-green bg-white text-app-black hover:bg-app-darker-green hover:text-white focus-visible:ring-app-darker-green",
        "outline-green":
          "border-app-green bg-white text-app-black hover:bg-app-green hover:text-white focus-visible:ring-app-green",
        green:
          "border-app-green bg-app-green text-white hover:bg-white hover:text-app-black focus-visible:ring-app-green",
        black:
          "border-app-black bg-app-black text-white hover:bg-black focus-visible:ring-app-black focus-visible:ring-offset-white",
        yellow:
          "border-app-yellow bg-app-yellow text-app-black hover:bg-white focus-visible:ring-app-yellow",
        orange:
          "border-app-orange bg-app-orange text-white hover:bg-white hover:text-app-orange focus-visible:ring-app-orange",
        danger:
          "border-app-danger bg-app-danger text-white hover:bg-white hover:text-app-danger focus-visible:ring-app-danger",
      },
      size: {
        md: "h-10 rounded-lg px-6 text-base font-medium",
        sm: "h-8 rounded-md px-4 text-sm",
        xs: "h-5 rounded px-1.5 py-0.5 text-xs",
        default:
          "h-12 rounded-lg px-8 text-base font-medium lg:text-lg lg:font-semibold",
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
            <Spinner className={cn("w-5", size === "xs" && "w-3")} />
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
