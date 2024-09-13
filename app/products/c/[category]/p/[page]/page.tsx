import React from "react";
import { Metadata } from "next";
import PageContent from "@/app/products/PageContent";
import { capitalizeWords } from "@/app/app-lib";

export async function generateMetadata({
  params: { category },
}: {
  params: { category: string };
}): Promise<Metadata> {
  const mainWord = capitalizeWords(category);
  return {
    title: `Category: ${mainWord} | Nativis`,
    description: `Our products related to ${mainWord} category.`,
  };
}

const page = ({
  params: { category, page },
}: {
  params: { category: string; page: string };
}) => {
  return (
    <PageContent
      apiURL={`/api/products/category/${category}/${page}`}
      page={page}
      pageTitle={"Category:" + category.replaceAll("-", " ")}
      paginationURL={`/products/c/${category}/p/`}
      additionRenderingCondition={[category]}
    />
  );
};

export default page;
