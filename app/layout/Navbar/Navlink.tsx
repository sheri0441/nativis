import { useAppDispatch } from "@/app/app/hookes";
import Link from "next/link";
import React from "react";
import { toggleMenu } from "@/app/app/features/navigation/navigationSlice";

const Navlink = ({ url, text }: { url: string; text: string }) => {
  const dispatch = useAppDispatch();

  return (
    <Link
      href={url}
      className="hover:after:w-4 hover:before:w-4 capitalize"
      onClick={() => dispatch(toggleMenu())}
    >
      {text}
    </Link>
  );
};

export default Navlink;
