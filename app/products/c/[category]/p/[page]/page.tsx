import React from "react";
import { Metadata } from "next";
import ProductCard from "@/app/UIElements/Card/ProductCard";
import ProductCardGrid from "@/app/UIElements/Miscellaneous/ProductCardGrid";
import Pagination from "@/app/components/Pagination";
import FilterBar from "@/app/components/SortAndSearchBar/FilterBar";
import SortAndSearchBar from "@/app/components/SortAndSearchBar/SortAndSearchBar";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Category: category | Nativis`,
    description: "terms&policy | Nativis",
  };
}

const page = ({
  params: { category, page },
}: {
  params: { category: string; page: string };
}) => {
  return (
    <main className="container pt-24  mx-auto px-6 sm:px-8 lg:px-14 sm:pt-32 lg:pt-40">
      <h1 className="text-[32px] font-bold text-center sm:text-5xl lg:text-6xl">
        Category: {category} {page}
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
      <Pagination baseURL={`blogs/c/${category}/p/`} current={Number(page)} />
    </main>
  );
};

export default page;
