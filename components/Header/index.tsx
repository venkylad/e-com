import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/router";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    auth.signOut();
    dispatch({
      type: "USER_LOGGED_OUT",
      payload: null,
    });
    router.push("/login");
  };

  return (
    <div className="w-full items-center grid grid-cols-3 h-50 shadow-lg py-5 px-10">
      <div className=" col-span-2 ">
        <Link href="/">Logo</Link>
      </div>
      <div className="flex justify-evenly items-center">
        <p>
          <Link href="/login">Login</Link>
        </p>
        <p>
          <Link href="/register">Register</Link>
        </p>
        <p>
          <button onClick={handleLogout}>Logout</button>
        </p>
      </div>
    </div>
  );
};

export default Header;
