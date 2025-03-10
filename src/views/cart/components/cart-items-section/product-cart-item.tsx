import Spinner from "@/common/components/ui/spinner";
import useCartData from "@/hooks/useCartData";
import { cn, getClientErrorMsg } from "@/lib/utils";
import { ProductCart } from "@/types/api-responses/product-attribute";
import Image from "next/image";
import { useMemo, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { toast } from "sonner";

type Props = {
  d: ProductCart;
  checkOutLayout?: boolean;
};

function ProductCartItem({ d, checkOutLayout }: Props) {
  const { id, count, product, variationId } = d;
  const { handleRemoveCart, updateCartItem } = useCartData();

  const priceSection = useMemo(() => {
    if (variationId) {
      const variation = product.variations.find((v) => v.id == variationId);
      return {
        regularPrice: variation?.regularPrice || 0,
        salePrice: variation?.salePrice || 0,
        variation,
      };
    } else {
      return {
        regularPrice: product.regularPrice,
        salePrice: product.salePrice,
      };
    }
  }, [product, variationId]);

  const [loading, setLoading] = useState(false);

  const onRemoveItem = async () => {
    if (loading) return;
    try {
      setLoading(true);

      await handleRemoveCart(id);
      toast.success("Artikel uit winkelwagen verwijderd");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(getClientErrorMsg(error));
    }
  };

  const getVariationTerms = useMemo(() => {
    if (priceSection.variation) {
      return priceSection.variation.termIds.map((v) => {
        let result: any = {};

        product.attributes.forEach((a) => {
          const findTerms = a.terms.find((at) => at.id == v);
          if (findTerms) {
            result.attribute = a.name;
            result.term = findTerms?.name;
          }
        });

        return result;
      });
    } else {
      return [];
    }
  }, [priceSection.variation, product.attributes]);

  const hasVariation = !!variationId;

  const image = useMemo(() => {
    if (hasVariation) {
      const variation = product.variations.find(
        (variation) => variation.id === variationId,
      );

      if (variation) {
        if (variation.image) {
          return variation.image;
        }

        if (variation.imageSameAsVariationId) {
          const relatedVariation = product.variations.find(
            (v) => v.id === variation.imageSameAsVariationId,
          );
          if (relatedVariation?.image) {
            return relatedVariation.image;
          }
        }
      }
    }

    return product.images[0];
  }, [hasVariation, product.images, product.variations, variationId]);

  return (
    <div
      className={cn(
        "grid grid-cols-[380px,1fr,1fr,1fr] gap-5 py-5 border-b border-[#d8d8d8]/60 items-center",
        checkOutLayout && "grid-cols-[auto,90px]",
      )}
    >
      <div>
        <div className="flex items-center gap-5">
          <Image
            src={image || "/imgs/placeholders/product.png"}
            width={375}
            height={495}
            alt="Product"
            className="__product_img_aspect_ratio max-w-[72px] rounded-md"
          />
          <div>
            <h3 className="line-clamp-1 text-lg font-bold">{product.name}</h3>

            <div className="flex flex-wrap items-center gap-3 gap-y-0.5">
              {getVariationTerms.map((term, i) => (
                <div key={`${term.attribute}_${term.term}_${i}`}>
                  <span className="font-semibold capitalize opacity-80">
                    {term.attribute}:{" "}
                  </span>
                  {term.term}
                </div>
              ))}
            </div>
            <div>
              <span className="font-semibold capitalize opacity-80">
                Hoeveelheid:{" "}
              </span>
              {count}
            </div>
            {/* <div className="my-2 line-clamp-2">{product.description}</div> */}

            <div className="mt-1 flex items-center gap-3">
              {/* <a
                    href="#"
                    className="text-app-dark-green underline hover:no-underline"
                  >
                            Bewerken
                          </a>
                          <span className="h-4 w-px bg-app-dark-green"></span> */}
              {!checkOutLayout && (
                <button
                  onClick={onRemoveItem}
                  disabled={loading}
                  className="flex cursor-pointer items-center gap-2 text-app-dark-green underline hover:no-underline"
                >
                  {loading && (
                    <div className="size-4">
                      <Spinner />
                    </div>
                  )}
                  Verwijderen
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {!checkOutLayout && (
        <div className="flex items-center gap-2">
          {priceSection.salePrice ? (
            <>
              <p className="text-sm  line-through opacity-70">
                € {priceSection.regularPrice}
              </p>
              <p className="__body_16">€ {priceSection.salePrice}</p>
            </>
          ) : (
            <>
              <p className="__body_16">€ {priceSection.regularPrice}</p>
            </>
          )}
        </div>
      )}

      {!checkOutLayout && (
        <div>
          <div className="flex items-center">
            <button
              onClick={() => {
                // handleUpdateCart(product.id, { count: count - 1 }, variationId);
                updateCartItem(id, count - 1);
              }}
              disabled={count == 1}
              className="py-2.5 pr-3 text-lg font-medium disabled:opacity-30"
            >
              <FaMinus />
            </button>
            <div className="__c_all aspect-square w-10 rounded-full border-2 border-app-dark-grey font-open-sans">
              {count}
            </div>
            <button
              onClick={() => {
                // handleUpdateCart(product.id, { count: count + 1 }, variationId);
                updateCartItem(id, count + 1);
              }}
              className="py-2.5 pl-3 text-lg font-medium"
            >
              <FaPlus />
            </button>
          </div>
        </div>
      )}
      <div className={cn(checkOutLayout && "flex justify-end")}>
        <p className="whitespace-nowrap font-bold">
          €{" "}
          {(
            (priceSection.salePrice || priceSection.regularPrice) * count
          ).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default ProductCartItem;
