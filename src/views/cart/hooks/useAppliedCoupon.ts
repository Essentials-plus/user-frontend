import { CouponCode } from "@/types/api-responses/coupon-code";
import { useLocalStorage } from "@mantine/hooks";

const useAppliedCoupon = () => {
  const [coupon, setCoupon, removeCoupon] = useLocalStorage<
    CouponCode | undefined
  >({
    key: "appliedCoupon",
  });

  return { coupon, setCoupon, removeCoupon };
};

export default useAppliedCoupon;
