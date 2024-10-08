"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BlogPageData } from "../utils/Interfaces";
import BlogAchieveLoading from "./BlogAchieveLoading";
import BlogAchieveLayout from "./BlogAchieveLayout";
import axios from "axios";

const PageContent = ({
  page,
  apiURL,
  additionRenderingConditions = [],
  hideCategoryBar = false,
  paginationURL,
  pageTitle,
}: {
  page: string;
  apiURL: string;
  additionRenderingConditions?: String[];
  hideCategoryBar?: boolean;
  paginationURL: string;
  pageTitle: string;
}) => {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");

  const [data, setData] = useState<BlogPageData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const url =
        process.env.NEXT_PUBLIC_BASE_URL +
          `${apiURL}?sort=${sort ? sort : "newest"}` || "";
      let result;
      try {
        const response = await axios.get(url);
        if (response.status !== 200) {
          throw new Error();
        }
        result = response.data;
      } catch (error) {
        result = [];
      }

      setData(result);
      setIsLoading(false);
    };
    fetchData();
  }, [page, apiURL, sort, ...additionRenderingConditions]);

  if (!data || isLoading) {
    return (
      <BlogAchieveLoading
        hideCategory={hideCategoryBar}
        pageTitle={pageTitle}
      />
    );
  }

  return (
    <BlogAchieveLayout
      data={data}
      pageTitle={pageTitle}
      paginationURL={paginationURL}
      hideCategory={hideCategoryBar}
    />
  );
};

export default PageContent;
