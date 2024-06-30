import React from "react";
import ProductCard from "@/app/UIElements/Card/ProductCard";
import MainTag from "@/app/UIElements/Miscellaneous/MainTag";
import PageTitle from "@/app/UIElements/Miscellaneous/PageTitle";
import ProductCardGrid from "@/app/UIElements/Miscellaneous/ProductCardGrid";
import Pagination from "@/app/components/Pagination";
import FilterBar from "@/app/components/SortAndSearchBar/FilterBar";
import SortAndSearchBar from "@/app/components/SortAndSearchBar/SortAndSearchBar";

const page = ({
  params: { page, search },
}: {
  params: { page: string; search: string };
}) => {
  return (
    <MainTag>
      <PageTitle>
        Search: {search} {page}
      </PageTitle>
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
      <Pagination baseURL={`/blogs/s/${search}/p/`} current={Number(page)} />
    </MainTag>
  );
};

export default page;
