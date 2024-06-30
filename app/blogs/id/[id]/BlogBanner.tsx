import HeroBgImage from "@/app/UIElements/Miscellaneous/HeroBgImage";
import Link from "next/link";
import React from "react";

const BlogBanner = ({
  main_image,
  category,
  date,
  title,
}: {
  main_image: string;
  category: string;
  date: string;
  title: string;
}) => {
  return (
    <div className="bg-primary px-6 h-[320px] pb-4 sm:h-[400px] sm:pb-4 lg:pb-6 text-neutral bg-opacity-50 relative flex items-end w-full">
      <HeroBgImage imageLink={main_image} />
      <div className="container mx-auto lg:max-w-[872px]">
        <div className="sm:flex sm:justify-between sm:flex-row-reverse">
          <span className="block lg:text-xl">{date}</span>
          <Link
            href={`/blogs/c/${category.toLowerCase().split(" ").join("")}/p/1`}
            className="font-medium tracking-wider lg:text-xl"
          >
            {category}
          </Link>
        </div>
        <h1 className="text-2xl sm:text-[40px] lg:text-5xl leading-8 sm:leading-[48px] lg:leading-[64px]">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default BlogBanner;
