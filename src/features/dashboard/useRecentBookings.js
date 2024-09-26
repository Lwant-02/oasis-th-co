import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBooking() {
  const [searchParam] = useSearchParams();
  const numDay = !searchParam.get("last") ? 7 : Number(searchParam.get("last"));

  const queryDate = subDays(new Date(), numDay).toISOString();
  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDay}`],
  });

  return { isLoading, bookings };
}
