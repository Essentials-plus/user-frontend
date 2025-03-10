import { getProductsForProductsPageQueryOptions } from "@/api-clients/public-api-client/queries";
import usePaginatedQuery from "@/hooks/usePaginatedQuery";
import { keepPreviousData } from "@tanstack/react-query";
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from "nuqs";

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

  const products = productsQuery.data?.data.data || [];

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
  };
};

export default useProductsFilter;
