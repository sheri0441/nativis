import React from "react";
import { Metadata } from "next";
import PageContent from "@/app/products/PageContent";

export async function generateMetadata({
  params: { search },
}: {
  params: { search: string };
}): Promise<Metadata> {
  return {
    title: `Search: ${search} | Nativis`,
    description: `Search result product related to ${search}`,
  };
}

const page = ({
  params: { page, search },
}: {
  params: { page: string; search: string };
}) => {
  return (
    <PageContent
      apiURL={`/api/products/searchPage/${search}/${page}`}
      page={page}
      pageTitle={"Search:" + search}
      paginationURL={`/products/s/${search}/p/`}
      additionRenderingCondition={[search]}
      hideCategory={true}
    />
  );
};

export default page;
