"use client";
import React, { useEffect, useState } from "react";
import { ProductPageData } from "@/app/utils/Interfaces";
import { axiosFetcher } from "@/app/UIElements/Miscellaneous/axiosFetcher";
import { useSearchParams } from "next/navigation";
import ProductAchieveLoading from "@/app/products/ProductAchieveLoading";
import ProductAchieveLayout from "@/app/products/ProductAchieveLayout";

const PageContent = ({ page, search }: { page: string; search: string }) => {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");

  const [data, setData] = useState<ProductPageData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const url =
        process.env.NEXT_PUBLIC_BASE_URL +
          `/api/products/searchPage/${search}/${page}?sort=${
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
      <ProductAchieveLoading
        hideCategory={true}
        pageTitle={"Search:" + search}
      />
    );
  }

  return (
    <ProductAchieveLayout
      data={data}
      pageTitle={"Search:" + search}
      paginationURL={`/products/s/${search}/p/`}
      hideCategory={true}
    />
  );
};

export default PageContent;
