import { Cross } from "@/app/UIElements/Icons";
import IconsBtn from "@/app/UIElements/IconsBtn";
import { color } from "@/app/UIElements/colors";
import Link from "next/link";
import React from "react";

const Navigation = ({
  showMenu,
  toggleMenu,
}: {
  showMenu: boolean;
  toggleMenu: Function;
}) => {
  return (
    <div
      className={`fixed top-0 left-0 inset-0 z-10 bg-primary  transition-all duration-500 ease-in-out ${
        !showMenu && " -translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="container text-center mx-auto pt-12 sm:pt-16 text-neutral uppercase">
        <span className="text-xl sm:text-3xl font-medium">Menu</span>
        <nav className="mt-8 *:relative *:leading-3 *:after:content-[''] *:after:w-0  *:after:h-[2px] *:after:bg-neutral *:after:absolute *:after:top-1/2 *:after:-left-5 *:after:-translate-y-1/2 *:after:transition-all *:after:duration-500 *:after:ease-in-out *:before:content-[''] *:before:w-0  *:before:h-[2px] *:before:bg-neutral *:before:absolute *:before:top-1/2 *:before:-right-5 *:before:-translate-y-1/2 *:before:transition-all *:before:duration-500 *:before:ease-in-out *:w-fit *:mx-auto flex flex-col gap-5 sm:*:text-lg">
          <Link href={"/"} className="hover:after:w-4 hover:before:w-4">
            Home
          </Link>
          <Link href={"/"} className="hover:after:w-4 hover:before:w-4">
            Products
          </Link>
          <Link href={"/"} className="hover:after:w-4 hover:before:w-4">
            Blogs
          </Link>
          <Link href={"/"} className="hover:after:w-4 hover:before:w-4">
            About
          </Link>
          <Link href={"/"} className="hover:after:w-4 hover:before:w-4">
            Contact
          </Link>
        </nav>

        <div className="mt-12 mb-5 sm:mb-6">
          <IconsBtn clickEvent={() => toggleMenu()}>
            <Cross color={color.primary} />
          </IconsBtn>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
