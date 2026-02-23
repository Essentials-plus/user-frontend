import FormWrapper from '@/common/components/form-wrapper';
import routes from '@/config/routes';
import { onboardingSteps } from '@/constants/onboarding-steps';
import { StepKeyValue } from '@/hooks/useOnboardingSteps';
import { Payment_Method, User } from '@/types/api-responses/users';
import FacilitiesSection from '@/views/onboarding/components/facilities-section';
import { useEffect } from 'react';

type Props = {
  user: User;
  page: StepKeyValue;
  paymentMethod: Payment_Method | undefined;
};

const Onboarding = ({ page, user, paymentMethod }: Props) => {
  const activeStep = onboardingSteps[page] || null;

  useEffect(() => {
    if (!activeStep) {
      window.location.href = routes.home;
    }
  }, [activeStep]);
  if (!activeStep) return null;

  return (
    <>
      <FormWrapper
        isCornerImgHidden={true}
        wrapperProps={{ className: 'mt-0' }}
        isLeftImgHidden
      >
        <activeStep.content user={user} payment_method={paymentMethod} />
      </FormWrapper>
      <FacilitiesSection />
    </>
  );
};

export default Onboarding;
