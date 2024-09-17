import Logo from "@/common/components/icons/logo";
import UserDropdownMenu from "@/common/components/user-dropdown-menu";
import {
  allAccessNavigations,
  navigations,
  productAccessNavigations,
} from "@/constants/header";
import useCartData from "@/hooks/useCartData";
import useHeaderHeight from "@/hooks/useHeaderHeight";
import { useUserSession } from "@/hooks/useUserSession";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
      className="py-5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.05)] border-b border-app-dark-grey sticky top-0 left-0 z-[99] bg-white"
    >
      <div className="container relative">
        <div className="flex items-center justify-between">
          <Logo className="max-w-[221px]" />

          <div className="flex items-center gap-x-4">
            {user && <UserDropdownMenu user={user} />}
            {!user && (
              <button
                onClick={() => router.push("/log-in")}
                className="h-9 aspect-square rounded-full border hover:scale-105 duration-200 border-app-black __c_all overflow-hidden __fv"
              >
                <LuUser className="size-4" />
              </button>
            )}
            {/* <button
              onClick={() => router.push("/account-information")}
              className="__fv h-9 aspect-square rounded-full border-[3px] hover:scale-105 duration-200 border-app-yellow __c_all text-lg"
            >
              <AiOutlineUser />
            </button> */}
            <ShoppingCartItem />
          </div>
        </div>

        {/* Naviagations --Start-- */}
        <nav className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <ul className="flex items-center gap-x-[60px]">
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
      onClick={() => router.push("/cart")}
      className="__fv h-9 aspect-square relative rounded-full border hover:scale-105 duration-200 border-black __c_all text-lg"
    >
      <LuShoppingCart className="size-4" />

      {productCart.length > 0 && (
        <div className="min-w-[24px] text-sm/[14px] translate-x-1/2 -translate-y-1/2 h-6 rounded-[15px] bg-app-primary text-white font-medium flex items-center justify-center px-1.5 absolute top-0 right-0 z-10">
          {productCart.length}
        </div>
      )}
    </button>
  );
}

export default Header;
