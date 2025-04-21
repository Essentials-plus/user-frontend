import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/common/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/common/components/ui/breadcrumb";
import Button from "@/common/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/common/components/ui/sheet";
import Skeleton from "@/common/components/ui/skeleton";
import routes from "@/config/routes";
import { cn, getApiErrorMessage } from "@/lib/utils";
import DataTablePagination from "@/views/data-table-pagination";
import CategoriesSection from "@/views/lifestyle-products/components/categories-section";
import ProductCard from "@/views/lifestyle-products/components/product-card";
import FilterSidebar from "@/views/products/components/filter-sidebar";
import useProductsFilter from "@/views/products/hooks/useProductsFilter";
import { ChevronDown, ListFilter } from "lucide-react";
import { useMemo } from "react";

const Products = () => {
  const {
    products,
    category,
    productsQuery,
    setSort,
    sort,
    totalAppliedFilters,
    clearAllFilters,
  } = useProductsFilter();

  const findCategory = useMemo(
    () =>
      (productsQuery.query.data?.data.filters.categories || []).find(
        (item) => item.slug === category,
      ),
    [category, productsQuery.query.data?.data.filters.categories],
  );

  return (
    <>
      <CategoriesSection
        section={{
          className: "max-lg:mt-0 mt-2.5 mb-2 lg:mb-5",
        }}
        disableTitle
        categoryLinkHref="#breadcrumb"
        swiperSlideClassName="!h-[150px] [&_img]:object-cover"
      />
      <section id="breadcrumb" className="scroll-mt-10">
        <div className="container py-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={routes.home}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {!findCategory ? (
                  <BreadcrumbPage>Products</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={routes.products}>
                    Products
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {findCategory && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{findCategory.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section className="mb-20 lg:mt-5">
        <div className="container">
          <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-[265px,auto]">
            <div className="max-lg:hidden">
              <FilterSidebar />
            </div>

            <div>
              <div className="relative items-center justify-between max-lg:flex">
                {findCategory ? (
                  <Accordion type="single" collapsible>
                    <AccordionItem
                      value="as"
                      className="border-app-black lg:border-y max-lg:[&_h3]:w-fit"
                    >
                      <AccordionTrigger className="gap-2 text-xl lg:py-3.5 lg:text-3xl">
                        {findCategory?.name}
                      </AccordionTrigger>
                      <AccordionContent className="">
                        <div className="max-lg:pt-2">
                          {findCategory?.description || (
                            <p className="text-app-text">
                              Er is geen beschrijving voor deze categorie
                              opgegeven.
                            </p>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <h1 className="text-xl font-extrabold text-app-black lg:text-3xl">
                    Alle producten
                  </h1>
                )}

                <Sheet>
                  <SheetTrigger
                    className={cn(
                      "flex items-center gap-2.5 lg:hidden",
                      findCategory && "absolute right-0 top-0.5",
                    )}
                  >
                    <ListFilter className="size-5" /> Filters
                    {totalAppliedFilters > 0 && (
                      <div className="-ml-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                        {totalAppliedFilters}
                      </div>
                    )}
                  </SheetTrigger>
                  <SheetContent side={"left"}>
                    <FilterSidebar />

                    {totalAppliedFilters > 0 && (
                      <div className="absolute bottom-0 left-0 w-full p-6">
                        <SheetClose asChild>
                          <Button onClick={clearAllFilters} className="w-full">
                            Clear all filters
                          </Button>
                        </SheetClose>
                      </div>
                    )}
                  </SheetContent>
                </Sheet>
              </div>

              <div className="mt-5 flex items-center justify-between border-b border-app-black pb-4">
                {productsQuery.query.isFetching ? (
                  <Skeleton className="h-6 w-[93px]" />
                ) : (
                  <p className="font-medium text-app-black">
                    {products.length} producten
                  </p>
                )}

                <div className="relative">
                  <select
                    value={sort || ""}
                    onChange={(e) => {
                      setSort(e.target.value);
                    }}
                    className="cursor-pointer pr-8 text-right text-base font-bold text-app-black outline-none"
                  >
                    <option value="relevance">Relevantie</option>
                    <option value="bestsellers">Bestsellers</option>
                    <option value="price-low-to-high">
                      {"Prijs (Laag > Hoog)"}
                    </option>
                    <option value="price-high-to-low">
                      {"Prijs (Hoog > Laag)"}
                    </option>
                  </select>

                  <ChevronDown
                    strokeWidth={1}
                    className="pointer-events-none absolute right-0 top-1/2 size-6 -translate-y-1/2"
                  />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-8 lg:grid-cols-3">
                {productsQuery.query.isFetching ? (
                  <>
                    {Array(6)
                      .fill("")
                      .map((_, i) => (
                        <Skeleton className="h-[400px] rounded-lg" key={i} />
                      ))}
                  </>
                ) : productsQuery.query.isError ? (
                  <p className="col-span-3 mx-auto max-w-[700px] px-5 py-20 text-center text-app-danger">
                    {getApiErrorMessage(productsQuery.query.error)}
                  </p>
                ) : products.length <= 0 ? (
                  <p className="col-span-3 mx-auto max-w-[700px] px-5 py-20 text-center text-app-text">
                    Sorry, we konden helaas geen resultaten vinden die matchen
                    met de gekozen filters. Probeer een nieuwe zoekopdracht
                  </p>
                ) : (
                  products.map((product) => (
                    <ProductCard key={product.id} data={product} />
                  ))
                )}
              </div>

              <DataTablePagination
                query={{
                  ...productsQuery.query,
                  activePage: productsQuery.activePage,
                  fetchPage: productsQuery.fetchPage,
                  totalPage: productsQuery.totalPage,
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
