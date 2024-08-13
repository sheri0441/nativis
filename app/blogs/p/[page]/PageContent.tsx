"use client";
import React, { useEffect, useState } from "react";
import BlogAchieveLayout from "../../BlogAchieveLayout";
import { useSearchParams } from "next/navigation";
import { BlogPageData } from "@/app/utils/Interfaces";
import { axiosFetcher } from "@/app/UIElements/Miscellaneous/axiosFetcher";
import BlogAchieveLoading from "../../BlogAchieveLoading";

const PageContent = ({ page }: { page: string }) => {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");

  const [data, setData] = useState<BlogPageData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const url =
        process.env.NEXT_PUBLIC_BASE_URL +
          `/api/blogs/${page}?sort=${sort ? sort : "newest"}` || "";

      const result = await axiosFetcher(url);

      setData(result);
      setIsLoading((pervState) => (pervState = false));
    };
    fetchData();
  }, [page, sort]);

  if (!data || isLoading) {
    return <BlogAchieveLoading pageTitle="Blogs" />;
  }

  return (
    <BlogAchieveLayout
      data={data}
      pageTitle="Blogs"
      paginationURL="/blogs/p/"
    />
  );
};

export default PageContent;
