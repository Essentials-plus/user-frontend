import FormWrapper from "@/common/components/form-wrapper";
import { onboardingSteps } from "@/constants/onboarding-steps";
import { StepKeyValue } from "@/hooks/useOnboardingSteps";
import { Payment_Method, User } from "@/types/api-responses/users";
import FacilitiesSection from "@/views/onboarding/components/facilities-section";

type Props = {
  user: User;
  page: StepKeyValue;
  paymentMethod: Payment_Method | undefined;
};

const Onboarding = ({ page, user, paymentMethod }: Props) => {
  const activeStep = onboardingSteps[page];

  return (
    <>
      <FormWrapper
        isCornerImgHidden={page === "payment"}
        wrapperProps={{ className: "mt-0" }}
      >
        <activeStep.content user={user} payment_method={paymentMethod} />
      </FormWrapper>
      <FacilitiesSection />
    </>
  );
};

export default Onboarding;
