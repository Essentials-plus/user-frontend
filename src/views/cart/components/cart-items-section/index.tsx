import { userApiClient } from "@/api-clients/user-api-client";
import { getCreateProductPaymentSessionLinkMutationOptions } from "@/api-clients/user-api-client/mutations";
import Button, { button } from "@/common/components/ui/button";
import Spinner from "@/common/components/ui/spinner";
import useCartData from "@/hooks/useCartData";
import useOpenUpdateAddressDialog from "@/hooks/useOpenUpdateAddressDialog";
import { useUserSession } from "@/hooks/useUserSession";
import {
  cn,
  getApiErrorMessage,
  getClientErrorMsg,
  getShippingAmount,
} from "@/lib/utils";
import { ApiResponseSuccessBase } from "@/types/api-responses";
import { CouponCode } from "@/types/api-responses/coupon-code";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import useMeasure from "react-use-measure";
import { toast } from "sonner";
import { z } from "zod";
import ProductCartItem from "./product-cart-item";

const currency_type = process.env.NEXT_PUBLIC_CURRENCY_TYPE || "eur";

const CartItemsSection = () => {
  const [ref, bounds] = useMeasure();
  const { user } = useUserSession();
  const { productCart, isLoading } = useCartData();

  const router = useRouter();

  const [coupon, setCoupon] = useState<CouponCode>();

  const { currentValue, oldValue, discountValue, shippingAmount } =
    useMemo(() => {
      const totalValue = productCart?.reduce((prev, d) => {
        if (d.product.type == "simple") {
          return (
            prev + (d.product.salePrice || d.product.regularPrice) * d.count
          );
        } else {
          const findVar = d.product.variations.find(
            (v) => v.id == d.variationId,
          );
          return (
            prev + (findVar?.salePrice || findVar?.regularPrice || 0) * d.count
          );
        }
      }, 0);

      let oldValue = totalValue;

      let currentValue = totalValue;

      let percentDiscount = 0;

      if (coupon) {
        if (coupon?.type == "amount") {
          currentValue = totalValue - coupon.value;
          percentDiscount = calculatePercentageOff(totalValue, currentValue);
        }
        if (coupon.type == "percent") {
          currentValue = totalValue - (totalValue / 100) * coupon.value;
          percentDiscount = coupon.value;
        }
      }

      const discountValue = oldValue - currentValue;

      const shippingAmount = getShippingAmount(currentValue);

      currentValue += shippingAmount;

      return {
        currentValue,
        oldValue,
        percentDiscount,
        discountValue,
        shippingAmount,
      };
    }, [productCart, coupon]);

  const { setOpenUpdateAddressDialog } = useOpenUpdateAddressDialog();

  const createProductPaymentSessionLinkMutationOptions = useMutation({
    ...getCreateProductPaymentSessionLinkMutationOptions(),
    onError(error) {
      const errorMsg = getApiErrorMessage(error);
      if (errorMsg === "Werk uw verzendadres bij.") {
        setTimeout(() => {
          setOpenUpdateAddressDialog(true);
        }, 500);
      }
      toast.error(errorMsg);
    },
    onSuccess(data) {
      router.push(data?.data?.data?.session?.url);
    },
  });

  if (isLoading)
    return (
      <div className="h-[400px] flex items-center justify-center">
        <div className="h-6 w-6">
          <Spinner />
        </div>
        Bezig met laden...
      </div>
    );

  // if (productCart.length == 0)
  //   return (
  //     <div className="py-40 flex items-center justify-center flex-col text-center px-6">
  //       <ShoppingCart className="size-14" />
  //       <p className="font-bold text-black text-3xl mt-8">
  //         ER ZIJN GEEN ARTIKELEN IN <br /> JE WINKELWAGEN
  //       </p>

  //       <Link
  //         href={"/products/lifestyle"}
  //         className={cn(button({ className: "mt-8" }))}
  //       >
  //         VERDER WINKELEN
  //       </Link>
  //     </div>
  //   );

  return (
    <section className="mt-11 w-full overflow-x-hidden">
      <div className="container" ref={ref}>
        <h1 className="__h3">Je Winkelwagen</h1>
      </div>

      <div className="grid grid-cols-[63%,37%] gap-20 mt-9">
        <div>
          <div
            style={{
              paddingLeft: bounds.left + 24,
            }}
            className="py-4 bg-app-yellow grid grid-cols-[380px,1fr,1fr,1fr] gap-5 font-bold rounded-r-full"
          >
            <p>Artikel</p>
            <p>Artikelprijs</p>
            <p>Hoeveelheid</p>
            <p>Totaal</p>
          </div>

          {productCart.length <= 0 ? (
            <>
              <div className="py-12 flex items-center justify-center flex-col text-center px-6">
                <ShoppingCart className="size-14" />
                <p className="font-bold text-black text-3xl mt-8">
                  ER ZIJN GEEN ARTIKELEN IN <br /> JE WINKELWAGEN
                </p>

                <Link
                  href={"/products/lifestyle"}
                  className={cn(button({ className: "mt-8" }))}
                >
                  VERDER WINKELEN
                </Link>
              </div>
            </>
          ) : (
            <div
              style={{
                paddingLeft: bounds.left + 24,
              }}
            >
              {productCart.map((d, i) => (
                <ProductCartItem key={"sgdgd" + i} d={d} />
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          {!user && (
            <div className="inset-0 absolute bg-black/10 z-10 rounded-l-[30px] cursor-not-allowed backdrop-blur-[1px]"></div>
          )}
          <div className="bg-app-yellow rounded-l-[30px] py-6 px-8">
            <div
              style={{
                paddingRight: bounds.left,
              }}
            >
              <h3 className="__h5 font-bold">Kortingscode</h3>

              <CouponForm
                coupon={coupon}
                onValidateCoupon={(d) => setCoupon(d)}
              />

              <div className="flex justify-between items-center __h5 font-bold mt-5">
                <p>Overzicht:</p>
              </div>

              <div className="border-y border-app-dark-grey my-4 py-4 space-y-3">
                <div className="flex justify-between items-center __h5 font-normal">
                  <p>Subtotaal</p>
                  <p>
                    {currency_type == "eur" ? "€" : "$"} {oldValue}
                  </p>
                </div>
                <div className="flex justify-between items-center __h5 font-normal">
                  <p>Levering</p>
                  <p>GRATIS</p>
                </div>
                {coupon && (
                  <div className="flex justify-between items-center __h5 font-normal">
                    <p>Discount</p>
                    <p>
                      {currency_type == "eur" ? "€" : "$"}{" "}
                      {discountValue.toFixed(2)}
                    </p>
                  </div>
                )}
                <div className="flex justify-between items-center __h5 font-normal">
                  <p>Shipping</p>
                  <p>
                    {currency_type == "eur" ? "€" : "$"} {shippingAmount}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center __h5 font-bold mt-5">
                <p>Totaal:</p>
                <p>
                  {currency_type == "eur" ? "€" : "$"} {currentValue.toFixed(2)}
                </p>
              </div>

              <Button
                size={"md"}
                intent={"black"}
                loading={
                  createProductPaymentSessionLinkMutationOptions.isPending
                }
                onClick={() =>
                  createProductPaymentSessionLinkMutationOptions.mutate()
                }
                className="w-full rounded-none mt-5"
              >
                Bestelling afrekenen
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export function calculatePercentageOff(oldPrice: number, newPrice: number) {
  const percentageOff = ((oldPrice - newPrice) / oldPrice) * 100;
  return percentageOff;
}

type Props = {
  // eslint-disable-next-line no-unused-vars
  onValidateCoupon: (d: CouponCode) => any;
  coupon?: CouponCode;
};

function CouponForm({ onValidateCoupon, coupon }: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<{ code: string }>({
    resolver: zodResolver(
      z.object({ code: z.string().min(1, "coupon vereist") }),
    ),
  });

  return (
    <form
      onSubmit={handleSubmit(async (d) => {
        try {
          const { data } = await userApiClient.post<
            ApiResponseSuccessBase<CouponCode>
          >("/product/cart/coupon", d);
          onValidateCoupon(data.data);
        } catch (err) {
          toast.error(getClientErrorMsg(err));
        }
      })}
      className={cn(
        "mt-3 space-y-3.5",
        coupon && "opacity-50 pointer-events-none",
      )}
    >
      <div>
        <input
          type="text"
          className={cn(
            "w-full bg-app-grey border-2 border-app-grey outline-none h-10 px-4",
            errors.code && "!border-red-500",
          )}
          {...register("code")}
        />
        {errors.code && (
          <div className="text-sm text-red-500">
            {errors.code.message?.toString()}
          </div>
        )}
      </div>

      <Button
        size={"md"}
        loading={isSubmitting}
        intent={"black"}
        className="w-full rounded-none"
      >
        Toepassen
      </Button>
    </form>
  );
}

export default CartItemsSection;
