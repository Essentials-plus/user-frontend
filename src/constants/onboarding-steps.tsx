import { StepKeyValue } from "@/hooks/useOnboardingSteps";
import { Payment_Method, User } from "@/types/api-responses/users";
import Step1 from "@/views/onboarding/components/step-1";
import Step2 from "@/views/onboarding/components/step-2";
import Step3 from "@/views/onboarding/components/step-3";

export type Props = {
  user: User;
  payment_method?: Payment_Method;
};
type OnboardingStep = {
  content: ({}: Props) => JSX.Element;
  title: string;
};
export const onboardingSteps: Record<StepKeyValue, OnboardingStep> = {
  credentials: {
    content: Step1,
    title: "Jouw gegevens",
  },
  menu: {
    content: Step2,
    title: "Stel je menu samen",
  },
  payment: {
    content: Step3,
    title: "Betaalgegevens",
  },
};
