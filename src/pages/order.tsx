import Spinner from "@/common/components/ui/spinner/spinner";
import useFirstRender from "@/hooks/useFirstRender";
import useStartToday from "@/hooks/useStartToday";
import { useEffect } from "react";

const Order = () => {
  const { handleStartToday } = useStartToday();
  const isFirstRender = useFirstRender();

  useEffect(() => {
    if (isFirstRender) return;

    handleStartToday({ replaceRoute: true });
  }, [handleStartToday, isFirstRender]);

  return (
    <div className="h-[80vh] flex justify-center items-center">
      <Spinner className="w-10 text-app-darker-green" />
    </div>
  );
};

export default Order;
