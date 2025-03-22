import {
  DefaultError,
  QueryKey,
  UndefinedInitialDataOptions,
  useQuery,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";

const usePaginatedQuery = <
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: ({
    // eslint-disable-next-line no-unused-vars
    page,
  }: {
    page: number;
  }) => UndefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>,
) => {
  const [totalPage, setTotalPage] = useState<undefined | number>(undefined);

  const [activePage, setActivePage] = useState(1);
  const query = useQuery({
    ...options({ page: activePage }),
  });

  const pageCount = (query as any).data?.meta?.pageCount;
  useEffect(() => {
    if (typeof pageCount !== "number") return;

    setTotalPage(pageCount);
  }, [pageCount]);

  const fetchPage = (page: number) => {
    setActivePage(page);
  };

  return { query, fetchPage, activePage, totalPage };
};

export default usePaginatedQuery;
