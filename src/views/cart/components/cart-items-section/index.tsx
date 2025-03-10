import guestApiClient from "@/api-clients/guest-api-client";
import Button, { button } from "@/common/components/ui/button";
import Spinner from "@/common/components/ui/spinner";
import routes from "@/config/routes";
import { guestLoginQueryKey } from "@/constants";
import useActiveCurrency from "@/hooks/useActiveCurrency";
import useCartData from "@/hooks/useCartData";
import { useUserSession } from "@/hooks/useUserSession";
import { cn, getClientErrorMsg } from "@/lib/utils";
import { ApiResponseSuccessBase } from "@/types/api-responses";
import { CouponCode } from "@/types/api-responses/coupon-code";
import useAppliedCoupon from "@/views/cart/hooks/useAppliedCoupon";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useMeasure from "react-use-measure";
import { toast } from "sonner";
import { z } from "zod";
import ProductCartItem from "./product-cart-item";

const CartItemsSection = () => {
  const [ref, bounds] = useMeasure();

  const { productCart, isLoading } = useCartData();

  if (isLoading)
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="size-6">
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
  //         href={routes.lifestyleProduct}
  //         className={cn(button({ className: "mt-8" }))}
  //       >
  //         VERDER WINKELEN
  //       </Link>
  //     </div>
  //   );

  return (
    <section className="my-11 w-full overflow-x-hidden">
      <div className="container" ref={ref}>
        <h1 className="__h3">Je Winkelwagen</h1>
      </div>

      <div className="mt-9 grid grid-cols-[63%,37%] gap-20">
        <div>
          <div
            style={{
              paddingLeft: bounds.left + 24,
            }}
            className="grid grid-cols-[380px,1fr,1fr,1fr] gap-5 rounded-r-full bg-app-yellow py-4 font-bold"
          >
            <p>Artikel</p>
            <p>Artikelprijs</p>
            <p>Hoeveelheid</p>
            <p>Totaal</p>
          </div>

          {productCart.length <= 0 ? (
            <>
              <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                <ShoppingCart className="size-14" />
                <p className="mt-8 text-3xl font-bold text-black">
                  ER ZIJN GEEN ARTIKELEN IN <br /> JE WINKELWAGEN
                </p>

                <Link
                  href={routes.lifestyleProduct}
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
              {productCart.map((d) => (
                <ProductCartItem key={d.id} d={d} />
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          {/* {!user && (
            <div className="inset-0 absolute bg-black/10 z-10 rounded-l-[30px] cursor-not-allowed backdrop-blur-[1px]"></div>
          )} */}
          <div className="rounded-l-[30px] bg-app-yellow px-8 py-6">
            <div
              style={{
                paddingRight: bounds.left,
              }}
            >
              <CartOverViewCard />
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
  const { removeCoupon } = useAppliedCoupon();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<{ code: string }>({
    resolver: zodResolver(
      z.object({ code: z.string().min(1, "coupon vereist") }),
    ),
    values: {
      code: coupon?.code || "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(async (d) => {
        if (coupon) return;
        try {
          const { data } = await guestApiClient.post<
            ApiResponseSuccessBase<CouponCode>
          >("/product/cart/coupon", d);
          onValidateCoupon(data.data);
        } catch (err) {
          toast.error(getClientErrorMsg(err));
        }
      })}
      className={cn("mt-3 space-y-3.5")}
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
      {coupon ? (
        <Button
          size={"md"}
          type="button"
          onClick={removeCoupon}
          intent={"orange"}
          className="w-full rounded-none"
        >
          Verwijderen
        </Button>
      ) : (
        <Button
          size={"md"}
          loading={isSubmitting}
          intent={"black"}
          className="w-full rounded-none"
        >
          Toepassen
        </Button>
      )}
    </form>
  );
}

export default CartItemsSection;

export const CartOverViewCard = ({
  checkOutLayout,
}: {
  checkOutLayout?: boolean;
}) => {
  const { cartOverview } = useCartData();
  const { currency_symbol } = useActiveCurrency();

  const { productCart, isUpdatingCart } = useCartData();

  const router = useRouter();
  const { user, guestUserId } = useUserSession();
  const { coupon, setCoupon } = useAppliedCoupon();

  const { currentValue, oldValue, discountValue, shippingAmount } =
    cartOverview;

  return (
    <>
      <h3 className="__h5 font-bold">Kortingscode</h3>

      <CouponForm coupon={coupon} onValidateCoupon={(d) => setCoupon(d)} />

      <div className="__h5 mt-5 flex items-center justify-between font-bold">
        <p>Overzicht:</p>
      </div>

      <div
        className={cn(
          "my-4 space-y-3 border-y py-4 border-app-black/20",
          checkOutLayout && "border-[#d8d8d8]/60",
        )}
      >
        <div className="__h5 flex items-center justify-between font-normal">
          <p>Subtotaal</p>
          <p>
            {currency_symbol} {oldValue}
          </p>
        </div>
        {/* <div className="__h5 flex items-center justify-between font-normal">
          <p>Levering</p>
          <p>GRATIS</p>
        </div> */}
        {coupon && (
          <div className="__h5 flex items-center justify-between font-normal">
            <p>Discount</p>
            <p>
              {currency_symbol} {discountValue.toFixed(2)}
            </p>
          </div>
        )}
        <div className="__h5 flex items-center justify-between font-normal">
          <p>Shipping</p>
          <p>
            {currency_symbol} {shippingAmount}
          </p>
        </div>
      </div>

      <div className="__h5 mt-5 flex items-center justify-between font-bold">
        <p>Totaal:</p>
        <p>
          {currency_symbol} {currentValue.toFixed(2)}
        </p>
      </div>

      {router.pathname === routes.cart && (
        <Button
          size={"md"}
          intent={"black"}
          onClick={() => {
            if (productCart.length <= 0) {
              router.push(routes.products);
              return;
            }
            if (!user && !z.string().email().safeParse(guestUserId).success) {
              router.push({
                pathname: routes.logIn,
                query: {
                  [guestLoginQueryKey]: true,
                },
              });
              return;
            }
            router.push(routes.checkout);
          }}
          disabled={isUpdatingCart}
          className="mt-5 w-full rounded-none"
        >
          Bestelling afrekenen
        </Button>
      )}
    </>
  );
};
