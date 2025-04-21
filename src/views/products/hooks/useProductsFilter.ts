import { getProductsForProductsPageQueryOptions } from "@/api-clients/public-api-client/queries";
import usePaginatedQuery from "@/hooks/usePaginatedQuery";
import { keepPreviousData } from "@tanstack/react-query";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";
import { useMemo } from "react";

const useProductsFilter = () => {
  const [sort, setSort] = useQueryState(
    "sort",
    parseAsString.withDefault("relevance"),
  );
  const [category, setCategory] = useQueryState("category");
  const [query, setQuery] = useQueryState("q");
  const [subCategories, setSubCategories] = useQueryState(
    "subCategories",
    parseAsArrayOf(parseAsString).withDefault([]),
  );
  const [terms, setTerms] = useQueryState(
    "terms",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const [minMaxPrice, setMinMaxPrice] = useQueryState(
    "minMaxPrice",
    parseAsArrayOf(parseAsInteger).withDefault([]).withOptions({
      throttleMs: 500,
    }),
  );

  const totalAppliedFilters = useMemo(
    () =>
      [category, query, subCategories, terms, minMaxPrice].filter((item) => {
        if (Array.isArray(item)) {
          if (item.length > 0) return true;
          return false;
        }

        return !!item;
      }).length,
    [category, minMaxPrice, query, subCategories, terms],
  );

  const clearAllFilters = () => {
    setCategory(null);
    setQuery(null);
    setSubCategories([]);
    setTerms([]);
    setMinMaxPrice([]);
    setSort("relevance");
  };

  const productsQuery = usePaginatedQuery(({ page }) => {
    return {
      ...getProductsForProductsPageQueryOptions({
        axiosReqConfig: {
          params: {
            page,
            category,
            subCategories,
            terms,
            sort,
            minMaxPrice,
            q: query,
          },
        },
      }),
      placeholderData: keepPreviousData,
    };
  });

  const products = productsQuery.query.data?.data.data || [];

  return {
    category,
    setCategory,
    productsQuery,
    products,
    subCategories,
    setSubCategories,
    terms,
    setTerms,
    sort,
    setSort,
    minMaxPrice,
    setMinMaxPrice,
    query,
    setQuery,
    totalAppliedFilters,
    clearAllFilters,
  };
};

export default useProductsFilter;
