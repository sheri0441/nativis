"use client";
import BlogAchieveLayout from "@/app/blogs/BlogAchieveLayout";
import BlogAchieveLoading from "@/app/blogs/BlogAchieveLoading";
import { axiosFetcher } from "@/app/UIElements/Miscellaneous/axiosFetcher";
import { BlogPageData } from "@/app/utils/Interfaces";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PageContent = ({
  page,
  category,
}: {
  page: string;
  category: string;
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
          `/api/blogs/category/${category}/${page}?sort=${
            sort ? sort : "newest"
          }` || "";

      const result = await axiosFetcher(url);

      setData(result);
      setIsLoading((pervState) => (pervState = false));
    };
    fetchData();
  }, [page, sort]);

  if (!data || isLoading) {
    return (
      <BlogAchieveLoading
        pageTitle={"Category:" + category.replaceAll("-", " ")}
      />
    );
  }
  return (
    <BlogAchieveLayout
      data={data}
      pageTitle={"Category:" + category.replaceAll("-", " ")}
      paginationURL={`/blogs/c/${category}/p/`}
    />
  );
};

export default PageContent;
