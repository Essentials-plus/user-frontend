import Button from "@/common/components/ui/button";
import useStartToday from "@/hooks/useStartToday";
import { ComponentPropsWithoutRef } from "react";

const StartTotdayButton = ({
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Button>) => {
  const { handleStartToday } = useStartToday();

  return (
    <Button {...props} onClick={() => handleStartToday()}>
      {children || "Begin Vandaag"}
    </Button>
  );
};

export default StartTotdayButton;
