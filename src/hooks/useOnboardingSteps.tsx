import { atom, useAtom } from "jotai";

export type StepKeyValue = "credentials" | "menu" | "payment";

const stepKeyAtom = atom<StepKeyValue>("credentials");
const useOnboardingStep = () => {
  const [activeStepKey, setActiveStepKey] = useAtom(stepKeyAtom);

  return {
    activeStepKey,
    setActiveStepKey,
  };
};
export default useOnboardingStep;
