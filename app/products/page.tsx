import React from "react";
import { Metadata } from "next";
import ProductCardGrid from "../UIElements/Miscellaneous/ProductCardGrid";
import ProductCard from "../UIElements/Card/ProductCard";
import PageTitle from "../UIElements/Miscellaneous/PageTitle";
import MainTag from "../UIElements/Miscellaneous/MainTag";
import Pagination from "../components/Pagination";
import FilterBar from "../components/SortAndSearchBar/FilterBar";
import SortAndSearchBar from "../components/SortAndSearchBar/SortAndSearchBar";

export const metadata: Metadata = {
  title: "Nativis | Products",
  description: `Get our neem based products that are good for your self`,
};

const page = () => {
  return (
    <MainTag>
      <PageTitle>Products</PageTitle>
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
      <Pagination baseURL={`/products/p/`} current={1} />
    </MainTag>
  );
};

export default page;
