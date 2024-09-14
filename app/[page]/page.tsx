import { Metadata } from "next";
import React from "react";
import PageTitle from "../UIElements/Miscellaneous/PageTitle";
import MainTag from "../UIElements/Miscellaneous/MainTag";
import RichTextRenderer from "../components/RichTextRenderer";
import axios, { AxiosError } from "axios";
import { capitalizeWords } from "../app-lib";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { page: string };
}): Promise<Metadata> {
  let pageMeta, capitalizedTitle, pageMetaMeta;

  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + `/api/page/${params.page}/meta`
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
  if (params.page !== "about" && params.page !== "terms and policy") {
    redirect("/about");
  }
  let pageContent;
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + `/api/page/${params.page}`
    );
    if (response.status !== 200) {
      redirect("/404");
    }
    pageContent = response.data;
  } catch (error) {}

  return (
    <MainTag extraStyle="lg:max-w-[872px]">
      {pageContent && (
        <>
          <PageTitle>{pageContent.title}</PageTitle>
          <RichTextRenderer content={pageContent.content} />
        </>
      )}
    </MainTag>
  );
};

export default page;
