import { useMutation, useQueryClient } from "react-query";
import * as ApiClient from "../api-client";
import { useAppContext } from "../context/AppContext";

export const SignOutButton = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const mutation = useMutation(ApiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Sign Out Success", type: "SUCCESS" });
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: "WARNING" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button
      onClick={handleClick}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-grey-300"
    >
      Sign Out
    </button>
  );
};
