"use client";
import BlogAchieveLayout from "@/app/blogs/BlogAchieveLayout";
import BlogAchieveLoading from "@/app/blogs/BlogAchieveLoading";
import { axiosFetcher } from "@/app/UIElements/Miscellaneous/axiosFetcher";
import { BlogPageData } from "@/app/utils/Interfaces";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PageContent = ({ page, search }: { page: string; search: string }) => {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");

  const [data, setData] = useState<BlogPageData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const url =
        process.env.NEXT_PUBLIC_BASE_URL +
          `/api/blogs/searchPage/${search}/${page}?sort=${
            sort ? sort : "newest"
          }` || "";

      const result = await axiosFetcher(url);
      console.log(result);

      setData(result);
      setIsLoading((pervState) => (pervState = false));
    };
    fetchData();
  }, [page, sort]);

  if (!data || isLoading) {
    return (
      <BlogAchieveLoading hideCategory={true} pageTitle={"Search:" + search} />
    );
  }

  return (
    <BlogAchieveLayout
      data={data}
      pageTitle={"Search:" + search}
      paginationURL={`/blogs/s/${search}/p/`}
      hideCategory={true}
    />
  );
};

export default PageContent;
