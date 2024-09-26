import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constant";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  //FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { filed: "status", value: filterValue };

  //SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [filed, direction] = sortByRaw.split("-");
  const sortBy = { filed, direction };

  //PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //QUERY
  const { isLoading, data: { data: bookings, count } = {} } = useQuery({
    //Here we add filter whenever not the queryKey change also whenever the filter value change we want to refetch the data
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  //PRE-FETCH
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      //Here we add filter whenever not the queryKey change also whenever the filter value change we want to refetch the data
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      //Here we add filter whenever not the queryKey change also whenever the filter value change we want to refetch the data
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, bookings, count };
}
