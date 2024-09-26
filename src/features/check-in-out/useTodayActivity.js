import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const { data: todayActivityData, isLoading } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });
  return { todayActivityData, isLoading };
}
