"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "../../utils/Icons";
import style from "./BlogCard.module.css";
import { BlogCardType } from "../../utils/Interfaces";
import { convertToAbbreviation } from "../Miscellaneous/convertToAbbreviation";
import { checkLikeOfBlog, convertDateToString } from "@/app/app-lib";
import { useAppSelector } from "@/app/app/hookes";

const BlogCard = ({ blog }: { blog: BlogCardType }) => {
  const date = convertDateToString(blog.createdAt);
  const likes = convertToAbbreviation(blog.likes);

  const isLogin = useAppSelector((store) => store.user.isLogin);

  const [isLiked, setIsLiked] = useState<boolean>(false);

  const checkLike = async () => {
    const liked = await checkLikeOfBlog(blog.id);
    setIsLiked((perv) => (perv = liked));
  };

  useEffect(() => {
    if (isLogin) {
      checkLike();
    }
  }, []);

  return (
    <Link
      href={`/blogs/id/${blog.id}`}
      className={
        "block relative overflow-hidden text-neutral rounded transition-shadow duration-500 ease-in-out sm:rounded-lg lg:rounded-xl " +
        style.blogCart
      }
    >
      <div className="absolute top-0 left-0 -z-10 inset-0">
        <Image
          className="object-cover object-center transition-transform duration-500 ease-in-out w-full h-full"
          src={blog.thumbnail}
          alt={blog.title}
          width={1000}
          height={500}
        />
      </div>
      <div className=" px-4 py-2">
        <div className="flex justify-between">
          <span className="text-[10px] font-light">{date}</span>
          <div className="flex gap-2">
            <span className="block text-xs opacity-50">({likes})</span>
            <div className="w-[14px]">
              <HeartIcon
                style={`${isLiked ? "fill-accent" : "fill-neutral"}`}
              />
            </div>
          </div>
        </div>

        <span className="block text-[10px] font-bold mt-16 sm:mt-32 lg:mt-60">
          {blog.category}
        </span>
        <h3 className="text-base mt-1 line-clamp-2 lg:text-xl">{blog.title}</h3>
      </div>
    </Link>
  );
};

export default BlogCard;
