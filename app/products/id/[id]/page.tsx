import React from "react";
import ProductImage from "./ProductImage";
import Link from "next/link";
import data from "./sample.json";
import ProductDescription from "./ProductDescription";
import { productData } from "@/app/utils/Interfaces";
import ProductForm from "./ProductForm";
import ProductCardGrid from "@/app/UIElements/ProductCardGrid";
import ProductCart from "@/app/UIElements/ProductCart";

const page = ({ params: { id } }: { params: { id: string } }) => {
  console.log(id);

  const productData: productData = data[0];
  return (
    <main className="container pt-24 mx-auto px-6 sm:px-8 lg:px-14 sm:pt-32 lg:pt-40">
      <div className="flex flex-col gap-5 sm:gap-10 lg:grid lg:grid-cols-2">
        <ProductImage images={productData.images} />
        <div>
          <Link
            className="text-xs leading-4 text-center block sm:text-xl lg:text-left text-accent"
            href={`/products/c/${productData.category
              .toLowerCase()
              .split(" ")
              .join("")}/p/1`}
          >
            {productData.category}
          </Link>
          <h1
            className="text-[32px] font-medium text-center sm:mt-1 text-primary sm:text-5xl lg:text-[64px] lg:text-left
          "
          >
            {productData.name}
          </h1>
          <ProductDescription text={productData.description} />
          <ProductForm productData={productData} />
        </div>
      </div>
      <div className="text-primary lg:text-xl leading-6 flex flex-col gap-4 mt-8 lg:mt-10 ">
        {productData.guide && (
          <p>
            <b>How to use: </b>
            <span className="opacity-75">{productData.guide}</span>
          </p>
        )}
        {productData.ingredients && (
          <p>
            <b>Ingredient & Composition: </b>
            <span className="opacity-75">{productData.ingredients}</span>
          </p>
        )}
        {productData.suitable && (
          <p>
            <b>Suitable for: </b>
            <span className="opacity-75">{productData.suitable}</span>
          </p>
        )}
      </div>
      <div className="mt-8 sm:mt-12">
        <h2 className="text-2xl font-medium text-primary sm:text-[2rem]">
          {productData.category.toLowerCase() === "bundle"
            ? "Bundle Individual Product"
            : "Product Included in Bundles"}
        </h2>
        <ProductCardGrid>
          <ProductCart />
          <ProductCart />
          <ProductCart />
          <ProductCart />
        </ProductCardGrid>
      </div>
      <div className="mt-8 sm:mt-12">
        <h2 className="text-2xl font-medium text-primary sm:text-[2rem]">
          Other Products
        </h2>
        <ProductCardGrid>
          <ProductCart />
          <ProductCart />
          <ProductCart />
          <ProductCart />
        </ProductCardGrid>
      </div>
    </main>
  );
};

export default page;
