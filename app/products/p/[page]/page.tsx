import ProductCardGrid from "@/app/UIElements/ProductCardGrid";
import ProductCart from "@/app/UIElements/ProductCart";
import Pagination from "@/app/components/Pagination";
import FilterBar from "@/app/components/SortAndSearchBar/FilterBar";
import SortAndSearchBar from "@/app/components/SortAndSearchBar/SortAndSearchBar";
import React from "react";

const page = ({ params: { page } }: { params: { page: string } }) => {
  return (
    <main className="container pt-24  mx-auto px-6 sm:px-8 lg:px-14 sm:pt-32 lg:pt-40">
      <h1 className="text-[32px] font-bold text-center sm:text-5xl lg:text-6xl">
        Products
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
      <Pagination baseURL={`/products/p/`} current={Number(page)} />
    </main>
  );
};

export default page;
