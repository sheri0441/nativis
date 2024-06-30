import React from "react";
import ProductCard from "@/app/UIElements/Card/ProductCard";
import ProductCardGrid from "@/app/UIElements/Miscellaneous/ProductCardGrid";
import Pagination from "@/app/components/Pagination";
import FilterBar from "@/app/components/SortAndSearchBar/FilterBar";
import SortAndSearchBar from "@/app/components/SortAndSearchBar/SortAndSearchBar";

const page = ({ params: { page } }: { params: { page: string } }) => {
  return (
    <main className="container pt-24  mx-auto px-6 sm:px-8 lg:px-14 sm:pt-32 lg:pt-40">
      <h1 className="text-[32px] font-bold text-center sm:text-5xl lg:text-6xl">
        Products
      </h1>
      <FilterBar />
      <SortAndSearchBar />
      <ProductCardGrid>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </ProductCardGrid>
      <Pagination baseURL={`/products/p/`} current={Number(page)} />
    </main>
  );
};

export default page;
