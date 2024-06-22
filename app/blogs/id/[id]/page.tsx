import React from "react";
import data from "./sample.json";
import HeroBgImage from "@/app/UIElements/HeroBgImage";
import Link from "next/link";
import BlogPostContent from "./BlogPostContent";
import { ArrowIcon, HeartIcon, ShareIcon } from "@/app/UIElements/Icons";
import { color } from "@/app/UIElements/colors";
import Image from "next/image";
import avataar from "../../../assets/avaatar.png";

const page = ({ params: { id } }: { params: { id: string } }) => {
  console.log(id);

  return (
    <main className="">
      <div className="bg-primary px-6 h-[320px] pb-4 sm:h-[400px] sm:pb-4 lg:pb-6 text-neutral bg-opacity-50 relative flex items-end w-full">
        <HeroBgImage imageLink={data.main_image} />
        <div className="container mx-auto lg:max-w-[872px]">
          <div className="sm:flex sm:justify-between sm:flex-row-reverse">
            <span className="block lg:text-xl">{data.date}</span>
            <Link
              href={`/blogs/c/${data.category
                .toLowerCase()
                .split(" ")
                .join("")}/p/1`}
              className="font-medium tracking-wider lg:text-xl"
            >
              {data.category}
            </Link>
          </div>
          <h1 className="text-2xl sm:text-[40px] lg:text-5xl leading-8 sm:leading-[48px] lg:leading-[64px]">
            {data.title} {data.title}
          </h1>
        </div>
      </div>
      <div className={`container mx-auto lg:max-w-[872px] text-primary  `}>
        <BlogPostContent content={data.content} />
        {/* LIke & share button */}
        <div className="border-t border-t-primary mt-3  pt-3  flex justify-center gap-4">
          <button className=" flex h-10 gap-2 items-center py-2 px-4 font-medium fill-primary hover:fill-neutral bg-primary bg-opacity-25 rounded-lg hover:bg-accent hover:text-neutral">
            <HeartIcon fill={color.primary} /> Like
          </button>
          <button className=" flex h-10 gap-2 items-center py-2 px-4 font-medium fill-primary hover:fill-neutral bg-primary bg-opacity-25 rounded-lg hover:bg-accent hover:text-neutral">
            <ShareIcon />
            Share
          </button>
        </div>
        {/* comments section */}
        <div className="px-6 mt-5">
          <div className="sm:flex sm:justify-between">
            <h2 className="capitalize text-primary text-[2rem] font-bold sm:text-5xl">
              comments
              <span className="text-base font-light pl-2">
                ({data.comments.length})
              </span>
            </h2>
            {/* comments pagination */}
            <div className="flex justify-center gap-4 items-center mt-2">
              <button className="group h-8 sm:h-10 aspect-square grid items-center bg-primary bg-opacity-25 rounded-full p-2 sm:p-3 hover:bg-accent">
                <ArrowIcon
                  fill={color.primary}
                  style={"group-hover:fill-neutral"}
                />
              </button>
              <span>1/2</span>
              <button className="group h-8 sm:h-10 aspect-square grid items-center bg-primary bg-opacity-25 rounded-full p-2 sm:p-3  rotate-180 hover:bg-accent">
                <ArrowIcon
                  fill={color.primary}
                  style={"group-hover:fill-neutral"}
                />
              </button>
            </div>
          </div>
          {/* comments list */}
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <Image
                className=" rounded-full hidden sm:block sm:h-20 w-20"
                src={avataar}
                alt=""
              />
              <div className="flex flex-col gap-2">
                <p className="font-medium hidden sm:block ">
                  {data.comments[0].author_name}{" "}
                </p>
                <p className="">{data.comments[0].content}</p>
                <p className="hidden sm:block font-light text-xs">
                  {data.comments[0].created_at}
                </p>
              </div>

              <div className="flex gap-2 sm:hidden">
                <Image
                  className="h-11 w-11 rounded-full "
                  src={avataar}
                  alt=""
                />
                <div className="flex flex-col">
                  <p className="font-medium ">{data.comments[0].author_name}</p>
                  <p className=" font-light text-xs">
                    {data.comments[0].created_at}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <Image
                className=" rounded-full hidden sm:block sm:h-20 w-20"
                src={avataar}
                alt=""
              />
              <div className="flex flex-col gap-2">
                <p className="font-medium hidden sm:block ">
                  {data.comments[0].author_name}{" "}
                </p>
                <p className="">{data.comments[0].content}</p>
                <p className="hidden sm:block font-light text-xs">
                  {data.comments[0].created_at}
                </p>
              </div>

              <div className="flex gap-2 sm:hidden">
                <Image
                  className="h-11 w-11 rounded-full "
                  src={avataar}
                  alt=""
                />
                <div className="flex flex-col">
                  <p className="font-medium ">{data.comments[0].author_name}</p>
                  <p className=" font-light text-xs">
                    {data.comments[0].created_at}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* note for login */}
          <div className="bg-primary text-neutral text-center p-6 pb-8 mt-6 rounded sm:rounded-md lg:rounded-lg">
            <p className="text-xl lg:2xl">Please Login to comment</p>
            <Link
              className="bg-neutral text-primary py-2 px-4 block w-fit mx-auto mt-4 rounded-full hover:bg-accent hover:text-neutral"
              href={""}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
