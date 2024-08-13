import React from "react";
import { Metadata } from "next";
import PageContent from "./PageContent";

export async function generateMetadata({
  params: { category },
}: {
  params: { category: string };
}): Promise<Metadata> {
  const words = category.replaceAll("-", " ").split(" ");
  const mainWord = words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
  return {
    title: `Category: ${mainWord} | Nativis`,
    description: `Our blogs related to ${mainWord} category`,
  };
}

const page = ({
  params: { category, page },
}: {
  params: { category: string; page: string };
}) => {
  return <PageContent category={category} page={page} />;
};

export default page;
