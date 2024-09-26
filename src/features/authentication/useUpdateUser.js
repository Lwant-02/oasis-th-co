import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User account successfully updated!");
      queryClient.setQueryData(["user"], user); //This updates the cache with the new user data immediately, so the UI reflects the changes without waiting for a refetch.
      queryClient.invalidateQueries({ queryKey: ["user"] }); //ensures the data will be refetched from the server to keep it up to date.
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateUser, isPending };
}
