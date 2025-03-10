import { cn } from "@/lib/utils";
import Image from "next/image";
import { HTMLAttributes, ReactNode } from "react";
import useMeasure from "react-use-measure";

const FormWrapper = ({
  children,
  wrapperProps,
  isCornerImgHidden = false,
}: {
  children: ReactNode;
  wrapperProps?: HTMLAttributes<HTMLElement>;
  isCornerImgHidden?: boolean;
}) => {
  const [registerRef, registerBounds] = useMeasure();

  return (
    <section
      className={cn("mt-20 mb-[100px]", wrapperProps?.className)}
      {...wrapperProps}
    >
      <div className="container" ref={registerRef}></div>
      <div className="relative isolate">
        <div
          className="absolute left-0 top-1/2 z-[-1] h-4/5 w-full -translate-y-1/2"
          style={{ paddingRight: registerBounds.left + 24 }}
        >
          <div className="relative flex size-full items-end rounded-r-[80px] bg-[#F3F3F3] pb-5">
            <div>
              <Image
                src={"/imgs/register/register-form-img-2.png"}
                alt="register-form-img-2"
                width={708}
                height={630}
                className="max-w-[300px]"
              />
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-[calc(1000px+48px)] px-6">
          <div className="relative isolate w-full overflow-hidden rounded-[50px] border-2 border-black bg-white px-9 pb-[56px] pt-5">
            {children}
            <div className="absolute right-0 top-0 z-[-1] translate-x-[30%] translate-y-[-30%]">
              {!isCornerImgHidden && (
                <Image
                  src={"/imgs/register/register-form-img-1.png"}
                  alt="register-form-img-1"
                  width={812}
                  height={742}
                  className="max-w-[320px]"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormWrapper;
