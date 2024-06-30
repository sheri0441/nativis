import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "../../utils/Icons";
import style from "./BlogCard.module.css";
import blogImage from "../../assets/blogImage.jpg";

const BlogCard = ({ isSelected = false }: { isSelected?: boolean }) => {
  return (
    <Link
      href="/blogs/id/1"
      className={
        "block relative overflow-hidden text-neutral rounded transition-shadow duration-500 ease-in-out sm:rounded-lg lg:rounded-xl " +
        style.blogCart
      }
    >
      <div className="absolute top-0 left-0 -z-10 inset-0">
        <Image
          className="object-cover object-center transition-transform duration-500 ease-in-out w-full h-full"
          src={blogImage}
          alt="blogimage"
        />
      </div>
      <div className=" px-4 py-2">
        <div className="flex justify-between">
          <span className="text-[10px] font-light">August 28, 2024</span>
          <div className="flex gap-2">
            <span className="block text-xs opacity-50">(10)</span>
            <div className="w-[14px]">
              <HeartIcon
                style={`${isSelected ? "fill-accent" : "fill-neutral"}`}
              />
            </div>
          </div>
        </div>

        <span className="block text-[10px] font-bold mt-16 sm:mt-32 lg:mt-60">
          DIY Beauty
        </span>
        <h3 className="text-base mt-1 line-clamp-2 lg:text-xl">
          DIY Natural Face Masks: Rejuvenate Your Skin with Simple Ingredients
        </h3>
      </div>
    </Link>
  );
};

export default BlogCard;
