import React, { useEffect, useState } from "react";
import {
  getIdTokenResult,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  updatePassword,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/router";

interface FormData {
  email: string;
  password: string;
}

const CompleteRegistration = () => {
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();
  const [email, setEmail] = useState<string>("");

  const router = useRouter();

  const onSubmit = ({ password }: any) => {
    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        if (result.user.emailVerified) {
          window.localStorage.removeItem("emailForSignIn");

          let user = auth.currentUser;

          if (user !== null) {
            updatePassword(user, password);
            const idTokenResults = getIdTokenResult(user)
              .then((res) => {
                toast.success("Successfully added password");
                setTimeout(() => router.push("/"), 1500);
              })
              .catch((err) => {
                toast.error(err.message);
                console.log(err);
              });
          }
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  useEffect(() => {
    const getEmail = window.localStorage.getItem("emailForSignIn");

    if (getEmail) {
      setEmail(getEmail);
    }
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full min-h-[300px] flex flex-col justify-center space-y-4 max-w-lg border rounded-2xl"
      >
        <input className="border" type="email" value={email} disabled />
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
          Register
        </button>
      </form>
    </div>
  );
};

export default CompleteRegistration;
