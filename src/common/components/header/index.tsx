import { getSearchProductsQueryOptions } from "@/api-clients/user-api-client/queries";
import Logo from "@/common/components/icons/logo";
import Spinner from "@/common/components/ui/spinner";
import UserDropdownMenu from "@/common/components/user-dropdown-menu";
import routes from "@/config/routes";
import {
  allAccessNavigations,
  navigations,
  productAccessNavigations,
} from "@/constants/header";
import useActiveCurrency from "@/hooks/useActiveCurrency";
import useCartData from "@/hooks/useCartData";
import useHeaderHeight from "@/hooks/useHeaderHeight";
import { useUserSession } from "@/hooks/useUserSession";
import { cn, getApiErrorMessage } from "@/lib/utils";
import {
  useClickOutside,
  useDebouncedValue,
  useInputState,
} from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import Image from "next/image";

import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { LuShoppingCart, LuUser } from "react-icons/lu";
import useMeasure from "react-use-measure";

const Header = () => {
  const { user } = useUserSession();

  const [headerRef, headerBounds] = useMeasure();
  const { setHeaderHeight } = useHeaderHeight();
  const router = useRouter();

  useEffect(() => {
    setHeaderHeight(headerBounds.height);
  }, [headerBounds.height, setHeaderHeight]);

  return (
    <header
      ref={headerRef}
      className="sticky left-0 top-0 z-[99] border-b border-app-dark-grey bg-white py-5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)]"
    >
      <div className="container relative">
        <div className="flex items-center justify-between">
          <Logo className="max-w-[221px]" />

          <div className="flex items-center gap-x-4">
            <SearchProducts />
            {user && <UserDropdownMenu user={user} />}
            {!user && (
              <button
                onClick={() => router.push(routes.logIn)}
                className="__c_all __fv aspect-square h-9 overflow-hidden rounded-full border border-app-black duration-200 hover:scale-105"
              >
                <LuUser className="size-4" />
              </button>
            )}
            {/* <button
              onClick={() => router.push(routes.accountInformation)}
              className="__fv h-9 aspect-square rounded-full border-[3px] hover:scale-105 duration-200 border-app-yellow __c_all text-lg"
            >
              <AiOutlineUser />
            </button> */}
            <ShoppingCartItem />
          </div>
        </div>

        {/* Naviagations --Start-- */}
        <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <ul className="flex items-center gap-x-[45px]">
            {(user
              ? user.access == "product"
                ? productAccessNavigations
                : allAccessNavigations
              : navigations
            ).map(({ label, url, ...props }, i) => (
              <li key={i}>
                <Link
                  className={cn(
                    "__fv text-app-black font-medium duration-200 hover:text-app-dark-green font-roboto-serif",
                    url === router.pathname && "text-app-dark-green",
                    (props as any)?.className,
                  )}
                  href={url}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Naviagations --End-- */}
      </div>
    </header>
  );
};

function ShoppingCartItem() {
  const router = useRouter();
  const { productCart } = useCartData();

  return (
    <button
      onClick={() => router.push(routes.cart)}
      className="__fv __c_all relative aspect-square h-9 rounded-full border border-black text-lg duration-200 hover:scale-105"
    >
      <LuShoppingCart className="size-4" />

      {productCart.length > 0 && (
        <div className="absolute right-0 top-0 z-10 flex h-6 min-w-[24px] -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-[15px] bg-app-primary px-1.5 text-sm/[14px] font-medium text-white">
          {productCart.length}
        </div>
      )}
    </button>
  );
}

export default Header;

const SearchProducts = () => {
  const { currency_symbol } = useActiveCurrency();

  const router = useRouter();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [query, setQuery] = useInputState("");

  const [debouncedQuery] = useDebouncedValue(query, 500);

  const searchProductsQuery = useQuery({
    ...getSearchProductsQueryOptions({
      axiosReqConfig: {
        params: {
          q: debouncedQuery,
        },
      },
    }),
    enabled: !!debouncedQuery.trim(),
  });
  const products = searchProductsQuery.data?.data || [];

  useEffect(() => {
    setIsOpenDropdown(searchProductsQuery.isFetched);
  }, [searchProductsQuery.isFetched]);

  const ref = useClickOutside(() => {
    setIsOpenDropdown(false);
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push({
          pathname: routes.products,
          query: {
            q: query,
          },
        });
        setIsOpenDropdown(false);
        setQuery("");
      }}
      className="relative z-50 w-[220px]"
      ref={ref}
    >
      <input
        type="text"
        className="h-10 w-full rounded-full border-2 border-app-black px-3.5 pr-10 font-medium outline-none"
        placeholder="Search.."
        value={query}
        onChange={setQuery}
        onFocus={() => {
          if (!!query.trim()) {
            setIsOpenDropdown(true);
          }
        }}
      />

      <button
        type="submit"
        disabled={searchProductsQuery.isLoading}
        className="absolute right-[3px] top-1/2 flex aspect-square h-[34px] -translate-y-1/2 items-center justify-center rounded-full duration-200 hover:bg-gray-100 disabled:pointer-events-none"
      >
        {searchProductsQuery.isLoading ? (
          <Spinner className="size-[18px]" />
        ) : (
          <Search className="size-[18px]" />
        )}
      </button>

      {!!debouncedQuery.trim() && isOpenDropdown && (
        <div className="absolute right-0 top-full mt-2.5 max-h-[250px] w-[300px] overflow-y-auto rounded-md border border-gray-100 bg-white py-3 shadow-md">
          {searchProductsQuery.isError ? (
            <p className="px-5 text-center text-sm font-medium text-app-danger">
              {getApiErrorMessage(searchProductsQuery.error)}
            </p>
          ) : products.length <= 0 ? (
            <p className="p-5 text-center text-sm font-medium text-app-text">
              Geen producten gevonden :(
            </p>
          ) : (
            products.map((product, i) => {
              return (
                <Fragment key={product.id}>
                  <Link
                    onClick={() => {
                      setIsOpenDropdown(false);
                      setQuery("");
                    }}
                    href={routes.product(product.slug)}
                    className="grid grid-cols-[50px,auto] gap-3 px-3 py-1.5 hover:bg-gray-100"
                  >
                    <div className="relative aspect-square overflow-hidden rounded">
                      <Image
                        src={product.images[0]}
                        fill
                        alt={product.name}
                        className="object-cover object-center"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{product.name}</h3>
                      <div className="mt-0.5 flex items-center gap-1.5 text-sm">
                        {product.type === "simple" ? (
                          <>
                            {product.regularPrice && (
                              <p
                                className={cn(
                                  product.salePrice &&
                                    "line-through text-app-text",
                                )}
                              >
                                {currency_symbol}
                                {product.regularPrice}
                              </p>
                            )}
                            {product.salePrice && (
                              <p className="font-semibold text-app-black">
                                {currency_symbol}
                                {product.salePrice}
                              </p>
                            )}
                          </>
                        ) : product.type === "variable" ? (
                          <p className="font-semibold">
                            {currency_symbol}
                            {product.lowestPrice} - {currency_symbol}
                            {product.highestPrice}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </Link>

                  {i + 1 !== products.length && (
                    <div className="mx-auto my-1.5 h-px w-[calc(100%-30px)] bg-app-grey" />
                  )}
                </Fragment>
              );
            })
          )}
        </div>
      )}
    </form>
  );
};
