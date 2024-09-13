import { Metadata } from "next";
import React from "react";
import PageTitle from "../UIElements/Miscellaneous/PageTitle";
import MainTag from "../UIElements/Miscellaneous/MainTag";
import RichTextRenderer from "../components/RichTextRenderer";
import axios from "axios";
import { capitalizeWords } from "../app-lib";
import { redirect } from "next/navigation";

export async function generateStaticParams() {
  const paths = [{ page: "about" }, { page: "terms and policy" }];

  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: { page: string };
}): Promise<Metadata> {
  let pageMeta, capitalizedTitle, pageMetaMeta;

  try {
    const response = await axios.get(
      process.env.BASE_URL + `/api/page/${params.page}/meta`
    );

    pageMeta = response.data;
    capitalizedTitle = capitalizeWords(pageMeta.title);
    pageMetaMeta = pageMeta.meta;
  } catch (error) {
    pageMeta = "page not found";
    capitalizedTitle = capitalizeWords(pageMeta);
    pageMetaMeta = pageMeta;
  }

  return {
    title: `${capitalizedTitle} | Nativis`,
    description: pageMetaMeta,
  };
}

const page = async ({ params }: { params: { page: string } }) => {
  try {
    const response = await axios.get(
      process.env.BASE_URL + `/api/page/${params.page}`
    );
    const pageContent = response.data;

    return (
      <MainTag extraStyle="lg:max-w-[872px]">
        <PageTitle>{pageContent.title}</PageTitle>
        <RichTextRenderer content={pageContent.content} />
      </MainTag>
    );
  } catch (error) {
    console.error("Error fetching FAQ:", error);
    return <div>There is some error please try again.</div>;
  }
};

export default page;
