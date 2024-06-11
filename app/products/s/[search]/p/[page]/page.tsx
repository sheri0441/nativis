import ProductCardGrid from "@/app/UIElements/ProductCardGrid";
import ProductCart from "@/app/UIElements/ProductCart";
import Pagination from "@/app/components/Pagination";
import FilterBar from "@/app/components/SortAndSearchBar/FilterBar";
import SortAndSearchBar from "@/app/components/SortAndSearchBar/SortAndSearchBar";
import React from "react";

const page = ({
  params: { page, search },
}: {
  params: { page: string; search: string };
}) => {
  return (
    <main className="container pt-24  mx-auto px-6 sm:px-8 lg:px-14 sm:pt-32 lg:pt-40">
      <h1 className="text-[32px] font-bold text-center sm:text-5xl lg:text-6xl">
        Search: {search} {page}
      </h1>
      <FilterBar />
      <SortAndSearchBar />
      <ProductCardGrid>
        <ProductCart />
        <ProductCart />
        <ProductCart />
        <ProductCart />
        <ProductCart />
        <ProductCart />
        <ProductCart />
        <ProductCart />
        <ProductCart />
        <ProductCart />
        <ProductCart />
        <ProductCart />
      </ProductCardGrid>

      <Pagination baseURL={`/blogs/s/${search}/p/`} current={Number(page)} />
    </main>
  );
};

export default page;
