/* eslint-disable no-unused-vars */
"use client";
import { userApiClient } from "@/api-clients/user-api-client";
import { getProductCartQueryOptions } from "@/api-clients/user-api-client/queries";
import { getClientErrorMsg } from "@/lib/utils";
import { ProductCart } from "@/types/api-responses/product-attribute";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

export const CART_STATE = atomWithStorage<ProductCart[]>("cart", []);

type CartDataType = {
  productCart: ProductCart[];
  isLoading: boolean;
  isExistOnCart: (productId?: string, variationId?: string) => boolean;
  handleAddToCart: (d?: ProductCart) => Promise<void>;
  refetch: () => Promise<any>;
  handleRemoveCart: (id?: string) => Promise<void>;
  updateCartItem: (itemId?: string, count?: number) => Promise<void>;
};

const CartDataContext = createContext({} as CartDataType);

type Props = {
  children: ReactNode;
};

export function CartDataProvider({ children }: Props) {
  const {
    data: productCartData,
    refetch,
    isLoading,
  } = useQuery({
    ...getProductCartQueryOptions(),
  });

  const [productCart, setProductCart] = useState<ProductCart[]>([]);

  const debounced = useDebouncedCallback<(v: ProductCart[]) => any>(
    // function
    async (value) => {
      try {
        await userApiClient.put("/product/cart/update/data", {
          productCart: value.map((v) => ({ id: v.id, count: v.count })),
        });
        await refetch();
      } catch (error) {}
    },
    // delay in ms
    1000,
  );

  useEffect(() => {
    setProductCart(productCartData?.data || []);
  }, [productCartData?.data]);

  const [cartState, setCartState] = useAtom(CART_STATE);

  const handleAddToCart = async (d?: ProductCart) => {
    if (!d) return;
    // if (!isExistOnCart(d.productId, d.variationId)) {
    //   setCartState((s) => [...s, d]);
    // }
    try {
      await userApiClient.post("/product/cart", {
        productId: d.productId,
        count: d.count,
        variationId: d.variationId,
      });
      await refetch();
    } catch (error) {
      toast.error(getClientErrorMsg(error));
    }
  };

  const handleRemoveCart = async (id?: string) => {
    if (!id) return;

    if (id == "REMOVE_ALL") {
      await userApiClient.delete(`/product/cart/all`);
      await refetch();
      return;
    }

    await userApiClient.delete(`/product/cart/${id}`);
    await refetch();

    // const prevCart = [...cartState];
    // if (variationId) {
    //   const findIndex = prevCart.findIndex(
    //     (c) => c.productId == productId && variationId == c.variationId
    //   );
    //   const filterCart = prevCart.filter((c, i) => i != findIndex);

    //   setCartState(filterCart);
    // } else {
    //   const filterCart = prevCart.filter((c) => c.productId != productId);

    //   setCartState(filterCart);
    // }
  };

  const handleUpdateCart = (
    productId: string,
    data: Partial<ProductCart>,
    variationId?: string,
  ) => {
    if (!productId) return;

    const prevCart = [...cartState];
    const filterCart = prevCart.map((c) => {
      if (c.productId == productId) {
        if (variationId) {
          if (variationId == c.variationId) {
            c = { ...c, ...data };
          }
        } else {
          c = { ...c, ...data };
        }
      }
      return c;
    });

    setCartState(filterCart);
  };

  const isExistOnCart = (productId?: string, variationId?: string) => {
    if (variationId) {
      return productCart?.find(
        (c) => c.productId === productId && c.variationId === variationId,
      )
        ? true
        : false;
    } else {
      return productCart?.find((c) => c.productId === productId) ? true : false;
    }
  };

  const updateCartItem = async (itemId?: string, count?: number) => {
    if (!itemId || !count) return;

    const newItem = [...productCart].map((v) => {
      if (v.id == itemId) {
        v.count = count;
      }
      return v;
    });

    debounced(newItem);

    setProductCart(newItem);
  };

  return (
    <CartDataContext.Provider
      value={{
        isLoading,
        productCart,
        isExistOnCart,

        handleAddToCart,
        refetch,
        handleRemoveCart,
        updateCartItem,
      }}
    >
      {children}
    </CartDataContext.Provider>
  );
}

export function useCartData() {
  return useContext(CartDataContext);
}

export default useCartData;
