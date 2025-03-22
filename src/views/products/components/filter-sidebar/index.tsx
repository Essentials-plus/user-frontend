import { Accordion } from "@/common/components/ui/accordion";
import useActiveCurrency from "@/hooks/useActiveCurrency";
import { cn } from "@/lib/utils";
import FilterAccordion from "@/views/products/components/filter-accordion";
import FilterCheckbox from "@/views/products/components/filter-checkbox";
import useProductsFilter from "@/views/products/hooks/useProductsFilter";
import { useDebouncedCallback } from "@mantine/hooks";
import { X } from "lucide-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { ComponentPropsWithoutRef, useEffect, useMemo, useState } from "react";

const FilterSidebar = () => {
  const {
    productsQuery,
    category,
    setCategory,
    setSubCategories,
    subCategories,
    terms,
    setTerms,
    minMaxPrice,
    setMinMaxPrice,
    query,
    setQuery,
  } = useProductsFilter();

  const { currency_symbol } = useActiveCurrency();

  const [localMinMaxState, setLocalMinMaxState] = useState<null | number[]>(
    null,
  );

  const filters = productsQuery.data?.data.filters;

  const filterCategories = useMemo(
    () =>
      (filters?.categories || []).filter(
        (categoryItem) => (categoryItem as any).products.length > 0,
      ),
    [filters?.categories],
  );

  const filterSubCategories = useMemo(
    () =>
      (filters?.subCategories || []).filter(
        (subCategoryItem) => (subCategoryItem as any).products.length > 0,
      ),
    [filters?.subCategories],
  );

  const filterProductAttributes = filters?.productAttributes || [];

  const filterMinPrice = 0;
  const filterMaxPrice = filters?.maxPrice;

  useEffect(() => {
    if (filterMaxPrice) {
      setLocalMinMaxState([filterMinPrice, filterMaxPrice]);
    }
  }, [filterMaxPrice]);

  const showMinMaxRemoveButton = minMaxPrice.length >= 2;

  const handleMinMaxPriceChange = useDebouncedCallback((value: number[]) => {
    setMinMaxPrice(value);
  }, 500);

  return (
    <aside>
      {query && (
        <button
          onClick={() => setQuery(null)}
          className="mb-8 flex gap-2 text-left"
        >
          <X className="size-5 shrink-0 translate-y-0.5 text-red-600" />
          <p className="font-medium text-app-black">
            Resultaten voor &quot;{query}&quot;
          </p>
        </button>
      )}
      <h2 className="text-2xl font-extrabold uppercase text-app-black">
        Verfijn op
      </h2>

      <div className="mt-5">
        {(category || terms.length > 0 || showMinMaxRemoveButton) && (
          <div className="border-t border-app-black pb-6">
            <p className="__focus_visible py-3.5 text-base font-extrabold uppercase text-app-black outline-none">
              Verwijder kenmerk
            </p>
            <div className="space-y-2.5">
              {category && (
                <>
                  <RemoveFilterButton
                    onClick={() => {
                      setCategory(null);
                      setSubCategories(null);
                    }}
                  >
                    {
                      filterCategories.find((item) => item.slug === category)
                        ?.name
                    }
                  </RemoveFilterButton>

                  {subCategories.length > 0 && (
                    <div className="space-y-2.5 pl-4">
                      {subCategories.map((subCategory) => (
                        <RemoveFilterButton
                          key={subCategory}
                          onClick={() => {
                            setSubCategories(
                              subCategories.filter(
                                (item) => item !== subCategory,
                              ),
                            );
                          }}
                        >
                          {
                            filterSubCategories.find(
                              (item) => item.slug === subCategory,
                            )?.name
                          }
                        </RemoveFilterButton>
                      ))}
                    </div>
                  )}
                </>
              )}

              {terms.map((term) => (
                <RemoveFilterButton
                  key={term}
                  onClick={() => {
                    setTerms((prevTerms) =>
                      prevTerms.filter((t) => t !== term),
                    );
                  }}
                  className="capitalize"
                >
                  {term.replace(/-/g, " ")}
                </RemoveFilterButton>
              ))}

              {showMinMaxRemoveButton && (
                <RemoveFilterButton
                  onClick={() => {
                    if (filterMaxPrice) {
                      setMinMaxPrice(null);
                      setLocalMinMaxState([filterMinPrice, filterMaxPrice]);
                    }
                  }}
                  className="capitalize"
                >
                  {currency_symbol} {minMaxPrice[0]} - {currency_symbol}{" "}
                  {minMaxPrice[1]}
                </RemoveFilterButton>
              )}
            </div>
          </div>
        )}
        <Accordion type="single" collapsible defaultValue="1">
          {filterCategories.length > 0 && (
            <FilterAccordion value="1" trigger="CATEGORIE">
              {filterCategories.map((categoryItem) => (
                <FilterCheckbox
                  key={categoryItem.id}
                  count={(categoryItem as any).products.length}
                  label={categoryItem.name}
                  checkboxProps={{
                    checked: category === categoryItem.slug,
                    onCheckedChange(checked) {
                      if (checked) {
                        setCategory(categoryItem.slug);
                      } else {
                        setCategory(null);
                      }
                    },
                  }}
                />
              ))}
            </FilterAccordion>
          )}
          {filterSubCategories.length > 0 && (
            <FilterAccordion value="2" trigger="SUBCATEGORIE">
              {filterSubCategories.map((subCategoryItem) => (
                <FilterCheckbox
                  key={subCategoryItem.id}
                  count={(subCategoryItem as any).products.length}
                  label={subCategoryItem.name}
                  checkboxProps={{
                    checked: subCategories.includes(subCategoryItem.slug),
                    onCheckedChange(checked) {
                      if (checked) {
                        setSubCategories([
                          ...subCategories,
                          subCategoryItem.slug,
                        ]);
                      } else {
                        setSubCategories(
                          subCategories.filter(
                            (subCategorie) =>
                              subCategorie !== subCategoryItem.slug,
                          ),
                        );
                      }
                    },
                  }}
                />
              ))}
            </FilterAccordion>
          )}
          {filterProductAttributes.length > 0 && (
            <FilterAccordion value="3" trigger="Attribute">
              <div className="space-y-3.5 divide-y divide-app-text/30">
                {filterProductAttributes.map((productAttribute) => {
                  if (
                    productAttribute.terms.filter(
                      (term) => term.products.length <= 0,
                    ).length === productAttribute.terms.length
                  )
                    return null;

                  const availableTerms = productAttribute.terms.filter(
                    (term) => term.products.length > 0,
                  );
                  return (
                    <div key={productAttribute.id} className="pt-2 first:pt-0">
                      <p className="font-semibold">{productAttribute.name}</p>
                      <div className="mt-2 space-y-2.5 pl-2">
                        {availableTerms.map((term) => (
                          <FilterCheckbox
                            key={term.id}
                            count={term.products.length}
                            label={term.name}
                            checkboxProps={{
                              checked: terms.includes(term.slug),
                              onCheckedChange(checked) {
                                if (checked) {
                                  setTerms([...terms, term.slug]);
                                } else {
                                  setTerms(
                                    terms.filter(
                                      (subCategorie) =>
                                        subCategorie !== term.slug,
                                    ),
                                  );
                                }
                              },
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </FilterAccordion>
          )}
          {localMinMaxState && (
            <FilterAccordion value="4" trigger="Price">
              <div className="px-4 pb-2 pt-3">
                <Slider
                  range
                  allowCross={false}
                  min={filterMinPrice}
                  max={filterMaxPrice}
                  onChange={(value) => {
                    if (Array.isArray(value)) {
                      setLocalMinMaxState(value);
                      handleMinMaxPriceChange(value);
                    }
                  }}
                  value={localMinMaxState || []}
                />
                <div className="mt-3.5 flex items-center justify-between text-xs font-medium">
                  <span>
                    {currency_symbol}
                    {localMinMaxState[0]}
                  </span>
                  <span>
                    {currency_symbol}
                    {localMinMaxState[1]}
                  </span>
                </div>
              </div>
            </FilterAccordion>
          )}
        </Accordion>
      </div>
    </aside>
  );
};

export default FilterSidebar;

const RemoveFilterButton = ({
  children,
  ...props
}: ComponentPropsWithoutRef<"button">) => {
  return (
    <button
      {...props}
      className={cn(
        "flex items-center gap-2 duration-200 hover:opacity-70 text-app-text font-medium w-full",
        props.className,
      )}
    >
      <X className="size-5 shrink-0 text-red-600" />
      {children}
    </button>
  );
};
