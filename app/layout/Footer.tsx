import Link from "next/link";
import React from "react";
import { LogoIcon } from "../utils/Icons";

const Footer = () => {
  return (
    <footer className="pt-6 px-6 pb-2 bg-primary  sm:pt-6 sm:px-8 sm:pb-4 lg:pt-8 lg:px-14 lg:pb-6 text-neutral mt-10 sm:mt-16 lg:mt-20">
      <div className="container mx-auto sm:flex">
        <div className="text-center sm:text-left">
          <span className="font-medium">Sitemap</span>
          <div className="mt-3 flex flex-col gap-2 *:flex *:flex-col *:gap-2 sm:flex-row sm:gap-28">
            <div className=" ">
              <Link href={"/"} className="hover:text-accent">
                Home
              </Link>
              <Link href={"/products"} className="hover:text-accent">
                Products
              </Link>
              <Link href={"/blogs"} className="hover:text-accent">
                Blogs
              </Link>
              <Link href={"/about"} className="hover:text-accent">
                About
              </Link>
              <Link href={"/contact"} className="hover:text-accent">
                Contact
              </Link>
            </div>
            <div className="">
              <Link href={"/terms and policy"} className="hover:text-accent">
                Terms &#38; Policy
              </Link>
              <Link href={"/contact#faq"} className="hover:text-accent">
                FAQs
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mx-auto w-fit mt-6 sm:mt-0 sm:mx-0 sm:ml-auto h-fit mb-4 sm:mb-0">
          <div className="w-14 sm:w-20 lg:w-32">
            <LogoIcon />
          </div>
          <span className="text-[10px] block  sm:text-base lg:text-2xl">
            Revitalize <br />
            with Nature&apos;s
            <br /> Touch
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
