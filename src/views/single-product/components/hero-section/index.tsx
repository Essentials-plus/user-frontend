import Button from "@/common/components/ui/button";
import useCartData from "@/hooks/useCartData";
import { cn, getClientErrorMsg } from "@/lib/utils";
import { ProductType } from "@/types/api-responses/product-attribute";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import useMeasure from "react-use-measure";
import { toast } from "sonner";
// Import Swiper React components
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

// Import Swiper styles
import useFirstRender from "@/hooks/useFirstRender";
import { useUserSession } from "@/hooks/useUserSession";
import Link from "next/link";
import { useRouter } from "next/router";
import "swiper/css";

type Props = {
  data: ProductType;
};

const HeroSection = ({ data }: Props) => {
  const swiperRef = useRef<SwiperRef>(null);
  const [sliderWrapperRef, sliderWrapperBounds] = useMeasure();

  const { handleAddToCart, isExistOnCart } = useCartData();

  //  const sliderImages = data.images && data.variations.map(variation)
  const sliderImages = useMemo(() => {
    const productImages = data.images.map((image) => ({
      src: image,
    }));
    const variationImages = data.variations
      .filter((variation) => !!variation.image)
      .map((variation) => ({
        src: variation.image,
        variationId: variation.id,
      }));

    return productImages.concat(variationImages) as {
      src: string;
      variationId?: string;
    }[];
  }, [data.images, data.variations]);

  return (
    <section className="mt-[72px] mb-20">
      <div className="container">
        <div className="grid grid-cols-2 gap-12">
          <div>
            <div
              ref={sliderWrapperRef}
              className="bg-app-yellow  rounded-r-[60px] p-20 pl-0 relative"
            >
              <div
                className="absolute top-0 h-full bg-app-yellow w-full"
                style={{
                  transform: `translateX(-${sliderWrapperBounds.x}px)`,
                  width: `${sliderWrapperBounds.x + 5}px`,
                }}
              ></div>
              <div>
                <div>
                  <Swiper autoHeight ref={swiperRef} grabCursor>
                    {sliderImages.map((image, i) => (
                      <SwiperSlide key={`slide_${i}`}>
                        <div>
                          <Image
                            src={image.src || "/imgs/placeholders/product.png"}
                            width={375}
                            height={495}
                            alt="Product"
                            // className="max-w-[323px] ml-auto"
                            className="w-full"
                            priority
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h1 className="__h1 text-app-black">{data.name}</h1>
            <p className="__body_18 text-app-text max-w-[480px] mt-3">
              {data.description}
            </p>
            {data.type === "variable" && (
              <ProductVariationSection
                data={data}
                onVariationSelect={(variationId) => {
                  const slideInedx = sliderImages.findIndex(
                    (item) => item.variationId === variationId,
                  );
                  if (slideInedx >= 0) {
                    swiperRef.current?.swiper.slideTo(slideInedx);
                  }
                }}
              />
            )}

            {data.type === "simple" && (
              <>
                <div className="pt-5"></div>
                <div>
                  <div className="font-bold">
                    Voorraad:{" "}
                    <span>
                      {data.stock == null ? "Unlimited" : data?.stock}
                    </span>{" "}
                  </div>
                  {data.stock === 0 && (
                    <div className="text-red-500 font-bold">
                      Geen voorraad meer
                    </div>
                  )}
                </div>

                <PriceButtonSection
                  limit={data.stock == null ? 9999999999999999999 : data?.stock}
                  isDisabled={isExistOnCart(data.id)}
                  onButtonClick={async (c) =>
                    await handleAddToCart({
                      count: c,
                      product: data,
                      productId: data.id,
                    })
                  }
                  regularPrice={data.regularPrice}
                  salePrice={data.salePrice}
                />
              </>
            )}

            {data.longDescription && (
              <div
                className="mt-8 prose"
                dangerouslySetInnerHTML={{
                  __html: data.longDescription,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

function ProductVariationSection({
  data,
  onVariationSelect,
}: Props & {
  // eslint-disable-next-line no-unused-vars
  onVariationSelect?: (variationId: string) => void;
}) {
  const isFirstRender = useFirstRender(1000);

  const termIds = useMemo(
    () =>
      data.variations
        .filter((variation) => variation.regularPrice !== null)
        .map((variation) => variation.termIds)
        .flat(),
    [data.variations],
  );

  const [variation, setVariation] = useState(
    data.attributes.map((v) => ({
      attributeName: v.name,
      attributeTermId: v.terms.filter((term) => termIds.includes(term.id))[0]
        .id,
    })),
  );
  console.log({ variation });
  const getVariation = useMemo(() => {
    return data.variations.find((v) =>
      variation.every((vv) => v.termIds.includes(vv.attributeTermId)),
    );
  }, [variation, data]);

  useEffect(() => {
    if (isFirstRender) return;
    onVariationSelect && getVariation && onVariationSelect(getVariation?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getVariation?.id]);

  const { handleAddToCart, isExistOnCart } = useCartData();

  return (
    <div>
      {data.attributes.map((v, i) => (
        <div key={"sdgssd" + i} className="mt-5">
          <div className="font-semibold capitalize text-lg">{v.name}</div>
          <div className="flex gap-2 flex-wrap gap-y-2">
            {v.terms
              .filter((term) => termIds.includes(term.id))
              .map((t, j) => (
                <button
                  key={j + "dgsd"}
                  onClick={() => {
                    setVariation((sv) => {
                      return sv.map((vs) => {
                        if (vs.attributeName == v.name) {
                          vs.attributeTermId = t.id;
                        }
                        return vs;
                      });
                    });
                  }}
                  className={cn(
                    " border-2 duration-200 ring-offset-1 outline-none focus-visible:ring-1 flex items-center gap-2   border-app-darker-green  text-app-darker-green focus-visible:ring-app-darker-green text-base font-medium h-10 rounded-lg px-4 disabled:opacity-70",
                    variation.find((vv) => vv.attributeTermId == t.id) &&
                      "bg-app-darker-green text-white",
                  )}
                >
                  {t.name}
                </button>
              ))}
          </div>
        </div>
      ))}

      <div className="pt-5"></div>
      <div>
        <div className="font-bold">
          Voorraad:{" "}
          <span>
            {getVariation?.stock == null ? "Unlimited" : getVariation?.stock}
          </span>{" "}
        </div>
        {getVariation?.stock === 0 && (
          <div className="text-red-500 font-bold">Geen voorraad meer</div>
        )}
      </div>
      <PriceButtonSection
        limit={
          getVariation?.stock == null
            ? 9999999999999999999
            : getVariation?.stock
        }
        isDisabled={isExistOnCart(data.id, getVariation?.id)}
        onButtonClick={(c) => {
          handleAddToCart({
            count: c,
            product: data,
            productId: data.id,
            variationId: getVariation?.id,
          });
        }}
        regularPrice={getVariation?.regularPrice}
        salePrice={getVariation?.salePrice}
      />
    </div>
  );
}

type PriceSectionProps = {
  isDisabled?: boolean;
  salePrice?: number;
  regularPrice?: number;
  onButtonClick: (count: number) => any;
  limit?: number;
};

const currency_type = process.env.NEXT_PUBLIC_CURRENCY_TYPE || "eur";

function PriceButtonSection({
  isDisabled,
  onButtonClick,
  regularPrice,
  salePrice,
  limit = 0,
}: PriceSectionProps) {
  const [counter, setCounter] = useState(1);
  const { user } = useUserSession();
  const router = useRouter();

  useEffect(() => {
    setCounter((s) => {
      if (s > limit) {
        return limit;
      }
      return s;
    });
  }, [limit]);

  const [loading, setLoading] = useState(false);

  const onAddItem = async () => {
    if (loading) return;

    if (!user) {
      router.push("/log-in");
      return;
    }

    try {
      setLoading(true);

      await onButtonClick(counter);

      toast.success("Artikel toegevoegd aan winkelwagen");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(getClientErrorMsg(error));
    }
  };

  return (
    <div className="border-y border-black py-4 flex items-center gap-3 w-fit mt-7">
      {salePrice ? (
        <>
          <p className="text-4xl font-open-sans font-medium text-app-black">
            {currency_type == "eur" ? "€" : "$"}
            {salePrice}
          </p>
          <p className="text-2xl font-open-sans text-app-dark-grey line-through">
            {currency_type == "eur" ? "€" : "$"}
            {regularPrice}
          </p>
        </>
      ) : (
        <p className="text-4xl font-open-sans font-medium text-app-black">
          {currency_type == "eur" ? "€" : "$"}
          {regularPrice || "---"}
        </p>
      )}
      {!isDisabled && (
        <div className="flex items-center">
          <button
            onClick={() => {
              setCounter((prev) => prev - 1);
            }}
            disabled={counter <= 1}
            className="px-4 py-2.5 disabled:opacity-50 font-medium text-lg"
          >
            <FaMinus />
          </button>
          <div className="w-10 aspect-square rounded-full border-2 border-app-dark-grey __c_all font-open-sans">
            {counter}
          </div>
          <button
            onClick={() => {
              setCounter((prev) => prev + 1);
            }}
            disabled={counter == limit}
            className="px-4 py-2.5 font-medium  disabled:opacity-50 text-lg"
          >
            <FaPlus />
          </button>
        </div>
      )}

      {limit == 0 ? (
        <div>Geen voorraad meer</div>
      ) : (
        <>
          {isDisabled ? (
            <Link href={"/cart"}>
              <Button className="px-4 ml-5" size={"md"}>
                Ga naar winkelwagen
              </Button>
            </Link>
          ) : (
            <Button
              loading={loading}
              disabled={loading || isDisabled}
              onClick={onAddItem}
              className="px-4"
              size={"md"}
            >
              {isDisabled ? "Al in winkelwagen" : "In Winkelmandje"}
            </Button>
          )}
        </>
      )}
    </div>
  );
}

export default HeroSection;
