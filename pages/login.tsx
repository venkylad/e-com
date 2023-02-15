import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  getAuth,
  signInWithEmailAndPassword,
  getIdTokenResult,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  const router = useRouter();
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  const onSubmit = async ({ email, password }: FormData) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const tokenResponse = await getIdTokenResult(user);

      dispatch({
        type: "USER_LOGGED_IN",
        payload: {
          user: user.email,
          token: tokenResponse.token,
        },
      });
      toast.success("Successfully Logged in");
      router.push("/");
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      const tokenResponse = await getIdTokenResult(user);

      dispatch({
        type: "USER_LOGGED_IN",
        payload: {
          user: user.email,
          token: tokenResponse.token,
        },
      });
      toast.success("Successfully Logged in");
      router.push("/");
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full min-h-[300px] flex flex-col justify-center space-y-4 max-w-lg border rounded-2xl"
      >
        <input
          type="email"
          className="border"
          {...register("email", {
            required: "Email Address is required",
            validate: {
              isValid: (value) =>
                /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i.test(value) ||
                "Please enter a valid email!",
            },
          })}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && <p role="alert">{errors.email.message}</p>}
        <input
          type="password"
          className="border"
          {...register("password", {
            required: "Password is required",
          })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && <p role="alert">{errors.password.message}</p>}
        <button className="bg-gray-500" type="submit">
          Login
        </button>
      </form>
      <button className="bg-gray-500" onClick={loginWithGoogle}>
        Login With Google
      </button>
    </div>
  );
};

export default Login;
