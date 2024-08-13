import React from "react";
import { Metadata } from "next";
import PageContent from "./PageContent";

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
  return <PageContent page={page} search={search} />;
};

export default page;
