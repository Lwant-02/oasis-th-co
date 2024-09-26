import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabin";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isSuccess, mutate: deleteCabin } = useMutation({
    //The cabin id already pass to the deleteBookingApi when you call this function and not need to pass it here
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin successfully deleted!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isSuccess, deleteCabin };
}
