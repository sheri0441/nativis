import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { productData } from "@/app/utils/Interfaces";
import ProductCardGrid from "@/app/UIElements/Miscellaneous/ProductCardGrid";
import ProductCard from "@/app/UIElements/Card/ProductCard";
import ProductImage from "./ProductImage";
import ProductDescription from "./ProductDescription";
import ProductForm from "./ProductForm";
import data from "./sample.json";
import MainTag from "@/app/UIElements/Miscellaneous/MainTag";

export async function generateMetadata(): Promise<Metadata> {
  const productData: productData = data[0];
  return {
    title: ` ${productData.name} | Products`,
    description: productData.description,
  };
}

const page = ({ params: { id } }: { params: { id: string } }) => {
  console.log(id);

  const productData: productData = data[0];
  return (
    <MainTag>
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
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </ProductCardGrid>
      </div>
      <div className="mt-8 sm:mt-12">
        <h2 className="text-2xl font-medium text-primary sm:text-[2rem]">
          Other Products
        </h2>
        <ProductCardGrid>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </ProductCardGrid>
      </div>
    </MainTag>
  );
};

export default page;
