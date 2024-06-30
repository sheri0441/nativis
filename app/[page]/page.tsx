import { Metadata } from "next";
import React from "react";
import data from "./sample.json";
import term from "./sample2.json";
import PageTitle from "../UIElements/Miscellaneous/PageTitle";
import MainTag from "../UIElements/Miscellaneous/MainTag";
import RichTextRenderer from "../components/RichTextRenderer";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `terms&policy | Nativis`,
    description: "terms&policy | Nativis",
  };
}

const page = ({ params: { page } }: { params: { page: string } }) => {
  return (
    <MainTag extraStyle="lg:max-w-[872px]">
      <PageTitle>{page}</PageTitle>
      <RichTextRenderer content={term.content} />
    </MainTag>
  );
};

export default page;
