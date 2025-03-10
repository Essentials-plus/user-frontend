import Button, { button } from "@/common/components/ui/button";
import routes from "@/config/routes";
import useActiveCurrency from "@/hooks/useActiveCurrency";
import useCartData from "@/hooks/useCartData";
import { cn, getClientErrorMsg } from "@/lib/utils";
import { ProductType } from "@/types/api-responses/product-attribute";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type Props = {
  data: ProductType;
};

const ProductCard = ({ data }: Props) => {
  const { currency_symbol } = useActiveCurrency();

  const { handleAddToCart, isExistOnCart } = useCartData();

  const router = useRouter();

  const priceSection = useMemo(() => {
    if (data.type === "variable") {
      // Sort once based on price
      const sortedItems = (data.variations || []).sort((a, b) => {
        const priceA = a.salePrice ?? a.regularPrice ?? 0;
        const priceB = b.salePrice ?? b.regularPrice ?? 0;
        return priceA - priceB;
      });

      // Extract lowest and highest price variation
      const lowestVariationItem = sortedItems[0];

      // Find the item with the lowest stock (use reduce to avoid another sort)
      const lowestByStock = sortedItems.reduce((lowest, current) => {
        const stockA = lowest.stock ?? Infinity;
        const stockB = current.stock ?? Infinity;
        return stockB < stockA ? current : lowest;
      }, sortedItems[0]);

      return {
        priceRange: `${currency_symbol}${data.lowestPrice} - ${currency_symbol}${data.highestPrice}`,
        variation: lowestVariationItem,
        stock: lowestByStock?.stock,
      };
    } else {
      return {
        regularPrice: data.regularPrice,
        salePrice: data.salePrice,
        stock: data.stock,
      };
    }
  }, [
    currency_symbol,
    data.highestPrice,
    data.lowestPrice,
    data.regularPrice,
    data.salePrice,
    data.stock,
    data.type,
    data.variations,
  ]);

  const [loading, setLoading] = useState(false);

  const onAddItem = async () => {
    if (loading) return;

    // if (!user) {
    //   router.push(routes.logIn);
    //   return;
    // }

    try {
      setLoading(true);

      await handleAddToCart({
        count: 1,
        product: data,
        productId: data.id,
        variationId: priceSection?.variation?.id,
      });

      toast.success("Artikel toegevoegd aan winkelwagen");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(getClientErrorMsg(error));
    }
  };

  const isOutOfStock = priceSection.stock == 0 && data.type === "simple";
  return (
    <div className="relative">
      {/* {priceSection.stock === 0 && (
        <div className="absolute right-3 top-3 z-10 rounded bg-red-600 px-2.5 py-0.5 font-medium text-white shadow">
          Niet op voorraad
        </div>
      )} */}
      <Link
        href={routes.product(data.slug)}
        className="block w-full overflow-hidden rounded-lg bg-app-grey"
      >
        <Image
          src={data.images[0] || "/imgs/placeholders/product.png"}
          width={375}
          height={495}
          alt={data.name}
          className="__product_img_aspect_ratio"
        />
      </Link>
      <div className="mt-3 space-y-3">
        <div className="space-y-0.5">
          <h3
            onClick={() => {
              router.push(routes.product(data.slug));
            }}
            className="line-clamp-2 cursor-pointer font-open-sans text-lg font-bold text-black"
          >
            {data.name}
          </h3>
          <div
            onClick={() => {
              router.push(routes.product(data.slug));
            }}
            className="flex shrink-0 cursor-pointer items-center gap-2"
          >
            {data.type === "simple" ? (
              <>
                {priceSection.salePrice ? (
                  <>
                    <p className="text-xs font-medium text-gray-500 line-through">
                      {currency_symbol}
                      {priceSection.regularPrice}
                    </p>
                    <p className="__body_18 font-medium text-black">
                      {currency_symbol}
                      {priceSection.salePrice}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="__body_18 font-medium text-black">
                      {currency_symbol}
                      {priceSection.regularPrice}
                    </p>
                  </>
                )}
              </>
            ) : (
              <p className="__body_18 font-medium text-black">
                {priceSection.priceRange}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-2 [&>*]:w-full">
          <Link
            href={routes.product(data.slug)}
            className={cn(button({ intent: "outline-primary", size: "md" }))}
          >
            Bekijk product
          </Link>

          {!isOutOfStock && (
            <>
              {isExistOnCart(data.id) ? (
                <Button
                  onClick={(e) => {
                    e.preventDefault();

                    router.push(routes.cart);
                  }}
                  size={"md"}
                  intent={"primary"}
                >
                  Ga naar winkelwagen
                </Button>
              ) : (
                <Button
                  loading={loading}
                  onClick={onAddItem}
                  size={"md"}
                  intent={"primary"}
                >
                  In winkelmandje +
                </Button>
              )}
            </>
          )}
        </div>
      </div>
      {isOutOfStock && (
        <div className="absolute right-1.5 top-1.5 rounded bg-red-500 px-3 py-1 text-sm text-white">
          Geen voorraad meer
        </div>
      )}
    </div>
  );
};

export default ProductCard;
