import BlogCard from "@/app/UIElements/Card/BlogCard";
import ProductCard from "@/app/UIElements/Card/ProductCard";
import ProductCardGrid from "@/app/UIElements/Miscellaneous/ProductCardGrid";
import React from "react";

const RecommendedBlogsAndProducts = () => {
  return (
    <div className="container px-6 mx-auto pt-10 lg:pt-12 border-t border-t-primary flex flex-col gap-10">
      <div className="">
        <h2 className="text-2xl font-medium text-primary">Recommended Blogs</h2>
        <div className="max-w-72 mx-auto grid grid-cols-1 gap-4 mt-5 sm:max-w-[680px] sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 sm:mt-8 lg:max-w-full lg:grid-cols-4">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-medium text-primary">Our Products</h2>
        <ProductCardGrid>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </ProductCardGrid>
      </div>
    </div>
  );
};

export default RecommendedBlogsAndProducts;
