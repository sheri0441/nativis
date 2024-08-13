import React from "react";
import ProductCardLoading from "../UIElements/Card/ProductCardLoading";
import ProductCardGrid from "../UIElements/Miscellaneous/ProductCardGrid";

const ProductCardLoadingGrid = () => {
  return (
    <ProductCardGrid extraStyle="odd:*:animate-bgPulse even:*:animate-bgPulseAlter">
      <ProductCardLoading />
      <ProductCardLoading />
      <ProductCardLoading />
      <ProductCardLoading />
      <ProductCardLoading />
      <ProductCardLoading />
      <ProductCardLoading />
      <ProductCardLoading />
      <ProductCardLoading />
      <ProductCardLoading />
      <ProductCardLoading />
      <ProductCardLoading />
    </ProductCardGrid>
  );
};

export default ProductCardLoadingGrid;
