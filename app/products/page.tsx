import React from "react";
import FilterBar from "../components/SortAndSearchBar/FilterBar";
import SortAndSearchBar from "../components/SortAndSearchBar/SortAndSearchBar";
import ProductCardGrid from "../UIElements/ProductCardGrid";
import Pagination from "../components/Pagination";
import ProductCart from "../UIElements/ProductCart";

const page = () => {
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
      <Pagination baseURL={`/products/p/`} current={1} />
    </main>
  );
};

export default page;
