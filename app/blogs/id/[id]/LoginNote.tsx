import Link from "next/link";
import React from "react";

const LoginNote = () => {
  return (
    <div className="bg-primary text-neutral text-center p-6 pb-8 mt-6 rounded sm:rounded-md lg:rounded-lg">
      <p className="text-xl lg:2xl">Please Login to comment</p>
      <Link
        className="bg-neutral text-primary py-2 px-4 block w-fit mx-auto mt-4 rounded-full hover:bg-accent hover:text-neutral"
        href={"/signin"}
      >
        Login
      </Link>
    </div>
  );
};

export default LoginNote;
