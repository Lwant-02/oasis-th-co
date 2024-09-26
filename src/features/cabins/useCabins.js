import { useQuery } from "@tanstack/react-query";
import { getCabin } from "../../services/apiCabin";

export function useCabins() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabin,
  });
  return { isLoading, cabins };
}
