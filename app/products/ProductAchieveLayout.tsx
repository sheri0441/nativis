import React from "react";
import CategoryBar from "../components/SortAndSearchBar/CategoryBar";
import SortAndSearchBar from "../components/SortAndSearchBar/SortAndSearchBar";
import ProductCardGrid from "../UIElements/Miscellaneous/ProductCardGrid";
import Pagination from "../components/Pagination";
import { ProductCardType, ProductPageData } from "../utils/Interfaces";
import ProductCard from "../UIElements/Card/ProductCard";
import Banner from "../UIElements/Miscellaneous/Banner";

const ProductAchieveLayout = ({
  data,
  pageTitle,
  paginationURL,
  hideCategory = false,
}: {
  data: ProductPageData;
  pageTitle: string;
  paginationURL: string;
  hideCategory?: boolean;
}) => {
  return (
    <main className="container pt-24  mx-auto px-6 sm:px-8 lg:px-14 sm:pt-32 lg:pt-40">
      <h1 className="text-[32px] font-bold text-center sm:text-5xl lg:text-6xl text-primary capitalize">
        {pageTitle}
      </h1>
      {!hideCategory && <CategoryBar categories={data.categories} />}
      <SortAndSearchBar
        baseResultPageURL="/products/id/"
        baseSearchURL="/api/products/search/"
      />

      {data.products.length > 0 ? (
        <ProductCardGrid>
          {data.products.map((product: ProductCardType) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </ProductCardGrid>
      ) : (
        <p className="text-xl text-center mt-20 mb-20">
          Product of such category is not available
        </p>
      )}
      <Banner
        body="Be the first one to get notify on latest addition and changes."
        title="Our Products"
      />

      <Pagination
        baseURL={paginationURL}
        current={data.current}
        maximum={data.total}
      />
    </main>
  );
};

export default ProductAchieveLayout;
