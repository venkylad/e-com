import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="w-full items-center grid grid-cols-3 h-50 shadow-lg py-5 px-10">
      <div className=" col-span-2 ">
        <Link href="/">Logo</Link>
      </div>
      <div className="grid grid-cols-2">
        <p>
          <Link href="/login">Login</Link>
        </p>
        <p>
          <Link href="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Header;
