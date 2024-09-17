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
          className="absolute h-[80%] top-1/2 left-0 -translate-y-1/2 z-[-1] w-full"
          style={{ paddingRight: registerBounds.left + 24 }}
        >
          <div className="bg-[#F3F3F3] w-full h-full rounded-r-[80px] relative flex items-end pb-5">
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
        <div className="max-w-[calc(1000px+48px)] px-6 mx-auto">
          <div className="w-full rounded-[50px] border-2 border-black px-9 pt-5 pb-[56px] bg-white overflow-hidden relative isolate">
            {children}
            <div className="absolute top-0 right-0 translate-x-[30%] -translate-y-[30%] z-[-1]">
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
