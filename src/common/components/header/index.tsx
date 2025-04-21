"use client";

import { getSearchProductsQueryOptions } from "@/api-clients/user-api-client/queries";
import Logo from "@/common/components/icons/logo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/common/components/ui/sheet";
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
import { ChevronLeft, Search, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { LuMenu, LuShoppingCart, LuUser } from "react-icons/lu";
import useMeasure from "react-use-measure";

const Header = () => {
  const { user } = useUserSession();
  const [headerRef, headerBounds] = useMeasure();
  const { setHeaderHeight } = useHeaderHeight();
  const router = useRouter();

  useEffect(() => {
    setHeaderHeight(headerBounds.height);
  }, [headerBounds.height, setHeaderHeight]);

  const navigationItems = user
    ? user.access == "product"
      ? productAccessNavigations
      : allAccessNavigations
    : navigations;

  return (
    <header
      ref={headerRef}
      className="sticky left-0 top-0 z-[99] border-b border-app-dark-grey/50 bg-white py-3 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)] lg:py-5"
    >
      <div className="container relative max-sm:px-3.5">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 lg:flex lg:justify-between">
          <div className="flex items-center lg:hidden">
            {/* Mobile Menu Trigger */}
            <div className="flex items-center lg:hidden">
              <MobileMenu items={navigationItems} />
              <MobileSearch />
            </div>
          </div>

          <div className="max-lg:flex max-lg:items-center max-lg:justify-center">
            <Logo className="flex max-w-[140px] items-center sm:max-w-[221px]" />
          </div>

          {/* Desktop nav */}
          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <ul className="flex items-center gap-x-[45px]">
              {navigationItems.map(({ label, url, ...props }, i) => (
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

          <div className="flex items-center justify-end sm:gap-x-4">
            <div className="hidden lg:block">
              <SearchProducts />
            </div>

            {user && <UserDropdownMenu user={user} />}
            {!user && (
              <button
                onClick={() => router.push(routes.logIn)}
                className="__c_all __fv aspect-square h-9 overflow-hidden rounded-full border-app-black duration-200 hover:scale-105 lg:border"
              >
                <LuUser className="size-5 lg:size-4" />
              </button>
            )}
            <ShoppingCartItem />
          </div>
        </div>
      </div>
    </header>
  );
};

const MobileSearch = () => {
  const [isOpenSearchBar, setIsOpenSearchBar] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpenSearchBar(true)}
        className="__fv __c_all aspect-square h-9 overflow-hidden rounded-full"
      >
        <SearchIcon className="size-5" />
      </button>

      {isOpenSearchBar && (
        <div className="absolute left-1/2 top-1/2 z-50 flex h-[calc(100%+24px)] w-full -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 bg-white px-3.5">
          <button
            onClick={() => setIsOpenSearchBar(false)}
            className="__fv __c_all aspect-square h-9 shrink-0 overflow-hidden rounded-full border border-app-black"
          >
            <ChevronLeft className="size-5" />
          </button>
          <SearchProducts
            autoFocus={true}
            onSearch={() => {
              setIsOpenSearchBar(false);
            }}
          />
        </div>
      )}
    </>
  );
};

function MobileMenu({ items }: { items: typeof navigations }) {
  const router = useRouter();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="__fv __c_all aspect-square h-9 overflow-hidden rounded-full">
          <LuMenu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-col gap-4">
          {items.map(({ label, url }, i) => (
            <SheetClose asChild key={i}>
              <Link
                href={url}
                className={cn(
                  "font-semibold text-lg hover:text-app-dark-green",
                  url === router.pathname && "text-app-dark-green",
                )}
              >
                {label}
              </Link>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ShoppingCartItem() {
  const router = useRouter();
  const { productCart } = useCartData();

  return (
    <button
      onClick={() => router.push(routes.cart)}
      className="__fv __c_all relative aspect-square h-9 rounded-full border-black text-lg duration-200 hover:scale-105 lg:border"
    >
      <LuShoppingCart className="size-5 lg:size-4" />

      {productCart.length > 0 && (
        <div className="absolute right-0 top-0 z-10 flex h-[17px] min-w-[17px] translate-x-[20%] translate-y-[-20%] items-center justify-center rounded-[15px] bg-app-primary px-1.5 text-sm/[14px] font-medium text-white max-md:text-[10px] lg:h-6 lg:min-w-[24px] lg:-translate-y-1/2 lg:translate-x-1/2">
          {productCart.length}
        </div>
      )}
    </button>
  );
}

export default Header;

const SearchProducts = ({
  autoFocus = false,
  onSearch,
}: {
  autoFocus?: boolean;
  onSearch?: () => void;
}) => {
  const { currency_symbol } = useActiveCurrency();
  const router = useRouter();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [query, setQuery] = useInputState("");
  const [debouncedQuery] = useDebouncedValue(query, 500);

  const searchProductsQuery = useQuery({
    ...getSearchProductsQueryOptions({
      axiosReqConfig: {
        params: { q: debouncedQuery },
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
        onSearch && onSearch();
        router.push({
          pathname: routes.products,
          query: { q: query },
        });
        setIsOpenDropdown(false);
        setQuery("");
      }}
      className="relative z-50 w-full lg:max-w-[220px]"
      ref={ref}
    >
      <input
        autoFocus={autoFocus}
        type="text"
        className="h-9 w-full rounded-full border border-app-black px-3.5 pr-10 font-medium outline-none lg:h-10 lg:border-2"
        placeholder="Search.."
        value={query}
        onChange={setQuery}
        onFocus={() => {
          if (!!query.trim()) setIsOpenDropdown(true);
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
        <div className="absolute right-0 top-full mt-2.5 max-h-[250px] w-full overflow-y-auto rounded-md border border-gray-100 bg-white py-3 shadow-md lg:w-[300px]">
          {searchProductsQuery.isError ? (
            <p className="px-5 text-center text-sm font-medium text-app-danger">
              {getApiErrorMessage(searchProductsQuery.error)}
            </p>
          ) : products.length <= 0 ? (
            <p className="p-5 text-center text-sm font-medium text-app-text">
              Geen producten gevonden :(
            </p>
          ) : (
            products.map((product, i) => (
              <Fragment key={product.id}>
                <Link
                  onClick={() => {
                    setIsOpenDropdown(false);
                    setQuery("");
                    onSearch && onSearch();
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
            ))
          )}
        </div>
      )}
    </form>
  );
};
