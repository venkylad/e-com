import React from "react";
import { sendSignInLinkToEmail } from "firebase/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { auth } from "@/utils/firebase";

interface FormData {
  email: string;
}

const Register = () => {
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();

  console.log(process.env.NEXT_PUBLIC_REGISTER_REDIRECT_URL);

  const onSubmit = ({ email }: any) => {
    const actionCodeSettings = {
      url: `${process.env.NEXT_PUBLIC_REGISTER_REDIRECT_URL}`,
      handleCodeInApp: true,
    };
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
        toast(`Email verification link sent to ${email}`);
        setValue("email", "");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast(`Error: ${errorMessage}`);
      });
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
        <button className="bg-gray-500" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
