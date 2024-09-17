import Spinner from "@/common/components/ui/spinner";
import useCartData from "@/hooks/useCartData";
import { getClientErrorMsg } from "@/lib/utils";
import { ProductCart } from "@/types/api-responses/product-attribute";
import Image from "next/image";
import { useMemo, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { toast } from "sonner";

type Props = {
  d: ProductCart;
};

function ProductCartItem({ d: { id, count, product, variationId } }: Props) {
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

  return (
    <div className="grid grid-cols-[380px,1fr,1fr,1fr] gap-5 py-5 border-b border-app-dark-grey items-center">
      <div>
        <div className="flex items-center gap-12">
          <Image
            src={product.images[0] || "/imgs/placeholders/product.png"}
            width={375}
            height={495}
            alt="Product"
            className="max-w-[72px]"
          />
          <div>
            <h3 className="text-lg font-bold">{product.name}</h3>

            <div className="flex items-center flex-wrap gap-5">
              {getVariationTerms.map((v, i) => (
                <div key={"dgs" + i} className="flex gap-1">
                  <div className="font-medium capitalize">{v.attribute}: </div>
                  <div>{v.term}</div>
                </div>
              ))}
              <div className=""></div>
            </div>
            {/* <div className="my-2 line-clamp-2">{product.description}</div> */}

            <div className="flex items-center gap-3">
              {/* <a
                    href="#"
                    className="text-app-dark-green underline hover:no-underline"
                  >
                            Bewerken
                          </a>
                          <span className="h-4 w-px bg-app-dark-green"></span> */}
              <button
                onClick={onRemoveItem}
                disabled={loading}
                className="text-app-dark-green flex items-center gap-2 cursor-pointer underline hover:no-underline"
              >
                {loading && (
                  <div className="h-4 w-4">
                    <Spinner />
                  </div>
                )}
                Verwijderen
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {priceSection.salePrice ? (
          <>
            <p className="text-sm  line-through">
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

      <div>
        <div className="flex items-center">
          <button
            onClick={() => {
              // handleUpdateCart(product.id, { count: count - 1 }, variationId);
              updateCartItem(id, count - 1);
            }}
            disabled={count == 1}
            className="pr-3 py-2.5 disabled:opacity-30 font-medium text-lg"
          >
            <FaMinus />
          </button>
          <div className="w-10 aspect-square rounded-full border-2 border-app-dark-grey __c_all font-open-sans">
            {count}
          </div>
          <button
            onClick={() => {
              // handleUpdateCart(product.id, { count: count + 1 }, variationId);
              updateCartItem(id, count + 1);
            }}
            className="pl-3 py-2.5 font-medium text-lg"
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <div>
        <p className="font-bold">
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
