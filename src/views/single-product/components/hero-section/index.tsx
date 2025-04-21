import Button, { button } from "@/common/components/ui/button";
import useCartData from "@/hooks/useCartData";
import { cn, getApiErrorMessage, getClientErrorMsg } from "@/lib/utils";
import { ProductType } from "@/types/api-responses/product-attribute";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
// Import Swiper React components
import ReactRatingComponent from "react-rating";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

const ReactRating = ReactRatingComponent as unknown as any;
// Import Swiper styles
import {
  getCanGiveReviewQueryOptions,
  getProductReviewsQueryOptions,
} from "@/api-clients/user-api-client/queries";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/common/components/ui/accordion";
import Spinner from "@/common/components/ui/spinner";
import routes from "@/config/routes";
import useActiveCurrency from "@/hooks/useActiveCurrency";
import useFirstRender from "@/hooks/useFirstRender";
import usePaginatedQuery from "@/hooks/usePaginatedQuery";
import DataTablePagination from "@/views/data-table-pagination";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Dot,
  MinusIcon,
  PlusIcon,
  Star,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import "swiper/css";
import { Controller, Navigation, Pagination } from "swiper/modules";

const ProductReviewForm = dynamic(
  () => import("@/views/single-product/components/product-review-form"),
);

type Props = {
  data: ProductType;
};

const HeroSection = ({ data }: Props) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [firstSwiper, setFirstSwiper] = useState<any>(null);
  const [secondSwiper, setSecondSwiper] = useState<any>(null);

  const [openReviewForm, setOpenReviewForm] = useState(false);

  const firstSwiperRef = useRef<SwiperRef>(null);
  const secondSwiperRef = useRef<SwiperRef>(null);

  const { handleAddToCart, isExistOnCart } = useCartData();

  //  const sliderImages = data.images && data.variations.map(variation)
  const sliderImages = useMemo(() => {
    const productImages = data.images.map((image) => ({
      src: image,
    }));
    const variationImages = data.variations
      .filter((variation) => !!variation.image)
      .map((variation) => ({
        src: variation.image as string,
        variationId: variation.id,
      }));

    return productImages.concat(variationImages) as {
      src: string;
      variationId?: string;
    }[];
  }, [data.images, data.variations]);

  const canGiveReviewQueryOptions = useQuery(
    getCanGiveReviewQueryOptions({ productId: data.id }),
  );
  const productReviewsQueryOptions = usePaginatedQuery(({ page }) => {
    return {
      ...getProductReviewsQueryOptions({
        productId: data.id,
        axiosReqConfig: {
          params: { page },
        },
      }),
      placeholderData: keepPreviousData,
    };
  });

  const canGiveReview = canGiveReviewQueryOptions.data?.data.status;

  const productReviews =
    productReviewsQueryOptions.query.data?.data.reviews || [];
  const averageRating =
    productReviewsQueryOptions.query.data?.data.averageRating;

  const totalReviewsCount =
    productReviewsQueryOptions.query.data?.meta?.totalCount;
  return (
    <section className="lg:mb-20 lg:mt-[72px]">
      <div className="lg:container">
        <div className="grid grid-cols-1 gap-10 gap-y-5 lg:grid-cols-[700px,auto]">
          <div>
            <div className="flex flex-col-reverse gap-6 gap-y-[5px] lg:grid lg:grid-cols-[auto,606px]">
              <div className="max-lg:px-[5px] lg:h-full">
                <Swiper
                  ref={firstSwiperRef}
                  className="!h-full max-h-[500px]"
                  grabCursor
                  breakpoints={{
                    0: {
                      direction: "horizontal",
                      slidesPerView: 5,
                      spaceBetween: 5,
                    },
                    600: {
                      direction: "horizontal",
                      slidesPerView: 8,
                      spaceBetween: 5,
                    },
                    768: {
                      direction: "horizontal",
                      slidesPerView: 12,
                      spaceBetween: 5,
                    },
                    1024: {
                      direction: "vertical",
                      slidesPerView: "auto",
                      spaceBetween: 24,
                    },
                  }}
                  modules={[Controller]}
                  onSwiper={setFirstSwiper}
                  controller={{ control: secondSwiper }}
                >
                  {sliderImages.map((image, i) => (
                    <SwiperSlide
                      className={cn(
                        "lg:!w-full lg:!h-auto !aspect-square cursor-pointer",
                      )}
                      key={`slide_${i}`}
                      onClick={() => {
                        secondSwiperRef.current?.swiper.slideTo(i);
                      }}
                    >
                      {activeSlide === i && (
                        <div className="pointer-events-none absolute inset-0 z-10 border-2 border-app-primary" />
                      )}
                      <div
                        className={cn(
                          activeSlide !== i && "opacity-70",
                          "size-full",
                        )}
                      >
                        <Image
                          src={image.src || "/imgs/placeholders/product.png"}
                          width={375}
                          height={495}
                          alt="Product"
                          // className="max-w-[323px] ml-auto"
                          className="size-full object-cover"
                          priority
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="relative">
                <Swiper
                  modules={[Controller, Navigation, Pagination]}
                  pagination={{
                    el: "#onlyMobilePagination",
                  }}
                  onSwiper={setSecondSwiper}
                  controller={{ control: firstSwiper }}
                  autoHeight
                  ref={secondSwiperRef}
                  grabCursor
                  onSlideChange={(swiper) => {
                    setActiveSlide(swiper.activeIndex);
                  }}
                  navigation={{
                    prevEl: "#prevNavigationBtn",
                    nextEl: "#nextNavigationBtn",
                  }}
                >
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

                <button
                  id="prevNavigationBtn"
                  className="absolute left-2 top-1/2 z-20 -translate-y-1/2 text-white disabled:cursor-not-allowed disabled:opacity-50 max-lg:hidden"
                >
                  <ChevronLeft
                    className="size-12 drop-shadow"
                    strokeWidth={1}
                  />
                </button>
                <button
                  id="nextNavigationBtn"
                  className="absolute right-2 top-1/2 z-20 -translate-y-1/2 text-white disabled:cursor-not-allowed disabled:opacity-50 max-lg:hidden"
                >
                  <ChevronRight
                    className="size-12 drop-shadow"
                    strokeWidth={1}
                  />
                </button>

                <div
                  id="onlyMobilePagination"
                  className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 lg:hidden"
                ></div>
              </div>
            </div>
          </div>

          <div className="max-lg:px-5">
            <h1 className="__h4 lg:__h1 text-app-black">{data.name}</h1>
            {data.description && (
              <div
                className="prose-sm mt-2 max-w-[480px] lg:prose lg:mt-3"
                dangerouslySetInnerHTML={{
                  __html: data.description || "",
                }}
              />
            )}
            {data.type === "variable" && (
              <ProductVariationSection
                data={data}
                onVariationSelect={(variationId, imageSameAsVariationId) => {
                  const slideInedx = sliderImages.findIndex(
                    (item) =>
                      item.variationId === variationId ||
                      item.variationId === imageSameAsVariationId,
                  );
                  if (slideInedx >= 0) {
                    secondSwiperRef.current?.swiper.slideTo(slideInedx);
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
                  {/* {data.stock === 0 && (
                    <div className="font-bold text-red-500">
                      Geen voorraad meer
                    </div>
                  )} */}
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
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 max-lg:px-5 lg:grid-cols-[700px,auto]">
          <Accordion
            type="single"
            collapsible
            className="mt-10 [&>div]:border-t-[1.5px] [&>div]:border-app-text/60"
          >
            {data.longDescription && (
              <AccordionItem value="long-description">
                <AccordionTrigger className="py-4 text-base max-lg:font-semibold lg:text-xl">
                  PRODUCT OVERZICHT
                </AccordionTrigger>
                <AccordionContent>
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{
                      __html: data.longDescription,
                    }}
                  />
                </AccordionContent>
              </AccordionItem>
            )}
            {!!data.faqs?.length &&
              data.faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="py-4 text-base max-lg:font-semibold lg:text-xl">
                    {faq.title}
                  </AccordionTrigger>
                  <AccordionContent className="whitespace-pre-line">
                    {faq.content}
                  </AccordionContent>
                </AccordionItem>
              ))}

            {!!data.specs?.length &&
              data.specs.map((spec) => (
                <AccordionItem key={spec.id} value={spec.id}>
                  <AccordionTrigger className="py-4 text-base max-lg:font-semibold lg:text-xl">
                    {spec.label}
                  </AccordionTrigger>
                  <AccordionContent className="whitespace-pre-line">
                    {spec.value}
                  </AccordionContent>
                </AccordionItem>
              ))}

            <AccordionItem value="reviews">
              <AccordionTrigger className="py-4 text-base max-lg:font-semibold lg:text-xl">
                KLANTREVIEWS
                <div className="ml-auto mr-2 flex items-center gap-2">
                  <div className="translate-y-[3px]">
                    <ReactRating
                      // fullSymbol="fa fa-star-o fa-2x"
                      emptySymbol={
                        <Star className="size-4 lg:size-5" stroke="black" />
                      }
                      fullSymbol={
                        <Star
                          className="size-4 lg:size-5"
                          fill="black"
                          stroke="black"
                        />
                      }
                      initialRating={averageRating}
                      readonly
                    />
                  </div>
                  {typeof totalReviewsCount === "number" && (
                    <span className="text-sm font-normal text-app-text">
                      ({totalReviewsCount})
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-2 lg:pt-5">
                <div className="flex gap-4 max-sm:flex-col sm:items-center sm:justify-between">
                  <p className="font-semibold">
                    Algemene rating ({averageRating || "0.00"})
                  </p>

                  {(canGiveReview || openReviewForm) && (
                    <Button
                      intent={"outline-primary"}
                      size={"md"}
                      className="font-semibold"
                      onClick={() => setOpenReviewForm(!openReviewForm)}
                    >
                      {openReviewForm ? "ANNULEREN" : "SCHRIJF JE RECENSIE"}
                    </Button>
                  )}
                </div>

                {openReviewForm && canGiveReview && (
                  <ProductReviewForm
                    productId={data.id}
                    onSuccess={() => {
                      setOpenReviewForm(false);
                      canGiveReviewQueryOptions.refetch();
                      productReviewsQueryOptions.query.refetch();
                    }}
                  />
                )}

                <div className="mt-5">
                  {/** Rating --Start-- */}
                  {productReviewsQueryOptions.query.isError ? (
                    <p className="px-5 py-14 text-center text-app-danger">
                      {getApiErrorMessage(
                        productReviewsQueryOptions.query.error,
                      )}
                    </p>
                  ) : (
                    productReviews.map((review) => (
                      <div
                        className="border-t-[1.5px] border-app-text/20 py-5"
                        key={review.id}
                      >
                        <div className="flex items-center justify-start gap-1">
                          <p className="text-base font-semibold">
                            {review.user?.name}
                          </p>
                          <Dot className="size-3.5 opacity-30" />
                          <p className="text-sm capitalize text-app-text">
                            {format(review.createdAt, "MMM dd, yyyy")}
                          </p>
                        </div>
                        <div className="mt-1 flex items-center gap-2.5">
                          <div className="translate-y-0.5">
                            <ReactRating
                              emptySymbol={
                                <Star className="size-4" stroke="black" />
                              }
                              fullSymbol={
                                <Star
                                  className="size-4"
                                  fill="black"
                                  stroke="black"
                                />
                              }
                              initialRating={review.rating}
                              readonly
                            />
                          </div>
                          <div className="h-3.5 w-px bg-app-text/30"></div>
                          <div className="flex items-center gap-1 text-sm font-semibold text-app-primary">
                            <BadgeCheck className="size-5 fill-app-primary stroke-white" />{" "}
                            Geverifieerde aankoop
                          </div>
                        </div>

                        <p className="mt-2 text-app-text max-lg:text-sm">
                          {review.comment}
                        </p>
                      </div>
                    ))
                  )}

                  {productReviewsQueryOptions.query.isFetching && (
                    <div className="flex justify-center py-5">
                      <Spinner className="size-8" />
                    </div>
                  )}
                  {/** Rating --End-- */}
                </div>
                <DataTablePagination
                  query={{
                    ...productReviewsQueryOptions.query,
                    activePage: productReviewsQueryOptions.activePage,
                    fetchPage: productReviewsQueryOptions.fetchPage,
                    totalPage: productReviewsQueryOptions.totalPage,
                  }}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

function ProductVariationSection({
  data,
  onVariationSelect,
}: Props & {
  onVariationSelect?: (
    // eslint-disable-next-line no-unused-vars
    variationId: string,
    // eslint-disable-next-line no-unused-vars
    imageSameAsVariationId?: string | null,
  ) => void;
}) {
  const isFirstRender = useFirstRender(1000);

  const termIds = useMemo(
    () =>
      data.variations
        ?.filter((variation) => variation.regularPrice !== null)
        ?.map((variation) => variation.termIds)
        ?.flat(),
    [data.variations],
  );

  const [selectedTerms, setSelectedTerms] = useState<
    {
      attributeName: string;
      attributeTermId: string | undefined;
    }[]
  >(
    data.attributes.map((attribute) => {
      return {
        attributeName: attribute?.name,
        attributeTermId: undefined,
      };
    }),
  );

  const hasAllTermsSelected = useMemo(
    () =>
      selectedTerms.filter((term) => Boolean(term.attributeTermId)).length ===
      selectedTerms.length,
    [selectedTerms],
  );

  const getVariation = useMemo(() => {
    return data.variations.find((v) =>
      selectedTerms.every(
        (vv) => vv.attributeTermId && v.termIds.includes(vv.attributeTermId),
      ),
    );
  }, [selectedTerms, data]);

  useEffect(() => {
    if (isFirstRender) return;
    onVariationSelect &&
      getVariation &&
      onVariationSelect(getVariation?.id, getVariation.imageSameAsVariationId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getVariation?.id]);

  const { handleAddToCart, isExistOnCart } = useCartData();

  return (
    <div>
      {data.attributes.map((attribute) => (
        <div key={attribute.id} className="mt-3 lg:mt-5">
          {/* <pre>{JSON.stringify(v?.appearance, null, 2)}</pre> */}
          <div className="text-sm font-semibold capitalize lg:text-lg">
            {attribute.name}
          </div>
          {(attribute as any)?.appearance === "dropdown" ? (
            <div className="relative mt-1 w-fit">
              <select
                onChange={(e) => {
                  setSelectedTerms((prev) => {
                    return prev.map((vs) => {
                      if (vs.attributeName == attribute.name) {
                        vs.attributeTermId = e.target.value;
                      }
                      return vs;
                    });
                  });
                }}
                className="h-8 w-auto min-w-[200px] cursor-pointer rounded-md border-[1.5px] border-app-text/40 bg-white px-3 pr-8 text-sm font-bold text-app-black outline-none focus:border-app-black lg:h-10 lg:text-base"
              >
                <option value="">Selecteer optie</option>
                {attribute.terms
                  .filter((term) => termIds.includes(term.id))
                  .map((t) => (
                    <option key={attribute.id + t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
              </select>

              <ChevronDown
                strokeWidth={1}
                className="pointer-events-none absolute right-2 top-1/2 size-6 -translate-y-1/2"
              />
            </div>
          ) : (
            <div className="mt-1 flex flex-wrap gap-2">
              {attribute.terms
                .filter((term) => termIds.includes(term.id))
                .map((t) => (
                  <button
                    key={attribute.id + t.id}
                    onClick={() => {
                      setSelectedTerms((sv) => {
                        return sv.map((vs) => {
                          if (vs.attributeName == attribute.name) {
                            vs.attributeTermId = t.id;
                          }
                          return vs;
                        });
                      });
                    }}
                    className={cn(
                      "border-2 duration-200 max-lg:text-sm max-lg:px-3 max-lg:h-8 ring-offset-1 outline-none focus-visible:ring-1 flex items-center gap-2   border-app-darker-green  text-app-darker-green focus-visible:ring-app-darker-green text-base font-medium h-10 rounded-lg px-4 disabled:opacity-70",
                      selectedTerms.find((vv) => vv.attributeTermId == t.id) &&
                        "bg-app-darker-green text-white",
                    )}
                  >
                    {t.name}
                  </button>
                ))}
            </div>
          )}
        </div>
      ))}

      {hasAllTermsSelected && getVariation?.stock && (
        <div className="mt-3 font-bold">
          Voorraad: <span>{getVariation?.stock}</span>{" "}
        </div>
      )}
      {hasAllTermsSelected ? (
        <PriceButtonSection
          limit={
            getVariation?.stock == null
              ? 9999999999999999999
              : getVariation?.stock
          }
          isDisabled={isExistOnCart(data.id, getVariation?.id)}
          onButtonClick={async (c) => {
            await handleAddToCart({
              count: c,
              product: data,
              productId: data.id,
              variationId: getVariation?.id,
            });
          }}
          regularPrice={getVariation?.regularPrice}
          salePrice={getVariation?.salePrice}
        />
      ) : (
        <div className="mt-5">
          <p className="font-medium text-app-text">
            Selecteer enkele productopties voordat u dit product aan uw
            winkelwagen toevoegt.
          </p>
        </div>
      )}
    </div>
  );
}

type PriceSectionProps = {
  isDisabled?: boolean;
  salePrice?: number;
  regularPrice?: number;
  // eslint-disable-next-line no-unused-vars
  onButtonClick: (count: number) => any;
  limit?: number;
};

function PriceButtonSection({
  isDisabled,
  onButtonClick,
  regularPrice,
  salePrice,
  limit = 0,
}: PriceSectionProps) {
  const [counter, setCounter] = useState(1);
  const { currency_symbol } = useActiveCurrency();

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

    // if (!user) {
    //   router.push(routes.logIn);
    //   return;
    // }

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

  const displayPrice = salePrice || regularPrice;

  if (!displayPrice) return null;

  return (
    <div className="mt-7 grid w-full grid-cols-2 items-center gap-3 border-t border-app-black/20 py-4 md:flex md:border-y">
      <p className="font-open-sans text-xl font-bold text-app-black md:font-medium lg:text-4xl">
        {currency_symbol}
        {displayPrice}
      </p>

      {!isDisabled && (
        <div className="max-md:flex max-md:justify-end">
          <div className="flex w-fit items-center gap-2 rounded-full border border-app-dark-grey/50 p-0.5">
            <button
              onClick={() => {
                setCounter((prev) => prev - 1);
              }}
              disabled={counter <= 1}
              className="flex size-8 items-center justify-center rounded-full text-lg font-medium enabled:hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-30 lg:size-9"
            >
              <PlusIcon className="size-3.5 lg:size-4" />
            </button>
            <div className="font-open-sans max-lg:text-sm">{counter}</div>
            <button
              onClick={() => {
                setCounter((prev) => prev + 1);
              }}
              disabled={counter == limit}
              className="flex size-8 items-center justify-center rounded-full text-lg font-medium enabled:hover:bg-black/5 disabled:cursor-not-allowed lg:size-9"
            >
              <MinusIcon className="size-3.5 lg:size-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-md:col-span-2">
        {limit == 0 ? (
          <Button
            className="pointer-events-none px-4 max-md:w-full lg:ml-5"
            intent={"danger"}
            size={"md"}
          >
            Geen voorraad meer
          </Button>
        ) : (
          <>
            {isDisabled ? (
              <Link
                className={button({
                  className: "lg:ml-5 px-4 max-md:w-full",
                  size: "md",
                })}
                href={routes.cart}
              >
                Ga naar winkelwagen
              </Link>
            ) : (
              <Button
                loading={loading}
                disabled={loading || isDisabled}
                onClick={onAddItem}
                className="px-4 max-md:w-full"
                size={"md"}
              >
                {isDisabled ? "Al in winkelwagen" : "In Winkelmandje"}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default HeroSection;
