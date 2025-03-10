/* eslint-disable no-unused-vars */

import guestApiClient from "@/api-clients/guest-api-client";
import { getProductCartQueryOptions } from "@/api-clients/user-api-client/queries";
import { getClientErrorMsg, getShippingAmount } from "@/lib/utils";
import { ApiResponseSuccessBase } from "@/types/api-responses";
import { ProductCart } from "@/types/api-responses/product-attribute";
import { calculatePercentageOff } from "@/views/cart/components/cart-items-section";
import useAppliedCoupon from "@/views/cart/hooks/useAppliedCoupon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import { useCallback, useMemo } from "react";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

const isUpdatingCartAtom = atom(false);

function useCartData() {
  const queryClient = useQueryClient();

  const [isUpdatingCart, setIsUpdatingCart] = useAtom(isUpdatingCartAtom);

  const productCartQueryOptions = getProductCartQueryOptions();
  const productCartQuery = useQuery({
    ...productCartQueryOptions,
  });

  const updateCartMutation = useMutation({
    mutationKey: ["update-cart-mutation"],
    mutationFn: (updatedCartProducts: ProductCart[]) =>
      guestApiClient.put("/product/cart/update/data", {
        productCart: updatedCartProducts.map((v) => ({
          id: v.id,
          count: v.count,
        })),
      }),
    onMutate() {
      setIsUpdatingCart(true);
    },
    onSettled() {
      setIsUpdatingCart(false);
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: (cart: ProductCart) =>
      guestApiClient.post("/product/cart", {
        productId: cart.productId,
        count: cart.count,
        variationId: cart.variationId,
      }),
  });
  const removeFromCartMutation = useMutation({
    mutationFn: (id: string) => guestApiClient.delete(`/product/cart/${id}`),
  });

  const { coupon } = useAppliedCoupon();

  const cartProducts = useMemo(
    () => productCartQuery.data?.data || [],
    [productCartQuery.data?.data],
  );

  const debounced = useDebouncedCallback<(v: ProductCart[]) => any>(
    async (updatedCartProducts: ProductCart[]) => {
      try {
        await updateCartMutation.mutateAsync(updatedCartProducts);
        await productCartQuery.refetch();
      } catch (error) {}
    },
    // delay in ms
    1000,
  );

  const handleAddToCart = useCallback(async (d?: ProductCart) => {
    if (!d) return;

    try {
      await addToCartMutation.mutateAsync(d);
      await productCartQuery.refetch();
    } catch (error) {
      toast.error(getClientErrorMsg(error));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemoveCart = useCallback(async (id?: string) => {
    if (!id) return;

    // if (id == "REMOVE_ALL") {
    //   await guestApiClient.delete(`/product/cart/all`);
    //   await productCartQuery.refetch();
    //   return;
    // }

    await removeFromCartMutation.mutateAsync(id);
    await productCartQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isExistOnCart = useCallback(
    (productId?: string, variationId?: string) => {
      if (variationId) {
        return cartProducts?.find(
          (c) => c.productId === productId && c.variationId === variationId,
        )
          ? true
          : false;
      } else {
        return cartProducts?.find((c) => c.productId === productId)
          ? true
          : false;
      }
    },
    [cartProducts],
  );

  const updateCartItem = async (itemId?: string, count?: number) => {
    if (!itemId || !count) return;
    queryClient.setQueryData(
      productCartQueryOptions.queryKey,
      (
        oldData: ApiResponseSuccessBase<ProductCart[]>,
      ): ApiResponseSuccessBase<ProductCart[]> => {
        const updatedCartProducts = structuredClone(oldData).data.map(
          (product) => {
            if (product.id == itemId) {
              product.count = count;
            }
            return product;
          },
        );

        debounced(updatedCartProducts);
        return {
          ...oldData,
          data: updatedCartProducts,
        };
      },
    );
  };

  const cartOverview = useMemo(() => {
    const totalValue = cartProducts?.reduce((prev, d) => {
      if (d.product.type == "simple") {
        return (
          prev + (d.product.salePrice || d.product.regularPrice || 0) * d.count
        );
      } else {
        const findVar = d.product.variations?.find(
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
  }, [cartProducts, coupon]);

  return {
    isLoading: productCartQuery.isLoading,
    productCart: cartProducts,
    cartOverview,
    isExistOnCart,

    handleAddToCart,
    refetch: productCartQuery.refetch,
    handleRemoveCart,
    updateCartItem,
    isUpdatingCart,
  };
}

export default useCartData;
