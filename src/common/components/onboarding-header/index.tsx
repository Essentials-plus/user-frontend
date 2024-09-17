import ArrowRightIcon from "@/common/components/icons/arrow-right-icon";
import Logo from "@/common/components/icons/logo";
import { onboardingSteps } from "@/constants/onboarding-steps";
import { StepKeyValue } from "@/hooks/useOnboardingSteps";
import { cn } from "@/lib/utils";

type Props = {
  page: StepKeyValue;
};

const OnboardingHeader = ({ page }: Props) => {
  const steps = Object.values(onboardingSteps);
  const stepKeys = Object.keys(onboardingSteps);

  return (
    <header className="py-11 pb-9">
      <div className="container">
        <div className="max-w-[1032px] mx-auto">
          <div className="flex items-center gap-x-[70px]">
            <Logo className="max-w-[221px]" />

            <div className="flex items-center gap-x-11 -translate-y-1.5">
              {steps.map(({ title }, i) => (
                <button
                  key={i}
                  className={cn(
                    "flex items-center gap-x-10 text-app-dark-grey",
                    page === stepKeys[i] && "text-app-darker-green",
                  )}
                >
                  <p className="text-xl font-medium shrink-0">{title}</p>
                  <ArrowRightIcon
                    className={cn("w-11", i === steps.length - 1 && "hidden")}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default OnboardingHeader;
