import {
  QueryKey,
  RefetchQueryFilters,
  useQueryClient,
} from "@tanstack/react-query";

function useClientRefetch() {
  const queryClient = useQueryClient();

  return async (
    key: QueryKey,
    options?: Omit<RefetchQueryFilters, "queryKey">
  ) => {
    await queryClient.refetchQueries({ queryKey: key, ...options });
  };
}

export default useClientRefetch;
