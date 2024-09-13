import React from "react";
import { Metadata } from "next";
import PageContent from "@/app/blogs/PageContent";

export async function generateMetadata({
  params: { search },
}: {
  params: { search: string };
}): Promise<Metadata> {
  return {
    title: `Search: ${search} | Nativis`,
    description: `Search result blogs related to ${search}`,
  };
}

const page = ({
  params: { page, search },
}: {
  params: { page: string; search: string };
}) => {
  return (
    <PageContent
      apiURL={`/api/blogs/searchPage/${search}/${page}`}
      page={page}
      pageTitle={"Search:" + search}
      paginationURL={`/blogs/s/${search}/p/`}
      additionRenderingConditions={[search]}
      hideCategoryBar={true}
    />
  );
};

export default page;
