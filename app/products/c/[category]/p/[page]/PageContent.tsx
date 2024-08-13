"use client";
import React, { useEffect, useState } from "react";
import { ProductPageData } from "@/app/utils/Interfaces";
import { axiosFetcher } from "@/app/UIElements/Miscellaneous/axiosFetcher";
import { useSearchParams } from "next/navigation";
import ProductAchieveLoading from "@/app/products/ProductAchieveLoading";
import ProductAchieveLayout from "@/app/products/ProductAchieveLayout";

const PageContent = ({
  page,
  category,
}: {
  page: string;
  category: string;
}) => {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");

  const [data, setData] = useState<ProductPageData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const url =
        process.env.NEXT_PUBLIC_BASE_URL +
          `/api/products/category/${category}/${page}?sort=${
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
        pageTitle={"Category:" + category.replaceAll("-", " ")}
      />
    );
  }

  return (
    <ProductAchieveLayout
      data={data}
      pageTitle={"Category:" + category.replaceAll("-", " ")}
      paginationURL={`/products/c/${category}/p/`}
    />
  );
};

export default PageContent;
