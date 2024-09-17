import Button, { button } from "@/common/components/ui/button";
import useCartData from "@/hooks/useCartData";
import { useUserSession } from "@/hooks/useUserSession";
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

const currency_type = process.env.NEXT_PUBLIC_CURRENCY_TYPE || "eur";

const ProductCard = ({ data }: Props) => {
  const { handleAddToCart, isExistOnCart } = useCartData();
  const { user } = useUserSession();

  const router = useRouter();

  const priceSection = useMemo(() => {
    if (data.type == "variable") {
      const variation = data.variations[0];
      return {
        regularPrice: variation?.regularPrice || 0,
        salePrice: variation?.salePrice || 0,
        variation,
        stock: variation.stock,
      };
    } else {
      return {
        regularPrice: data.regularPrice,
        salePrice: data.salePrice,
        stock: data.stock,
      };
    }
  }, [data]);

  const [loading, setLoading] = useState(false);

  const onAddItem = async () => {
    if (loading) return;

    if (!user) {
      router.push("/log-in");
      return;
    }

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

  return (
    <div className="relative">
      {priceSection.stock === 0 && (
        <div className="absolute z-10 shadow top-3 right-3 bg-red-600 text-white font-medium rounded px-2.5 py-0.5">
          Niet op voorraad
        </div>
      )}
      <Link
        href={`/products/${data.slug}`}
        className="w-full max-h-[380px] overflow-hidden rounded-lg bg-app-grey block"
      >
        <Image
          src={data.images[0] || "/imgs/placeholders/product.png"}
          width={375}
          height={495}
          alt={data.name}
          className="w-full"
        />
      </Link>
      <div className="mt-3 space-y-3">
        <div className="space-y-0.5">
          <h3
            onClick={() => {
              router.push(`/products/${data.slug}`);
            }}
            className="text-lg font-bold font-open-sans text-black line-clamp-2 cursor-pointer"
          >
            {data.name}
          </h3>
          <div
            onClick={() => {
              router.push(`/products/${data.slug}`);
            }}
            className="shrink-0 flex gap-2 items-center cursor-pointer"
          >
            {priceSection.salePrice ? (
              <>
                <p className="text-xs font-medium text-gray-500 line-through">
                  {currency_type == "eur" ? "€" : "$"}
                  {priceSection.regularPrice}
                </p>
                <p className="__body_18 font-medium text-black">
                  {currency_type == "eur" ? "€" : "$"}
                  {priceSection.salePrice}
                </p>
              </>
            ) : (
              <>
                <p className="__body_18 font-medium text-black">
                  {currency_type == "eur" ? "€" : "$"}
                  {priceSection.regularPrice}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="space-y-2 [&>*]:w-full">
          <Link
            href={`/products/${data.slug}`}
            className={cn(button({ intent: "outline-primary", size: "md" }))}
          >
            Bekijk product
          </Link>

          {priceSection.stock !== 0 && (
            <>
              {isExistOnCart(data.id) ? (
                <Button
                  onClick={(e) => {
                    e.preventDefault();

                    router.push("/cart");
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
      {priceSection.stock == 0 && (
        <div className="absolute top-1 right-1 bg-red-500 text-white py-1 px-3 text-sm rounded">
          Geen voorraad meer
        </div>
      )}
    </div>
  );
};

export default ProductCard;
