import { useForm } from "react-hook-form";
import { useAppContext } from "../context/AppContext";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { RegisterFormData } from "./Register";
import * as ApiClient from "../api-client";

export type SignInFormData = {
  email: string;
  password: string;
};

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const { showToast } = useAppContext();
  const navigation = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(ApiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Login success", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigation("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "WARNING" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label className="text-grey-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-grey-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be of minimum 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex flex-row items-center justify-between">
        <span className="text-sm ">
          Not Registered?{" "}
          <Link className="underline" to={"/register"}>
            Create account here
          </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 tedxt-xl"
        >
          Sign In
        </button>
      </span>
    </form>
  );
};
